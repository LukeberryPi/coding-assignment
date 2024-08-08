import { Loader2 } from "lucide-react";
import "./LoadingState.scss";

const LoadingState = () => {
  return (
    <div className="loading-state">
      <Loader2 className="loading-state__spinner" />
      <span>Loading...</span>
    </div>
  );
};

export default LoadingState;