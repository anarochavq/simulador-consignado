
import { useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

interface BankResult {
  bankName: string
  status: 'approved' | 'rejected' | 'pending' | 'unavailable'
  interestRate: number | null
  monthlyInstallment: number | null
  totalAmount: number | null
  message: string
}

interface SimulationResponse {
  success: boolean
  results: BankResult[]
  message?: string
}

function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  const [salary, setSalary] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [amount, setAmount] = useState('')
  const [installments, setInstallments] = useState('12')

  const [results, setResults] = useState<BankResult[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setError('')
    setResults([])
    setLoading(true)

    const requestData = {
      name,
      email,
      cpf,
      salary: Number(salary),
      employerCnpj: cnpj,
      requestedAmount: Number(amount),
      installments: Number(installments),
    }

    try {
      const response = await fetch('/api/loans/simulate',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        },
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || 'Não foi possível realizar a simulação.',
        )
      }

      const simulation = data as SimulationResponse
      setResults(simulation.results ?? [])
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Erro inesperado ao realizar a simulação.',
      )
    } finally {
      setLoading(false)
    }
  }

  function formatCurrency(value: number | null) {
    if (value === null) return 'Não disponível'

    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  function statusLabel(status: BankResult['status']) {
    const labels = {
      approved: 'Aprovado',
      rejected: 'Reprovado',
      pending: 'Pendente',
      unavailable: 'Indisponível',
    }

    return labels[status]
  }

  return (
    <main className="page">
      <header className="header">
        <div className="brand">
          <span className="brand-icon">C</span>
          <span>
            Consigna<span className="brand-highlight">Fácil</span>
          </span>
        </div>

        <span className="header-label">
          Simulação de empréstimo
        </span>
      </header>

      <section className="intro">
        <span className="eyebrow">
          SIMPLES • RÁPIDO • TRANSPARENTE
        </span>
        <h1>
          Seu próximo passo começa <span>aqui.</span>
        </h1>
        <p>
          Preencha seus dados e compare as condições simuladas
          em diferentes instituições financeiras.
        </p>
      </section>

      <section className="form-card">
        <div className="form-heading">
          <div>
            <h2>Seus dados</h2>
            <p>Preencha os campos para iniciar a simulação.</p>
          </div>
          <span className="step-label">ETAPA 1 DE 1</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="section-label">DADOS PESSOAIS</div>

          <div className="field">
            <label htmlFor="name">Nome completo</label>
            <input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Digite seu nome completo"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="voce@exemplo.com"
              required
            />
          </div>

          <div className="form-grid">
            <div className="field">
              <label htmlFor="cpf">CPF</label>
              <input
                id="cpf"
                value={cpf}
                onChange={(event) => setCpf(event.target.value)}
                placeholder="000.000.000-00"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="salary">Salário mensal (R$)</label>
              <input
                id="salary"
                type="number"
                min="0.01"
                step="0.01"
                value={salary}
                onChange={(event) => setSalary(event.target.value)}
                placeholder="Ex.: 3000"
                required
              />
            </div>
          </div>

          <div className="section-label section-spaced">
            DADOS DO EMPRÉSTIMO
          </div>

          <div className="field">
            <label htmlFor="cnpj">CNPJ do empregador</label>
            <input
              id="cnpj"
              value={cnpj}
              onChange={(event) => setCnpj(event.target.value)}
              placeholder="00.000.000/0000-00"
              required
            />
          </div>

          <div className="form-grid">
            <div className="field">
              <label htmlFor="amount">Valor solicitado (R$)</label>
              <input
                id="amount"
                type="number"
                min="0.01"
                step="0.01"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="Ex.: 5000"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="installments">Número de parcelas</label>
              <select
                id="installments"
                value={installments}
                onChange={(event) => setInstallments(event.target.value)}
              >
                {[6, 12, 18, 24, 36, 48, 60, 72, 84, 96, 120].map(
                  (number) => (
                    <option key={number} value={number}>
                      {number} parcelas
                    </option>
                  ),
                )}
              </select>
            </div>
          </div>

          <div className="notice">
            <span className="notice-icon">i</span>
            <p>
              Simulação fictícia para fins demonstrativos.
              Não representa uma oferta real de crédito.
            </p>
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Simulando...' : 'Simular empréstimo'}
            {!loading && <span>→</span>}
          </button>
        </form>
      </section>

      {error && (
        <section className="results-section" role="alert">
          <h2>Não foi possível concluir</h2>
          <p>{error}</p>
        </section>
      )}

      {results.length > 0 && (
        <section className="results-section">
          <h2>Resultado da simulação</h2>
          <p className="results-description">
            Compare as condições retornadas por cada instituição.
          </p>

          <div className="results-grid">
            {results.map((bank) => (
              <article className="result-card" key={bank.bankName}>
                <div className="result-top">
                  <h3>{bank.bankName}</h3>
                  <span className={`status status-${bank.status}`}>
                    {statusLabel(bank.status)}
                  </span>
                </div>

                <p className="bank-message">{bank.message}</p>

                {bank.status === 'approved' && (
                  <>
                    <p className="result-label">Valor da parcela</p>
                    <p className="result-value">
                      {formatCurrency(bank.monthlyInstallment)}
                    </p>

                    <div className="result-detail">
                      <span>Taxa mensal</span>
                      <strong>
                        {bank.interestRate === null
                          ? 'Não disponível'
                          : `${(bank.interestRate * 100).toLocaleString('pt-BR')}%`}
                      </strong>
                    </div>

                    <div className="result-detail">
                      <span>Total a pagar</span>
                      <strong>{formatCurrency(bank.totalAmount)}</strong>
                    </div>
                  </>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      <footer>
        <p>ConsignaFácil · Projeto demonstrativo</p>
      </footer>
    </main>
  )
}

export default App
