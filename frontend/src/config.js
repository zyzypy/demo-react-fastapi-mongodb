const CONFIG = {
    // pass in environment variables by docker compose, API_HOST is the name of backend container's name.
    REACT_APP_API_HTTP: process.env.REACT_APP_API_HTTP || 'http',
    REACT_APP_API_PORT: process.env.REACT_APP_API_PORT || '8000',
    REACT_APP_API_HOST: process.env.REACT_APP_API_HOST || '127.0.0.1',
}

const API_BASE_URL = `${CONFIG.REACT_APP_API_HTTP}://${CONFIG.REACT_APP_API_HOST}:${CONFIG.REACT_APP_API_PORT}`

// console.log('API_BASE_URL:', API_BASE_URL)

export {API_BASE_URL}
export default CONFIG;