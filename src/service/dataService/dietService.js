import { preUrl } from '../constant';

export async function getDietService(startTime, endTime) {
  return await fetch(preUrl + '/get_diet', {
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

export async function getFoodService() {
  return await fetch(preUrl + '/get_food', {
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

export async function addDietService(foodName, amount, type, date) {
  let typeEnum;
  switch (type) {
    case 0:
      typeEnum = 'BREAKFAST';
      break;
    case 1:
      typeEnum = 'LUNCH';
      break;
    case 2:
      typeEnum = 'DINNER';
      break;
    case 3:
      typeEnum = 'SNACK';
      break;
  }
  return await fetch(preUrl + '/add_diet', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token: `${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
      name: foodName,
      amount: amount,
      date: date,
      type: typeEnum
    })
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
}

export async function addFoodService(foodName, picture, calories, carbs, protein, fat, dietaryFiber, sodium) {
  return await fetch(preUrl + '/add_food', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token: `${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
      name: foodName,
      calorie: calories,
      protein: protein,
      fat: fat,
      carbohydrate: carbs,
      dietaryFiber: dietaryFiber,
      sodium: sodium,
      picture: picture
    })
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
}
