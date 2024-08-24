const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3308,
  user: "root",
  database: "db.depi",
});

connection.connect();

connection.query("SELECT * FROM usuarios", function (err, rows, fields) {
  if (err) throw err;
  console.log("La solucion es:", rows[0].nombre);
});

connection.end();
