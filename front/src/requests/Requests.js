var URL = "http://localhost:4000";

const API_KEY = "api";
var requests = "";

try {
    requests = {
        Register: `${URL}/${API_KEY}/auth/register`,
        Login: `${URL}/${API_KEY}/auth/login`,
        Logout: `${URL}/${API_KEY}/auth/logout`,
        GetDirections: `${URL}/${API_KEY}/directions`,
    };
} catch (error) { }

export default requests;