import PostCardListContainer from "./PostCardListContainer";
import PostCardList from "./PostCardList";
import React, {useEffect, useReducer, useState} from "react";
import {useParams} from "react-router-dom";
import PostWrite from "./PostWrite";
import {PostType} from "../types";
import PostItem from "./PostItem";
import CommentList from "../comment/CommentList";
import Comment, {CommentType} from "../comment/Comment";
import styled from "styled-components";
import {createContext} from "react";
import CommentWrite from "../comment/CommentWrite";
import comment from "../comment/Comment";

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

interface PostReducerState {
    posts: PostType[];
}

type PostReducerActionType = "STORE" | "UPDATE";

interface PostReducerAction {
    type: PostReducerActionType;
    post?: PostType;
}

const PostReducer = (state: PostReducerState, action: PostReducerAction): PostReducerState => {
    const newState: PostReducerState = {...state, posts: [...state.posts]};
    switch (action.type) {
        case "STORE":
            if (action.post) {
                newState.posts.push(action.post);
            }
            break;
        case "UPDATE":
            if (action.post) {
                const index = newState.posts.findIndex((element) => element.id === action.post?.id);
                if (index !== -1) {
                    newState.posts[index] = {...action.post};

                    localStorage.setItem('post', JSON.stringify(newState.posts));
                }
            }
            break;
        default:
            break;
    }

    return newState;
}


interface PostContextType {
    posts: PostType[];
    store: (post: PostType) => void;
}

interface CommentContextType {
    comments: CommentType[];
    store: (comment: CommentType) => void;
}

const PostContext = createContext<PostContextType>({
    posts: [],
    store: () => {
    },
});

const CommentContext = createContext<CommentContextType>({
    comments: [],
    store: () => {
    }
})

interface CommentState {
    comments: CommentType[];
}

interface CommentAction {
    type: CommentActionType;
    comment?: CommentType;
}

type CommentActionType = "STORE" | "UPDATE";

const CommentReducer = (state: CommentState, action: CommentAction): CommentState => {
    const newState: CommentState = {...state, comments: [...state.comments]};
    switch (action.type) {
        case "STORE":
            if (action.comment) {
                newState.comments.push(action.comment);
                localStorage.setItem('comment', JSON.stringify(newState.comments));
            }
            break;
        case "UPDATE":
            break;
        default:
            break;
    }

    return newState;
}

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
export {PostContext, CommentContext};
