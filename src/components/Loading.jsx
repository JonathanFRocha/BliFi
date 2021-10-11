import React, { useContext } from "react";
import JsonComparerContext from "../context/Context";
import "../style/loading.css";

import ball from "../assets/loading.svg";

const Loading = () => {
  const { loading } = useContext(JsonComparerContext);
  if (loading)
    return (
      <div className="loading__container">
        <img className="comparer__loading" src={ball} alt="loading Icon" />
      </div>
    );
  return "";
};

export default Loading;
