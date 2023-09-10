import { preUrl } from '../constant.js';

export async function getSleepData(startTime, endTime) {
  return await fetch(preUrl + '/day_sleep', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': `${localStorage.getItem("token")}`
    },
    body: JSON.stringify({
      start_date: startTime,
      end_date: endTime
    })
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
}
export async function getSleepAnalysis( date) {
  return await fetch(preUrl + '/analyse_sleep', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': `${localStorage.getItem("token")}`
    },
    body: JSON.stringify({
      date:date
    })
  })
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      });
}

export const setSleepGoal = async(endpoint, data, callback) => {
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

export const getSleepGoal = async(endpoint, data, callback) => {
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
