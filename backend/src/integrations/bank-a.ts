
import type { LoanRequest, BankResult } from "../types/loan.js";

export async function simulateBankA(
  request: LoanRequest,
): Promise<BankResult> {
  // Simula o tempo de resposta de uma API externa.
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Regra fictícia de avaliação do Banco A.
  if (request.salary < 1800) {
    return {
      bankName: "Banco A",
      status: "rejected",
      interestRate: null,
      monthlyInstallment: null,
      totalAmount: null,
      message: "Renda abaixo do mínimo exigido pelo banco.",
    };
  }

  // Taxa fictícia de juros: 1,8% ao mês.
  const interestRate = 0.018;
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
    bankName: "Banco A",
    status: "approved",
    interestRate,
    monthlyInstallment,
    totalAmount,
    message: "Solicitação aprovada na simulação fictícia.",
  };
}
