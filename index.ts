import express, { Express, Request, Response } from "express";
import http, { Server } from "http";
import { LLM } from "llama-node";
import { LLamaCpp } from "llama-node/dist/llm/llama-cpp.js";

const app: Express = express();
const server: Server = http.createServer(app);
const PORT: number = 4000;
const llama = new LLM(LLamaCpp);

await llama.load({
  modelPath: "models/Llama-2-13b-hf",
  enableLogging: false,
  nCtx: 1024,
  seed: 0,
  f16Kv: false,
  logitsAll: false,
  vocabOnly: false,
  useMlock: false,
  embedding: false,
  useMmap: true,
  nGpuLayers: 0,
});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.render("index");
});

app.get("/llama2", (req: Request, res: Response) => {
  res.render("llama2");
});

app.post("/llama2", (req: Request, res: Response) => {
  console.log(req.body);
  res.json({ key: "llama2" });
});

server.listen(PORT || 3000, () => {
  console.log(`EJS Template Server Listening On ${PORT}`);
});
