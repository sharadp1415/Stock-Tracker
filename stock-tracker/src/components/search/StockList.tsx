import { FStringSetter } from "interfaces";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import stocks from "data/DefaultStocks";
import { Link } from "react-router-dom";

interface Props {
  setStockName: FStringSetter;
}

export default function StockList(props: Props) {
  const navigate = useNavigate();
  const whenStockNameClicked = (
    e: React.MouseEvent<HTMLHeadingElement, MouseEvent>
  ): void => {
    const currentStock: string | null | undefined =
      e.currentTarget.querySelector(".stock-name")?.textContent;
    if (currentStock) {
      props.setStockName(currentStock);
      navigate(`/pages/stock`);
    } else {
      console.error(
        "something went wrong in capturing the stock you clicked, please try again"
      );
    }
  };
  return (
    <div className="StockList">
      {stocks.map((stock, index) => (
        <div className="stock" key={index} onClick={whenStockNameClicked}>
          <img src={stock.icon} alt="stock icon" />
          <div className="stock-text">
            <div className="top">
              <h3 className="stock-name" title="An interesting stock...">
                {stock.name}
              </h3>
              <p className="stock-price">{stock.price}</p>
            </div>
            <p className="stock-desc">{stock.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
