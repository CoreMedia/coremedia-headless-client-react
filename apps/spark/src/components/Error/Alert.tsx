import React, { FC } from "react";
import { ApolloError, ServerError } from "@apollo/client";
import styled from "styled-components";
import log from "loglevel";
import { getEndpoint } from "../../utils/App/App";
import { isPreview } from "../../utils/Preview/Preview";
import NotFoundIcon from "./assets/not-found.svg";

interface Props {
  errorCode?: number;
  title?: string;
  message?: string;
  icon?: string;
  error?: ApolloError;
}

export const StyledAlert = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  flex-grow: 1;
  width: 100%;

  img {
    height: 15vw;
  }

  h1 {
    margin-top: 0;
    font-size: var(--font-size-heading-1);
  }

  p {
    max-height: 25vh;
    overflow: auto;
  }
`;

export const Alert: FC<Props> = ({ errorCode = 404, title = "Alert", message = "", icon = NotFoundIcon }) => {
  return (
    <StyledAlert className={"error"}>
      {icon && <img src={icon} alt="" />}
      {title && (
        <h1>
          {errorCode} - {title}
        </h1>
      )}
      {message && <p>{message}</p>}
    </StyledAlert>
  );
};

export const PageNotFoundAlert: React.FC<Props> = () => {
  return <Alert title="Page not found" message="Sorry, the requested page could not be found." />;
};

export const ProductNotFoundAlert: React.FC<Props> = () => {
  return <Alert title="Product not found" message="Sorry, the requested product could not be found." />;
};

export const CategoryNotFoundAlert: React.FC<Props> = () => {
  return <Alert title="Category not found" message="Sorry, the requested product could not be found." />;
};

export const ApolloClientAlert: React.FC<Props> = ({ error }) => {
  if (isPreview()) {
    log.error("Apollo Client Error: Endpoint =", getEndpoint());
    log.error(error);
  }
  const networkError = error?.networkError as ServerError;
  const errorMessage = [...new Set(error?.message.split("\n"))].toString().replaceAll(",", "\n"); // filter duplicate messages
  return <Alert errorCode={networkError?.statusCode || 500} title="Apollo Client Error" message={errorMessage} />;
};
