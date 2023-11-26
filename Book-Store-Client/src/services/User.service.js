import http from "../helper/http.js";

export const User = {
  async getCurrentUser() {
    const res = await http.get("/user/current");
    return res.data;
  },
  async signIn(username, password) {
    try {
      const res = await http.post("/auth/login", {
        username,
        password,
      });
      return res;
    } catch (e) {
      return e;
    }
  },
  async register(username, email, password, name, phone) {
    try {
      const res = await http.post("/auth/register", {
        username,
        email,
        password,
        name,
        phone,
      });
      return res;
    } catch (e) {
      return e;
    }
  },
  async logout() {
    try {
      const res = await http.get("/logout");
      return res;
    } catch (e) {
      return e;
    }
  },
  async updateInformation(name, email, phone, gender, birthday) {
    try {
      const res = await http.put("/user/update", {
        name,
        email,
        phone,
        gender,
        birthday,
      });
      return res;
    } catch (err) {
      return err;
    }
  },
  async updatePassword(oldPassword, newPassword) {
    try {
      const res = await http.patch("/user/password", {
        oldPassword,
        newPassword,
      });
      return res;
    } catch (err) {
      return err;
    }
  },

  async getUserTotal() {
    const res = await http.get("/user/count");
    return res.data;
  },

  async getAllAccount(query, sort, page) {
    let request = "/user/account?";
    if (query) {
      request = request.concat("query=" + query + "&");
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

  async blockAccount(id) {
    try {
      const res = await http.patch("/user/block/" + id);
      return res;
    } catch (err) {
      return err;
    }
  },
};
