class QuoteApi {
    constructor(options) {
        this._baseURL = options.baseUrl;
        this._headers = options.headers;
    }

    getQuotes() {
        return fetch(`${this._baseURL}/quotes/random?limit=10`).then((res) => {
            if (res.ok) {
              return res.json();
            }
      
            return Promise.reject(`Error: ${res.status}`);
        });
    }
}

const quoteApi = new QuoteApi({
    baseUrl: "http://api.quotable.io",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  export { quoteApi };