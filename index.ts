import express, { Request, Response } from "express";
import { app, server } from "./createServer";
const PORT: Number = 5000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.render("index");
});

server.listen(PORT || 3000, () => {
  console.log(`EJS Template Server Listening On ${PORT}`);
});
