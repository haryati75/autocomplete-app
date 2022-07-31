import Card from "../ui/Card";
import classes from "./ResultItem.module.css";

function ResultItem(props) {

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h3>User: {props.login}</h3>
          <p>Profile URL: <a target="_blank" rel="noopener noreferrer" href={props.html_url}>{props.html_url}</a></p>
        </div>
      </Card>
    </li>
  );
}

export default ResultItem;
