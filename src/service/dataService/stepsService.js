import { preUrl } from '../constant';

export async function getStepsData(userId, startTime, endTime) {
  return await fetch(preUrl + '/get_steps', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'token': `${localStorage.getItem("token")}`
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
