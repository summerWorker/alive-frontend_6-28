const getBmiChart = (bmi) => {
    let color = '#69F0AE'; // 默认颜色

    // 根据BMI值的范围设置不同的颜色
    if (bmi < 18.5) {
        color = '#FFC400'; // 低体重，设置为黄色
    } else if (bmi >= 25) {
        color = '#F44336'; // 超重，设置为红色
    }

    const chartData = {
        type: 'bar',
        height: 165,
        options: {
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    horizontal: true,
                    barHeight: "20%",
                    // borderRadiusApplication: "around",
                    // columnWidth: "0%"
                }
            },
            dataLabels: {
                enabled: false
            },
            legend: {
              show: true,
              position: "bottom",
                fontSize: '14px',
                fontFamily: `'Roboto', sans-serif`,
                offsetX: 20,
                labels: {
                    useSeriesColors: false
                },
                markers: {
                    width: 16,
                    height: 16,
                    radius: 5
                },
                itemMargin: {
                    horizontal: 15,
                    vertical: 8
                }
            },
            grid: {
                show: true
            },
            xaxis: {
                labels: {
                    show: true
                },
                show: false,
                categories: ['BMI'],
                min: 10,
                max: 35,
                axisTicks: {
                    show: false
                }
            },
            yaxis: {
                labels: {
                    show: false
                },
                show: false,
                axisBorder: {
                    show: false
                }
            },
            annotations: {
                xaxis: [
                    {
                        x: 18.5,
                        borderColor: '#00E396',
                        label: {
                            borderColor: '#00E396',
                            style: {
                                color: '#fff',
                                background: '#00E396'
                            },
                            text: '18.5'
                        }
                    },
                    {
                        x: 25,
                        borderColor: '#00E396',
                        label: {
                            borderColor: '#00E396',
                            style: {
                                color: '#fff',
                                background: '#00E396'
                            },
                            text: '25.0'
                        }
                    }
                ]
            }
        },
        series: [{
            name: 'bmi',
            data: [bmi],
            color: color
        }]
    };

    return {...chartData};
}

export default getBmiChart;