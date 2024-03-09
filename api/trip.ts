import express from "express";
import { conn } from "../dbconn";
// import { TripGetRespone } from "../model/insert";

export const router = express.Router();

// อันแรก
// router.get("/", (req, res) => {
//   res.send("Get in trip.ts");
// });

//อัน 2
// router.get("/:id", (req, res) => {
//     res.send("Get in trip.ts id: " + req.params.id);
//   });

//อัน 3
// router.get("/", (req, res) => {
//     if (req.query.id) {
//       res.send("Get in trip.ts Query id: " + req.query.id);
//     } else {
//       res.send("Get in trip.ts");
//     }
//   });

//อัน 4 ส่งแบบ post -> body -> raw
  // router.post("/", (req, res) => {
  //   let body = req.body; 
  //   res.send("Get in trip.ts body: " + body);
  // });

  //5 
  // router.post("/", (req, res) => {
  //   let body = req.body;
  //   res.status(201);
  //   res.send("Get in trip.ts body: " + JSON.stringify(body));
  //   });

    
  

    // router.get("/", (req, res) => {
    //   conn.query('select * from person', (err, result, fields)=>{
    //     res.json(result);
    //   });
    // });

    router.get("/", (req, res) => {
      conn.query('select * from movie', (err, result, fields)=>{
        res.json(result);
      });
    });


    router.get("/:id", (req, res) => {
      let id = +req.params.id;
      conn.query("select * from person where person_id = ?" , [id], (err, result, fields) => {
      if (err) throw err;
        res.json(result);
      });
    });

    router.get("/search/fields", (req, res) => {
      conn.query(
        "select * from person where (person_id IS NULL OR person_id = ?) OR (name IS NULL OR name like ?)",
        [ req.query.id, "%" + req.query.name + "%"],
        (err, result, fields) => {
        if (err) throw err;
          res.json(result);
        }
      );
    });

    router.post("/", (req, res) => {
      let body = req.body; 
      res.send("Get in trip.ts body: " + JSON.stringify(body));
    });

  