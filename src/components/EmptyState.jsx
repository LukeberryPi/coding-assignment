import { Link } from "react-router-dom";

export const EmptyState = ({ message }) => {
  return (
    <div className="empty-state">
      <p>{message}</p>
      <Link className="go-home-anchor" to="/">Go to home page</Link>
    </div>
  );
};
