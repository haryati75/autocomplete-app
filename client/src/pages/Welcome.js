import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Authorise from "../components/search/Authorise";

function WelcomePage () {
  const history = useHistory();
  const accessToken = localStorage.getItem('accessToken') || null;

  useEffect(() => {
    if (accessToken) {
      history.replace('/search');
    }
  }, []);

  const authorisedHandler = (token) => {
    localStorage.setItem('accessToken', token);
    history.replace('/search');
  }

  return (
    <section>
      <h1>Authorise App</h1>
      <Authorise onAuthorised={authorisedHandler}/>
    </section>
  );
}

export default WelcomePage;