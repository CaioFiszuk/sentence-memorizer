import axios from 'axios';
import * as token from "./token.js";

class Api {
    constructor(options) {
        this._baseURL = options.baseUrl;
        this._headers = options.headers;
    }

    _getAuthorizationHeaders() {
      return {
        ...this._headers,
        authorization: `Bearer ${token.getToken()}`,
      }
    }

    getSentences() {
      return axios.get(`${this._baseURL}/sentences`, { headers: this._getAuthorizationHeaders() })
      .then((res) => {
          return res.data;
        })
        .catch((error) => {
          return Promise.reject(`Error: ${error.response ? error.response.status : error.message}`);
        });
  }

    createSentence(sentenceData) {
      const { content, owner } = sentenceData;

      if (!content || !owner) {
        return Promise.reject("Todos os campos são obrigatórios.");
      }

       return axios.post(`${this._baseURL}/sentences`, sentenceData, { headers: this._getAuthorizationHeaders() })
       .then((res) => {
        return res.data;
      })
          .catch((error) => {

      const errorMessage = error.response 
        ? `Error: ${error.response.status} - ${error.response.data.message || error.message}` 
        : `Network error: ${error.message}`;
      return Promise.reject(errorMessage);
    });
    }

}

const api = new Api({
    baseUrl: "http://localhost:3000",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  export { api };