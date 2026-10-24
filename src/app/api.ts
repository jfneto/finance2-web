import axios from 'axios'

const apiUrl = import.meta.env.VITE_FINANCE_API_URL

const api = axios.create({
  baseURL: apiUrl,
  timeout: 20000,
})

// Identificadores para ejetar interceptors existentes
let requestInterceptorId: number
let responseInterceptorId: number

// Função para configurar os interceptors com acesso ao contexto de autenticação
const setupInterceptors = (getToken: () => string | null, logout: () => void) => {
  // Limpa interceptors anteriores para evitar duplicação
  if (requestInterceptorId !== undefined) {
    api.interceptors.request.eject(requestInterceptorId)
  }

  if (responseInterceptorId !== undefined) {
    api.interceptors.response.eject(responseInterceptorId)
  }

  // Configura o interceptor de requisição
  requestInterceptorId = api.interceptors.request.use((request) => {
    const token = getToken()

    if (token) {
      request.headers.Authorization = `Bearer ${token}`
    } else {
      console.error('Nenhum token disponível para a requisição')
    }

    return request
  })

  // Configura o interceptor de resposta
  responseInterceptorId = api.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      console.error('Erro na requisição:', error.config?.url)

      // Verifica se é erro de autenticação
      if (error.response?.status === 401) {
        // console.log('Erro 401 detectado - fazendo logout');
        logout()
        // Redirecionar para login
        window.location.href = '/login'
      }

      return Promise.reject(error)
    },
  )

  // console.log('Interceptors configurados com sucesso')
}

const isError = (response: unknown): boolean => {
  return axios.isAxiosError(response)
}

export { api, isError, setupInterceptors }
