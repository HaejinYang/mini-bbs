import {FC} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

interface PostCardProps {
    id: number;
    title: string;
    writer: string;
    createdAt: string;
}

const PostCardStyle = styled.article`
  background-color: white;
  font-size: 14px;
  height: 2rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #ccc;
`

const Span = styled.span`
  width: 15%;
  overflow: hidden;
`

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  
  &:focus, &:hover, &:visited, &:link, &:active {
    color: black;
    text-decoration: none;
  }
`;

const PostCard: FC<PostCardProps> = (props) => {
    const title = props.title.length < 20 ? props.title : props.title.substring(0, 20) + "...";
    const link = `/post/${props.id}`;
    return (
        <StyledLink to={link}>
            <PostCardStyle>
                <Span>{props.id}</Span>
                <Span>{title}</Span>
                <Span>{props.writer}</Span>
                <Span>{props.createdAt}</Span>
            </PostCardStyle>
        </StyledLink>
    );
}

export default PostCard;
export type {PostCardProps};