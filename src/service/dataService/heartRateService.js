import { preUrl } from '../constant.js';

export async function getHeartRateData(userId, startTime, endTime) {
  return await fetch(preUrl + '/heartRate', {
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
