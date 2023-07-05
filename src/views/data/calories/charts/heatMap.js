import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

// 随即设置一个月的数据，二维数组，每个维度代表一周

const HeatMap = ({data}) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const options = {
            series: [{
                name: '第一周',
                data: data[0]
            },
                {
                    name: '第二周',
                    data: data[1]
                },
                {
                    name: '第三周',
                    data: data[2]
                },
                {
                    name: '第四周',
                    data: data[3]
                },
                {
                    name: '第五周',
                    data: data[4]
                },
            ],
            chart: {
                type: 'heatmap',
                toolbar:false,
                sparkline: {
                    enabled: false, // false:显示详细的坐标数据，true:只显示一条折线,

                }
            },
            dataLabels: {
                enabled: false
            },
            colors: ["#008FFB"],
        };

        const chart = new ApexCharts(chartRef.current, options);
        chart.render();

        // 在组件销毁时销毁图表实例
        return () => {
            chart.destroy();
        };
    }, []);

    return <div id="chart" ref={chartRef}></div>;
};

export default HeatMap;
