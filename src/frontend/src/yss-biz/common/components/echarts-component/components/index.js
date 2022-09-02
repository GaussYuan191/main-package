import Echarts from 'echarts';
// 设置渐变色
function linearGradient(color1 = 'transparent', color2 = color1, position = [0, 1, 0, 0]) {
  return new Echarts.graphic.LinearGradient(...position, [
    {
      //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
      offset: 0,
      color: color1
    },
    {
      offset: 1,
      color: color2
    }
  ]);
}

/**柱状图&折线图组合**/
const lineAndBarGroup = (chartData = {}) => {
  let series = [];
  let legend = {
    data: [],
    top: '10%',
    textStyle: {
      color: '#fff'
    },
    ...chartData.legend
  };
  let yAxis = [];
  if (chartData.yAxisData && chartData.yAxisData.length) {
    chartData.yAxisData.map((item, index) => {
      if (index === 0) {
        yAxis.push({
          nameTextStyle: {
            color: '#888'
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#888'
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#394979'
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: '#000'
            }
          },
          ...item
        });
      } else if (index === 1) {
        yAxis.push({
          axisLabel: {
            show: true,
            textStyle: {
              color: '#888'
            }
          },
          nameTextStyle: {
            color: '#888'
          },
          ...item
        });
      }
      return yAxis;
    });
  }
  chartData.legendData.map(item => {
    return legend.data.push({
      name: item,
      icon: 'circle',
      textStyle: {
        color: '#7d838b'
      }
    });
  });
  chartData.seriesData.map(item => {
    let pushData = {
      ...item
    };
    if (item.type === 'line') {
      pushData.itemStyle = {
        normal: {
          color: '#ffaa00'
        }
      };
      pushData.smooth = true;
    } else if (item.type === 'bar') {
      pushData.barWidth = '15';
      pushData.barGap = '10%';
    }
    if (item.colors && item.colors.length) {
      pushData.itemStyle = {
        color: linearGradient(item.colors[0], item.colors[1])
      };
    }
    return series.push(pushData);
  });
  return {
    title: {
      left: 'center',
      y: '10',
      textStyle: {
        color: '#fff'
      },
      ...chartData.title
    },
    color: '#384757',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#384757'
        }
      },
      ...chartData.tooltip
    },
    legend: legend,
    xAxis: [
      {
        type: 'category',
        data: chartData.xAxisData,
        axisPointer: {
          type: 'shadow'
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#888'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#394979'
          }
        }
      }
    ],
    yAxis: yAxis,
    grid: {
      top: '20%',
      ...chartData.grid
    },
    series: series
  };
};

/**环形图**/

const ringChart = (chartData = {}) => {
  var scale = 1;
  var seriesData = [];
  chartData.seriesData.map(item => {
    seriesData.push({
      value: item.value,
      name: item.name,
      itemStyle: {
        color: linearGradient(item.colors[0], item.colors[1])
      }
    });
    return seriesData;
  });
  var rich = {
    yellow: {
      color: '#ffc72b',
      fontSize: 30 * scale,
      padding: [5, 4],
      align: 'center'
    },
    total: {
      color: '#ffc72b',
      fontSize: 40 * scale,
      align: 'center'
    },
    white: {
      color: '#fff',
      align: 'center',
      fontSize: 14 * scale,
      padding: [21, 0]
    },
    blue: {
      color: '#49dff0',
      fontSize: 16 * scale,
      align: 'center'
    },
    hr: {
      borderColor: '#0b5263',
      width: '100%',
      borderWidth: 1,
      height: 0
    }
  };
  let option = {
    title: {
      text: chartData.titleText,
      left: 'center',
      top: '53%',
      padding: [24, 0],
      textStyle: {
        color: '#fff',
        fontSize: 12 * scale,
        align: 'center'
      }
    },
    legend: {
      selectedMode: false,
      formatter: function () {
        var total = 0;
        seriesData.forEach(function (value) {
          total += value.value;
        });
        return '{total|' + total + '}';
      },
      data: [seriesData[0].name],
      left: 'center',
      top: 'center',
      icon: 'none',
      align: 'center',
      textStyle: {
        color: '#fff',
        fontSize: 16 * scale,
        rich: rich
      }
    },
    series: [
      {
        name: '',
        type: 'pie',
        radius: ['42%', '50%'],
        hoverAnimation: true,
        color: ['#c487ee', '#deb140', '#49dff0', '#034079', '#6f81da', '#00ffb4'],
        label: {
          normal: {
            formatter: function (params) {
              var total = 0;
              var percent = 0;
              seriesData.forEach(function (value) {
                total += value.value;
              });
              percent = ((params.value / total) * 100).toFixed(1);
              return (
                '{white|' +
                params.name +
                '}\n{hr|}\n{yellow|' +
                params.value +
                '}\n{blue|' +
                percent +
                '%}'
              );
            },
            rich: rich
          }
        },
        labelLine: {
          normal: {
            length: 55 * scale,
            length2: 0,
            lineStyle: {
              color: '#0b5263'
            }
          }
        },
        data: seriesData
      }
    ]
  };
  return option;
};

/**雷达图**/
const radarChar = (chartData = {}) => {
  const { legend, radarIndicator, radar, series, colorArr, seriesData, seriesStyle } = chartData;
  let dataArr = [];
  seriesData &&
    seriesData.length &&
    seriesData.map((item, index) => {
      const color = (colorArr && colorArr.length && colorArr[index]) || '#4A99FF';
      return dataArr.push({
        ...item,
        itemStyle: {
          normal: {
            lineStyle: {
              color: color
            },
            shadowColor: color,
            shadowBlur: 10
          }
        },
        areaStyle: {
          normal: {
            // 单项区域填充样式
            color: {
              type: 'linear',
              x: 0, //右
              y: 0, //下
              x2: 1, //左
              y2: 1, //上
              colorStops: [
                {
                  offset: 0,
                  color: color
                },
                {
                  offset: 0.5,
                  color: 'rgba(0,0,0,0)'
                },
                {
                  offset: 1,
                  color: color
                }
              ],
              globalCoord: false
            },
            opacity: 1 // 区域透明度
          }
        },
        ...seriesStyle
      });
    });
  let option = {
    color: colorArr,
    legend: {
      orient: 'vertical',
      icon: 'circle', //图例形状
      data: legend && legend.data,
      bottom: 35,
      right: 40,
      itemWidth: 14, // 图例标记的图形宽度。[ default: 25 ]
      itemHeight: 14, // 图例标记的图形高度。[ default: 14 ]
      itemGap: 21, // 图例每项之间的间隔。[ default: 10 ]横向布局时为水平间隔，纵向布局时为纵向间隔。
      textStyle: {
        fontSize: 14,
        color: '#00E4FF'
      },
      ...legend
    },
    radar: {
      name: {
        textStyle: {
          color: '#fff',
          fontSize: 16
        }
      },
      indicator: radarIndicator,
      splitArea: {
        // 坐标轴在 grid 区域中的分隔区域，默认不显示。
        show: true,
        areaStyle: {
          // 分隔区域的样式设置。
          color: ['rgba(255,255,255,0)', 'rgba(255,255,255,0)'] // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
        }
      },
      axisLine: {
        //指向外圈文本的分隔线样式
        lineStyle: {
          color: '#153269'
        }
      },
      splitLine: {
        lineStyle: {
          color: '#113865', // 分隔线颜色
          width: 1 // 分隔线线宽
        }
      },
      ...radar
    },
    series: [
      {
        type: 'radar',
        symbolSize: 8,
        // symbol: 'angle',
        data: dataArr,
        ...series
      }
    ]
  };
  return option;
};

/**面积比重图**/
const proportionChar = (chartData = {}) => {
  const { titleSubtext, title, tooltip, legend, seriesData } = chartData;
  let titleText = '';
  let total = 0;
  let doneCount = 0;
  let seriesArr = [];
  if (seriesData && seriesData.data && seriesData.data.length === 2) {
    doneCount = seriesData.data[0].value;
    seriesData.data.forEach(item => {
      total += item.value;
    });
    titleText = ((100 * doneCount) / total).toFixed(2);
  }

  if (seriesData && seriesData.data && seriesData.data.length === 2) {
    const [data1, data2] = seriesData.data;
    seriesArr = [
      {
        name: '面积模式',
        type: 'pie',
        radius: [100, 130],
        center: ['50%', '50%'],
        data: [
          {
            value: data1.value,
            name: data1.name,
            itemStyle: {
              color: linearGradient(seriesData.colorArr[0], seriesData.colorArr[1])
            },
            label: {
              color: 'rgba(255,255,255,.45)',
              fontSize: 14,
              formatter: `${data1.formatterName}\n{a|${doneCount}}个`,
              rich: {
                a: {
                  color: '#fff',
                  fontSize: 20,
                  lineHeight: 30
                }
              }
            }
          },
          {
            value: data2.value,
            name: data2.name,
            itemStyle: {
              color: 'transparent'
            }
          }
        ]
      },
      {
        name: '面积模式',
        type: 'pie',
        radius: [110, 120],
        center: ['50%', '50%'],
        data: [
          {
            value: data1.value,
            name: data1.name,
            itemStyle: {
              color: 'transparent'
            }
          },
          {
            value: data2.value,
            name: data2.name,
            itemStyle: {
              color: linearGradient(seriesData.colorArr[0], seriesData.colorArr[1])
            },
            label: {
              color: 'rgba(255,255,255,.45)',
              fontSize: 14,
              formatter: `${data2.formatterName}\n{a|${total}}个`,
              rich: {
                a: {
                  color: '#fff',
                  fontSize: 20,
                  lineHeight: 30
                }
              }
            }
          }
        ]
      }
    ];
  }

  let option = {
    title: {
      text: `${titleText}%`,
      subtext: titleSubtext,
      x: 'center',
      y: 'center',
      textStyle: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'normal'
      },
      subtextStyle: {
        color: 'rgba(255,255,255,.45)',
        fontSize: 14,
        fontWeight: 'normal'
      },
      ...title
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
      ...tooltip
    },
    legend: {
      x: 'center',
      y: 'bottom',
      show: false,
      ...legend
    },
    calculable: true,
    series: seriesArr
  };
  return option;
};

/**横向柱状比例图**/
const proportionBarsChart = (chartData = {}) => {
  const {
    titleText,
    title,
    grid,
    yAxis,
    yAxisData,
    xAxis,
    labelName1,
    labelName2,
    seriesData,
    series
  } = chartData;
  const option = {
    title: {
      top: '5%',
      left: 'center',
      text: titleText,
      textStyle: {
        align: 'center',
        color: '#fff',
        fontSize: 18
      },
      ...title
    },
    grid: {
      left: '240',
      right: '100',
      ...grid
    },
    xAxis: {
      show: false,
      ...xAxis
    },
    yAxis: {
      type: 'category',
      axisLabel: {
        margin: 100,
        show: true,
        color: '#4DCEF8',
        fontSize: 12
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      data: yAxisData,
      ...yAxis
    },
    series: [
      {
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'right',
            color: '#fff',
            fontSize: 12,
            formatter: function (param) {
              return labelName1[param.dataIndex];
            }
          }
        },
        barWidth: 20,
        itemStyle: {
          normal: {
            borderColor: {
              type: 'linear',
              x: 0,
              x1: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#02ddff'
                },
                {
                  offset: 1,
                  color: '#00feff'
                }
              ]
            },
            borderWidth: 1,
            barBorderRadius: 15,
            color: 'transparent'
          }
        },
        z: 1,
        data: [1, 1, 1],
        ...(series && series.length === 2 ? series[0] : {})
      },
      {
        type: 'bar',
        barGap: '-98%',
        barWidth: '19',
        itemStyle: {
          normal: {
            barBorderRadius: 16,
            color: {
              type: 'linear',
              x: 0,
              x1: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#02ddff'
                },
                {
                  offset: 1,
                  color: '#00feff'
                }
              ]
            }
          }
        },
        max: 1,
        label: {
          normal: {
            show: true,
            position: 'left',
            color: '#fff',
            fontSize: 14,
            formatter: function (param) {
              return labelName2[param.dataIndex];
            }
          }
        },
        labelLine: {
          show: true
        },
        z: 2,
        data: seriesData,
        ...(series && series.length === 2 ? series[1] : {})
      }
    ]
  };
  return option;
};

const getOptions = (type, chartData) => {
  switch (type) {
    case 'lineAndBarGroup':
      return lineAndBarGroup(chartData);
    case 'ring':
      return ringChart(chartData);
    case 'radar':
      return radarChar(chartData);
    case 'proportion':
      return proportionChar(chartData);
    case 'proportionBars':
      return proportionBarsChart(chartData);
    default:
      return chartData;
  }
};
export { getOptions };
