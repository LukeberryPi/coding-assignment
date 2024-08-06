import { Link } from "react-router-dom";
import "./EmptyState.scss";

export const EmptyState = ({ message, goToHome = true }) => {
  return (
    <div className="empty-state-container">
      <p>{message}</p>
      {!!goToHome && (
        <Link className="go-home-anchor" to="/">
          Go to home page
        </Link>
      )}
    </div>
  );
};
