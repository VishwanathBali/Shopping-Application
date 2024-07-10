import React from "react";
import { useSelector } from "react-redux";

const BagSummary = () => {
    const bags = useSelector(store => store.bag)
    const items = useSelector(store => store.items)
    const itemList = items.filter(item => bags.includes(item._id))
    const totalItem = bags.length
    const totalMRP = itemList.reduce((sum,item) => sum + item.original_price,0)
    const actualMRP = itemList.reduce((sum,item) => sum + item.current_price,0)
    const totalDiscount = totalMRP - actualMRP
    const convenienceFee = bags.length !== 0 ? 99 : 0
    const finalPayment = actualMRP + convenienceFee
  return (
    <div className="bag-summary">
      <div className="bag-details-container">
        <div className="price-header">
          PRICE DETAILS ({totalItem} Items){" "}
        </div>
        <div className="price-item">
          <span className="price-item-tag">Total MRP</span>
          <span className="price-item-value">₹{totalMRP}</span>
        </div>
        <div className="price-item">
          <span className="price-item-tag">Discount on MRP</span>
          <span className="price-item-value priceDetail-base-discount">
            -₹{totalDiscount}
          </span>
        </div>
        <div className="price-item">
          <span className="price-item-tag">Convenience Fee</span>
          <span className="price-item-value">₹{convenienceFee}</span>
        </div>
        <hr />
        <div className="price-footer">
          <span className="price-item-tag">Total Amount</span>
          <span className="price-item-value">₹{finalPayment}</span>
        </div>
      </div>
      <button className="btn-place-order">
        <div className="css-xjhrni">PLACE ORDER</div>
      </button>
    </div>
  );
};

export default BagSummary;
