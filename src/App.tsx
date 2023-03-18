import './global.css';
import React, {useReducer} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PostViewEachPage from "./components/page/PostViewEachPage";
import HomePage from "./components/page/HomePage";
import NavBar from "./components/nav/NavBar";
import {PostType} from "./components/types";
import {CommentType} from "./components/comment/Comment";
import PostReducer from "./components/post/reducer/PostReducer";
import PostContext from './components/post/context/PostContext';
import PostWritePage from "./components/page/PostWritePage";
import PostViewAllPage from "./components/page/PostViewAllPage";

function App() {
    CreateTestList();

    const [postState, postDispatch] = useReducer(PostReducer, {posts: JSON.parse(localStorage.getItem('post')!)});

    const postStore = (post: PostType): void => {
        postDispatch({type: "STORE", post});
    }
    return (
        <BrowserRouter>
            <NavBar/>
            <PostContext.Provider value={{posts: postState.posts, store: postStore}}>
                <Routes>
                    <Route path="/" element={<HomePage/>}></Route>
                    <Route path="/post/*">
                        <Route path=":id" element={<PostViewEachPage/>}></Route>
                        <Route path="write" element={<PostWritePage/>}></Route>
                        <Route path="all" element={<PostViewAllPage/>}></Route>
                    </Route>
                </Routes>
            </PostContext.Provider>
        </BrowserRouter>
    );
}

function CreateTestList() {
    const posts: PostType[] = [];
    posts.push({
        id: 1,
        title: "타이틀1111111111111111111111111",
        writer: "테스트게시자",
        content: "게시글내용",
        createdAt: new Date().toLocaleDateString()
    });
    posts.push({id: 2, title: "", writer: "테스트게시자", content: "게시글내용", createdAt: new Date().toLocaleDateString()});
    posts.push({
        id: 3,
        title: "1231234123123",
        writer: "테스트게시자",
        content: "게시글내용",
        createdAt: new Date().toLocaleDateString()
    });
    posts.push({id: 4, title: "타이틀", writer: "테스트게시자", content: "게시글내용", createdAt: new Date().toLocaleDateString()});
    posts.push({id: 5, title: "타이틀", writer: "테스트게시자", content: "게시글내용", createdAt: new Date().toLocaleDateString()});
    posts.push({id: 6, title: "타이틀", writer: "테스트게시자", content: "게시글내용", createdAt: new Date().toLocaleDateString()});
    posts.push({id: 7, title: "타이틀", writer: "테스트게시자", content: "게시글내용", createdAt: new Date().toLocaleDateString()});
    posts.push({id: 8, title: "타이틀", writer: "테스트게시자", content: "게시글내용", createdAt: new Date().toLocaleDateString()});

    localStorage.setItem('post', JSON.stringify(posts));

    const comments: CommentType[] = [];
    comments.push({postId: 1, commentId: 1, content: "댓글1입니다"});
    comments.push({postId: 1, commentId: 2, content: "댓글2입니다"});
    comments.push({postId: 1, commentId: 3, content: "댓글3입니다"});
    comments.push({postId: 1, commentId: 4, content: "댓글4입니다"});
    comments.push({postId: 2, commentId: 5, content: "댓글5입니다"});
    comments.push({postId: 2, commentId: 6, content: "댓글6입니다"});
    comments.push({postId: 2, commentId: 7, content: "댓글7입니다"});
    comments.push({postId: 1, commentId: 8, content: "댓글8입니다"});

    localStorage.setItem('comment', JSON.stringify(comments));
}

export default App;
