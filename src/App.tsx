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
                    <Route path="/post">
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
        title: "안녕하세요",
        writer: "홍길동",
        content: "Lorem ipsum dolor sit amet. A harum consequatur et cumque reiciendis sed dolor eius et nobis inventore sit eligendi voluptatem. Et alias deserunt ut vero similique qui aperiam obcaecati non consequuntur cumque qui galisum itaque est natus ratione quo incidunt asperiores.",
        createdAt: new Date().toLocaleDateString()
    });
    posts.push({id: 2, title: "글제목2", writer: "김영희", content: "", createdAt: new Date().toLocaleDateString()});
    posts.push({
        id: 3,
        title: "글제목3",
        writer: "테스트게시자",
        content: "게시글내용",
        createdAt: new Date().toLocaleDateString()
    });
    posts.push({id: 4, title: "타이틀4", writer: "게시자4", content: "게시글내용", createdAt: new Date().toLocaleDateString()});
    posts.push({id: 5, title: "타이틀5", writer: "게시자5", content: "게시글내용", createdAt: new Date().toLocaleDateString()});
    posts.push({id: 6, title: "타이틀6", writer: "게시자6", content: "게시글내용", createdAt: new Date().toLocaleDateString()});
    posts.push({id: 7, title: "타이틀7", writer: "게시자7", content: "게시글내용", createdAt: new Date().toLocaleDateString()});
    posts.push({id: 8, title: "타이틀8", writer: "게시자8", content: "게시글내용", createdAt: new Date().toLocaleDateString()});

    localStorage.setItem('post', JSON.stringify(posts));

    const comments: CommentType[] = [];
    comments.push({postId: 1, commentId: 1, content: "안녕하세요."});
    comments.push({postId: 1, commentId: 2, content: "반갑습니다."});
    comments.push({postId: 1, commentId: 3, content: "환영합니다."});
    comments.push({postId: 1, commentId: 4, content: "어서오세요."});
    comments.push({postId: 2, commentId: 5, content: "이쪽입니다."});
    comments.push({postId: 2, commentId: 6, content: "저쪽입니다."});
    comments.push({postId: 2, commentId: 7, content: "여기로가세요."});
    comments.push({postId: 1, commentId: 8, content: "저기로가세요."});

    localStorage.setItem('comment', JSON.stringify(comments));
}

export default App;
