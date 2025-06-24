import express from "express";
import { prismaClient } from "@repo/db/client";

const app = express();

app.use(express.json());

app.get("/users", async(req, res) => {
  const data = await prismaClient.user.findMany()
  res.json({data})
})

app.post("/user", async (req, res) => {
  const username = Math.random().toString();
  const password = Math.random().toString();
  
  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return
  }

  const response = await prismaClient.user.create({
    data: {
      username,
      password
    }
  })
  res.json({response})
})

app.listen(8080);