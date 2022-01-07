import React from "react";
import "./Catagories.css";
const Catagories = ({ handleCategories, categoriesData }) => {
  return (
    <div>
      <h1 className="titles-style mt-4">CATAGORIES</h1>
      <div className="catagories mt-3">
        {categoriesData.map((item, ind) => {
          return (
            <button
              key={ind + "34423"}
              onClick={() => handleCategories(item.categoryId)}
              className={`catagories-btn ${item.active ? "active" : ""}`}
            >
              {item.displayName}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Catagories;
