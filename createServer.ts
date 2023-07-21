import express, { Express } from "express";
import http, { Server as sv } from "http";

export const app: Express = express();
export const server: sv = http.createServer(app);
