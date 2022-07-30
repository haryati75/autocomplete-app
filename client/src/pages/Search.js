import { useHistory } from 'react-router-dom';
import SearchForm from "../components/search/SearchForm";

function SearchPage() {
  const history = useHistory();

  const expiredTokenHandler = (isExpired) => {
    if (isExpired) {
      localStorage.removeItem('accessToken');
      history.replace('/') // goto authorisation page
    }
  }

  return (
    <section>
      <h1>GitHub Search API</h1>
      <SearchForm onTokenExpired={expiredTokenHandler}/>
    </section>
  );
}

export default SearchPage;