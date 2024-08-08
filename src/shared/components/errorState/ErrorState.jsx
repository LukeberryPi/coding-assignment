import "./ErrorState.scss";

const ErrorState = (error) => {
  return (
    <div className="error-state">
      Error: {error instanceof Object ? error.message : error}
    </div>
  );
};

export default ErrorState;
