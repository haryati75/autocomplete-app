import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import SearchForm from "../components/search/SearchForm";
import ResultList from "../components/search/ResultList";

function SearchPage() {
  const history = useHistory();
  const [ loadedResults, setLoadedResults ] = useState([]);

  const loadResultHandler = (result) => {
    setLoadedResults(result);
  }

  const expiredTokenHandler = (isExpired) => {
    if (isExpired) {
      localStorage.removeItem('accessToken');
      history.replace('/') // goto authorisation page
    }
  }

  const resetHandler = () => {
    setLoadedResults([]);
  }

  return (
    <section>
      <h1>GitHub Search API: users</h1>
      {loadedResults.length > 0 ? <p>Result count: {loadedResults.length}</p> : null}
      <SearchForm onTokenExpired={expiredTokenHandler} onSearchSuccess={loadResultHandler} onReset={resetHandler}/>
      <ResultList items={loadedResults}/>
    </section>
  );
}

export default SearchPage;