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
    if(localStorage.getItem("time")!==null){
        if(Date.now()-localStorage.getItem("time")<60000){
            callback({status:-1,msg:"请一分钟后再试",data:null});
            return;
        }

        localStorage.removeItem("time");
    }
    localStorage.setItem("time", Date.now());
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