import http from "../helper/http.js";
import { setContentType } from "../helper/http.js";

export const Book = {
  async getBookById(id) {
    const res = await http.get("/book/" + id);
    return res.data;
  },
  async getRatingByBookId(bookId, page) {
    const res = await http.get("/rating/" + bookId + "?page=" + page);
    return res.data;
  },
  async getRatingStatByBookId(bookId) {
    const res = await http.get("/rating/stat/" + bookId);
    return res.data;
  },
  async getBookByCategoryId(categoryId, sort, page) {
    let request = "/book/category/" + categoryId + "?sort=" + sort;
    if (page) {
      request = request.concat("&page=" + page);
    }
    const res = await http.get(request);
    return res.data;
  },
  async getAllBook(query, sort, page, pageSize) {
    let request = "/book?";
    if (query) {
      request = request.concat("title=" + query + "&");
    }
    if (pageSize) {
      request = request.concat("pageSize=" + pageSize + "&");
    }
    if (sort) {
      request = request.concat("sort=" + sort + "&");
    }
    if (page) {
      request = request.concat("page=" + page + "&");
    }
    const res = await http.get(request);
    return res.data;
  },
  async getAllBookAdmin(query, sort, page, pageSize) {
    let request = "/book/admin?";
    if (query) {
      request = request.concat("title=" + query + "&");
    }
    if (pageSize) {
      request = request.concat("pageSize=" + pageSize + "&");
    }
    if (sort) {
      request = request.concat("sort=" + sort + "&");
    }
    if (page) {
      request = request.concat("page=" + page + "&");
    }
    const res = await http.get(request);
    return res.data;
  },
  async isInWishList(bookId) {
    const res = await http.get("/book/wishlist/" + bookId);
    return res.data;
  },

  async addToFavourite(bookId) {
    try {
      const res = await http.post("/favourite/", {
        bookId,
      });
      return res;
    } catch (err) {
      return err;
    }
  },

  async removeFromFavourite(bookId) {
    try {
      const res = await http.delete("/favourite/" + bookId);
      return res;
    } catch (err) {
      return err;
    }
  },

  async getBookTotal() {
    const res = await http.get("/book/count");
    return res.data;
  },

  async createBook(title, description, category, price, author, images) {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("author", author);
      images.forEach((image) => {
        formData.append("images", image);
      });
      // setContentType("multipart/form-data");
      const res = await http.post("/book", formData);
      // setContentType("application/json");
      return res;
    } catch (e) {
      return e;
    }
  },

  async updateBook(id, title, description, category, price, author) {
    try {
      // setContentType("multipart/form-data");
      const res = await http.put("/book/" + id, {
        title,
        description,
        category,
        price,
        author,
      });
      // setContentType("application/json");
      return res;
    } catch (e) {
      return e;
    }
  },

  async deleteBook(id) {
    try {
      const res = await http.delete("/book/" + id);
      return res;
    } catch (err) {
      return err;
    }
  },

  async restoreBook(id) {
    try {
      const res = await http.patch("/book/" + id);
      return res;
    } catch (err) {
      return err;
    }
  },

  async addImage(id, image) {
    try {
      const formData = new FormData();
      formData.append("images", image);
      const res = await http.post("/image/" + id, formData);
      return res;
    } catch (err) {
      return err;
    }
  },

  async deleteImage(imageId) {
    try {
      const res = await http.delete("/image/" + imageId);
      return res;
    } catch (err) {
      return err;
    }
  },
};
