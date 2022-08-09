import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import SearchForm from "../components/search/SearchForm";
import ResultList from "../components/search/ResultList";

function SearchPage() {
  const history = useHistory();
  const [ loadedResults, setLoadedResults ] = useState([]);
  const [ isEmptyResult, setIsEmptyResult ] = useState(false);
  const [ isRateLimitReached, setIsRateLimitReached ] = useState(false);

  const loadResultHandler = (result) => {
    setLoadedResults(result);
    if (result && result.length === 0) {
      setIsEmptyResult(true);
    } else {
      setIsEmptyResult(false);
    }
  }

  const expiredTokenHandler = (isExpired) => {
    if (isExpired) {
      localStorage.removeItem('accessToken');
      history.replace('/') // goto authorisation page
    }
  }

  const limitReachedHandler = (flag) => {
    setIsRateLimitReached(flag);
  }

  const resetHandler = () => {
    setLoadedResults([]);
    setIsEmptyResult(false);
  }

  return (
    <section>
      <h1>GitHub Search API: users</h1>
      {loadedResults && loadedResults.length > 0 ? <p>Result count: {loadedResults.length}</p> : null}
      <SearchForm 
        onTokenExpired={expiredTokenHandler} 
        onSearchSuccess={loadResultHandler} 
        onLimitReached={limitReachedHandler}
        onReset={resetHandler}/>
      {isEmptyResult ? <h3>No users found with the criteria!</h3> : null}
      {isRateLimitReached ? <h3>GitHub rate-limit reached! Wait a few seconds before next search.</h3> : null}
      {loadedResults?.length > 0 ? <ResultList items={loadedResults}/> : null}
    </section>
  );
}

export default SearchPage;