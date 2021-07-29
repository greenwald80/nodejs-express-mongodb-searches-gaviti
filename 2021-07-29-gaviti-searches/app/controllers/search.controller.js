const db = require("../models");
const Search = db.searches;
const csvwriter = require("csv-writer");

//function for save json data to local csv
function createCSV(data) {
  var createCsvWriter = csvwriter.createObjectCsvWriter;
  // Passing the column names intp the module
  const csvWriter = createCsvWriter({
    // Output csv file name is stored_data
    path: "stored_data.csv",
    header: [
      // Title of the columns (column_names)
      { id: "createdAt", title: "CREATEDAT" },
      { id: "customerid", title: "CUSTOMERID" },
      { id: "invoiceid", title: "INVOICEID" },
    ],
  });
  csvWriter
    .writeRecords(data)
    .then(() => console.log("Data uploaded into csv successfully"));
}

// Create and Save a new Search
exports.create = (req, res) => {
  // Validate request
  if (!req.body.customerid || !req.body.invoiceid) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a Search
  const search = new Search({
    customerid: req.body.customerid,
    invoiceid: req.body.invoiceid,
  });
  // Save Search in the database
  search
    .save(search)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Search.",
      });
    });
};

// Retrieve all Searches from the database.
exports.findAll = (req, res) => {
  Search.find({})
    .then((data) => {
      createCSV(data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

// Find all Searches by date
exports.findByDate = (req, res) => {
  // Validate request
  if (!req.query.startdate || !req.query.enddate) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const startdate = req.query.startdate;
  const enddate = req.query.enddate;
  Search.find({ createdAt: { $gt: startdate, $lt: enddate } })
    .then((data) => {
      createCSV(data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving searches.",
      });
    });
};

// Find a single Search with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Search.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Search with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Search with id=" + id });
    });
};

// Update a Search by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Search.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Search with id=${id}. Maybe Search was not found!`,
        });
      } else res.send({ message: "Search was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Search with id=" + id,
      });
    });
};

// Delete a Search with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Search.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Search with id=${id}. Maybe Search was not found!`,
        });
      } else {
        res.send({
          message: "Search was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Search with id=" + id,
      });
    });
};

// Delete all Searches from the database.
exports.deleteAll = (req, res) => {
  Search.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Searches were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all searches.",
      });
    });
};
