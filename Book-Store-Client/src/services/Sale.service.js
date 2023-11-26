import http from "../helper/http.js";

export const Sale = {
  async getCurrentSale() {
    try {
      const res = await http.get("/sale?active=true");
      return res.data;
    } catch (err) {
      return err.response;
    }
  },

  async getAllSale(page) {
    let request = "/sale/admin?";
    if (page) {
      request = request.concat("page=" + page + "&");
    }
    const res = await http.get(request);
    return res.data;
  },

  async endSale(id) {
    try {
      const res = await http.delete("/sale/" + id);
      return res;
    } catch (err) {
      return err;
    }
  },

  async createSale(categoryId, percent) {
    try {
      const res = await http.post("/sale", {
        category: categoryId,
        percent,
      });
      return res;
    } catch (err) {
      return err;
    }
  },

  async updateSale(id, categoryId, percent) {
    try {
      const res = await http.put("/sale/" + id, {
        category: categoryId,
        percent,
      });
      return res;
    } catch (err) {
      return err;
    }
  },
};
