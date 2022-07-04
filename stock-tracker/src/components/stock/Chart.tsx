import React from "react";

type Props = {
  stockName: string; // The name of the stock
};

function Chart({ stockName }: Props) {
  return (
    <div className="Chart">
      <h1>Chart for {stockName}</h1>
    </div>
  );
}

export default Chart;
