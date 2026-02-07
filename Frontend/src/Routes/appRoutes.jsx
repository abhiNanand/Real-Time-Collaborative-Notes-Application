import {createBrowserRouter} from 'react-router';
import { privateRoute } from './privateRoutes';
import { publicRoutes } from './publicRoutes';
import { sharedRoutes } from './sharedRoutes';


const appRoutes = createBrowserRouter([
...privateRoute,
...publicRoutes,
...sharedRoutes,
]);

 

 export default appRoutes;