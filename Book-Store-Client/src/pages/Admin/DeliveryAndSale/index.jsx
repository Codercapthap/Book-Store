import { useEffect } from "react";
import DeliveryTable from "./DeliveryTable";
import { Sale } from "../../../services/Sale.service";
import SaleTable from "./SaleTable";

function index() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-2/3 mb-4">
        <DeliveryTable></DeliveryTable>
      </div>
      <div className="w-2/3">
        <SaleTable></SaleTable>
      </div>
    </div>
  );
}

export default index;
