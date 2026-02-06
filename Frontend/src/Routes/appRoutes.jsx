import {createBrowserRouter} from 'react-router';
import { privateRoute } from './privateRoutes';
import { publicRoutes } from './publicRoutes';


const appRoutes = createBrowserRouter([
...privateRoute,
...publicRoutes,
]);

 

 export default appRoutes;