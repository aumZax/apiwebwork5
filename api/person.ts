import express from "express";
import { conn } from "../dbconn";
import { PersonXXX } from "../model/insert";
import  mysql  from 'mysql';

export const router = express.Router();


router.get("/", (req, res) => {
    conn.query('select * from person', (err, result, fields)=>{
      res.json(result);
    });
  });

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

router.get("/:id", (req, res) => {
    let id = +req.params.id;
    conn.query("select * from person where person_id = ?" , [id], (err, result, fields) => {
    if (err) throw err;
      res.json(result);
    });
  });

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

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

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  router.post("/", (req, res) => {
    let person: PersonXXX = req.body;
    let sql =
    "INSERT INTO `person`( `name`, `personal`, `img_person`, `birthdate`) VALUES (?,?,?,?)";
    //   "INSERT INTO `person`(`name`, `birthdate`, `personal`, `img_person`) VALUES (?,?,?,?)";
    sql = mysql.format(sql, [
      person.name,
      person.personal,
      person.img_person,
      person.birthdate,

    ]);
    conn.query(sql, (err, result) => {
      if (err) throw err;
      res
        .status(201)
        .json({ affected_row: result.affectedRows, person_id: result.insertId });
    });
  });

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


  
  router.delete("/:id", (req, res) => {
    let id = +req.params.id;
    conn.query("delete from person where person_id = ?", [id], (err, result) => {
       if (err) throw err;
       res
         .status(200)
         .json({ affected_row: result.affectedRows });
    });
  });