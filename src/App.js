import React, { useState } from "react";
import "./App.css";
import Message from "./Components/WarningMessage/Message";
import Table from "./Components/TableBody/Table";
import UploadFile from "./Components/UploadFile/UploadFile";
import { validation } from "./helpers/validation";

function App() {
  const [table, setTable] = useState({ headers: [], data: [] });
  const [error, setError] = useState("Select a file in cvs format");

  const handleSuccess = (data) => {
    setTable(data);
  };

  const onLoad = (data) => {
    const required = ["Full Name", "Phone", "Email"];
    const unique = ["Phone", "Email"];
    validation(data, required, unique, setError, handleSuccess);
  };

  return (
    <div className="App">
      <UploadFile onLoad={onLoad} onError={setError} />
      {error && <Message message={error} />}
      {!error && table && <Table headers={table.headers} data={table.data} />}
    </div>
  );
}

export default App;
