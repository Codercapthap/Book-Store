import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePanel from "./HomePanel";
import BookTable from "./Book/BookTable";
import CategoryTable from "./Category/CategoryTable";
import AccountTable from "./Account/AccountTable";
import DeliveryAndSale from "./DeliveryAndSale";

function Admin() {
  const user = useSelector((state) => state.User.currentUser);
  const [currentPanel, setCurrentPanel] = useState("home");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.role === "ADMIN") {
      navigate("/notfound");
    }
  }, [user]);

  console.log(currentPanel);

  return (
    <>
      {user && user.role === "ADMIN" && (
        <div className="grid grid-cols-5 h-screen">
          <Sidebar
            currentPanel={currentPanel}
            setCurrentPanel={setCurrentPanel}
          ></Sidebar>
          <div className="col-span-4">
            {currentPanel == "home" && <HomePanel></HomePanel>}
            {currentPanel == "book" && <BookTable></BookTable>}
            {currentPanel == "category" && <CategoryTable></CategoryTable>}
            {currentPanel == "account" && <AccountTable></AccountTable>}
            {currentPanel == "other" && <DeliveryAndSale></DeliveryAndSale>}
          </div>
        </div>
      )}
    </>
  );
}

export default Admin;
