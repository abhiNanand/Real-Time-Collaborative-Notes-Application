import Home from "../Components/Home";
import {Navigate,Outlet} from 'react-router';
import { useSelector } from "react-redux";
import PublicNote from "../Components/PublicNote";

const PrivateRoute = () => {
 const token = useSelector((state)=>state.auth.token);
  const isLoggedIn = Boolean(token);

 return isLoggedIn? <Outlet/>:<Navigate to="/login"/>
}

export const privateRoute = [
  {
    element:<PrivateRoute/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      
    ]
  }
]