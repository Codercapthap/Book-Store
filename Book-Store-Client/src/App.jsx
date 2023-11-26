import "./App.css";
import Home from "./pages/Home/Home.jsx";
import Book from "./pages/Book/Book.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Search from "./pages/Search.jsx";
import Category from "./pages/Category.jsx";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./pages/NotFound.jsx";
import CheckOut from "./pages/CheckOut/CheckOut.jsx";
import Order from "./pages/Order/Order.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";
import TestTable from "./pages/TestTable.jsx";
import Favourite from "./pages/Favourite/Favourite.jsx";
import Admin from "./pages/Admin/Admin.jsx";

const router = createBrowserRouter([
  { path: "/", Component: Home },
  { path: "/book/:id", Component: Book },
  { path: "/cart", Component: Cart },
  { path: "/search", Component: Search },
  { path: "/category/:id", Component: Category },
  { path: "/checkout", Component: CheckOut },
  { path: "/order", Component: Order },
  { path: "/order/success", Component: OrderSuccess },
  { path: "/favourites", Component: Favourite },
  { path: "/admin", Component: Admin },
  { path: "/test", Component: TestTable },
  { path: "*", Component: NotFound },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </>
  );
}

export default App;
