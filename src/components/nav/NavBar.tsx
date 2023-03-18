import NavItem from "./NavItem";
import styled from "styled-components";

const Container = styled.nav`
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 16px;
`;

const NavBar = () => {
    return (
        <Container>
            <NavItem linkPath="/" text="처음화면"/>
            <NavItem linkPath="/post/all" text="글목록보기"/>
            <NavItem linkPath="/post/write" text="글쓰기"/>
        </Container>
    )
}

export default NavBar;