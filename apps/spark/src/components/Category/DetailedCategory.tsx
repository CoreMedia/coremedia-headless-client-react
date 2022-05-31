import React from "react";
import styled from "styled-components";
import { colByName } from "../../utils/PageGrid/PageGridUtil";
import Col from "../PageGrid/Col";
import { DetailCategory } from "../../models/Detail/DetailCategory";
import { Headline, StyledDetail } from "../Details/Detail";

const StyledRow = styled.div`
  display: flex;
`;

const Sidebar = styled.div`
  flex: 1;
  padding-right: 6px;
  > div {
    width: 100%;
  }
`;
const Content = styled.div`
  flex: 3;
  > div {
    width: 100%;
  }
`;

const DetailedCategory: React.FC<DetailCategory> = ({ name, grid }) => {
  return (
    <StyledDetail>
      <Col col={colByName(grid, "hero")} />
      <Headline>{name}</Headline>
      <StyledRow>
        <Sidebar>
          <Col col={colByName(grid, "sidebar")} />
        </Sidebar>
        <Content>
          <Col col={colByName(grid, "main")} />
        </Content>
      </StyledRow>
    </StyledDetail>
  );
};
export default DetailedCategory;
