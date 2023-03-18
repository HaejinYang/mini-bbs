import {FC, useContext} from "react";
import {PostType} from "../types";
import styled from "styled-components";
import {CommentContext} from "./Post";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
const PostStyle = styled.div`
  padding: 16px;
  border: 1px solid #999;
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`
const PostItem: FC<PostType> = (props) => {
    return (
        <Wrapper>
            <PostStyle>
                <h2>{props.title}</h2>
                <p>{props.content}</p>
            </PostStyle>
        </Wrapper>
    )
}

export default PostItem;