import mysql from "mysql";

export const conn = mysql.createPool({
  // connectionLimit: 10,
  // host: "localhost",
  // user: "demo",
  // password: "abc123",
  // database: "work5pro",

   host: "sql6.freemysqlhosting.net",
  user: "sql6689818",
  password: "LqPfV95nnJ",
  database: "sql6689818",
});