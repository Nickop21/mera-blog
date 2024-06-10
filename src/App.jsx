import { useEffect, useState } from "react";

import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/authSlice";
import authservice from "./appwrite/auth";
import {Header} from './components/index'

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authservice
      .getCurrentUse()
      .then((userdata) => {
        if (userdata) {
          dispatch(login(userdata));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
   <>
   <h1>smdc</h1>
   {/* <Header/> */}
   {
    
    // !loading && (<div className="min-h-screen">Loading......</div>)
   }
   </>
  );
}

export default App;
