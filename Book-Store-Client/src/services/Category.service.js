import http from "../helper/http.js";

export const Category = {
  async getAllCategory() {
    const res = await http.get("/category/");
    return res.data;
  },
  async getAllCategoryAdmin() {
    const res = await http.get("/category/admin");
    return res.data;
  },
  async getAllParentCategory() {
    const res = await http.get("/category/parent");
    return res.data;
  },
  async getAllParentCategoryAdmin() {
    const res = await http.get("/category/admin/parent");
    return res.data;
  },
  async getSubCategory() {
    const res = await http.get("/category/sub");
    return res.data;
  },
  async getSubCategoryById(id) {
    const res = await http.get("/category/sub/" + id);
    return res.data;
  },
  async deleteCategoryById(id) {
    try {
      const res = await http.delete("category/" + id);
      return res;
    } catch (err) {
      return err;
    }
  },
  async restoreCategoryById(id) {
    try {
      const res = await http.patch("category/restore/" + id);
      return res;
    } catch (err) {
      return err;
    }
  },
  async createCategory(name, image, parent) {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      if (Object.keys(parent).length === 0 || parent.name === "None") {
        formData.append("parent", "");
      } else formData.append("parent", parent.id);
      const res = await http.post("category", formData);
      return res;
    } catch (err) {
      return err;
    }
  },

  async changeImage(id, image) {
    try {
      const formData = new FormData();
      formData.append("image", image);
      const res = await http.patch("category/image/" + id, formData);
      return res;
    } catch (err) {
      return err;
    }
  },

  async updateCategory(id, name, parent) {
    try {
      if (parent) {
        const res = await http.put("category/" + id, {
          name,
          parent,
        });
        return res;
      } else {
        const res = await http.put("category/" + id, {
          name,
        });
        return res;
      }
    } catch (err) {
      return err;
    }
  },
};
