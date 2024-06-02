const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { Database } = require("./app/lib/Database");
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("./app/build/index.html");
};

app.whenReady().then(() => {
  createWindow();
  ipcMain.on("getSupplierData", async (event, arg) => {
    const db = new Database();
    const data = await db.getData("supplier");
    db.closeConnection();

    event.returnValue = data;
  });
  ipcMain.on("addSupplierData", async (event, arg) => {
    const db = new Database();
    const data = await db.addSupplier(arg);
    db.closeConnection();
    event.returnValue = data;
  });
  ipcMain.on("deleteSupplier", async (event, arg) => {
    const db = new Database();
    const data = await db.DeleteSupplir(arg);
    db.closeConnection();
    event.returnValue = data;
  });
  ipcMain.on("updateSupplier", async (event, arg) => {
    const { id, companyname } = arg;
    const db = new Database();
    const data = await db.UpdateSupplier({ id, companyName: companyname });
    db.closeConnection();
    event.returnValue = data;
  });
  ipcMain.on("addProductData", async (event, arg) => {
    console.log(arg);
    const db = new Database();
    const data = await db.addProduct(arg);
    db.closeConnection();
    event.returnValue = data;
  });
  ipcMain.on("getProductData", async (event, arg) => {
    const db = new Database();
    const data = await db.getData("products");
    db.closeConnection();

    event.returnValue = data;
  });
  ipcMain.on("deleteProductData", async (event, arg) => {
    const db = new Database();
    const data = await db.deleteProduc(arg);
    db.closeConnection();

    event.returnValue = data;
  });
  ipcMain.on("getStatics", async (event, arg) => {
    const db = new Database();
    const data = await db.getStatics(arg);
    db.closeConnection();

    event.returnValue = data;
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
