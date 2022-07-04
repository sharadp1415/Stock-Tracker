import { FStringSetter } from "interfaces";
import React, { useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  setStockName: FStringSetter; // Set stock name state in App.tsx to stock name picked in this component
};

function SearchBar({ setStockName }: Props) {
  // const [inputValue, setInputValue] = useState("");
  let link = "/pages/stock:";

  return (
    <div className="SearchBar">
      <input 
        type="text" 
        placeholder="Type a stock ticker..."  
        onChange={(e) => {
          setStockName(e.target.value);
          link = "/pages/stock:" + e.target.value;
          console.log(link);
        }} 
      />
      <button onClick={() => console.log(link)}>
        <Link to= {link}>
          <img 
            src="/SearchIcon.svg" 
            alt="search"   
          />
        </ Link>
      </button>
    </div>
  );
}

export default SearchBar;
