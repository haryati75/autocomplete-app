import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Autocomplete App</div>
      {/* <nav>
        <ul>
          <li>
            <Link to="/">Authorise</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
        </ul>
      </nav> */}
    </header>
  );
}

export default MainNavigation;
