const express = require("express");
const app = express();
const mysql = require("mysql");
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "bBn16",
    databse: "userdatab"
});

app.use(express.json());


app.get("/users", (req,res) => {
    //const id = req.params.id

    db.query(`SELECT * FROM userdatab.users;`, (err, result) => {

        if (err) {
            res.status(400).json(err)
        } else {
            res.status(200).json(result)
        }
    });


});

app.get("/users/:id", (req,res) => {
    const id = req.params.id

    db.query(`SELECT * FROM userdatab.users where id = ${id}`, (err, result) => {

        if (err) {
            res.status(400).json(err)
        } else {
            res.status(200).json(result)
        }
    })
});

app.post("/users", (req,res) => {
    const { name, age, colour } = req.body

   db.query(`INSERT INTO userdatab.users (name, age, colour) VALUES (?, ?, ?)`, 
   [name, age, colour], (err,result) => {
    if (err) {
        res.status(404).json(err)
    } else {
        res.status(200).json(result)
    }

   })
});

app.put("/users/:id", (req,res) => {
    const id = req.params.id
    const updateData = req.body

    db.query(`UPDATE userdatab.users SET ? WHERE id = ${id};`, [updateData],
    (err, result) => {
        if(err) {
            res.status(400).json(err)
        } else {
            return res.status(200).json(result),
            console.log(`updated succesfully`)
        }
    })
});

app.delete("/users/:id", (req,res) => {
    const id = req.params.id
    const updateData = req.body

    db.query(`DELETE FROM userdatab.users WHERE id = ${id}`, 
    [updateData], (err, result) => {

        if(err) {
            res.status(400).json(err)
        } else {
             return res.status(200).json(result),
            console.log(`deleted succesfully`)
        }
    })


});

app.listen (3001, () => {
    console.log(`server connected to 3001`)
});