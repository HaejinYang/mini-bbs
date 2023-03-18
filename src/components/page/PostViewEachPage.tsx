import React, {useContext, useEffect, useReducer} from "react";
import {useParams} from "react-router-dom";
import PostItem from "../post/PostItem";
import CommentList from "../comment/CommentList";
import {CommentType} from "../comment/Comment";
import styled from "styled-components";
import CommentWrite from "../comment/CommentWrite";
import comment from "../comment/Comment";
import CommentReducer from "../comment/reducer/CommentReducer";
import PostContext from "../post/context/PostContext";
import CommentContext from "../comment/context/CommentContext";

type ParamType = {
    id: string;
}

const Wrapper = styled.div`
  width: calc(100%);
  padding: 16px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 450px;
`

const PostViewEachPage = () => {
    const {id} = useParams<ParamType>();
    const [commentState, commentDispatch] = useReducer(CommentReducer, {comments: JSON.parse(localStorage.getItem('comment')!)});
    const postState = useContext(PostContext);
    useEffect(() => {
        return () => {
            console.log("unmounted");
        }
    }, []);

    const commentStore = (comment: CommentType): void => {
        commentDispatch({type: 'STORE', comment});
    }

    return (
        <Wrapper>
            <Container>
                {postState.posts.filter((post) => {
                    return post.id === Number(id);
                }).map(item => {
                    return (
                        <PostItem key={item.id} {...item} />
                    )
                })}
                <CommentList comments={commentState.comments.filter((comment) => {
                    return comment.postId === Number(id);
                })}/>
                <CommentContext.Provider value={{comments: commentState.comments, store: commentStore}}>
                    <CommentWrite postId={Number(id)}></CommentWrite>
                </CommentContext.Provider>
            </Container>
        </Wrapper>
    );
}

export default PostViewEachPage;