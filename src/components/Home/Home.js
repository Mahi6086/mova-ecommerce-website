import axios from "axios";
import React, { useEffect, useState } from "react";
import { CartState } from "../../context/Context";
import Catagories from "./Catagories/Catagories";
import Collections from "./Collections/Collections";
import Products from "./Products/Products";
import Tags from "./Tags/Tags";

const Home = () => {
  const { setProductLoading } = CartState();
  const [collectionData, setCollectionData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [tagsData, setTagsData] = useState([]);
  useEffect(() => {
    // get collection data
    axios.get("/prod/collections").then((res) => {
      setCollectionData([
        { active: true, collectionId: "All", displayName: "All" },
        ...res.data,
      ]);
    });

    // get categories data
    axios.get("/prod/categories").then((res) => {
      setCategoriesData([
        {
          active: true,
          collectionId: "All",
          displayName: "All",
          parentId: "root",
        },
        ...res.data,
      ]);
    });
    // get tags data
    axios.get("/prod/tags").then((res) => {
      setTagsData([
        {
          active: true,
          displayName: "All",
          tag: "all",
        },
        ...res.data,
      ]);
    });
  }, []);

  const handleCollection = (collectionId) => {
    const modifyData = [];
    collectionData.forEach((item) => {
      item.active = false;
      if (item.collectionId === collectionId) {
        item.active = true;
      }
      modifyData.push(item);
    });
    setCollectionData(modifyData);
    filterProducts("collection", collectionId);
  };

  const handleCategories = (caterogyId) => {
    const modifyData = [];
    categoriesData.forEach((item) => {
      item.active = false;
      if (item.categoryId === caterogyId) {
        item.active = true;
      }
      modifyData.push(item);
    });
    setCategoriesData(modifyData);
    if (!caterogyId) {
      filterProducts("category", "all");
    } else {
      filterProducts("category", caterogyId);
    }
  };

  const handleTags = (tag) => {
    const modifyData = [];
    tagsData.forEach((item) => {
      item.active = false;
      if (item.tag === tag) {
        item.active = true;
      }
      modifyData.push(item);
    });
    setTagsData(modifyData);
    filterProducts("tag", tag);
  };

  const [allProducts, setAllProducts] = useState([]);
  const [filterKey, setFilterKey] = useState({
    collection: "all",
    category: "all",
    tag: "all",
  });
  const [url, setUrl] = useState("");

  const filterProducts = (tag, key) => {
    const data = { ...filterKey, [tag]: key };
    setFilterKey(data);

    if (
      data.collection !== "all" &&
      data.category !== "all" &&
      data.tag !== "all"
    ) {
      setUrl(
        `?collection=${data.collection}&&category=${data.category}&&tag=${data.tag}`
      );
      return;
    }

    const collection = data.collection.toLocaleLowerCase();

    if (collection !== "all" && data.category !== "all") {
      setUrl(`?collection=${data.collection}&&category=${data.category}`);
      return;
    }
    if (data.category !== "all" && data.tag !== "all") {
      setUrl(`?category=${data.category}&&tag=${data.tag}`);
      return;
    }

    if (collection !== "all" && data.tag !== "all") {
      setUrl(`?collection=${data.collection}&&tag=${data.tag}`);
      return;
    }

    if (collection !== "all") {
      setUrl(`?collection=${data.collection}`);
    } else if (data.category.toLocaleLowerCase() !== "all") {
      setUrl(`?category=${data.category}`);
      console.log(`?category=${data.category}`);
    } else if (data.tag.toLocaleLowerCase() !== "all") {
      setUrl(`?tag=${data.tag}`);
    } else {
      setUrl("");
    }
  };

  useEffect(() => {
    setProductLoading(true);
    axios.get(`/prod/items${url}`).then((res) => {
      if (res.data !== undefined) {
        setAllProducts(res.data);
        setProductLoading(false);
      }
    });
  }, [url, setProductLoading]);

  return (
    <>
      <Collections
        collectionData={collectionData}
        handleCollection={handleCollection}
      />
      <Catagories
        categoriesData={categoriesData}
        handleCategories={handleCategories}
      />
      <Tags handleTags={handleTags} tagsData={tagsData} />
      <Products allProducts={allProducts} />
    </>
  );
};

export default Home;
