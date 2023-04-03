import axios from 'axios';

export function getDirections(requests, data) {
    return new Promise((resolve, reject) => {
        axios
            .post(requests, data, { withCredentials: true })
            .then(resolve)
            .catch(reject);
    });
}