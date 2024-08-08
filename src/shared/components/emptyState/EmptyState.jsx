import { Link } from "react-router-dom";
import "./EmptyState.scss";

export const EmptyState = ({ message, goToHome = true }) => {
  return (
    <div className="empty-state">
      <p className="empty-state__message">{message}</p>
      {!!goToHome && (
        <Link className="empty-state__anchor" to="/">
          Go to home page
        </Link>
      )}
    </div>
  );
};
