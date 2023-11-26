import http from "../helper/http.js";

export const Favourite = {
  async getAllFavourites(page) {
    const res = await http.get("/favourite?page=" + page);
    return res.data;
  },
};
