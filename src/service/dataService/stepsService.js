import { preUrl } from '../constant';

export async function getStepsData(startTime, endTime) {
  return await fetch(preUrl + '/get_steps', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
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

// export async function addStepsData(steps, date, goal, distance, calories, heart_rate, cadence) {
//   return await fetch(preUrl + '/get_steps', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': '*',
//       token: `${localStorage.getItem('token')}`
//     },
//     body: JSON.stringify({
//       steps: steps,
//       date: date,
//       goal: goal,
//       distance: distance,
//       calories: calories,
//       heart_rate: heart_rate,
//       cadence: cadence
//     })
//   })
//     .then((response) => response.json())
//     .catch((error) => {
//       console.log(error);
//     });
// }
export async function addStepData(step, date) {
  console.log(typeof step);
  return await fetch(preUrl + '/add_step', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      token: `${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
      step: step,
      date: date
    })
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
}

export async function addStepGoalData(goal, date) {
  return await fetch(preUrl + '/add_step_goal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      token: `${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
      goal: goal,
      date: date
    })
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
}

export async function addStepDistanceData(distance, date) {
  return await fetch(preUrl + '/add_step_distance', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      token: `${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
      distance: distance,
      date: date
    })
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
}

export async function addStepCaloriesData(calories, date) {
  return await fetch(preUrl + '/add_step_calories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      token: `${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
      calories: calories,
      date: date
    })
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
}
