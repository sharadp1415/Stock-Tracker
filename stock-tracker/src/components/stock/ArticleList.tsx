import React from "react";

type Props = {
  stockName: string; // The name of the stock
};

function ArticleList({ stockName }: Props) {
  return (
    <div className="ArticleList">
      <h1>{stockName}'s Article List</h1>
    </div>
  );
}

export default ArticleList;
