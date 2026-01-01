import express from "express";
import cors from "cors";
import pool from "./db/index.js";
import activityRoutes from "./routes/activityRoutes.js";


  

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
  }));
  app.use(express.json());

  
app.use(express.json());
app.use(activityRoutes);

//borrow a connection from pool from container
pool.query("SELECT NOW()")
    .then(res => console.log("DB time:", res.rows[0]))
    .catch(err => console.error(err));

app.get("/health", (req, res) => {
    res.json({status: "ok" });
});

export default app;