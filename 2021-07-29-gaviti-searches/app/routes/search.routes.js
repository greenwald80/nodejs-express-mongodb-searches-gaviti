module.exports = app => {
    const searches = require("../controllers/search.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Search
    router.post("/", searches.create);
  
    // Retrieve all searches
    router.get("/", searches.findAll);
  
    // Retrieve all Searches by date
    router.get("/bydate", searches.findByDate);
  
    // Retrieve a single search with id
    router.get("/:id", searches.findOne);
  
    // Update a search with id
    router.put("/:id", searches.update);
  
    // Delete a search with id
    router.delete("/:id", searches.delete);
  
    // Create a new search
    router.delete("/", searches.deleteAll);
  
    app.use('/api/searches', router);
  };