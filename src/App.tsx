import { Posts } from "./components/Posts";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

const Wrapper = styled.div`
  padding-left: 200px;
  padding-right: 200px;
  padding-bottom: 30px;
`;

function App() {
  return (
    <Wrapper>
      <Outlet />

      <Posts />
    </Wrapper>
  );
}

export default App;
