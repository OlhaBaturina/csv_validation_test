import React from "react";

const Partition = ({ data }) => {
  const elements = data.map((element, key) => {
    return (
      <td key={key} className={element.hasError ? "warning" : ""}>
        {element.value}
      </td>
    );
  });
  return <tr>{elements}</tr>;
};

export default Partition;
