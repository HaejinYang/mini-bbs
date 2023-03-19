# 미니 게시판

## 목적
게시글과 댓글 기능이 있는 게시판을 만들어 본다

## 목표
1. 게시글을 작성하고 볼 수 있다.
2. 댓글을 작성하고 볼 수 있다.
3. 작성한 게시글과 댓글을 저장하여 다시 볼 수 있어야 한다.

## 추가 목표
1. 게시글과 댓글을 localStorage하고 있다. DB로 옮기고, 서버로부터 받아올 수 있게 한다.
2. RTK를 사용하여 상태 관리를 개선한다.

## 스택
1. react, typescript, styled-component
2. 리덕스 없이 useReducer, useState, context api로 상태 관리를 한다.

## 생각거리
- Post(게시글) 컴포넌트가 비대해졌다. 게시글과 댓글 관련 기능들이 모여 있어서 그런거 같다. 어떤게 바꿀 방법이 없을까.
  -  Post 컴포넌트 안에 있던 게시글, 댓글 관련 reducer와 context 소스를 분리하였다. 각 컴포넌트 안에 context와 reducer 디렉토리를 만들어서 관리.
  -  reducer와 context를 관리하는 방법을 찾아보니, 모든 컴포넌트의 reducer와 context를 모아놓은 디렉토리를 만들고 그 안에 다시 컴포넌트 별로 분리하기도 하는것 같다.
  -  이 부분은 계속 경험을 쌓아봐야겠다.
- 라우팅 대상이 되는 컴포넌트들을 페이지로 따로 분류하는 것도 같다.
- 라우팅 경로 이름이 별로다. post/view-all, post/write, post/1, post/2... 경로 이름을 잘못정하면서 기존의 Post 컴포넌트가 비대해진 것 같다. 머리 속에서 제대로 나누어져 있지 않으니, 일단 한 파일에 놓고 보자는 생각으로 처리했었다.
  - 동일한 상위 경로(/post)를 지니면서 정적(/post/write, /post/all), 동적(/post/숫자)로 변경하는 방법을 찾아봐야겠다.
  - post/all, post/write, post/1(동적)을 다룰 수 있도록 라우팅을 변경하고 페이지도 세분화하였다. [링크](https://stackoverflow.com/questions/73626071/how-to-implement-a-nested-route-with-a-dynamic-route)
