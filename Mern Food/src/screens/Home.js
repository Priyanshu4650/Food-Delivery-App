import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Caraousel from "../components/Caraousel";

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      // console.log(responseData[0], responseData[1]);

      setFoodItems(responseData[0]);
      setFoodCat(responseData[1]);
      // console.log(foodItems, foodCat);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <div>
          <Navbar />
        </div>
        <div>
          <Caraousel />
        </div>
        <div className="container">
          {foodCat && foodCat !== [] ? (
            foodCat.map((data) => {
              return (
                <div>
                  <div key={data._id} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr />
                  {foodItems && foodItems !== [] ? (
                    foodItems
                      .filter((item) => item.CategoryName === data.CategoryName)
                      .map((filterItem) => {
                        return (
                          <div
                            className="d-inline-flex m-3 md-3"
                            key={filterItem._id}
                          >
                            <Card
                              foodItem={filterItem}
                              options={filterItem.options}
                            />
                          </div>
                        );
                      })
                  ) : (
                    <div>No Data Found</div>
                  )}
                </div>
              );
            })
          ) : (
            <div>""""""""""</div>
          )}
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
