
export interface LoanRequest {
  name: string;
  email: string;
  cpf: string;
  salary: number;
  employerCnpj: string;
  requestedAmount: number;
  installments: number;
}

export type BankStatus =
  | "approved"
  | "rejected"
  | "pending"
  | "unavailable";

export interface BankResult {
  bankName: string;
  status: BankStatus;
  interestRate: number | null;
  monthlyInstallment: number | null;
  totalAmount: number | null;
  message: string;
}
