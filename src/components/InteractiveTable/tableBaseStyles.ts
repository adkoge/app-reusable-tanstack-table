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

export const PaginationStyled = styled.div`
  color: #a9a9a9;
  font-size: 12px;
  font-weight: 400;
  margin-bottom: 0;
`;

export const PaginationButtonWrapperStyled = styled.div`
  display: flex;
  justify-content: center;
`;

export const SelectContainer = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export const StyledSelect = styled.select`
  width: 100%;
  max-width: 250px;
  padding: 8px 12px;
  font-size: 16px;
  color: #333;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    border-color: #007bff;
  }

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
  }

  &::placeholder {
    color: #aaa;
    font-style: italic;
  }
`;
