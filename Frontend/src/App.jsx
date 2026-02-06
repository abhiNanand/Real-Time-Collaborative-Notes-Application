import "./App.css";
import appRoutes from "./Routes/appRoutes";
import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import { store, persistor } from "./Store/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={appRoutes}></RouterProvider>
        <ToastContainer autoClose={1500} limit={5} />
      </PersistGate>
    </Provider>
  );
}
