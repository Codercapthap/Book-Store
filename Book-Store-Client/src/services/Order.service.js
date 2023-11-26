import http from "../helper/http.js";

export const Order = {
  async order(deliveryId, ward, city, province, address, cartInfoBookList) {
    try {
      const res = await http.post("/order", {
        delivery: deliveryId,
        ward,
        city,
        province,
        address,
        cartInfoBookList,
      });
      // console.log(deliveryId, ward, city, province, address, cartInfoBookList);
      return res;
    } catch (err) {
      return err;
    }
  },

  async getOrder(page) {
    try {
      const res = await http.get("/order?page=" + page);
      return res.data;
    } catch (err) {
      return err;
    }
  },

  async getOrderTotal() {
    const res = await http.get("/order/count");
    return res.data;
  },
};
