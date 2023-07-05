const getDietaryChartData = (carbohydrateCalories, proteinCalories, fatCalories) => {
  const dietaryChartData = {
    type: 'pie',
    options: {
      labels: ['碳水化合物', '蛋白质', '脂肪']
    },
    series: [carbohydrateCalories, proteinCalories, fatCalories]
  };

  return { ...dietaryChartData };
};

export default getDietaryChartData;
