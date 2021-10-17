import React from "react";
import Partition from "./Partition";
import "./table.css";

const Table = ({ headers, data }) => {
  if (headers.length === 0 || data.length === 0) {
    return <div>No information</div>;
  }

  const headersElements = headers.map((element, key) => {
    return <th key={key}>{element}</th>;
  });

  const bodyElements = data.map((element, key) => {
    return <Partition key={key} data={element} />;
  });

  return (
    <table className="table">
      <thead>
        <tr>{headersElements}</tr>
      </thead>
      <tbody>{bodyElements}</tbody>
    </table>
  );
};

export default Table;
