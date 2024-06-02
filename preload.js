const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  getSupplierData: () => ipcRenderer.sendSync("getSupplierData"),
  addSupplierData: (supplierName) =>
    ipcRenderer.sendSync("addSupplierData", supplierName),
  deleteSupplier: (id) => ipcRenderer.sendSync("deleteSupplier", id),
  updateSupplier: ({ id, companyname }) =>
    ipcRenderer.sendSync("updateSupplier", { id, companyname }),
  addProductData: (data) => ipcRenderer.sendSync("addProductData", data),
  getProductData: () => ipcRenderer.sendSync("getProductData"),
  deleteProductData: (id) => ipcRenderer.sendSync("deleteProductData", id),
  getStatics: () => ipcRenderer.sendSync("getStatics"),
});
