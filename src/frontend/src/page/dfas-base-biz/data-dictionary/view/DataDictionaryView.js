/**
 * 数据字典 View
 * @author daizq
 */

import React from 'react';
import DataDictionaryController from '../controller/DataDictionaryController';
import SearchForm from './SearchForm';
import { BizTable } from 'bmtp-trade-base';
import { dataDictionarycols, dataDictionaryDetailcols } from './table-columns';
import { Row, Col } from 'antd';
import '../styles/data-dictionary.css';

class DataDictionaryView extends DataDictionaryController {
  render() {
    return (
      <div className="data-dictionary">
        <SearchForm
          wrappedComponentRef={ref => (this.$searchForm = ref)}
          handleSearch={() =>
            this.$dataDictionaryTable.setState({ reqPageNum: 1 }, () => {
              this.getDataDictionaryPageList();
            })
          }
          handleRefreshCache={this.handleRefreshCache}
          {...this.props}
        />

        <Row>
          <Col span={8} className="data-dictionary-left">
            <BizTable
              className="stripe-table"
              columns={dataDictionarycols}
              activeKeys="1"
              scollX={true}
              scollY={document.body.clientHeight - 137}
              dataSource={this.state.dataDictionaryPageList}
              total={this.state.dataDictionaryTotal}
              loadData={(page, pageSize) => this.getDataDictionaryPageList(page, pageSize)}
              pagination={{
                defaultPageSize: 20
              }}
              onClickRow={this.onClickRow}
              ref={ref => (this.$dataDictionaryTable = ref)}
            />
          </Col>

          <Col span={16} className="data-dictionary-right">
            <BizTable
              className="stripe-table"
              columns={dataDictionaryDetailcols}
              activeKeys="1"
              scollX={true}
              scollY={document.body.clientHeight - 137}
              dataSource={this.state.dictionaryDetailPageList}
              total={this.state.dictionaryDetailTotal}
              loadData={(page, pageSize) =>
                this.getDictionaryDetail(page, pageSize, this.state.rowData)
              }
              pagination={{
                defaultPageSize: 20
              }}
              ref={ref => (this.$dictionaryDetailTable = ref)}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default DataDictionaryView;
