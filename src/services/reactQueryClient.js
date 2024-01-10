const { QueryClient } = require('react-query')

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})

export default queryClient
