import dayjs from 'dayjs';
export function desolveHeartRateData(startDate, endDate, data, mode) {
  const result = [];
  let startTimestamp;
  let endTimestamp;
  switch (mode) {
    case 'day':
      // 按两小时时间间隔计算平均值
      const twoHourInterval = 2 * 60 * 60 * 1000; // 2小时的毫秒数
      startTimestamp = startDate.toDate().getTime(); // 转换为Date对象并获取时间戳
      endTimestamp = endDate.toDate().getTime(); // 转换为Date对象并获取时间戳
      // console.log(startDate.toDate());
      // console.log(endDate.toDate());
      // console.log(data);
      while (startTimestamp < endTimestamp) {
        const intervalData = data.filter((item) => item.timeStamp >= startTimestamp && item.timeStamp < startTimestamp + twoHourInterval);
        const average = calculateAverage(intervalData);
        result.push(average);
        startTimestamp += twoHourInterval;
      }
      break;
    case 'year':
      startTimestamp = startDate.toDate().getTime(); // 转换为Date对象并获取时间戳
      endTimestamp = endDate.toDate().getTime();
      let currentDate = dayjs(startDate);
      for (let i = 0; i < 12; ++i) {
        const startOfMonth = currentDate.startOf('month').toDate().getTime();
        const endOfMonth = currentDate.endOf('month').toDate().getTime();
        const intervalData = data.filter((item) => item.timeStamp >= startOfMonth && item.timeStamp <= endOfMonth);
        const average = calculateAverage(intervalData);
        result.push(average);
        currentDate = currentDate.add(1, 'month');
      }
      break;
    default:
      // 按一天时间间隔计算平均值
      const oneDayInterval = 24 * 60 * 60 * 1000; // 1天的毫秒数
      startTimestamp = startDate.toDate().getTime(); // 转换为Date对象并获取时间戳
      endTimestamp = endDate.toDate().getTime();
      while (startTimestamp <= endTimestamp) {
        const intervalData = data.filter((item) => item.timeStamp >= startTimestamp && item.timeStamp < startTimestamp + oneDayInterval);
        const average = calculateAverage(intervalData);
        result.push(average);
        startTimestamp += oneDayInterval;
      }
      break;
  }
  return result;
}

function calculateAverage(data) {
  if (data.length === 0) {
    return 0;
  }
  const sum = data.reduce((acc, item) => acc + parseFloat(item.detailValue), 0);
  return sum / data.length;
}
