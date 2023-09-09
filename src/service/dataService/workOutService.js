import { preUrl } from '../constant';

export async function getWorkOutService(startTime, endTime) {
  return await fetch(preUrl + '/get_workout', {
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

export async function getExerciseService() {
  return await fetch(preUrl + '/get_exercise', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token: `${localStorage.getItem('token')}`
    },
    body: JSON.stringify({})
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
}

export async function addWorkoutService(exerciseName, amount, date) {
  return await fetch(preUrl + '/add_workout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token: `${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
      name: exerciseName,
      amount: amount,
      date: date
    })
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
}

export async function addExerciseService(exerciseName, picture, calories) {
  return await fetch(preUrl + '/add_exercise', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token: `${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
      name: exerciseName,
      calorie: calories,
      picture: picture
    })
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
}
