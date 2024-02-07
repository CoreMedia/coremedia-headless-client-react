import React, { FC } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

export const StyledLoading = styled.div`
  display: flex;
  flex: 1 0 auto;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  min-height: 200px;

  > svg {
    margin: 0 auto;

    rect {
      fill: var(--color-background-light-grey);
    }
  }
`;
const Loading: FC = () => {
  const { t } = useTranslation();
  return (
    <StyledLoading>
      {
        <svg width="51px" height="50px" viewBox="0 0 51 50">
          <rect y="0" width="13" height="50">
            <animate attributeName="height" values="50;10;50" begin="0s" dur="1s" repeatCount="indefinite" />
            <animate attributeName="y" values="0;20;0" begin="0s" dur="1s" repeatCount="indefinite" />
          </rect>
          <rect x="19" y="0" width="13" height="50">
            <animate attributeName="height" values="50;10;50" begin="0.2s" dur="1s" repeatCount="indefinite" />
            <animate attributeName="y" values="0;20;0" begin="0.2s" dur="1s" repeatCount="indefinite" />
          </rect>
          <rect x="38" y="0" width="13" height="50">
            <animate attributeName="height" values="50;10;50" begin="0.4s" dur="1s" repeatCount="indefinite" />
            <animate attributeName="y" values="0;20;0" begin="0.4s" dur="1s" repeatCount="indefinite" />
          </rect>
        </svg>
      }
      <span>{t("Loading.loading")}</span>
    </StyledLoading>
  );
};

export default Loading;
