import PostCardListContainer from "../post/PostCardListContainer";
import PostCardList from "../post/PostCardList";
import React, {useContext} from "react";
import PostContext from "../post/context/PostContext";

const PostViewAllPage = () => {
    const postState = useContext(PostContext);

    return (
        <PostCardListContainer>
            <PostCardList posts={postState.posts}/>
        </PostCardListContainer>
    );
}

export default PostViewAllPage;