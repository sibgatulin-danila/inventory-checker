const axios = require('axios');

export default new class Api {
    apiPrefix = 'api';

    post = (endpoint = '/', data) => {
        return new Promise((resolve, reject) => {
            try {
                axios({
                    method: 'post', 
                    url: this.apiPrefix + endpoint, 
                    data,
                    headers: {
                        'Content-type': 'application/json'
                    },
                }).then(response => {
                    resolve(this._formatResponse(response));
                })
            } catch (error) {
                reject(error);
            }
        });
    }

    get = (endpoint = '/', data = {}) => {
        return new Promise((resolve, reject) => {
            try {
                axios({
                    method: 'get', 
                    url: this.apiPrefix + endpoint, 
                    params: {
                        ...data
                    },
                    headers: {
                        'Content-type': 'application/json'
                    },
                }).then(response => {
                    resolve(this._formatResponse(response));
                })
            } catch (error) {
                reject(error);
            }
        });
    }

    _formatResponse = (response) => {
        return {
            data: response.data,
            status: response.status,
            statusText: response.statusText,
        }
    }
}