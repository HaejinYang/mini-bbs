import PostCardListContainer from "../post/PostCardListContainer";
import PostCardList from "../post/PostCardList";
import React, {useEffect, useReducer, useState} from "react";
import {useParams} from "react-router-dom";
import PostWrite from "../post/PostWrite";
import {PostType} from "../types";
import PostItem from "../post/PostItem";
import CommentList from "../comment/CommentList";
import Comment, {CommentType} from "../comment/Comment";
import styled from "styled-components";
import {createContext} from "react";
import CommentWrite from "../comment/CommentWrite";
import comment from "../comment/Comment";
import PostReducer from "../post/reducer/PostReducer";
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

const Post = () => {
    const {id} = useParams<ParamType>();
    const [postState, postDispatch] = useReducer(PostReducer, {posts: JSON.parse(localStorage.getItem('post')!)});
    const [commentState, commentDispatch] = useReducer(CommentReducer, {comments: JSON.parse(localStorage.getItem('comment')!)});
    useEffect(() => {
        return () => {
            console.log("unmounted");
        }
    }, []);
    const postStore = (post: PostType): void => {
        postDispatch({type: "STORE", post});
    }

    const commentStore = (comment: CommentType): void => {
        commentDispatch({type: 'STORE', comment});
    }

    if (id === 'view-all') {
        return (
            <PostContext.Provider value={{posts: postState.posts, store: postStore}}>
                <PostCardListContainer>
                    <PostCardList posts={postState.posts}/>
                </PostCardListContainer>
            </PostContext.Provider>
        );
    } else if (id === 'write') {
        return (
            <PostContext.Provider value={{posts: postState.posts, store: postStore}}>
                <PostWrite></PostWrite>
            </PostContext.Provider>
        );
    } else {
        return (
            <PostContext.Provider value={{posts: postState.posts, store: postStore}}>
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
            </PostContext.Provider>
        );
    }
}

export default Post;