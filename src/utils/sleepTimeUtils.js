import dayjs from 'dayjs';

export function desolveSleepTimeData(startDate, endDate, data, mode) {
  const result = [];
  let startTimestamp;
  let endTimestamp;
  let currentDate;
  console.log(data);
  switch (mode) {
    case 'year':
      startTimestamp = startDate.toDate().getTime(); // 转换为Date对象并获取时间戳
      endTimestamp = endDate.toDate().getTime();
      currentDate = startDate;
      for (let i = 0; i < 12; ++i) {
        const startOfMonth = currentDate.startOf('month').toDate().getTime();
        const endOfMonth = currentDate.endOf('month').toDate().getTime();
        const intervalData = data.filter(
          (item) => dayjs(item.date).toDate().getTime() >= startOfMonth && dayjs(item.date).toDate().getTime() <= endOfMonth
        );
        const average = calculateAverage(intervalData);
        result.push(average);
        currentDate = currentDate.add(1, 'month');
      }
      break;
    default:
      currentDate = startDate;
      while (currentDate.valueOf() <= endDate.valueOf()) {
        const intervalData = data.filter((item) => item.date.toString() === currentDate.format('YYYY-MM-DD').toString());
        const average = calculateAverage(intervalData);
        result.push(average);
        currentDate = currentDate.add(1, 'day');
      }
      break;
  }
  return result;
}
function calculateAverage(data) {
  if (data.length === 0) {
    return 0;
  }
  const sum = data.reduce((acc, item) => acc + parseFloat(item.detailValue.duration), 0);
  const average = sum / data.length / 60;
  return average.toFixed(2);
}
