const express = require("express");
const pool = require("./db");

const app = express();
app.use(express.json());


app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date()}`);
  next();
});


app.get("/tasks", async (req, res) => {
  const result = await pool.query("SELECT * FROM tasks");
  res.json(result.rows);
});


app.get("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("SELECT * FROM tasks WHERE id=$1", [id]);

  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Task tidak ditemukan" });
  }

  res.json(result.rows[0]);
});


app.post("/tasks", async (req, res) => {
  const { title, description } = req.body;


  if (!title || title.trim() === "") {
    return res.status(400).json({ message: "Title tidak boleh kosong" });
  }

  const result = await pool.query(
    "INSERT INTO tasks (title, description) VALUES ($1,$2) RETURNING *",
    [title, description]
  );

  res.json(result.rows[0]);
});


app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, is_completed } = req.body;

  const check = await pool.query("SELECT * FROM tasks WHERE id=$1", [id]);

  if (check.rows.length === 0) {
    return res.status(404).json({ message: "Task tidak ditemukan" });
  }

  const result = await pool.query(
    "UPDATE tasks SET title=$1, description=$2, is_completed=$3 WHERE id=$4 RETURNING *",
    [title, description, is_completed, id]
  );

  res.json(result.rows[0]);
});


app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;

  const check = await pool.query("SELECT * FROM tasks WHERE id=$1", [id]);

  if (check.rows.length === 0) {
    return res.status(404).json({ message: "Task tidak ditemukan" });
  }

  await pool.query("DELETE FROM tasks WHERE id=$1", [id]);

  res.json({ message: "Task berhasil dihapus" });
});

app.get("/", (req, res) => {
  res.send("API Task Manager berjalan");
});

app.listen(3000, () => {
  console.log("Server jalan di http://localhost:3000");
});