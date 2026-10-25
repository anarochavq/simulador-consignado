
import express from "express";
import cors from "cors";
import loanRouter from "./routes/loan-routes.js";

const app = express();
const PORT = 3000;

// Permite receber requisições do frontend.
app.use(express.json());
app.use("/api/loans", loanRouter);
// Permite interpretar requisições com dados JSON.
app.use(express.json());

// Rota para verificar se a API está funcionando.
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    message: "API do Simulador de Consignado funcionando!",
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
