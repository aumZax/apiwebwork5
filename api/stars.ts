import express from "express";
import { conn } from "../dbconn";
import { StarsXXX } from "../model/insert";
import  mysql  from 'mysql';

export const router = express.Router();


router.get("/", (req, res) => {
    conn.query('select * from stars', (err, result, fields)=>{
      res.json(result);
    });
  });

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

router.get("/:id", (req, res) => {
    let id = +req.params.id;
    conn.query("select * from stars where stars_id = ?" , [id], (err, result, fields) => {
    if (err) throw err;
      res.json(result);
    });
  });

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  router.get("/search/fields", (req, res) => {
    conn.query(
      "select * from stars where (stars_id IS NULL OR stars_id = ?) OR (name IS NULL OR name like ?)",
      [ req.query.id, "%" + req.query.name + "%"],
      (err, result, fields) => {
      if (err) throw err;
        res.json(result);
      }
    );
  });

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

router.post("/", (req, res) => {
  let stars: StarsXXX = req.body;
  let sql =
  "INSERT INTO `stars`(`person_id`, `movie_id`, `type`) VALUES (?,?,?)";
  sql = mysql.format(sql, [

    stars.person_id,
    stars.movie_id,
    stars.type,



  ]);
  conn.query(sql, (err, result) => {
    if (err) throw err;
    res
      .status(201)
      .json({ affected_row: result.affectedRows, movies_id: result.insertId });
  });
});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


router.delete("/:id", (req, res) => {
    let id = +req.params.id;
    conn.query("delete from stars where stars_id = ?", [id], (err, result) => {
       if (err) throw err;
       res
         .status(200)
         .json({ affected_row: result.affectedRows });
    });
  });