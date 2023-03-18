import Comment, {CommentType} from "./Comment";
import {FC} from "react";

interface CommentListType {
    comments: CommentType[];
}

const CommentList: FC<CommentListType> = (props) => {
    return (
        <div>
            {props.comments.map((item) => {
                return (
                    <Comment key={item.commentId}{...item}/>
                )
            })}
        </div>
    );
}

export default CommentList;