import React, { useEffect } from "react";
import "pages/styles/Tutorial.css";
import { Link, useOutletContext } from "react-router-dom";
import { IHeaderContext } from "interfaces";

function Tutorial() {
  const { setHeadingName } = useOutletContext() as IHeaderContext;
  useEffect(() => {
    setHeadingName("Tutorial"); // throws some sort of error, still gotta figure that out
  }, []);

  return (
    <div className="tutorial wide-container">
      <div className="description">
        <h3>Welcome to J.E.D.I ! </h3>
        <p>
          Our goal is to help you find info on events surrounding various stock
          trends, and forecast stock movement.
        </p>
        <p>
          We use online data from the live stock market to give you the most
          accurate info possible.
        </p>
        <p>
          We also link stock trends with news sources to help you understand why
          the stock could have moved the way it did.
        </p>
        <p>
          Our machine learning model takes this historical data linking past
          events to corresponding stock trends to make predictions about future
          motion of similar stocks.
        </p>
        <b>To Learn About Stock History:</b>
        <ol className="instructions">
          <li className="instruction">
            Type a stock name into the search bar and select your stock.
          </li>
          <li className="instruction">
            Use the sliders and buttons to select a time frame.
          </li>
          <li className="instruction">
            Click Search to get links to events correlated with that stock
            motion.
          </li>
        </ol>
        <b>To See Our Prediction Step:</b>
        <ol className="instructions">
          <li className="instruction">
            Type a stock name into the search bar and select your stock.
          </li>
          <li className="instruction">Scroll down and click Predict.</li>
          <li className="instruction">
            Read our prediction, check our sources, and make your own decision!
          </li>
        </ol>
        <p className="disclaimer">
          Disclaimer: This content is for informational purposes only, you
          should not construe any such information or other material as legal,
          tax, investment, financial, or other advice.
        </p>
      </div>

      <Link to="/pages/search">
        <button className="white-text large-rounded-btn dark-secondary-bg">
          Continue
        </button>
      </Link>
    </div>
  );
}

export default Tutorial;
