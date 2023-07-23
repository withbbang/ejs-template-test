import express, { Express, Request, Response } from "express";
import http, { Server } from "http";
import { LLM } from "llama-node";
import { LLamaCpp } from "llama-node/dist/llm/llama-cpp.js";

const app: Express = express();
const server: Server = http.createServer(app);
const PORT: number = 4000;
const llama = new LLM(LLamaCpp);

await llama.load({
  modelPath: "models/Llama-2-13B-chat-GGML/llama-2-13b-chat.ggmlv3.q4_1.bin",
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

app.post("/llama2", async (req: Request, res: Response) => {
  const { value } = req.body;

  res.setHeader("Transfer-Encoding", "chunked");

  const options = {
    prompt: value,
    nThreads: 2,
    nTokPredict: 1024,
    topK: 40,
    topP: 0.1,
    temp: 0.3,
    repeatPenalty: 1,
  };

  await llama.createCompletion(options, (response) => {
    res.write(response.token);
  });

  res.end();
});

server.listen(PORT || 3000, () => {
  console.log(`EJS Template Server Listening On ${PORT}`);
});
