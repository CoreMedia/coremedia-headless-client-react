import React, { FC } from "react";
import NotFoundIcon from "./assets/not-found.svg";
import "./Alert.scss";
import { ApolloError, ServerError } from "@apollo/client";
import { getEndpoint } from "../../utils/App/App";
import { isPreview } from "../../utils/Preview/Preview";

interface Props {
  errorCode?: number;
  title?: string;
  message?: string;
  icon?: string;
  error?: ApolloError;
}

export const Alert: FC<Props> = ({ errorCode = 404, title = "Alert", message = "", icon = NotFoundIcon }) => {
  return (
    <div className={"cm-alert"}>
      {icon && <img className={"cm-alert__icon"} src={icon} alt="" />}
      {title && (
        <h1 className={"cm-alert__title"}>
          {errorCode} - {title}
        </h1>
      )}
      {message && <p className={"cm-alert__message"}>{message}</p>}
    </div>
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
    console.error("Error: Endpoint =", getEndpoint());
    console.error(error);
  }
  const statusCode = error?.networkError as ServerError;
  return <Alert errorCode={statusCode?.statusCode || 500} title="Apollo Client Error" message={error?.message} />;
};
