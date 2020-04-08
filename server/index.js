const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");

// Middleware
app.use(cors());
app.use(express.json());

// ------ Routes ------- 

// Insert todo
app.post("/todos", async (req, res) => {
    const { description } = req.body;

    if (description) {
        try {
            const insertTodo = await pool.query(
                "INSERT INTO todo (description) VALUES($1) RETURNING *",
                [description]
            );
    
            res.json(insertTodo.rows[0]);
        }
        catch(e) {
            console.error(e.message);
        }
    }
});

// Retrieve all
app.get("/todos", async (req, res) => {
    try {
        const retrieveTodo = await pool.query(
            "SELECT * FROM todo ORDER BY todo_id;"
        );

        res.json(retrieveTodo.rows);
    }
    catch(e) {
        console.error(e.message);
    }
});

// Retrieve todo
app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const retrieveTodo = await pool.query(
            "SELECT * FROM todo WHERE todo_id = $1;",
            [id]
        );

        res.json(retrieveTodo.rows[0]);
    }
    catch(e) {
        console.error(e.message);
    }
});

// Update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *",
            [description, id]
        );

        res.json("Updated!");
    }
    catch(e) {
        console.error(e.message);
    }
});

// Delete a todo
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query(
            "DELETE from todo WHERE todo_id = $1",
            [id]
        );

        res.json("Deleted!");
    }
    catch(e) {
        console.error(e.message);
    }
});

app.listen(5000, () => {
    console.log("Server has started on port 5000");
})