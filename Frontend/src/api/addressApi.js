import axiosInstance from "./axiosInstance";

/* ================= ADD ADDRESS ================= */
// Backend: POST /api/address
export const addAddressApi = (addressData) => {
  return axiosInstance.post("/address", addressData);
};

/* ================= GET ADDRESSES ================= */
// Backend: GET /api/address
export const getAddressesApi = () => {
  return axiosInstance.get("/address");
};

/* ================= UPDATE ADDRESS ================= */
// Backend: PUT /api/address/:id
export const updateAddressApi = (id, addressData) => {
  return axiosInstance.put(`/address/${id}`, addressData);
};

/* ================= DELETE ADDRESS ================= */
// Backend: DELETE /api/address/:id
export const deleteAddressApi = (id) => {
  return axiosInstance.delete(`/address/${id}`);
};
