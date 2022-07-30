import { BrowserRouter, Route, Switch } from "react-router-dom";

import Layout from "./components/layout/Layout";
import SearchPage from "./pages/Search";
import WelcomePage from "./pages/Welcome";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/" exact>
              <WelcomePage />
            </Route>
            <Route path="/search" >
              <SearchPage />
            </Route>
          </Switch>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
