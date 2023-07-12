import { useEffect, useState } from 'react';

export function AllDistance(props) {
  const [analysis, setAnalysis] = useState('同比持平');
  const [distance, setDistance] = useState(0);
  const [averageDistance, setAverageDistance] = useState(0);

  useEffect(() => {
    if (props.data && props.data.length > 0) {
      let totalDistance = 0;
      props.data.forEach((item) => {
        totalDistance += item.distance;
      });
      setDistance(totalDistance);
      setAverageDistance(Math.round(totalDistance / props.data.length));

      //判断趋势
      //排序
      const sortedData = props.data.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
      });

      let increaseCount = 0;
      let decreaseCount = 0;

      //遍历数据计算总步数和上升/下降次数
      for (let i = 1; i < sortedData.length; i++) {
        const currentDistance = sortedData[i].distance;
        const previousDistance = sortedData[i - 1].distance;

        if (currentDistance - previousDistance > 100) {
          increaseCount++;
        } else if (previousDistance - currentDistance > 100) {
          decreaseCount++;
        }
      }

      //判断步数趋势
      const trend =
        increaseCount >= sortedData.length / 2
          ? '日均步数上升'
          : decreaseCount >= sortedData.length / 2
          ? '日均步数下降'
          : '日均步数同比持平';
      setAnalysis(trend);
    }
  }, []);

  return (
    <>
      <div style={{ background: '#ffffff', padding: '20px', borderRadius: '10px' }}>
        <h1>总距离</h1>
        <hr style={{ border: 'none', borderTop: '1px solid #CACACA', margin: '20px 0' }} />
        <h2>{analysis}</h2>
        <h4>
          共走了{distance}公里，日均{averageDistance}公里。
        </h4>
      </div>
    </>
  );
}
