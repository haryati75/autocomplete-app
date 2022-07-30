import { useRef } from 'react';
import axios from "axios";

import Card from "../ui/Card";
import classes from './Authorise.module.css';

function Authorise(props) {

  const keypassRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();
    const keypassEntered = keypassRef.current.value;
    try {
      let response = await axios.post('http://localhost:4000/auth', {
        keypass: keypassEntered
      })
      let token = response.data.access_token;
      if (token) {
        props.onAuthorised(token);
      } else {
        throw new Error('No token received.')
      }
    } catch (err) {
      console.log('ERROR getting token >>> ', err)
    }
  }
  
  const contentAuthRequired = 
    <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.content}>
          <p>Enter Keypass before using Search</p>
        </div>
        <div className={classes.control}>
          <label htmlFor="keypass">Keypass</label>
          <input type="text" required id="keypass" ref={keypassRef}/>
        </div>
        <div className={classes.actions}>
          <button>Authorise</button>
        </div>    
    </form>;
  
  const contentAuthorised = 
    <div className={classes.content}>
      <p>App already authorized!</p>
    </div>;

  const accessToken = localStorage.getItem('accessToken') || null;

  return (
    <Card>
      {accessToken ? contentAuthorised : contentAuthRequired}
    </Card>
  );
}

export default Authorise;
