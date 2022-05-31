import React, { FC } from "react";
import styled, { css } from "styled-components";
import { useFragmentPreviewContextState } from "../../context/FragmentPreviewContext";

interface FragmentPreviewItemProps {
  title: string;
}

const PreviewItem = styled.div<{ collapsed: boolean }>`
  margin: 12px;
  transition: all 0.25s;

  ${(props) =>
    props.collapsed &&
    css`
      &:hover {
        background-color: #ffffff;
      }
    `}

  box-shadow: ${(props) => (props.collapsed ? "none" : "0 1px 3px 0 rgba(63, 63, 63, 0.6)")};
  background-color: ${(props) => (props.collapsed ? "transparent" : "#ffffff")};
`;

const PreviewItemHeadline = styled.div<{ collapsed: boolean }>`
  display: block;
  font-family: var(--font-family-studio);
  font-size: 13px;
  font-weight: 700;
  color: #3f3f3f;
  line-height: 20px;
  padding: 4px 6px 4px 28px;
  cursor: pointer;
  text-decoration: none;
  background-size: 16px;
  background-position-x: 6px;
  background-position-y: center;
  background-repeat: no-repeat;
  ${(props) =>
    props.collapsed &&
    css`
      background-color: transparent;
    `}
  background-image: ${(props) =>
    props.collapsed
      ? css`url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxNiAxNiIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMTYgMTYiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+Cjxwb2x5Z29uIHBvaW50cz0iOS41OSA4IDYuNzYgMTAuODMgNy40NiAxMS41NCAxMSA4IDcuNDYgNC40NiA2Ljc2IDUuMTciLz4KPC9zdmc+Cg==')`
      : css`url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxNiAxNiIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMTYgMTYiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+Cjxwb2x5Z29uIHBvaW50cz0iOCA4LjgzIDUuMTcgNiA0LjQ2IDYuNzEgOCAxMC4yNCAxMS41NCA2LjcxIDEwLjgzIDYiLz4KPC9zdmc+Cg==")`};
`;
const PreviewItemContainer = styled.div`
  display: block;
  padding: 12px;
`;
const PreviewItemContent = styled.div`
  clear: both;
  & > * {
    margin-left: auto;
    margin-right: auto;
    width: calc(100% - 30px);

    @media screen and (min-width: 768px) {
      width: 690px;
    }

    @media screen and (min-width: 768px) and (orientation: landscape) {
      width: calc(100% - 30px);
      max-width: 920px;
    }

    @media screen and (min-width: 1200px) {
      width: var(--screen-size-max);
      max-width: 100%;
    }
  }
`;

const FragmentPreviewItem: FC<FragmentPreviewItemProps> = ({ title, children }) => {
  const { toggleEntry, items, type } = useFragmentPreviewContextState();
  const view = type + "_" + title.toLowerCase();

  const collapsed = (id: string) => {
    return !!items.find((item) => item.title === id);
  };

  const isCollapsed = collapsed(view);
  return (
    <PreviewItem collapsed={isCollapsed}>
      <PreviewItemHeadline
        collapsed={isCollapsed}
        onClick={() => {
          toggleEntry(view);
        }}
      >
        {title}
      </PreviewItemHeadline>
      <div style={{ display: isCollapsed ? "none" : "block" }}>
        <PreviewItemContainer>
          <PreviewItemContent>{children}</PreviewItemContent>
        </PreviewItemContainer>
      </div>
    </PreviewItem>
  );
};

export default FragmentPreviewItem;
