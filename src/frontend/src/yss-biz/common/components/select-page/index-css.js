import styled from 'styled-components';

export const PaginationWrap = styled.div`
  position: relative;
  height: 30px;
  margin: 4px 0 0;
  border-top: 1.5px solid #c1c1c1;
  & > div {
    position: absolute;
    padding: 4px 8px 4px 0px;
    .ant-pagination.mini {
      position: relative;
      padding-left: 76px;
      text-align: right;
      white-space: nowrap;
      min-width: ${props => props.minWidth + 'px'};
      .ant-pagination-item {
        min-width: 16px;
        height: 18px;
        margin: 0;
        line-height: 16px;
        a {
          padding: 0 2px;
        }
      }
      .ant-pagination-total-text {
        position: absolute;
        left: 5px;
        font-size: 12px;
        margin-right: 5px;
      }
      .ant-pagination-prev,
      .ant-pagination-next,
      .ant-pagination-jump-prev,
      .ant-pagination-jump-next {
        min-width: 16px;
        height: 24px;
        line-height: 24px;
      }
      .ant-pagination-jump-prev,
      .ant-pagination-jump-next {
        font-size: 10px;
      }
    }
  }
`;
