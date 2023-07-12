export const getBloodSugarChartData = (seriesData, start, end) => {
    const chartData = {
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
                type: 'datetime',
                tickAmount: 7,
                min: new Date(start).getTime(),
                max: new Date(end).getTime(),
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