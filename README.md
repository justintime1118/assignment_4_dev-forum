# assignment_4_staffoverworked

### 개발 커뮤니티 서비스의 API 서버 만들기

당신은 개발 커뮤니티를 만드는 회사에의 취업에 성공하였습니다.

그러나 회사는 프론트엔드만 개발해 둔 상황이라 이제부터 새롭게 API 서버를 만들기 시작해야 합니다.

회사는 아래와 같은 요구조건을 당신에게 전달했습니다.

**요구조건**

1. **기술스택**
   - Node.js
   - Typescript
   - Express.js
   - ~~Domain Driven Design~~ → Context 단위로 도메인 구분
   - Prisma
   - PostgreSQL
   - JWT와 Bearer 토큰 조합의 인증
2. **기능**
   - 회원가입 및 로그인 기능
     -> /auth
   - 다음의 이름을 가진 게시판 2개
     1. 프론트엔드
     2. 백엔드
   - 로그인한 사용자가 게시판을 선택하여 글을 CRUD
     -> 게시판 목록 /forums
     -> 특정 게시판에 글 CRUD /forums/{forumName}/posts/{postId}
   - 로그인한 사용자가 글에 대한 댓글을 CRUD (대댓글 기능 필요 없음)
     -> 특정 글에 대한 댓글 CRUD /forums/{forumName}/posts/{postId}/comments/{commentId}
   - 로그인한 사용자가 글에 대해 좋아요 및 좋아요 취소 가능
     -> /forums/{forumName}/posts/{postId}/likes
   - 로그인한 사용자가 자신이 좋아요 했던 글을 모아 볼 수 있는 기능 -> /users/{userId}/likes
   - 로그인하지 않은 사용자도 모든 글을 볼 수 있는 기능
     - 홈페이지에서는 게시판별로 최신 글 10개씩을 SSR 방식으로 렌더링하여 보여줍니다.
       -> 게시판 별로 최신 글 가져오기 /forums/posts?page
     - 각 게시판 페이지에서는 최신 글부터 오래된 글 순으로 전체 글을 한 번에 보여줍니다.
       -> /forums/{forumName}/posts
3. 그 외
   - 장기적인 유지보수 용이성을 위한 _`적절한 코드 분리`_, _`구조화`_, _`명시적이고 가독성 높은 변수명`_ 필수
   - RESTful API
   - Postman을 사용한 API 문서(https://web.postman.co/documentation/21303610-37aae4c6-1cec-4eae-b7dd-d65e37cee67b/publish?workspaceId=0551ae93-0cca-4e23-87ee-ccc19d397c8d)
