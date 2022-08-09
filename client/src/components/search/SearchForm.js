import { useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "throttle-debounce";
import axios from "axios";

import Card from "../ui/Card";
import classes from "./SearchForm.module.css";

function SearchForm(props) {
  const queryRef = useRef();
  const [query, setQuery] = useState('');
  const [searches, setSearches] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (query && query.length > 0) {
      debounceAutocompleteHandler(query); 
    }
  }, [query]);

  const changeQueryHandler = async (event) => {
    setQuery(event.target.value);
  };

  const autocompleteSearch = async (q) => {
    if (!searches.includes(q)) {
      try {
        const response = await queryFetch(q);
        props.onSearchSuccess(response);
        const _searches = [...searches, q];
        setSearches(_searches);
      } catch (err) {
        // Todo: validate credentials to Github
        console.log("ERROR FROM API >>>\n", err)
        console.log("ERR STATUS:", err.response.status);
        console.log("ERR MSG:", err.response.data.response.data.message);
        setErrorMsg(`GET API Error Status: ${err.response.status} - ${err.response.data.response.data.message}`);
      }
    }
  };

  const debounceAutocompleteHandler = useCallback(
    debounce(300, autocompleteSearch),
    []
  );

  // stop debounced calls after unmounting
  useEffect(() => {
    return () => {
      debounceAutocompleteHandler.cancel();
    };
  }, []);

  const queryFetch = async (q) => {
    try {
      let response = await axios.get("http://localhost:4000/search", {
        headers: {
          Authorization: "Bear " + localStorage.getItem("accessToken"),
        },
        params: {
          query: q,
        },
      });
      props.onLimitReached(response.data.isLimitReached);
      return response.data.items;
    } catch (err) {
      if (err.response.status === 403) {
        props.onTokenExpired(true);
      } else {
        throw err;
      }
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const queryEntered = queryRef.current.value;
    if (queryEntered.length > 0) {
      queryFetch(queryEntered).then((result) => {
        props.onReset();
        props.onSearchSuccess(result);
        setSearches([]);
      });
    }
  };

  const clearQueryHandler = (event) => {
    event.preventDefault();
    setQuery("");
    setSearches([]);
    props.onReset();
  };

  const showList = (list) => {
    return (
      <div>
        <p>Autocompleting...</p>
        <hr />
        <ol className={classes.nonumber}>
          {list.map((s, i) => (
            <li key={s + i}>{s}</li>
          ))}
        </ol>
      </div>
    );
  };

  return (
    <Card>
      <form className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="query">
            Query: User Name with min 10 repos & 500 followers
          </label>
          <input
            type="text"
            required
            placeholder="Type a user name here"
            id="query"
            value={query}
            onChange={changeQueryHandler}
            ref={queryRef}
          />
        </div>
        {searches && searches.length > 0 ? showList(searches) : null}
        {errorMsg.length > 0 ? errorMsg : null}
        <div className={classes.actions}>
          <button onClick={clearQueryHandler}>Clear All</button>
          <button onClick={submitHandler}>Search</button>
        </div>
      </form>
    </Card>
  );
}

export default SearchForm;
