import React from "react";
import { useState } from "react";
import Chart from "components/stock/Chart";
import Forecast from "components/stock/Forecast";
import ArticleList from "components/stock/ArticleList";

type Props = {
  stockName: string; // The name of the stock
};

enum PageToShow {
  Chart,
  Forecast,
  Articles, // Add more chart types heres
}

// This page shows the chart initially and then either the Forecast or profile depending on which button is clicked
export default function StockData({ stockName }: Props) {
  const [page, changePage] = useState(PageToShow.Chart);

  return (
    <div className="StockData">
      {page === PageToShow.Chart && <Chart stockName={stockName} />}
      {page === PageToShow.Forecast && <Forecast stockName={stockName} />}
      {page === PageToShow.Articles && <ArticleList stockName={stockName} />}
    </div>
  );
}
