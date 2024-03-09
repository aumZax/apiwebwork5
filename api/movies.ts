import express from "express";
import { conn } from "../dbconn";
import { MoiveXXX } from "../model/insert";
import  mysql  from 'mysql';

export const router = express.Router();


router.get("/", (req, res) => {
    conn.query('select * from movies', (err, result, fields)=>{
      res.json(result);
    });
  });

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

router.get("/id/:id", (req, res) => {
    let id = +req.params.id;
    conn.query("select * from movies where movie_id = ?" , [id], (err, result, fields) => {
    if (err) throw err;
      res.json(result);
    });
  });

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  router.get("/:title", (req, res) => {
    const title = "%" + req.params.title + "%";

    let query1 = "SELECT * FROM movies WHERE title LIKE ?";
    let query2 = "SELECT DISTINCT stars.type as stars_type, person.name as stars_name FROM stars JOIN person ON stars.person_id = person.person_id JOIN movies ON stars.movie_id = movies.movie_id WHERE movies.title LIKE ?";
    let query3 = "SELECT DISTINCT creators.type as creators_type, creators.name as creators_name FROM creators JOIN person ON creators.person_id = person.person_id JOIN movies ON creators.movie_id = movies.movie_id WHERE movies.title LIKE ?";

    let results : any= {};

    conn.query(query1, [title], (err, result1) => {
        if (err) {
            console.error(err);
            return res.status(400).json(err);
        }
        results.movies = result1;

        conn.query(query2, [title], (err, result2) => {
            if (err) {
                console.error(err);
                return res.status(400).json(err);
            }
            results.stars = result2;

            conn.query(query3, [title], (err, result3) => {
                if (err) {
                    console.error(err);
                    return res.status(400).json(err);
                }
                results.creators = result3;

                res.json(results);
            });
        });
    });
});

  

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

router.post("/", (req, res) => {
  let movies: MoiveXXX = req.body;
  let sql =
  "INSERT INTO `movies`(`title`, `plot`, `img_movie`, `rating`, `genre`) VALUES (?,?,?,?,?)";
  sql = mysql.format(sql, [
    movies.title,
    movies.plot,
    movies.img_movie,
    movies.rating,
    movies.genre,

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
  conn.query("delete from movies where movie_id = ?", [id], (err, result) => {
     if (err) throw err;
     res
       .status(200)
       .json({ affected_row: result.affectedRows });
  });
});