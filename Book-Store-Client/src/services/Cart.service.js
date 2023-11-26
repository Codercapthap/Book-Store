import http from "../helper/http.js";

export const Cart = {
  async addBookToCart(bookId, quantity) {
    try {
      const res = await http.post("/cart/" + bookId, {
        quantity,
      });
      return res;
    } catch (err) {
      return err;
    }
  },
  async getCart() {
    try {
      const res = await http.get("/cart");
      return res.data;
    } catch (err) {
      return err;
    }
  },
  async modifyQuantityCart(bookId, count) {
    try {
      const res = await http.put("/cart/" + bookId, {
        quantity: count,
      });
      return res;
    } catch (err) {
      return err;
    }
  },
};
