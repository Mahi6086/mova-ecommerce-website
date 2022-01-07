import React from "react";
import "./Collections.css";

const Collections = ({ collectionData, handleCollection }) => {
  return (
    <>
      <h1 className="titles-style">COLLECTIONS</h1>
      <div className="collections mt-3">
        {collectionData?.map((item, ind) => {
          return (
            <button
              key={ind + "3434"}
              onClick={() => handleCollection(item.collectionId)}
              className={`collections-btn ${item.active ? "active" : ""}`}
            >
              {item.displayName}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Collections;
