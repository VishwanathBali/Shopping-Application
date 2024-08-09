import { Outlet,useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import FetchItems from "../components/FetchItems";
import Spinner from "../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from '../store/userSlice'
import { useEffect } from "react";

function App() {
  const fetchStatus = useSelector(store => store.fetchStatus)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(()=>{
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/v1/user/protected', {
          method: 'GET',
          credentials: 'include'
        });
        const data = await response.json();
        
        dispatch(userAction.setUser(data.user));
        if(data.user){
          console.log('access Token data:', data.user);
          navigate('/');
        }
        else{
          navigate('/login')
        }
      } catch (error) {
        dispatch(userAction.logout());
        navigate('/login');
      }
    };

    checkAuth();
  },[dispatch,navigate])
  return (
    <>
      <Header />
      <FetchItems/>
      {fetchStatus.currentlyFetching ? <Spinner/> : <Outlet/>}
      <Footer/>
    </>
  );
}

export default App;
