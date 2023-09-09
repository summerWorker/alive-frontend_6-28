import { preUrl } from '../constant.js';

export async function getHeartRateData(startTime, endTime) {
  return await fetch(preUrl + '/heartRate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token: `${localStorage.getItem('token')}`
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
export async function addHeartRateData(timeStamp, heartRate) {
  return await fetch(preUrl + '/add_heartRate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token: `${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
      timeStamp: timeStamp,
      heartRate: heartRate
    })
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
}
