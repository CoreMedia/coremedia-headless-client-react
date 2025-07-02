import React from "react";
import styled from "styled-components";
import VideoPlayer from "../Media/VideoPlayer";
import { Banner } from "../../models/Banner/Banner";

import useModal from "../Modal/Modal";
import ModalComponent from "../Modal/ModalComponent";
import PlayIcon from "./assets/play-button.svg";

interface Props {
  banner: Banner;
}

export const PlayButton = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  :before {
    display: block;
    padding-top: 150%;
    content: "";
  }

  :hover {
    > span {
      opacity: 100%;
    }
  }

  > * {
    width: 90px;
    height: 90px;
    mask-image: url("${PlayIcon}");
    background-color: #ffffff;
    opacity: 50%;
    background-size: contain;
    position: absolute;
    bottom: 50%;
    right: 50%;
    transform: translate(50%, 50%);
  }
`;

const ModalVideo: React.FC<Props> = ({ banner }) => {
  const { isShowing, toggle } = useModal();

  return (
    <>
      <ModalComponent isShowing={isShowing} hide={toggle}>
        <VideoPlayer {...banner} controls={false} autoPlay={true} muted={true} loop={true} />
      </ModalComponent>
      <PlayButton>
        <span onClick={toggle}></span>
      </PlayButton>
    </>
  );
};

export default ModalVideo;
