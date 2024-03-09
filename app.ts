import express from "express";
//เพิ่ม
// import { router as index } from "./api/index";
// import { router as trip } from "./api/trip";

// export const app = express();
//หน้าหลัก
// app.use("/", index);
//หน้าทับ
// app.use("/trip", trip);
// app.use("/", (req, res) => {
//   res.send("Hello World!!!");
// });

//++++++++

import { router as index } from "./api/index";
import { router as trip } from "./api/trip";
import { router as person } from "./api/person";
import { router as movies } from "./api/movies";
import { router as creators } from "./api/creators";
import { router as stars } from "./api/stars";

//เพิ่ม 07 - 04 - Data is undefined
import bodyParser from "body-parser";

export const app = express();
app.use(bodyParser.text());
app.use(bodyParser.json());


app.use(bodyParser.text());
app.use("/", index);
app.use("/trip", trip);
app.use("/person", person);
app.use("/movies", movies);
app.use("/creators", creators);
app.use("/stars", stars);
