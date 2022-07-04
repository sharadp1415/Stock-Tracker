import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import "components/styles/Layout.css";
import { FStringSetter } from "interfaces";

export default function Layout() {
  const navigate = useNavigate();
  const [heading, setHeading] = useState<string | null>("Heading");

  const setHeadingName: FStringSetter = (name) => {
    setHeading(name);
  };

  return (
    <>
      <div className="header">
        <div className="container">
          <button className="back-button" onClick={() => navigate(-1)}>
            <img src="/BackArrow.svg" alt="back arrow" />
          </button>
          <h1 className="heading">{heading}</h1>
        </div>
      </div>
      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet context={{ heading, setHeadingName }} />
    </>
  );
}
