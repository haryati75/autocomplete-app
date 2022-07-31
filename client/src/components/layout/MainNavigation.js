import classes from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Autocomplete App</div>
    </header>
  );
}

export default MainNavigation;
