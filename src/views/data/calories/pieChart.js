import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';


/*
* @Brief: 饼图,环形图
* @Param: data:数据 categries:横坐标
* @example:  const data =  [30, 40, 35];
*           const categries = ['A', 'B', 'C'];
* */
const PieChart = ({data,categries}) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const options = {
            series: data,
            labels: categries,
            colors: ["#c5bbf9", "#c8fade", "#caeffe","#fbc6f5"],
            chart: {
                width: 380,
                type: 'donut',
            },
            plotOptions: {
                pie: {
                    startAngle: -90,
                    endAngle: 270
                }
            },
            dataLabels: {
                enabled: false
            },
            fill: {
                type: 'gradient',
            },
            legend: {
                formatter: function(val, opts) {
                    return val + " - " + opts.w.globals.series[opts.seriesIndex]
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
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

export default PieChart;
