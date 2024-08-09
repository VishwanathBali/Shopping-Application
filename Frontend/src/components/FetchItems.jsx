import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { itemsAction } from '../store/itemsSlice'
import { fetchStatusAction } from '../store/fetchStatusSlice'
import axios from 'axios'

const FetchItems = () => {
    const fetchStatus = useSelector(store => store.fetchStatus)
    const dispatch = useDispatch()

    useEffect(() => {
        if (fetchStatus.fetchDone) return

        const controller = new AbortController();
        dispatch(fetchStatusAction.markFetchingStarted())
        axios.get("/api/v1/cart")
        .then((response)=>{
          console.log(response.data.cart)
          dispatch(fetchStatusAction.markFetchDone())
          dispatch(fetchStatusAction.markFetchingFinished())
          dispatch(itemsAction.addInitialItems(response.data.cart))
        })
        return () => {
            controller.abort();
        }

    },[fetchStatus])

  return (
    <>
    </>
  )
}

export default FetchItems