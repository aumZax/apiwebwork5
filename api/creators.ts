import express from "express";
import { conn } from "../dbconn";
import { CreatorsXXX } from "../model/insert";
import  mysql  from 'mysql';

export const router = express.Router();


router.get("/", (req, res) => {
    conn.query('select * from creators', (err, result, fields)=>{
      res.json(result);
    });
  });

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

router.get("/:id", (req, res) => {
    let id = +req.params.id;
    conn.query("select * from creators where creators_id = ?" , [id], (err, result, fields) => {
    if (err) throw err;
      res.json(result);
    });
  });

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  router.get("/search/fields", (req, res) => {
    conn.query(
      "select * from creators where (creators_id IS NULL OR creators_id = ?) OR (name IS NULL OR name like ?)",
      [ req.query.id, "%" + req.query.name + "%"],
      (err, result, fields) => {
      if (err) throw err;
        res.json(result);
      }
    );
  });

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

router.post("/", (req, res) => {
  let creators: CreatorsXXX = req.body;
  let sql =
  "INSERT INTO `creators`( `movie_id`, `person_id`, `type`, `name`) VALUES (?,?,?,?)";
  sql = mysql.format(sql, [

    creators.movie_id,
    creators.person_id,
    creators.type,
    creators.name,



  ]);
  conn.query(sql, (err, result) => {
    if (err) throw err;
    res
      .status(201)
      .json({ affected_row: result.affectedRows, creators_id: result.insertId });
  });
});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


router.delete("/:id", (req, res) => {
    let id = +req.params.id;
    conn.query("delete from creators where creators_id = ?", [id], (err, result) => {
       if (err) throw err;
       res
         .status(200)
         .json({ affected_row: result.affectedRows });
    });
  });