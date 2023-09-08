import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { getUser } from "./features/auth/authSlice";
import { auth } from "./firebase/firebase.config";
import routes from "./routes/routes";


function App() {

  const dispatch = useDispatch()

  useEffect(()=>{
    onAuthStateChanged(auth, (value)=>{
      if(value){
        dispatch(getUser(value.email))
      }
    })
  },[])

  return (
    <>
      <Toaster/>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
