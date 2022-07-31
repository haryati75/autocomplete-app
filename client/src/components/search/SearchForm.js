import { useRef } from 'react';
import axios from "axios";

import Card from '../ui/Card';
import classes from './SearchForm.module.css';

function SearchForm (props) {

  const queryRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();
    const queryEntered = queryRef.current.value;
    try {
      let response = await axios.get('http://localhost:4000/search', {
        'headers': {
          'Authorization' : 'Bear ' + localStorage.getItem('accessToken')
        },
        'params': {
          query: queryEntered
        }
      })
      console.log(response.data)
      props.onSearchSuccess(response.data.items);
    } catch (err) {
      if (err.response.status === 403) {
        props.onTokenExpired(true);
      }
      console.log('ERROR search query >>> ', err.response.data)
    }
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="query">Query: User Name with min 10 repos & 500 followers</label>
          <input type="text" required 
            placeholder='Type a user name here'
            id="query" 
            ref={queryRef}
          />
        </div>
        <div className={classes.actions}>
          <button>Submit</button>
        </div>
      </form>
    </Card>
  );
}

export default SearchForm;