import styled from "styled-components";
import {FC, useContext, MouseEvent, useState, ChangeEvent} from "react";
import { CommentType } from "./Comment";
import CommentContext from "./context/CommentContext";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: end;
`;

const TextArea = styled.textarea`
  padding: 4px;
  width: 100%;
  margin-bottom: 6px;
  border-radius: 5px;
`

const Button = styled.button`
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    background-color: rgb(0 0 0 / 0.05);
  }
`

interface CommentWriteProps {
    postId: number;
}

const CommentWrite: FC<CommentWriteProps> = (props) => {
    const {store, comments} = useContext(CommentContext);
    const [comment, setComment] = useState("");
    const onClick = (e: MouseEvent<HTMLButtonElement>) => {
        const commentId: number = comments.reduce((accId, cur) => {
            return accId < cur.commentId ? cur.commentId : accId;
        }, -1) + 1;

        const newComment: CommentType = {postId: props.postId, content: comment, commentId};
        store(newComment);
        setComment("");
    }

    const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
    }

    return (
        <Container>
            <TextArea placeholder="댓글" value={comment} onChange={onChange}></TextArea>
            <Button onClick={onClick}>등록</Button>
        </Container>
    )
}

export default CommentWrite