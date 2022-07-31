import ResultItem from "./ResultItem";
import classes from "./ResultList.module.css";

function ResultList(props) {
  return (
    <ul className={classes.list}>
      {props.items.map((item) => (
        <ResultItem
          key={item.id}
          id={item.id}
          login={item.login}
          html_url={item.html_url}
        />
      ))}
    </ul>
  );
}

export default ResultList;
