import React from "react";
import "./upload.css";

const UploadFile = ({ onLoad, onError }) => {
  const isValidFileType = (file) => {
    const regexp = /.+(\.csv)$/;
    return regexp.test(file.name);
  };
  const csvToJson = (data) => {
    let rows = data.split("\n");
    const temp = [];

    rows.forEach((row) => {
      let cols = row.split(",");

      if (cols.length > 1) {
        cols = cols.map((col) => {
          return col.trim().replace(/ +/g, " ").toString();
        });
        temp.push(cols);
      }
    });

    return temp;
  };

  const handleChange = (e) => {
    const files = e.target.files;

    if (!files || files.length === 0) {
      onError("Select file");
      return;
    }
    if (!isValidFileType(files[0])) {
      onError("File format is not correct");
      return;
    }

    let reader = new FileReader();
    reader.onload = () => {
      let csvString = reader.result;
      let csvJson = csvToJson(csvString);
      onError("");
      onLoad(csvJson);
    };
    reader.readAsText(files[0]);
  };

  return (
    <div className={"upload"}>
      <label className={"customFileUpload"}>
        <input
          type="file"
          accept={".csv, text/csv"}
          multiple={false}
          onChange={(e) => handleChange(e)}
        />
        <i className={""}>Import File</i>
      </label>
    </div>
  );
};

export default UploadFile;
