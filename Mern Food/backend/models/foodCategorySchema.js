const mongoose = require("mongoose");

const mongoURL =
  "mongodb+srv://mernfood:test1234@cluster0.av1wnuy.mongodb.net/mydatabase?retryWrites=true&w=majority"; // Update with your MongoDB connection URL

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongoose connection error"));

const Schema = mongoose.Schema;

const foodCatSchema = new Schema({
  CategoryName: { type: String, required: true },
});

const foodCat = mongoose.model("foodcategories", foodCatSchema);

const foodItems = [
  {
    CategoryName: "Biryani/Rice",
  },
  {
    CategoryName: "Starter",
  },
  {
    CategoryName: "Pizza",
  },
];

// Insert food items into the collection
// foodCat
//   .insertMany(foodItems)
//   .then(() => {
//     console.log("Food items inserted successfully");
//   })
//   .catch((error) => {
//     console.error("Error inserting food items:", error);
//   })
//   .finally(() => {
//     mongoose.connection.close();
//   });

module.exports = foodCat;
