import {MouseEvent, ChangeEvent, FormEvent, useContext, useState} from "react";
import styled from "styled-components";
import {useNavigate} from 'react-router-dom';
import PostContext from "./context/PostContext";

interface TextAreaProps {
    height: number;
}

const Wrapper = styled.div`
  padding: 16px;
  width: calc(100% - 32px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & * {
    :not(:last-child) {
      margin-bottom: 16px;
    }
  }
`

const TextArea = styled.textarea<TextAreaProps>`
  height: ${(props) => props.height}px;
  width: 400px;
  padding: 16px;
  font-size: 14px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: start;
  padding: 0px;
  width: 400px;
`

const ButtonStyle = styled.button`
  background-color: white;
  padding: 4px;
  border: 1px solid #999;
  
  &:hover {
    background-color: rgb(0 0 0 / 0.05);
    cursor: pointer;
  }
`

const PostWrite = () => {
    const [head, setHead] = useState("");
    const [body, setBody] = useState("");
    const {posts, store} = useContext(PostContext);
    const navigate = useNavigate();

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const nextId = posts.reduce((accId: number, current) => {
            if (accId < current.id) {
                return current.id;
            } else {
                return accId;
            }
        }, -1) + 1;

        store({
            id: nextId,
            title: head,
            content: body,
            writer: `작성자${nextId}`,
            createdAt: (new Date()).toLocaleDateString()
        });
        setHead("");
        setBody("");

        navigate(`/post/${nextId}`);
    }

    const onChangeHead = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setHead(e.target.value);
    }

    const onChangeBody = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setBody(e.target.value);
    };

    const onBack = (e: MouseEvent<HTMLButtonElement>) => {
        navigate(-1);
    }

    return (
        <Wrapper>
            <h2>글 작성하기</h2>
            <ButtonContainer>
                <ButtonStyle type="button" onClick={onBack}>뒤로가기</ButtonStyle>
            </ButtonContainer>
            <form onSubmit={onSubmit}>
                <TextArea height={50} placeholder="글 제목" value={head} onChange={onChangeHead}></TextArea> <br/>
                <TextArea height={400} placeholder="글 내용" value={body} onChange={onChangeBody}></TextArea> <br/>
                <ButtonStyle type="submit">작성완료</ButtonStyle>
            </form>
        </Wrapper>
    );
}

export default PostWrite;