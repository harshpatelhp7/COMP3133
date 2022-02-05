const fs = require("fs");
const csv = require("csv-parser");
let dataCanada = [];
let dataUsa = [];
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const csvWriterForCanada = createCsvWriter({
  path: "canada.txt",
  header: [
    { id: "country", title: "country" },
    { id: "year", title: "year" },
    { id: "population", title: "population" },
  ],
});
const csvWriterForUSA = createCsvWriter({
  path: "usa.txt",
  header: [
    { id: "country", title: "country" },
    { id: "year", title: "year" },
    { id: "population", title: "population" },
  ],
});

fs.createReadStream("input_countries.csv")
  .pipe(csv())
  .on("data", (row) => {
    if (row.country == "Canada") {
      dataCanada.push(row);
      csvWriterForCanada.writeRecords(dataCanada);
    } else if (row.country == "United States") {
      dataUsa.push(row);
      csvWriterForUSA.writeRecords(dataUsa);
    }
  })
  .on("end", () => console.log("parsing complete"));
