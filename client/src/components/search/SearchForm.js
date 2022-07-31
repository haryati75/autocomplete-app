import { useCallback, useEffect, useRef, useState } from 'react';
import { debounce, throttle } from 'throttle-debounce';
import axios from "axios";

import Card from '../ui/Card';
import classes from './SearchForm.module.css';

function SearchForm (props) {

  const queryRef = useRef();
  const [ query, setQuery ] = useState('');
  const [ searches, setSearches ] = useState([]);
  
  useEffect(() => {
    if (query.length > 0) {
        if (query.endsWith(' ')) {
          console.log('throttle search: ', query)
          throttleAutocompleteHandler(query); // the eager one
        } else {
          console.log('debounce search: ', query)
          debounceAutocompleteHandler(query);  // the patient one
        }      
    }
  }, [query]);
  
  const changeQueryHandler = async (event) => {
    setQuery(event.target.value);
  }
  
  const autocompleteSearch = async (q) => {
    if (!searches.includes(q)) {
      const response = await queryFetch(q);
      props.onSearchSuccess(response);
      const _searches = [...searches, q];
      setSearches(_searches);
    }
  }
  
  const debounceAutocompleteHandler = useCallback(
    debounce(1000, autocompleteSearch)
    , []);

  const throttleAutocompleteHandler = useCallback(
    throttle(500, autocompleteSearch)
    , [searches]);

  // stop debounced calls after unmounting
  useEffect(() => {
    return () => {
      debounceAutocompleteHandler.cancel();
      throttleAutocompleteHandler.cancel();
    }
  },[]);

  const queryFetch = async (q) => {
    try {
      let response = await axios.get('http://localhost:4000/search', {
        'headers': {
          'Authorization' : 'Bear ' + localStorage.getItem('accessToken')
        },
        'params': {
          query: q
        }
      })
      console.log(response.data);
      return response.data.items;
    } catch (err) {
      if (err.response.status === 403) {
        props.onTokenExpired(true);
      }
      console.log('ERROR search query >>> ', err.response.data)
      return null;
    }
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    const queryEntered = queryRef.current.value;
    queryFetch(queryEntered).then((result) => {
      props.onReset();
      props.onSearchSuccess(result);
      setSearches([]);
      setQuery('');
    })
  }

  const clearQueryHandler = (event) => {
    event.preventDefault();
    setQuery('');
    setSearches([]);
    props.onReset();
  }

  const showList = (list) => {
    return (
      <div>
        <p>Autocompleting...</p>
        <hr />
        <ol className={classes.nonumber}>
          {
            list.map((s, i) => <li key={s+i}>{s}</li>)
          }
        </ol>        
      </div>);
  }

  return (
    <Card>
      <form className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="query">Query: User Name with min 10 repos & 500 followers</label>
          <input type="text" required 
            placeholder='Type a user name here'
            id="query" 
            value={query}
            onChange={changeQueryHandler}
            ref={queryRef}
          />
        </div>
        {searches.length > 0 ? showList(searches) : null}
        <div className={classes.actions}>
          <button onClick={clearQueryHandler}>Clear All</button>
          <button onClick={submitHandler}>Search</button>
        </div>
      </form>
    </Card>
  );
}

export default SearchForm;