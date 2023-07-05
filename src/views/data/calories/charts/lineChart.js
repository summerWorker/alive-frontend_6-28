import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

/*
* @Brief: 折线图
* @Param: data:数据 categries:横坐标
* @example:  const data =  [30, 40, 35, 50, 49, 60, 70, 91, 125];
*            const categries = [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998];
*            <ChartCard data={data} categries={categries} title={'心率 109次/分'} subtitle={'心跳在加速'} chartType={ChartType.LINE}/>
* */
const LineChart = ({data,categries}) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const options = {
            chart: {
                type: 'area',
                height:135,
                sparkline: {
                    enabled: true // false:显示详细的坐标数据，true:只显示一条折线
                }
            },
            dataLabels: {
                enabled: false,
                background: {
                    enabled: false,
                    margin: 2,
                }
            },
            stroke: {
                curve: 'smooth',
                width: 1.5,
            },
            tooltip: {
                fixed: {
                    enabled: true
                },
                x: {
                    show: true
                },
                y: {
                    title: 'Value'
                },
                marker: {
                    show: true
                }
            },
            series: [{
                name: 'Value',
                data: data
            }],
            xaxis: {
                categories: categries
            }
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

export default LineChart;
