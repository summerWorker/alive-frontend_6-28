export const getBloodSugarChartData = (seriesData) => {
    const chartData = {
        // height: 350,
        type: 'scatter',
        chart: {
            zoom: {
                enabled: true,
                type: 'xy'
            }
        },
        series: [{
            name: "SAMPLE A",
            data: seriesData
        }],
        options: {
            xaxis: {
                type: 'datetime', // 设置横坐标为日期时间类型
                tickAmount: 10,
                labels: {
                    datetimeFormatter: {
                        year: 'yyyy',
                        month: 'MMM',
                        day: 'dd'
                        // hour: 'HH:mm'
                    },
                    formatter: function (value, timestamp) {
                        const date = new Date(timestamp);
                        const month = date.getMonth() + 1;
                        const day = date.getDate();
                        return `${month}-${day}`;
                    }
                }
            },
            yaxis: {
                tickAmount: 7
            }
        },
        grid: {
            xaxis: {
                lines: {
                    show: true
                }
            },
            yaxis: {
                lines: {
                    show: true
                }
            },
        },
    };

    return {...chartData};
};