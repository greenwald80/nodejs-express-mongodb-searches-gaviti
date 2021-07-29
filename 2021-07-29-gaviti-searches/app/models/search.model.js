module.exports = (mongoose) => {
  const Search = mongoose.model(
    "search",
    mongoose.Schema(
      {
        customerid: String,
        invoiceid: String,
      },
      { timestamps: true }
    )
  );

  return Search;
};
