import {createContext} from "react";
import {CommentType} from "../Comment";

interface CommentContextType {
    comments: CommentType[];
    store: (comment: CommentType) => void;
}

const CommentContext = createContext<CommentContextType>({
    comments: [],
    store: () => {
    }
})

export default CommentContext;