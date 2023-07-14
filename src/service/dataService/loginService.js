export const register = async (url, data, callback) => {
    let opts = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        origin: "http://localhost:3000"
    }
    await fetch(url, opts)
        .then((response) => {
            return response.json();
        })
        .then((ret) => {
            callback(ret);
        })
        .catch((error) => {
            console.log(error);
        });
}


export const getcheckcode = async (url, data, callback) => {
    let opts = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        origin: "http://localhost:3000"
    }
    await fetch(url, opts)
        .then((response) => {
            return response.json();
        })
        .then((ret) => {
            callback(ret);
        })
        .catch((error) => {
            console.log(error);
        });
}