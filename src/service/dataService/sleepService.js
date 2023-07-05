import { preUrl } from '../constant.js';

export async function getSleepData(userId, startTime, endTime) {
  console.log('getSleepData', userId, startTime, endTime);
  return await fetch(preUrl + '/day_sleep', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_id: userId,
      start_date: startTime,
      end_date: endTime
    })
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
}