import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLazyGetPostQuery } from "../redux/jsonplaceholder.api/jsonplaceholder.api";
import styled from "styled-components";

const PostWrapper = styled.div`
  padding-left: 200px;
  padding-right: 200px;
`;

export const Post: React.FC = () => {
  const { postId } = useParams();
  const [fetchPost, { data: myPost }] = useLazyGetPostQuery();

  useEffect(() => {
    fetchPost(postId!);
  }, [fetchPost, postId]);

  return (
    <PostWrapper>
      <h2>{myPost?.title}</h2>
      <article>{myPost?.body}</article>
    </PostWrapper>
  );
};
