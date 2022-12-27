import { useRouteError } from "react-router-dom";
import styled from "styled-components";

interface RouteErr {
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteErr;

  const ErrorPage = styled.div`
    padding: 20px;
  `;

  const Warning = styled.span`
    color: red;
  `;

  return (
    <ErrorPage>
      <h1>Oops!</h1>
      <p>
        Sorry, an unexpected <Warning>error</Warning> has occurred.
      </p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </ErrorPage>
  );
}
