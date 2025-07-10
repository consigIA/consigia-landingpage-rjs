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
      <p className="text-red-500 text-xs sm:text-sm mt-1">{errors[field]}</p>
    ) : null

  return (
    <div className="min-h-screen bg-slate-900 pt-4 px-4 sm:pt-8 sm:px-6">
      <div className="max-w-4xl mx-auto py-20 sm:py-25">
        <h1 className="text-2xl sm:text-4xl font-bold text-cyan-500 mb-4 text-center">
          Formulário de Parceria
        </h1>
        <p className="text-base sm:text-lg text-slate-300 text-center mb-6 sm:mb-8 px-2">
          Preencha os dados para iniciar sua parceria conosco
        </p>

        {message && (
          <div
            className={`mb-6 text-center text-sm sm:text-base font-medium ${
              statusCode === 200 ? 'text-green-400' : 'text-red-500'
            }`}
          >
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Nome */}
          <div>
            <label
              htmlFor="nome"
              className="block text-white text-sm font-medium mb-2"
            >
              Seu Nome *
            </label>
            <input
              id="nome"
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-3 sm:px-4 text-white text-sm sm:text-base"
              placeholder="Digite seu nome completo"
            />
            {renderError('nome')}
          </div>

          {/* CPF */}
          <div>
            <label
              htmlFor="cpf"
              className="block text-white text-sm font-medium mb-2"
            >
              CPF *
            </label>
            <input
              id="cpf"
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleInputChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-3 sm:px-4 text-white text-sm sm:text-base"
              placeholder="000.000.000-00"
            />
            {renderError('cpf')}
          </div>

          {/* Data de Nascimento */}
          <div>
            <label
              htmlFor="dataNascimento"
              className="block text-white text-sm font-medium mb-2"
            >
              Data de Nascimento *
            </label>
            <div className="relative">
              <input
                id="dataNascimento"
                type="date"
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleInputChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-3 sm:px-4 text-white text-sm sm:text-base"
              />
            </div>
            {renderError('dataNascimento')}
          </div>

          {/* E-mail */}
          <div>
            <label
              htmlFor="email"
              className="block text-white text-sm font-medium mb-2"
            >
              E-mail *
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-3 sm:px-4 text-white text-sm sm:text-base"
              placeholder="seu@email.com"
            />
            {renderError('email')}
          </div>

          {/* Telefone */}
          <div>
            <label
              htmlFor="telefone"
              className="block text-white text-sm font-medium mb-2"
            >
              Telefone
            </label>
            <input
              id="telefone"
              type="tel"
              name="telefone"
              value={formData.telefone}
              onChange={handleInputChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-3 sm:px-4 text-white text-sm sm:text-base"
              placeholder="(00) 0000-0000"
            />
            {renderError('telefone')}
          </div>

          {/* Celular */}
          <div>
            <label
              htmlFor="celular"
              className="block text-white text-sm font-medium mb-2"
            >
              Celular *
            </label>
            <input
              id="celular"
              type="tel"
              name="celular"
              value={formData.celular}
              onChange={handleInputChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-3 sm:px-4 text-white text-sm sm:text-base"
              placeholder="(00) 00000-0000"
            />
            {renderError('celular')}
          </div>

          {/* CNPJ */}
          <div>
            <label
              htmlFor="cnpj"
              className="block text-white text-sm font-medium mb-2"
            >
              CNPJ *
            </label>
            <input
              id="cnpj"
              type="text"
              name="cnpj"
              value={formData.cnpj}
              onChange={handleInputChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-3 sm:px-4 text-white text-sm sm:text-base"
              placeholder="00.000.000/0000-00"
            />
            {renderError('cnpj')}
          </div>

          {/* Razão Social */}
          <div>
            <label
              htmlFor="razaoSocial"
              className="block text-white text-sm font-medium mb-2"
            >
              Razão Social *
            </label>
            <input
              id="razaoSocial"
              type="text"
              name="razaoSocial"
              value={formData.razaoSocial}
              onChange={handleInputChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-3 sm:px-4 text-white text-sm sm:text-base"
              placeholder="Nome da empresa"
            />
            {renderError('razaoSocial')}
          </div>

          {/* Ramo da Empresa */}
          <div>
            <label
              htmlFor="ramoEmpresa"
              className="block text-white text-sm font-medium mb-2"
            >
              Ramo da Empresa *
            </label>
            <div className="relative">
              <select
                id="ramoEmpresa"
                name="ramoEmpresa"
                value={formData.ramoEmpresa}
                onChange={handleInputChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-3 sm:px-4 text-white text-sm sm:text-base appearance-none"
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
              <ChevronDown className="absolute right-3 top-3 w-4 h-4 sm:w-5 sm:h-5 text-slate-400 pointer-events-none" />
            </div>
            {renderError('ramoEmpresa')}
          </div>

          {/* Porte da Empresa */}
          <div>
            <label
              htmlFor="porteEmpresa"
              className="block text-white text-sm font-medium mb-2"
            >
              Porte da Empresa *
            </label>
            <div className="relative">
              <select
                id="porteEmpresa"
                name="porteEmpresa"
                value={formData.porteEmpresa}
                onChange={handleInputChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-3 sm:px-4 text-white text-sm sm:text-base appearance-none"
              >
                <option value="">Selecione o porte</option>
                <option value="mei">MEI</option>
                <option value="micro">Microempresa</option>
                <option value="pequena">Pequena Empresa</option>
                <option value="media">Média Empresa</option>
                <option value="grande">Grande Empresa</option>
              </select>
              <ChevronDown className="absolute right-3 top-3 w-4 h-4 sm:w-5 sm:h-5 text-slate-400 pointer-events-none" />
            </div>
            {renderError('porteEmpresa')}
          </div>
        </div>

        {/* Necessidade */}
        <div className="mt-6">
          <label
            htmlFor="necessidade"
            className="block text-white text-sm font-medium mb-2"
          >
            Qual sua necessidade? *
          </label>
          <textarea
            id="necessidade"
            name="necessidade"
            value={formData.necessidade}
            onChange={handleInputChange}
            rows={4}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-3 sm:px-4 text-white text-sm sm:text-base resize-none"
            placeholder="Descreva sua necessidade e como podemos ajudá-lo..."
          />
          {renderError('necessidade')}
        </div>

        <p className="text-slate-400 text-xs sm:text-sm mt-6 px-2">
          * Todos os campos marcados são obrigatórios
        </p>

        <div className="flex justify-center sm:justify-end mt-6 sm:mt-8">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full sm:w-auto bg-cyan-500 hover:bg-cyan-600 text-blue-950 font-medium px-6 py-3 sm:px-8 rounded-lg flex items-center justify-center space-x-2 text-sm sm:text-base ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <span>{isSubmitting ? 'Enviando...' : 'Enviar'}</span>
            {!isSubmitting && (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default FormularySection
