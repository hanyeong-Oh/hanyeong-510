# English Study Club 📚

직장 동료와 둘이서 하는 영어 공부 사이트입니다. 흰 바탕에 검은 손그림 선, 회색 띠, 손글씨(Gaegu 폰트), 낙서 강아지 마스코트로 꾸몄어요. 빌드 과정 없이 HTML/CSS/JS로만 만들어서 `index.html`을 더블클릭하면 바로 열립니다.

## 주요 기능

### 1. ✍️ 영어 글쓰기 (주 3회)
- **주제 정하기**: 월·수·금(설정 가능)마다 주제를 정합니다. 주제는 `TOPIC_MANAGER`로 지정한 멤버(기본: 한영)만 추가·수정·삭제할 수 있고, 다른 멤버에게는 "주제를 정할 예정이에요"라고 보입니다.
- **직접 쓰기**: 각자 주제에 맞춰 영어로 글을 씁니다. 단어 수가 표시됩니다.
- **AI 검수**: `📋 AI 검수 요청문 복사` 버튼을 누르면 내 글이 들어간 검수 요청문이 복사됩니다. ChatGPT, Claude, Gemini 등에 붙여넣으세요.
- **수정본 입력**: AI가 고쳐준 수정본과 피드백(배운 표현)을 사이트에 따로 입력합니다.
- **비교 보기**: 원문과 수정본을 자동으로 비교해서 <del>지운 부분</del>은 빨간색, <ins>바뀐 부분</ins>은 초록색으로 보여줍니다.
- **진행 현황**: 홈에서 이번 주 3회차의 작성/검수 상태와 멤버별 누적 기록(작성 글 수, 검수 완료 수, 누적 단어 수)을 볼 수 있습니다.

### 2. 🎬 영어공부 영상
- 유튜브 링크(`youtube.com/watch`, `youtu.be`, `shorts` 등)를 붙여넣으면 썸네일이 나오고 제목도 자동으로 채워집니다.
- 카테고리: 리스닝 / 스피킹 / 문법 / 어휘·표현 / 발음 / 비즈니스 영어 / 기타 (`js/config.js`에서 수정 가능)
- 카테고리 필터, 검색, 메모, 멤버별 **시청 완료** 표시
- 썸네일을 누르면 사이트 안에서 바로 재생됩니다.

## 파일 구조

```
index.html          # 페이지 뼈대
css/style.css       # 디자인
js/config.js        # ⭐ 설정 (멤버 이름, 글쓰기 요일, 영상 카테고리, Supabase 키)
js/store.js         # 데이터 저장 (로컬 / Supabase)
js/mascot.js        # 손그림 강아지 마스코트 · 발바닥 아이콘 (SVG)
js/diff.js          # 원문·수정본 비교
js/app.js           # 화면과 기능
supabase/schema.sql # Supabase 테이블 생성 SQL
```

## 시작하기

### 1단계 — 설정 바꾸기
`js/config.js`에서 멤버 이름을 바꿉니다.

```js
MEMBERS: [
  { name: '한영', email: '' },
  { name: '정민', email: '' },
],
TOPIC_MANAGER: '한영',   // 주제를 정하는 사람
WRITING_DAYS: [1, 3, 5], // 월·수·금
```

### 2단계 — 바로 써보기 (로컬 모드)
`index.html`을 브라우저로 열면 됩니다. 이때는 **이 브라우저에만** 저장되므로 혼자 테스트할 때 쓰세요.
(상단 배너의 `백업 내보내기/가져오기`로 JSON 백업 가능)

### 3단계 — 동료와 함께 쓰기 (Supabase 연결, 무료)
두 사람이 같은 데이터를 보려면 온라인 DB가 필요합니다. [Supabase](https://supabase.com) 무료 플랜이면 충분합니다.

1. supabase.com 가입 → **New project** 생성
2. 왼쪽 메뉴 **SQL Editor** → `supabase/schema.sql` 내용을 붙여넣고 **Run**
3. **Authentication → Users → Add user** 로 두 사람의 계정(이메일 + 비밀번호)을 만듭니다.
   - ⚠️ 그 다음 **Authentication → Sign In / Providers** 에서 **Allow new users to sign up** 을 꺼주세요. (모르는 사람이 가입하지 못하게)
4. **Project Settings → API** 에서 `Project URL`과 `anon public` 키를 복사해 `js/config.js`에 넣습니다.

```js
MEMBERS: [
  { name: '한영', email: 'me@company.com' },     // 3번에서 만든 이메일
  { name: '정민', email: 'coworker@company.com' },
],
SUPABASE_URL: 'https://xxxx.supabase.co',
SUPABASE_ANON_KEY: 'eyJhbGciOi...',
```

> anon 키는 공개돼도 괜찮은 키입니다. 테이블은 로그인한 사용자만 읽고 쓸 수 있도록 막혀 있습니다(RLS).

### 4단계 — 인터넷에 올리기 (GitHub Pages, 무료)
1. 이 저장소의 **Settings → Pages**
2. **Source: Deploy from a branch**, Branch: `main` / `/ (root)` 선택 후 Save
3. 잠시 후 `https://<깃허브아이디>.github.io/<저장소이름>/` 주소로 접속할 수 있습니다. 이 주소를 동료에게 공유하세요.

## 사용 흐름

1. 주제 담당(한영)이 홈에서 `+ 주제 정하기` → 주제 입력
2. 각자 `쓰러 가기 →` 눌러 영어로 글쓰기 → 저장
3. `📋 AI 검수 요청문 복사` → AI에게 검수 받기
4. 받은 수정본 / 피드백을 `검수본 입력`에 붙여넣기 → 저장
5. 주제 페이지에서 서로의 원문·수정본·비교를 보며 같이 복습 💪
