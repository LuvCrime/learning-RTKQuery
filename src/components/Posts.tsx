import { useState, useCallback } from "react";
import {
  useGetPostsQuery,
  useDeletePostMutation,
} from "../redux/jsonplaceholder.api/jsonplaceholder.api";
import {
  Error,
  UserId,
  Header,
  Wrapper,
  Loading,
  PostBody,
  PostsList,
  PostItem,
  FilterWrapper,
  ButtonWrapper,
  PostItemTitle,
  PostItemWrapper,
} from "./Posts.styled";
import { Link } from "react-router-dom";
import { Pagination } from "./Pagination";
import { Search } from "./Search";
import { IPost } from "../models/models";
import { Dropdown } from "./Dropdown";
import { Modal } from "./Modal";
import { Button } from "./Button";

export const Posts = () => {
  const { isLoading, isError, data } = useGetPostsQuery();
  const [deletePost] = useDeletePostMutation();
  const [isModal, setModal] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [currentIdsArray, setCurrentIdsArray] = useState<number[]>([]);
  const [currentPosts, setCurrentPosts] = useState<IPost[]>([]);
  const [editingPost, setEditingPost] = useState<IPost>({
    body: "",
    id: 0,
    title: "",
    userId: 0,
  });

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currArr =
    currentPosts.length > 0 
      ? currentPosts.slice(firstPostIndex, lastPostIndex)
      : data?.slice(firstPostIndex, lastPostIndex);


  const searchPost = (searchPost: string) => {
    setSearch(searchPost!);

    const c = currentPosts.length > 0 ? currentPosts : data;

    const filtered = c?.filter(
      (post) =>
        post.body.toLowerCase().indexOf(searchPost) > -1 ||
        post.title.toLowerCase().indexOf(searchPost) > -1
    );

    setCurrentPosts(filtered as IPost[]);
  };

  const filterByUserId = useCallback(() => {
    const filtred = data?.filter((item) =>
      currentIdsArray.includes(item.userId)
    );

    setCurrentPosts(filtred as IPost[]);
  }, [currentIdsArray, data]);

  const getSortedIDs = (data: IPost[]) => {
    return [...new Set(data?.map((post) => post.userId))];
  };

  const handleDropdown = (id: number) => {
    if (currentIdsArray.includes(id)) {
      console.log("ID is already added");
    } else {
      currentIdsArray.push(id);
      setCurrentIdsArray(currentIdsArray);
      filterByUserId();
    }
  };

  const handleModal = () => {
    setModal(!isModal);
  };

  const editPostHandle = (post: any) => {
    setEdit(true);
    setModal(!isModal);
    setEditingPost(post)
  };

  return (
    <Wrapper>
      {isError && <Error>Something went wrong...</Error>}
      {isLoading && <Loading>Loading...</Loading>}
      {!isError && !isLoading && <Header>Posts</Header>}
      <FilterWrapper>
        <Search
          search={search}
          setSearch={(e: React.ChangeEvent<HTMLInputElement>) =>
            searchPost(e.target.value)
          }
        />
        <Dropdown
          currentId={currentIdsArray}
          userIDs={getSortedIDs(data!)}
          handleDropdown={handleDropdown}
        />
      </FilterWrapper>
      {isModal && <Modal handleModal={handleModal} post={isEdit ? editingPost : null} type={isEdit ? 'edit' : 'publish'} />}
      <Button onClick={handleModal}>Add post</Button>
      <PostsList>
        {currArr?.map((post) => (
          <PostItemWrapper key={post?.id || post?.userId}>
            <PostItem>
              <Link to={`posts/${post?.id}`} target="_blank">
                <PostItemTitle>
                  <span>{post?.id}.</span> {post?.title}
                </PostItemTitle>
                <PostBody>{post?.body}</PostBody>
                <UserId>User ID: {post?.userId}</UserId>
              </Link>
            </PostItem>
            <ButtonWrapper>
              <Button onClick={() => deletePost(post.id)}>Delete</Button>
              <Button onClick={() => editPostHandle(post)}>Edit</Button>
            </ButtonWrapper>
          </PostItemWrapper>
        ))}
      </PostsList>
      <Pagination
        currentPage={currentPage}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        totalPosts={
          currentPosts.length > 0 ? currentPosts.length : data?.length
        }
      />
    </Wrapper>
  );
};
