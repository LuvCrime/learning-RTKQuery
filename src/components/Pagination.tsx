import styled from "styled-components";

const PaginationWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 1rem;
`;

const PaginationButton = styled.button`
  width: 40px;
  height: 40px;
  font-family: inherit;
  font-weight: 600;
  font-size: 16px;
  margin: 0 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: transparent;
  color: black;
  border-color: #eee;
  &.active {
    color: #101010;
    font-weight: 900;
    border-color: #101010;
    background: #d3d3d35e;
    caret-color: transparent;
  }
`;

interface PaginationProps {
  totalPosts?: number;
  postsPerPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const Pagination = ({
  totalPosts,
  postsPerPage,
  currentPage,
  setCurrentPage,
}: PaginationProps) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts! / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <PaginationWrapper>
      {pages.map((page, indx) => (
        <PaginationButton
          key={indx}
          onClick={() => setCurrentPage(page)}
          className={page === currentPage ? "active" : ""}
        >
          {page}
        </PaginationButton>
      ))}
    </PaginationWrapper>
  );
};
