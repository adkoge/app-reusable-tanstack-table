import styled from "styled-components";

export const OrderIconWrapperStyled = styled.span`
  align-self: flex-start;
  margin-right: 7.5px;
`;

export const TableHeaderRowStyled = styled.tr`
  border-bottom: 1px solid #d3d3d3;
  width: 100%;
`;

export const TableHeadStyled = styled.thead``;

export const TableHeaderStyled = styled.th`
  &:not(:last-child) {
    padding-right: 1.5rem;
  }
`;

export const TableRowStyled = styled.tr`
  border-bottom: 1px solid #d3d3d3;
  width: 100%;
`;

export const TableCellStyled = styled.td`
  white-space: nowrap;

  &:not(:last-child) {
    padding-right: 1.5rem;
  }
`;
