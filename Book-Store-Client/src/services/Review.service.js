import http from "../helper/http.js";

export const Review = {
  async createReview(bookId, comment, stars) {
    try {
      const res = await http.post("/rating/" + bookId, {
        comment,
        stars,
      });
      return res;
    } catch (err) {
      return err.response;
    }
  },
};
