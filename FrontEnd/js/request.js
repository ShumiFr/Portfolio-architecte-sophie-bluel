const request = (url, options) => {
    return fetch(url, options).then((response) => response.json())
};