import "./ErrorState.scss";

const ErrorState = (error) => {
  return (
    <div className="error-state">
      Error: {error instanceof Object ? error.error : error}
    </div>
  );
};

export default ErrorState;
