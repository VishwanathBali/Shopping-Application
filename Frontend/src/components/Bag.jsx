import React from "react";
import BagSummary from "./BagSummary";
import BagItem from "./BagItem";
import { useSelector } from "react-redux";

const Bag = () => {
    const bag = useSelector(store => store.bag)
    const items = useSelector(store => store.items)
    const itemList = items.filter(item => bag.includes(item.id))
  return (
    <>
      <main>
        <div className="bag-page">
          <div className="bag-items-container">
            {itemList.map((item) => <BagItem item={item}/>)}
          </div>
            <BagSummary/>
        </div>
      </main>
    </>
  );
};

export default Bag;
