import styled from "styled-components";
import { useState, useEffect } from "react";
import { Button as PublishButton } from "./Button";
import { IPost } from '../models/models';
import {
  useSetPostMutation,
  useEditPostMutation,
} from "../redux/jsonplaceholder.api/jsonplaceholder.api";

const ModalWrapper = styled.div`
  top: 50%;
  left: 50%;
  width: 550px;
  height: 550px;
  display: flex;
  background: #fff;
  position: absolute;
  border-radius: 5px;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  transform: translate(-50%, -50%);
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.3);
`;

const Input = styled.input`
  width: 80%;
  height: 30px;
  display: flex;
  color: #212529;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  margin-right: 5px;
  border-radius: 5px;
  font-family: inherit;
  background-color: #fff;
  border: 1px solid #bdbdbd;
  padding: 0.375rem 0.75rem;
  background-clip: padding-box;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

const Textarea = styled.textarea`
  width: 80%;
  height: 200px;
  display: flex;
  color: #212529;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  margin-right: 5px;
  border-radius: 5px;
  font-family: inherit;
  background-color: #fff;
  border: 1px solid #bdbdbd;
  padding: 0.375rem 0.75rem;
  background-clip: padding-box;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

export const Header = styled.h3`
  text-align: center;
  display: flex;
  position: relative;
`;

export const CloseButton = styled.div`
  left: 265px;
  top: -40px;
  padding: 20px;
  display: flex;
  cursor: pointer;
  position: absolute;
`;

interface ModalProps {
  handleModal: () => void;
  post: IPost | null;
  type: "publish" | "edit";
}

export const Modal = ({ handleModal, post, type }: ModalProps) => {
  const [inputs, setInputs] = useState({
    userId: "",
    title: "",
    description: "",
  });

  const [setPost, { isLoading }] = useSetPostMutation();
  const [editPost] = useEditPostMutation();

  let id: string | number | NodeJS.Timeout | undefined;

  const inputsHandler = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  const buttonHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    type: "publish" | "edit",
    postId?: number
  ) => {
    event.preventDefault();
    if (type === "publish") {
      setPost(inputs);
    } else {
      editPost({ postId, inputs });
    }
    id = setTimeout(() => {
      handleModal();
    }, 1000);
  };

  useEffect(() => {
    return () => {
      clearTimeout(id);
    };
  }, [id]);

  return (
    <ModalWrapper>
      <Header>
        <span>Add post</span>
        <CloseButton onClick={handleModal}>x</CloseButton>
      </Header>
      <Input
        required
        type="number"
        name="userId"
        value={inputs?.userId || post?.userId}
        placeholder="User ID"
        onChange={inputsHandler}
      ></Input>
      <Input
        required
        type="text"
        name="title"
        placeholder="Title"
        value={inputs?.title || post?.title}
        onChange={inputsHandler}
      ></Input>
      <Textarea
        required
        placeholder="Description"
        name="description"
        value={inputs?.description || post?.body}
        onChange={inputsHandler}
      ></Textarea>
      <PublishButton
        onClick={(e) =>
          buttonHandler(e, type, type === "edit" ? post?.id : undefined)
        }
        marginRight="40px"
        isLoading={isLoading}
        type="submit"
      >
        Publish
      </PublishButton>
    </ModalWrapper>
  );
};
