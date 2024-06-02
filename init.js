const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("app.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the SQLite database.");
});
// Create tables
db.serialize(() => {
  // Drop the tables if they already exist
  db.run("DROP TABLE IF EXISTS users");
  db.run("DROP TABLE IF EXISTS orders");

  db.run(
    `
        CREATE TABLE products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT NOT NULL,
            quantity INTEGER NOT NULL,
            unitprice INTEGER NOT NULL,
            supplierid INTEGER NOT NULL
        )
    `,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Table 'products' created.");
    }
  );

  db.run(
    `
        CREATE TABLE supplier (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            companyname TEXT NOT NULL
        )
    `,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Table 'suppliers' created.");
    }
  );
});

// Close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Closed the database connection.");
});
