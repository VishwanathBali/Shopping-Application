import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bagAction } from '../store/bagSlice'

const HomeItem = ({item}) => {
  console.log(item)
  const bag = useSelector(store => store.bag)
  const itemFound = bag.indexOf(item._id)>=0
  const dispatch = useDispatch()

  const handleAdd = () => {
    dispatch(bagAction.addToBag(item._id))
  }

  const handleRemove = () => {
    dispatch(bagAction.removeFromBag(item._id))
  }
  return (
    <div className="item-container">
      <img className="item-image" src={item.product_image} alt="item image"/>
      <div className="rating">
          {item.rating.stars} ⭐ | {item.rating.count}
      </div>
      <div className="company-name">{item.company}</div>
      <div className="item-name">{item.item_name}</div>
      <div className="price">
          <span className="current-price">Rs {item.current_price}</span>
          <span className="original-price">Rs {item.original_price}</span>
          <span className="discount">({item.discount_percentage}% OFF)</span>
      </div>
      {itemFound ? <button type="button" className="btn btn-danger btn-add-bag" onClick={handleRemove}>Remove</button>
      : <button type="button" className="btn btn-success btn-add-bag" onClick={handleAdd}>Add to Bag</button>}
      
      
    </div>
  )
}

export default HomeItem