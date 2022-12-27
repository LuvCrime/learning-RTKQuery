import styled from "styled-components";

export const ButtonStyles = styled.button<ButtonProps>`
  height: 46px;
  width: 152px;
  display: flex;
  cursor: pointer;
  align-self: end;
  font-size: 1rem;
  border-radius: 5px;
  align-items: center;
  border: 1px solid #eee;
  background-color: #fff;
  justify-content: center;
  padding: 0.375rem 0.75rem;
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.1);
  margin-right: ${(props) => props.marginRight || "0px"};
`;

interface ButtonProps {
  children: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  marginRight?: string;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
}

export const Button = ({
  children,
  marginRight,
  onClick,
  isLoading,
  type,
}: ButtonProps) => {
  return (
    <ButtonStyles
      onClick={onClick}
      marginRight={marginRight}
      disabled={isLoading}
      type={type}
    >
      {children}
    </ButtonStyles>
  );
};
