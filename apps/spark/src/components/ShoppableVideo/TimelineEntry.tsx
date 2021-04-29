import React from "react";
import PortraitProductBanner from "../PortraitBanner/PortraitProductBanner";
import { useShoppableVideoContextState } from "./ShoppableVideoContext";
import { TimelineEntry as TimelineEntryInterface } from "../../models/Banner/VideoBanner";

const TimelineEntry: React.FC<TimelineEntryInterface> = ({ entry, activeIdForBlock, startTime, endTime }) => {
  const { activeBlock } = useShoppableVideoContextState();
  const visible = activeBlock === activeIdForBlock;

  return (
    <div className={`cm-shoppable__teaser ${visible ? "cm-shoppable__teaser--active" : ""}`}>
      <PortraitProductBanner banner={{ ...entry, title: "", plaintext: "", targets: [] }} />
    </div>
  );
};

export default TimelineEntry;
