class Controller {
    constructor() {

    }

    /**
     * Makes the XMLHttpRequest.
     * @param {string} type - The request type.
     * @param {string} url - The request url.
     * @param {any} data - The request data.
     * @param {function} callback - The request callback function.
     * @param {object} options - The request options.
     */
    request (type, url, data = null, callback, options = {}) {
        const { contentType = "application/x-www-form-urlencoded" } = options;
        const httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = () => {
            //  The operation is completed.
            if (httpRequest.readyState == 4) {
                switch (httpRequest.status) {
                    //  Okay Status
                    case 200:
                        callback(httpRequest.responseText, options);
                        break;
                    case 400:
                        console.error("Error 400. The server could not understand the request due to invalid syntax.");
                        break;
                    case 401:
                        console.error("Error 401. The client must authenticate itself to get the requested response.");
                        break;
                    case 403:
                        console.error("Error 403. The client does not have access rights to the content;");
                        break;
                    case 404:
                        console.error(`Error 404. The server can not find this requested resource: ${url}.`);
                        break;
                    case 409:
                        console.error("Error 409. This response is sent when a request conflicts with the current state of the server.");
                        break;
                    case 500:
                        console.error("Error 500. The server has encountered a situation it doesn't know how to handle.");
                        break;
                }
            }
        };
        httpRequest.open(type, url, true);
        if (type.toUpperCase() == "POST") {
            httpRequest.setRequestHeader("Content-Type", contentType);
        }
        console.log(data)
        httpRequest.send(data);
    }

    /**
     * Makes the GET request.
     * @param {string} url - The request url.
     * @param {any} data - The request data.
     * @param {function} callback - The request callback function.
     * @param {object} options - The request options.
     */
    getRequest (url, data = {}, callback, options = {}) {
        //  Sets up the array of url parameters
        let params = [];
        let keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let value = data[key];
            //  It is necessary to transform the value object into JSON
            if (typeof value == "object") {
                value = JSON.stringify(value);
            }
            params.push(`${key}=${value}`)
        }
        url += params.join("&");
        this.request("GET", url, null, callback, options);
    }

    /**
     * Makes the POST request.
     * @param {string} url - The request url.
     * @param {any} data - The request data.
     * @param {function} callback - The request callback function.
     * @param {object} options - The request options.
     */
    postRequest (url, data = {}, callback, options = {}) {
        //  It is necessary to transform the data object into JSON
        if (typeof data == "object") {
            data = JSON.stringify(data);
            options["contentType"] = "application/json";
        }
        this.request("POST", url, data, callback, options);
    }
}

export { Controller };