import styled from "styled-components";

export const Error = styled.p`
  color: red;
  text-align: center;
`;

export const Loading = styled.h3`
  text-align: center;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PostsList = styled.ul`
  padding: 0;
`;

export const UserId = styled.div`
  margin-top: 5px;
  font-style: italic;
`;

export const PostItemWrapper = styled.li`
  list-style: none;
  margin-bottom: 10px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  &:nth-child(2n) {
    background-color: #d3d3d35e;
  }
`;

export const PostBody = styled.article`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const PostItemTitle = styled.h4`
  font-weight: bold;
  margin-bottom: 5px;
  margin-top: 0;
`;

export const Header = styled.h2`
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const FilterWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
  justify-content: space-between;
`;

export const ButtonWrapper = styled.div`
  width: 21%;
  display: flex;
  justify-content: space-between;
`;

export const PostItem = styled.article`
  max-width: 78%;
  & > a {
    color: black;
    text-decoration: none;
  }
`;
