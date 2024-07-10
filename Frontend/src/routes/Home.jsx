import React from "react";
import HomeItem from "../components/HomeItem";
import { useSelector } from "react-redux";

const Home = () => {
    const items = useSelector(store => store.items)
  return (
    <main>
      <div className="items-container">
        {items.map((item) => (
          <HomeItem key={item._id} item={item} />
        ))}
      </div>
    </main>
  );
};

export default Home;
