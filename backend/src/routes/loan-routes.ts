import { Router } from "express";
import type { LoanRequest } from "../types/loan.js";
import { simulateLoan } from "../services/loan-service.js";

const loanRouter = Router();

loanRouter.post("/simulate", async (req, res) => {
  const request = req.body as LoanRequest;

  // Verifica se o nome é válido.
  if (
    typeof request?.name !== "string" ||
    request.name.trim() === "" ||

    // Verifica o formato do e-mail.
    typeof request.email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(request.email) ||

    // Verifica o CPF, aceitando números com ou sem pontuação.
    typeof request.cpf !== "string" ||
    !/^\d{11}$/.test(request.cpf.replace(/\D/g, "")) ||

    // Verifica o salário.
    typeof request.salary !== "number" ||
    !Number.isFinite(request.salary) ||
    request.salary <= 0 ||

    // Verifica o CNPJ, aceitando números com ou sem pontuação.
    typeof request.employerCnpj !== "string" ||
    !/^\d{14}$/.test(request.employerCnpj.replace(/\D/g, "")) ||

    // Verifica o valor solicitado.
    typeof request.requestedAmount !== "number" ||
    !Number.isFinite(request.requestedAmount) ||
    request.requestedAmount <= 0 ||

    // Verifica o número de parcelas.
    !Number.isInteger(request.installments) ||
    request.installments < 1 ||
    request.installments > 120
  ) {
    res.status(400).json({
      success: false,
      message: "Dados inválidos. Confira os campos enviados.",
    });
    return;
  }

  try {
    const results = await simulateLoan(request);

    res.status(200).json({
      success: true,
      results,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Erro interno ao realizar a simulação.",
    });
  }
});

export default loanRouter;
