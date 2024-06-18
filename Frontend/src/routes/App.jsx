import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import FetchItems from "../components/FetchItems";
import Spinner from "../components/Spinner";
import { useSelector } from "react-redux";


function App() {
  const fetchStatus = useSelector(store => store.fetchStatus)
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
