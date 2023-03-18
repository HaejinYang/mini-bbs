import {PostType} from "../../types";
import {createContext} from "react";

interface PostContextType {
    posts: PostType[];
    store: (post: PostType) => void;
}

const PostContext = createContext<PostContextType>({
    posts: [],
    store: () => {
    },
});

export default PostContext;