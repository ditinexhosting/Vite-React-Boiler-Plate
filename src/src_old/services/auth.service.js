import axios from 'axios';

//const API_URL = '/api/api/';
const API_URL = '/api/';

const login = (username, password) => {
    return axios.post(API_URL + 'token/', { username, password })
        .then(response => {
            if (response.data.access) {
                localStorage.setItem('jwtToken', response.data.access);
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        })
        .catch(error => {
            console.error('Login error:', error);
            throw error;
        });
};

const logout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const getUserProfile = () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        return axios.get(API_URL + 'user/profile/', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
    }
    return Promise.reject("No user logged in");
};

const AuthService = {
    login,
    logout,
    getCurrentUser,
    getUserProfile,
};

export default AuthService;
