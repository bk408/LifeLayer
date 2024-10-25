// Loading.jsx

import { PacmanLoader } from "react-spinners";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "50vh",
      }}
    >
      <PacmanLoader color="#ff725e" size={80} />
    </div>
  );
};

export default Loading;
