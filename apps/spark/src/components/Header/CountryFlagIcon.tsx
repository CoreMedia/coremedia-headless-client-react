import React, { FC } from "react";
import "country-flag-icons/1x1/flags.css";
import styled from "styled-components";

interface Props {
  countryCode?: string;
  size?: number;
}

export const StyledCountryFlagIcon = styled.span<{ size?: number }>`
  width: ${(props) => (props.size ? `${props.size}px` : "20px")};
  height: ${(props) => (props.size ? `${props.size}px` : "20px")};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
  overflow: hidden;
`;

const CountryFlagIcon: FC<Props> = ({ countryCode, size }) => {
  if (!countryCode) {
    return null;
  }

  const flagClass = `flag flag:${countryCode}`;
  return <StyledCountryFlagIcon className={flagClass} size={size} />;
};

export default CountryFlagIcon;
