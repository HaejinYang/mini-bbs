import {FC, ReactNode} from "react";
import styled from "styled-components";

interface ContainerProps {
    children: ReactNode;
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 2px solid #999;
  margin-bottom: 10px;
`

const Span = styled.span`
  width: 15%;
`

const PostCardListContainer:FC<ContainerProps> = (props) => {
    return (
        <section>
            <h3>글 목록 보기</h3>
            <Header>
                <Span>번호</Span>
                <Span>글제목</Span>
                <Span>작성자</Span>
                <Span>작성일</Span>
            </Header>
            {props.children}
        </section>
    );
}

export default PostCardListContainer;