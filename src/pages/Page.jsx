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
import BliFi from "../assets/BliFi.png";

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
      <div className="header__container">
        <div>
          <h1 className="title__top">BliFi</h1>
          <h1 className="title__bottom">Comparing Blip and Figma</h1>
        </div>
        <img src={BliFi} alt="" />
      </div>
      <div className="inputs__container">
        <FigmaInputs />
        <div>
          <BlipInputs />
          <div className="button__container">
            <button
              disabled={disabledButton}
              className={`${document ? "" : "showNone"} ${
                disabledButton ? "page__button--disabled" : "page__button"
              }`}
              type="button"
              onClick={compare}
            >
              Compare
            </button>
            <ToastContainer />
          </div>
        </div>
      </div>

      <JsonTable />
    </div>
  );
};

export default Page;
