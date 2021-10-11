import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import BlipInputs from "../components/BlipInputs";
import FigmaInputs from "../components/FigmaInputs";
import JsonTable from "../components/JsonTable";
import JsonComparerContext from "../context/Context";
import { UseCompareElements, UseBlipJson, UseFigmaJson } from "../hooks";
import "../style/page.css";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../components/Loading";

const Page = () => {
  const [error, setError] = useState("");
  const {
    document,
    botKey,
    setLoading,
    setFigmaElements,
    setBlipElements,
    setComparison,
  } = useContext(JsonComparerContext);

  useEffect(() => {
    if (error) toast.error(error, { autoClose: 4000 });
    setError("");
  }, [error, setError]);

  const { getBotJson } = UseBlipJson();
  const { getFigmaJson } = UseFigmaJson();
  UseCompareElements();

  const resetElements = () => {
    setFigmaElements({ texts: [], ids: [] });
    setBlipElements({ texts: [], ids: [] });
    setComparison();
  };

  const renderError = (message) => {
    switch (message) {
      case "Invalid token":
        setError("Figma invalid token!");
        break;
      case "Not found":
        setError("File not found!");
        break;
      case "Invalid authorization header":
        setError("Invalid bot key!");
        break;
      default:
        break;
    }
  };

  const compare = async () => {
    try {
      resetElements();
      setLoading(true);
      getFigmaJson();
      await getBotJson();
      await setLoading(false);
      renderError("");
    } catch (error) {
      resetElements();
      setLoading(false);
      console.error(error.message);
      renderError(error.message);
    }
  };

  const disabledButton = !document || botKey.length === 0;
  return (
    <div>
      <Loading />
      <div>
        <h1 className="title__top">Figma - Blip</h1>
        <h1 className="title__bottom">Validator</h1>
      </div>
      <div className="inputs__container">
        <FigmaInputs />
        <BlipInputs />
      </div>
      <div className="button__container">
        <button
          disabled={disabledButton}
          className={disabledButton ? "page__button--disabled" : "page__button"}
          type="button"
          onClick={compare}
        >
          Compare
        </button>
        <ToastContainer />
      </div>
      <JsonTable />
    </div>
  );
};

export default Page;
