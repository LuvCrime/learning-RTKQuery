import styled from "styled-components";
import { useState } from "react";

const Wrapper = styled.div`
  display: flex;
`;

const DropdownWrapper = styled.div`
  position: relative;
`;

const ChoosenIDList = styled.div`
  display: flex;
`;

const ChoosenIDElement = styled.div`
  display: flex;
  width: 100px;
  cursor: default;
  margin-right: 5px;
  border-radius: 5px;
  align-items: center;
  border: 1px solid #eee;
  justify-content: center;
  caret-color: transparent;
`;

const DropdownMenu = styled.div`
  height: 100%;
  width: 150px;
  display: flex;
  cursor: pointer;
  border-radius: 5px;
  align-items: center;
  border: 1px solid #eee;
  justify-content: center;
  caret-color: transparent;
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.1);
`;

const DropdownUl = styled.ul`
  top: 31px;
  left: 0;
  right: 0;
  overflow: auto;
  padding-left: 0;
  background: #fff;
  list-style: none;
  max-height: 200px;
  position: absolute;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
`;

const DropdownLi = styled.li`
  display: flex;
  cursor: pointer;
  padding-top: 10px;
  padding-bottom: 10px;
  justify-content: center;
  &:hover {
    background: #eee;
  }
`;

interface DropdownProps {
  userIDs?: number[];
  handleDropdown: any;
  currentId: any;
}

export const Dropdown = ({
  userIDs,
  handleDropdown,
  currentId,
}: DropdownProps) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownInterceptor = (id: number) => {
    handleDropdown(id);
    setDropdownOpen(false);
  };

  return (
    <Wrapper>
      {currentId.length > 0 ? (
        <ChoosenIDList>
          {currentId.map((id: any) => {
            return <ChoosenIDElement key={id}>UserId: {id}</ChoosenIDElement>;
          })}
        </ChoosenIDList>
      ) : null}
      <DropdownWrapper>
        <DropdownMenu onClick={() => setDropdownOpen(!isDropdownOpen)}>
          Filter by userID
        </DropdownMenu>
        {isDropdownOpen ? (
          <DropdownUl>
            {userIDs?.map((id) => (
              <DropdownLi
                key={id}
                onClick={() => handleDropdownInterceptor(id)}
              >
                {id}
              </DropdownLi>
            ))}
          </DropdownUl>
        ) : null}
      </DropdownWrapper>
    </Wrapper>
  );
};
