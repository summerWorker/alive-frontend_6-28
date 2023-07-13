import { preUrl } from '../constant';

export async function getDietService(userId, date) {
  return await fetch(preUrl + '/get_diet' + '?user_id=' + userId.toString() + '&date=' + date.toString(), {
    method: 'GET'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
}

export async function getFoodService(userId) {
  return await fetch(preUrl + '/get_food' + '?userId=' + userId.toString(), {
    method: 'GET'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
}

export async function addDietService(userId, foodName, amount, type, date) {
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
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_id: userId,
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

export async function addFoodService(foodName, picture, userId, calories, carbs, protein, fat, dietaryFiber, sodium) {
  return await fetch(preUrl + '/add_food', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId: userId,
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
