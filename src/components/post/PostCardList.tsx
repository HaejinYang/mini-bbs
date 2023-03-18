import {FC} from "react";
import PostCard, {PostCardProps} from "./PostCard";

interface PostCardListProps {
    posts: PostCardProps[];
}

const PostCardList: FC<PostCardListProps> = (props) => {
    return (
        <div>
            {
                props.posts.map((item) => {
                    return (<PostCard key={item.id} {...item}></PostCard>);
                })
            }
        </div>
    );
}

export default PostCardList;
export type {PostCardListProps};