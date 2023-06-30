const CONFIG = {
    // pass in environment variables by docker compose, API_HOST is the name of backend container's name.
    REACT_APP_API_HOST: process.env.REACT_APP_API_HOST || '127.0.0.1'
}

const API_BASE_URL = `http://${CONFIG.REACT_APP_API_HOST}:8000`

// console.log('API_BASE_URL:', API_BASE_URL)

export {API_BASE_URL}
export default CONFIG;