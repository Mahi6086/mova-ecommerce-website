import React from "react";
import "./Tags.css";

const Tags = ({ handleTags, tagsData }) => {
  return (
    <div>
      <h1 className="titles-style mt-4">TAGS</h1>
      <div className="tags">
        {tagsData.map((item, ind) => {
          return (
            <button
              key={ind + "354234"}
              onClick={() => handleTags(item.tag)}
              className={`tags-btn ${item.active ? "active" : ""}`}
            >
              {item.tag}
            </button>
          );
        })}
      </div>
      <div id="horizental-line"></div>
    </div>
  );
};

export default Tags;
