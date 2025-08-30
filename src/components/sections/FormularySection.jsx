import React, { useState, useEffect } from 'react'
import { Calendar, ChevronDown } from 'lucide-react'

// Função para validar CPF
function validateCPF(cpf) {
  cpf = cpf.replace(/[.-]/g, '')
  if (!cpf || cpf.length !== 11 || /^([0-9])\1{10}$/.test(cpf)) return false

  let sum = 0
  for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i)
  let rev = 11 - (sum % 11)
  if (rev === 10 || rev === 11) rev = 0
  if (rev !== parseInt(cpf.charAt(9))) return false

  sum = 0
  for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i)
  rev = 11 - (sum % 11)
  if (rev === 10 || rev === 11) rev = 0
  return rev === parseInt(cpf.charAt(10))
}

// Função para validar CNPJ
function validateCNPJ(cnpj) {
  cnpj = cnpj.replace(/[./-]/g, '')
  if (!cnpj || cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false

  const digits = cnpj.split('').map(Number)

  // Validar primeiro dígito verificador
  let sum = 0
  let weight = 5
  for (let i = 0; i < 12; i++) {
    sum += digits[i] * weight
    weight = weight === 2 ? 9 : weight - 1
  }

  let mod = sum % 11
  let digit = mod < 2 ? 0 : 11 - mod
  if (digit !== digits[12]) return false

  // Validar segundo dígito verificador
  sum = 0
  weight = 6
  for (let i = 0; i < 13; i++) {
    sum += digits[i] * weight
    weight = weight === 2 ? 9 : weight - 1
  }

  mod = sum % 11
  digit = mod < 2 ? 0 : 11 - mod
  return digit === digits[13]
}

// Função para formatar telefone
function formatPhone(value, isMobile = false) {
  value = value.replace(/\D/g, '')

  if (value.length > 11) value = value.substring(0, 11)

  if (isMobile && value.length > 10) {
    return value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }

  if (!isMobile && value.length > 9) {
    return value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  }

  return value
}

function FormularySection() {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    cnpj: '',
    razaoSocial: '',
    ramoEmpresa: '',
    email: '',
    dataNascimento: '',
    porteEmpresa: '',
    telefone: '',
    celular: '',
    necessidade: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusCode, setStatusCode] = useState(null)
  const [message, setMessage] = useState('')

  // Formatar telefones automaticamente
  useEffect(() => {
    if (formData.telefone) {
      const formatted = formatPhone(formData.telefone, false)
      setFormData(prev => ({ ...prev, telefone: formatted }))
    }

    if (formData.celular) {
      const formatted = formatPhone(formData.celular, true)
      setFormData(prev => ({ ...prev, celular: formatted }))
    }
  }, [formData.telefone, formData.celular])

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: null }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setErrors({})
    setMessage('')

    const requiredFields = [
      'nome',
      'cpf',
      'cnpj',
      'razaoSocial',
      'ramoEmpresa',
      'email',
      'dataNascimento',
      'porteEmpresa',
      'celular',
      'necessidade'
    ]

    const newErrors = {}

    // Validação de campos obrigatórios
    requiredFields.forEach(field => {
      if (!formData[field]) newErrors[field] = 'Campo obrigatório'
    })

    // Validações específicas
    if (formData.cpf && !validateCPF(formData.cpf)) {
      newErrors.cpf = 'CPF inválido'
    }

    if (formData.cnpj && !validateCNPJ(formData.cnpj)) {
      newErrors.cnpj = 'CNPJ inválido'
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-mail inválido'
    }

    // Validação simplificada de telefones
    if (formData.telefone && formData.telefone.replace(/\D/g, '').length < 10) {
      newErrors.telefone = 'Telefone inválido (ex: (00) 0000-0000)'
    }

    if (formData.celular && formData.celular.replace(/\D/g, '').length < 11) {
      newErrors.celular = 'Celular inválido (ex: (00) 00000-0000)'
    }

    // Validação de idade mínima (18 anos)
    if (formData.dataNascimento) {
      const birthDate = new Date(formData.dataNascimento)
      const today = new Date()
      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--
      }

      if (age < 18) {
        newErrors.dataNascimento = 'Você deve ter mais de 18 anos'
      }
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors)
      setIsSubmitting(false)
      return
    }

    // Construir FormData
    const dataToSend = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== '') {
        dataToSend.append(key, value)
      }
    })

    try {
      const response = await fetch('https://dev.consigia.com.br/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setStatusCode(200)
        setMessage('Formulário enviado com sucesso!')

        // Resetar formulário
        setFormData({
          nome: '',
          cpf: '',
          cnpj: '',
          razaoSocial: '',
          ramoEmpresa: '',
          email: '',
          dataNascimento: '',
          porteEmpresa: '',
          telefone: '',
          celular: '',
          necessidade: ''
        })

        // Limpar input de arquivo
        const fileInput = document.querySelector('input[type="file"]')
        if (fileInput) fileInput.value = ''
      } else {
        const errorData = await response.json()
        setStatusCode(response.status)
        setMessage(errorData.message || 'Erro ao enviar. Tente novamente.')
      }
    } catch {
      setStatusCode(500)
      setMessage('Erro de conexão com o servidor.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderError = field =>
    errors[field] ? (
      <p className="text-red-400 text-xs sm:text-sm mt-2 font-medium">{errors[field]}</p>
    ) : null

  return (
    <>
      <section className="formulary-section">
        <div className="formulary-container">
          {/* Header */}
          <div className="formulary-header">
            <h1 className="formulary-title">
              Formulário de Parceria
            </h1>
            <p className="formulary-subtitle">
              Preencha os dados para iniciar sua parceria conosco
            </p>
          </div>

          {/* Status Message */}
          {message && (
            <div className={`status-message ${statusCode === 200 ? 'status-message--success' : 'status-message--error'}`}>
              {message}
            </div>
          )}

          {/* Form Container */}
          <div className="form-container">
            <div className="form-grid">
              {/* Nome */}
              <div className="form-field">
                <label htmlFor="nome" className="form-label">
                  Seu Nome *
                </label>
                <input
                  id="nome"
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Digite seu nome completo"
                />
                {renderError('nome')}
              </div>

              {/* CPF */}
              <div className="form-field">
                <label htmlFor="cpf" className="form-label">
                  CPF *
                </label>
                <input
                  id="cpf"
                  type="text"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="000.000.000-00"
                />
                {renderError('cpf')}
              </div>

              {/* Data de Nascimento */}
              <div className="form-field">
                <label htmlFor="dataNascimento" className="form-label">
                  Data de Nascimento *
                </label>
                <input
                  id="dataNascimento"
                  type="date"
                  name="dataNascimento"
                  value={formData.dataNascimento}
                  onChange={handleInputChange}
                  className="form-input"
                />
                {renderError('dataNascimento')}
              </div>

              {/* E-mail */}
              <div className="form-field">
                <label htmlFor="email" className="form-label">
                  E-mail *
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="seu@email.com"
                />
                {renderError('email')}
              </div>

              {/* Telefone */}
              <div className="form-field">
                <label htmlFor="telefone" className="form-label">
                  Telefone
                </label>
                <input
                  id="telefone"
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="(00) 0000-0000"
                />
                {renderError('telefone')}
              </div>

              {/* Celular */}
              <div className="form-field">
                <label htmlFor="celular" className="form-label">
                  Celular *
                </label>
                <input
                  id="celular"
                  type="tel"
                  name="celular"
                  value={formData.celular}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="(00) 00000-0000"
                />
                {renderError('celular')}
              </div>

              {/* CNPJ */}
              <div className="form-field">
                <label htmlFor="cnpj" className="form-label">
                  CNPJ *
                </label>
                <input
                  id="cnpj"
                  type="text"
                  name="cnpj"
                  value={formData.cnpj}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="00.000.000/0000-00"
                />
                {renderError('cnpj')}
              </div>

              {/* Razão Social */}
              <div className="form-field">
                <label htmlFor="razaoSocial" className="form-label">
                  Razão Social *
                </label>
                <input
                  id="razaoSocial"
                  type="text"
                  name="razaoSocial"
                  value={formData.razaoSocial}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Nome da empresa"
                />
                {renderError('razaoSocial')}
              </div>

              {/* Ramo da Empresa */}
              <div className="form-field">
                <label htmlFor="ramoEmpresa" className="form-label">
                  Ramo da Empresa *
                </label>
                <div className="select-wrapper">
                  <select
                    id="ramoEmpresa"
                    name="ramoEmpresa"
                    value={formData.ramoEmpresa}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="">Selecione o ramo</option>
                    <option value="tecnologia">Tecnologia</option>
                    <option value="comercio">Comércio</option>
                    <option value="servicos">Serviços</option>
                    <option value="industria">Indústria</option>
                    <option value="consultoria">Consultoria</option>
                    <option value="saude">Saúde</option>
                    <option value="educacao">Educação</option>
                    <option value="alimentacao">Alimentação</option>
                    <option value="construcao">Construção</option>
                    <option value="transporte">Transporte</option>
                    <option value="financeiro">Financeiro</option>
                    <option value="outros">Outros</option>
                  </select>
                  <ChevronDown className="select-icon" />
                </div>
                {renderError('ramoEmpresa')}
              </div>

              {/* Porte da Empresa */}
              <div className="form-field">
                <label htmlFor="porteEmpresa" className="form-label">
                  Porte da Empresa *
                </label>
                <div className="select-wrapper">
                  <select
                    id="porteEmpresa"
                    name="porteEmpresa"
                    value={formData.porteEmpresa}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="">Selecione o porte</option>
                    <option value="mei">MEI</option>
                    <option value="micro">Microempresa</option>
                    <option value="pequena">Pequena Empresa</option>
                    <option value="media">Média Empresa</option>
                    <option value="grande">Grande Empresa</option>
                  </select>
                  <ChevronDown className="select-icon" />
                </div>
                {renderError('porteEmpresa')}
              </div>
            </div>

            {/* Necessidade - Full Width */}
            <div className="form-field form-field--full">
              <label htmlFor="necessidade" className="form-label">
                Qual sua necessidade? *
              </label>
              <textarea
                id="necessidade"
                name="necessidade"
                value={formData.necessidade}
                onChange={handleInputChange}
                rows={5}
                className="form-textarea"
                placeholder="Descreva sua necessidade e como podemos ajudá-lo..."
              />
              {renderError('necessidade')}
            </div>

            {/* Required Fields Note */}
            <p className="required-note">
              * Todos os campos marcados são obrigatórios
            </p>

            {/* Submit Button */}
            <div className="submit-container">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`submit-button ${isSubmitting ? 'submit-button--loading' : ''}`}
              >
                <span>{isSubmitting ? 'Enviando...' : 'Enviar Formulário'}</span>
                {!isSubmitting && (
                  <svg className="submit-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        
        .formulary-section {
          background: linear-gradient(135deg, #06b6d4 0%, #0891b2 50%, #3b82f6 100%);
          min-height: 100vh;
          padding: 80px 0;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        .formulary-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(ellipse at top left, rgba(34, 211, 238, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at bottom right, rgba(6, 182, 212, 0.06) 0%, transparent 50%),
            url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2306b6d4' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
        }

        .formulary-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 80px 80px;
          position: relative;
          z-index: 1;
        }

        .formulary-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .formulary-title {
          font-size: clamp(2.5rem, 6vw, 3rem);
          font-weight: 900;
          color: #ffffff;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .formulary-subtitle {
          font-size: clamp(1rem, 3vw, 1.125rem);
          color: #ffffff;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
          font-weight: 500;
          opacity: 0.95;
        }

        .status-message {
          text-align: center;
          padding: 16px 24px;
          border-radius: 16px;
          font-weight: 600;
          margin-bottom: 32px;
          border: 1px solid;
        }

        .status-message--success {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
          border-color: rgba(16, 185, 129, 0.2);
        }

        .status-message--error {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          border-color: rgba(239, 68, 68, 0.2);
        }

        .form-container {
          background: white;
          border-radius: 24px;
          border: 1px solid rgba(6, 182, 212, 0.1);
          padding: 48px;
          box-shadow: 
            0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04),
            0 0 0 1px rgba(6, 182, 212, 0.05);
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }

        .form-field {
          display: flex;
          flex-direction: column;
        }

        .form-field--full {
          grid-column: 1 / -1;
          margin-bottom: 24px;
        }

        .form-label {
          display: block;
          color: #1e293b;
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 8px;
          letter-spacing: -0.01em;
        }

        .form-input,
        .form-select,
        .form-textarea {
          width: 100%;
          background: #fafafa;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          padding: 14px 16px;
          font-size: 15px;
          font-weight: 500;
          color: #1e293b;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          font-family: inherit;
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          outline: none;
          border-color: #06b6d4;
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(6, 182, 212, 0.1);
        }

        .form-input::placeholder,
        .form-textarea::placeholder {
          color: #94a3b8;
        }

        .select-wrapper {
          position: relative;
        }

        .form-select {
          appearance: none;
          cursor: pointer;
          padding-right: 44px;
        }

        .select-icon {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          width: 20px;
          height: 20px;
          color: #64748b;
          pointer-events: none;
        }

        .form-textarea {
          resize: vertical;
          min-height: 120px;
          line-height: 1.6;
        }

        .required-note {
          color: #64748b;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 32px;
          text-align: center;
        }

        .submit-container {
          display: flex;
          justify-content: center;
        }

        .submit-button {
          background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
          color: white;
          font-weight: 700;
          font-size: 16px;
          padding: 16px 32px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3);
          min-width: 180px;
          justify-content: center;
        }

        .submit-button:hover:not(.submit-button--loading) {
          background: linear-gradient(135deg, #0891b2 0%, #0e7490 100%);
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(6, 182, 212, 0.4);
        }

        .submit-button--loading {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .submit-arrow {
          width: 16px;
          height: 16px;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .formulary-section {
            padding: 60px 0;
          }

          .formulary-container {
            padding: 0 16px;
          }

          .form-container {
            padding: 32px 24px;
            border-radius: 20px;
          }

          .form-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .form-input,
          .form-select,
          .form-textarea {
            padding: 12px 14px;
            font-size: 16px; /* iOS zoom fix */
          }

          .submit-button {
            width: 100%;
            padding: 14px 24px;
          }
        }

        @media (max-width: 480px) {
          .formulary-header {
            margin-bottom: 32px;
          }

          .form-container {
            padding: 24px 20px;
          }

          .form-grid {
            gap: 16px;
          }
        }
      `}</style>
    </>
  )
}

export default FormularySection