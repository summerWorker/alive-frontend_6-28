export const getBloodPressure = async (endpoint, data, callback) => {
    let opts = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'token': `${localStorage.getItem("token")}`
        },
        origin: 'http://localhost:3000',
    }
    await fetch(endpoint, opts)
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

export const addBloodPressure = async (endpoint, data, callback) => {
    let opts = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'token': `${localStorage.getItem("token")}`
        },
        origin: 'http://localhost:3000',
    }
    await fetch(endpoint, opts)
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

export const getBloodSugar = async (endpoint, data, callback) => {
    let opts = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'token': `${localStorage.getItem("token")}`
        },
        origin: 'http://localhost:3000',
    }
    await fetch(endpoint, opts)
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

export const addBloodSugar = async (endpoint, data, callback) => {
    let opts = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'token': `${localStorage.getItem("token")}`
        },
        origin: 'http://localhost:3000',
    }
    await fetch(endpoint, opts)
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