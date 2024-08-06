import { useDispatch } from "react-redux";
import "./ResetStateButton.scss";

const ResetStateButton = ({ message, callback }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    /* eslint-disable no-restricted-globals */
    const sure = confirm(
      `Are you sure you want to ${message?.toLowerCase()}? You will lose them forever.`,
    );
    if (!sure) {
      return;
    }
    dispatch(callback);
  };

  return (
    <button className="reset-state-button" onClick={handleClick}>
      {message}
    </button>
  );
};

export default ResetStateButton;
