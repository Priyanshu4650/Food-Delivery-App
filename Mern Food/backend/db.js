const mongoose = require("mongoose");
const foodItemsSchema = require("./models/food_itemsSchema");
const foodCatSchema = require("./models/foodCategorySchema");
const Schema = mongoose.Schema;

const dbURL =
  "mongodb+srv://mernfood:test1234@cluster0.av1wnuy.mongodb.net/mydatabase?retryWrites=true&w=majority";

const connectToDB = async () => {
  try {
    await mongoose.connect(dbURL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

const fetchDataFromDB = async () => {
  try {
    console.log("Fetched");
    const data = await foodItemsSchema.find();
    global.food_items = data;
    const catData = await foodCatSchema.find();
    // console.log(catData);
    global.foodCategory = catData;
    // console.log(global.food_items);
    // console.log(global.foodCategory);
  } catch (err) {
    console.error("Error fetching data from MongoDB:", err);
  }
};

const mongoDB = async () => {
  await connectToDB();
  await fetchDataFromDB();
};

module.exports = mongoDB;
