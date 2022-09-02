import React, { Component } from 'react';
import Echarts from 'echarts';
import { getOptions } from './components/index.js';
class EchartsComponent extends Component {
  constructor(props) {
    super(props);
    this.myChart = null;
  }
  reloadChart = chartData => {
    //预留给外面通过ref逃逸强制刷新图表，不建议使用
    this.myChart.clear();
    let option = getOptions(this.props.type, chartData);
    this.myChart.setOption(option, this.props.reload || false);
  };
  componentDidMount() {
    const { type, chartData, handleClick } = this.props;
    let timer = setTimeout(() => {
      this.myChart = Echarts.init(this.Chart);
      let option = getOptions(type, chartData);
      this.myChart.setOption(option);
      if (typeof handleClick === 'function') {
        this.myChart.on('click', function (data) {
          handleClick(data);
        });
      }
      clearTimeout(timer);
    }, 300);
  }
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
      this.myChart.clear();
      let option = getOptions(nextProps.type, nextProps.chartData);
      this.myChart.setOption(option, nextProps.reload || false);
    }
  }
  componentWillUnmount() {
    this.myChart && this.myChart.dispose();
  }
  render() {
    return (
      <div
        ref={classRef => (this.Chart = classRef)}
        style={{ width: '100%', height: '100%' }}
      ></div>
    );
  }
}
export default EchartsComponent;
