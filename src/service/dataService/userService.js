import { preUrl } from '../constant';

export async function getUserNickName() {
  return await fetch(preUrl + '/get_user_nickname', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      token: `${localStorage.getItem('token')}`
    },
    body: JSON.stringify({})
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
}
