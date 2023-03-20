import axios from 'axios';

export function signIn(requests, data) {
    return new Promise((resolve, reject) => {
        axios
            .post(requests, data, { withCredentials: true })
            .then(resolve)
            .catch(reject);
    });
}

//SignUp

export function signUp(requests, data) {
    return new Promise((resolve, reject) => {
        axios
            .post(requests, data, { withCredentials: true })
            .then(resolve)
            .catch(reject);
    });
}

//Logout

export function logout(requests) {
    return new Promise((resolve, reject) => {
        axios
            .get(requests, { withCredentials: true })
            .then(resolve)
            .catch(reject);
    });
}