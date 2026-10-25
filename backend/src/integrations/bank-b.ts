
import type { LoanRequest, BankResult } from "../types/loan.js";

export async function simulateBankB(
  request: LoanRequest,
): Promise<BankResult> {
  // Simula um tempo de resposta diferente do Banco A.
  await new Promise((resolve) => setTimeout(resolve, 1200));

  // Regra fictícia de avaliação do Banco B.
  if (request.salary < 2500) {
    return {
      bankName: "Banco B",
      status: "rejected",
      interestRate: null,
      monthlyInstallment: null,
      totalAmount: null,
      message: "Renda abaixo do mínimo exigido pelo banco.",
    };
  }

  // Taxa fictícia de juros: 2,1% ao mês.
  const interestRate = 0.021;
  const installments = request.installments;
  const amount = request.requestedAmount;

  // Calcula a parcela fixa usando juros compostos.
  const calculatedInstallment =
    (amount *
      interestRate *
      Math.pow(1 + interestRate, installments)) /
    (Math.pow(1 + interestRate, installments) - 1);

  // Arredonda a parcela para duas casas decimais.
  const monthlyInstallment = Number(
    calculatedInstallment.toFixed(2),
  );

  // Calcula o total usando a parcela exibida.
  const totalAmount = Number(
    (monthlyInstallment * installments).toFixed(2),
  );

  return {
    bankName: "Banco B",
    status: "approved",
    interestRate,
    monthlyInstallment,
    totalAmount,
    message: "Solicitação aprovada na simulação fictícia.",
  };
}
