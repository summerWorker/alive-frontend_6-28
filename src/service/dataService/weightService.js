export const getWeight = async (endpoint, data, callback) => {
    let opts = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        origin: 'http://localhost:3000',
        body: JSON.stringify(data),
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

export const addWeight = async (endpoint, data, callback) => {
    let opts = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        origin: 'http://localhost:3000',
        body: JSON.stringify(data),
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

export const getBMI = async (endpoint, data, callback) => {
    let opts = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        origin: 'http://localhost:3000',
        body: JSON.stringify(data),
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


export const setWeightGoal = async(endpoint, data, callback) => {
    let opts = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        origin: 'http://localhost:3000',
        body: JSON.stringify(data),
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