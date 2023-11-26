import http from "../helper/http.js";

export const Location = {
  async getProvince() {
    try {
      const res = await http.get("/location/province");
      return res.data;
    } catch (err) {
      return err.response;
    }
  },
  async getDistrict(provinceName) {
    try {
      const res = await http.get("/location/city/" + provinceName);
      return res.data;
    } catch (err) {
      return err.response;
    }
  },
  async getWard(provinceName, districtName) {
    try {
      const res = await http.get(
        "/location/ward/" + provinceName + "/" + districtName
      );
      return res.data;
    } catch (err) {
      return err.response;
    }
  },

  // async getUserLocation() {
  //   try {
  //     const res = await http.get("/location");
  //     return res.data;
  //   } catch (err) {
  //     return err.response;
  //   }
  // },

  // async getDeliveryMethod() {
  //   try {
  //     const res = await http.get("/delivery");
  //     return res.data;
  //   } catch (err) {
  //     return err.response;
  //   }
  // },

  async getDeliveryMethod(provinceName) {
    try {
      const res = await http.get("/delivery/price/" + provinceName);
      return res.data;
    } catch (err) {
      return err.response;
    }
  },

  async getAllDeliveryMethod() {
    const res = await http.get("/delivery");
    return res.data;
  },

  async deleteDelivery(id) {
    try {
      const res = await http.delete("/delivery/" + id);
      return res;
    } catch (err) {
      return err;
    }
  },

  async restoreDelivery(id) {
    try {
      const res = await http.patch("/delivery/" + id);
      return res;
    } catch (err) {
      return err;
    }
  },

  async createDelivery(method, base, coefficient) {
    try {
      const res = await http.post("/delivery", {
        method,
        base,
        coefficient,
      });
      return res;
    } catch (err) {
      return err;
    }
  },

  async updateDelivery(id, method, base, coefficient) {
    try {
      const res = await http.put("/delivery/" + id, {
        method,
        base,
        coefficient,
      });
      return res;
    } catch (err) {
      return err;
    }
  },
};
