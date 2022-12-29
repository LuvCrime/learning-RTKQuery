import styled from "styled-components";

const SearchField = styled.input`
  width: 30%;
  height: 30px;
  display: flex;
  color: #212529;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  margin-right: 5px;
  font-family: inherit;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #bdbdbd;
  padding: 0.375rem 0.75rem;
  background-clip: padding-box;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

interface SearchProps {
  search: string;
  setSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Search = ({ search, setSearch }: SearchProps) => {
  return (
    <SearchField
      type="text"
      value={search}
      placeholder="Search"
      onChange={setSearch}
    />
  );
};
