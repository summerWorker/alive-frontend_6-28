const getBloodPressureChartData = (category, seriesData) => {
    const chartData = {
        type: 'line',
        options: {
            xaxis: {
                type: 'category',
                categories: category,
                tickAmount: 10
            },
            tooltip: {
                theme: 'dark',
                fixed: {
                    enabled: false
                },
                x: {
                    show: false
                },
                y: {
                    title: 'Steps'
                },
                marker: {
                    show: true
                }
            },
            dataLabels: {
                enabled: false
            },
            markers: {
                size: 6,
                strokeWidth: 0,
                hover: {
                    size: 9
                }
            },
            grid: {
                show: true,
                padding: {
                    bottom: 0
                }
            },
            fill: {
                type: 'solid',
                opacity: 1
            },
            stroke: {
                curve: 'smooth',
                width: 2
            },
        },
        color: ['#008FFB', '#00E396'],
        stroke: {
            curve: 'smooth'
        },
        markers: {
            size: 1
        },
        series: [
            {
                name: 'Systolic',
                data: seriesData[0]
            },
            {
                name: 'Diastolic',
                data: seriesData[1]
            }
        ]
    };

    return {...chartData};
}

export default getBloodPressureChartData;