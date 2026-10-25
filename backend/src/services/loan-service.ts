
import type { LoanRequest, BankResult } from "../types/loan.js";
import { simulateBankA } from "../integrations/bank-a.js";
import { simulateBankB } from "../integrations/bank-b.js";

export async function simulateLoan(
  request: LoanRequest,
): Promise<BankResult[]> {
  const results = await Promise.allSettled([
    simulateBankA(request),
    simulateBankB(request),
  ]);

  return results.map((result, index): BankResult => {
    const bankName = index === 0 ? "Banco A" : "Banco B";

    if (result.status === "fulfilled") {
      return result.value;
    }

    return {
      bankName,
      status: "unavailable",
      interestRate: null,
      monthlyInstallment: null,
      totalAmount: null,
      message: "Não foi possível consultar este banco no momento.",
    };
  });
}
