import React, { useState } from "react";
import { Link } from "react-router-dom";
import "pages/styles/LandingPage.css";

function LandingPage() {
  const [backendData, setBackendData] = useState({
    results: "",
    about: "",
  });

  function getData() {
    fetch("http://localhost:8081/profile", { method: "POST" })
      .then((response) => {
        const res = response.json();
        console.log(res);
        return res;
      })
      .then((data) => {
        console.log(data);
        setBackendData({
          results: data.result,
          about: data.about,
        });
        console.log(backendData);
      });
  }

  let param = "MSFT";

  function getData2() {
    fetch("http://localhost:8081/stockExample", {
      body: JSON.stringify({ name: param }),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        // console.log(response.json());
        const res = response.json();
        console.log(res);
        // setProfileData(res);
        return res;
      })
      .then((data) => {
        console.log(data);
        setBackendData({
          results: data.result,
          about: data.about,
        });
        console.log(backendData);
      });
  }

  async function testing() {
    try {
      //port was still set to 5000 on my server, but works otherwise when changed
      const response = await fetch("http://localhost:8081/data", {
        body: JSON.stringify({ date: "2021-12-31" }),
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw Error(response.statusText);
      }

      const data = response.json();
      console.log(data);
      data.then((actualData) => {
        console.log(actualData);
        setBackendData({
          about: actualData.about,
          results: actualData.result,
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container main-container">
      <h1 className="huge-text main-title dark-primary-text">J.E.D.I</h1>
      <div className="large-text slogan">
        <p>Join</p>
        <p>Educate</p>
        <p>Discover</p>
        <p>Invest</p>
      </div>
      <Link to="/pages/tutorial">
        <button className="large-rounded-btn dark-primary-bg white-text">
          Tutorial
        </button>
      </Link>
      <Link to="/pages/search">
        <button className="large-rounded-btn dark-secondary-bg white-text">
          Get Started
        </button>
      </Link>

      {/* <button
        className="large-rounded-btn dark-secondary-bg white-text"
        onClick={testing}
      >
        Click To Test Backend
      </button>
      <div className="large-text">
        <p>News Articles: {backendData.results}</p>
        <p>About: {backendData.about}</p>
      </div> */}
    </div>
  );
}

export default LandingPage;
