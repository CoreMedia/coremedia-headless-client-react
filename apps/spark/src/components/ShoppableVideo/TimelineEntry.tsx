import React from "react";
import styled, { css } from "styled-components";
import PortraitBanner, { PortraitCaption } from "../PortraitBanner/PortraitBanner";
import { TimelineEntry as TimelineEntryInterface } from "../../models/Banner/VideoBanner";
import { useShoppableVideoContextState } from "./ShoppableVideoContext";

const StyledTimelineEntry = styled.div<{ active?: boolean }>`
  height: 100%;
  display: block;
  opacity: 0.4;
  transition:
    opacity 0.3s linear 0.3s,
    border 0.3s ease-out 0.3s;

  &:hover {
    opacity: 1;
  }

  ${(props) =>
    props.active && props.active === true
      ? css`
          opacity: 1;
          position: relative;

          &:after {
            content: "";
            position: absolute;
            left: 0;
            bottom: 0;
            right: 0;
            height: 6px;
            background-color: var(--color-blue);
          }
        `
      : ""}
  ${PortraitCaption} {
    display: none;
  }
`;
const TimelineEntry: React.FC<TimelineEntryInterface> = ({ entry, activeIdForBlock }) => {
  const { activeBlock, play, pause, selectEntry } = useShoppableVideoContextState();
  const visible = activeBlock === activeIdForBlock;

  const pauseVideoSelectBlock = () => {
    selectEntry(entry);
    pause();
  };

  return (
    <StyledTimelineEntry active={visible} onPointerEnter={pauseVideoSelectBlock} onPointerLeave={play}>
      <PortraitBanner {...{ listPrice: "", offerPrice: "", targets: [], ...entry }} />
    </StyledTimelineEntry>
  );
};

export default TimelineEntry;
