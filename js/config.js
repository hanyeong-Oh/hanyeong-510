// =============================================================
//  사이트 설정 파일 — 이 파일만 수정하면 됩니다.
// =============================================================
window.APP_CONFIG = {
  SITE_NAME: 'English Study Club',

  // 스터디 멤버 (2명). name 은 화면에 표시되는 이름입니다.
  // 로그인 이메일은 공개 저장소에 올라가지 않도록 Supabase 의 members 테이블에만 저장합니다.
  MEMBERS: [
    { name: '오한영' },
    { name: '박정민' },
  ],

  // 이름을 바꿨을 때: 예전 이름으로 저장된 글·영상 기록을 새 이름으로 옮겨줌 { 예전: 새 }
  MEMBER_RENAMES: { '한영': '오한영', '정민': '박정민' },

  // 주제는 각자 자기 것을 정합니다. 이 멤버는 예전 방식의 공통 주제(주인 없는 주제)를 고칠 수 있어요.
  TOPIC_MANAGER: '오한영',

  // 글쓰기 요일 (0=일, 1=월, 2=화, 3=수, 4=목, 5=금, 6=토) — 기본: 월/수/금
  WRITING_DAYS: [1, 3, 5],

  // 영어공부 영상 카테고리
  VIDEO_CATEGORIES: ['리스닝', '스피킹', '문법', '어휘·표현', '발음', '비즈니스 영어', '기타'],

  // 영상 목록에 기본으로 넣어둘 유튜브 영상/재생목록 (위에 적은 것이 위에 보임)
  // 나중에 여기에 추가해도 아직 안 들어간 것만 자동으로 추가됩니다.
  // (제목과 썸네일은 사이트를 열면 자동으로 채워집니다)
  DEFAULT_VIDEOS: [
    { url: 'https://www.youtube.com/watch?v=beQNlMfPqbw', category: '기타' },
    { url: 'https://www.youtube.com/watch?v=TIx-yVScq9g', category: '기타' },
    { url: 'https://www.youtube.com/watch?v=H6XNM8x3Bt4', category: '기타' },
    { url: 'https://www.youtube.com/watch?v=Gaw7MoofW8s', category: '기타' },
    { url: 'https://www.youtube.com/playlist?list=PLg8Zuy2VA0n9R-oAhPrYoiU-dcwj7TE9l', category: '기타' },
    { url: 'https://www.youtube.com/watch?v=fccvj1TKpkg', category: '기타' },
    { url: 'https://www.youtube.com/watch?v=3mWbOzQ6kKg', category: '기타' },
    { url: 'https://www.youtube.com/playlist?list=PLhpp-vPvggtctjfjJeZePqCbwkJRRduNN', category: '기타' },
    { url: 'https://www.youtube.com/watch?v=GzzaEedWRXQ', category: '기타' },
    { url: 'https://www.youtube.com/watch?v=yv8aBYXPOZ8', category: '기타' },
    { url: 'https://www.youtube.com/watch?v=VFwgqMjWeEc', category: '기타' },
    { url: 'https://www.youtube.com/playlist?list=PLxoOU8azGw9Wnc1o0bdvfbBJBwa1Q-v9F', category: '기타' },
    { url: 'https://www.youtube.com/playlist?list=PLxoOU8azGw9UQ1XEK0SmGje0lZnycvNc1', category: '기타' },
    { url: 'https://www.youtube.com/playlist?list=PLxoOU8azGw9X3mcBKRRjcIeD_xoFAcv3Q', category: '기타' },
    { url: 'https://www.youtube.com/playlist?list=PLxoOU8azGw9V7iNiPIlJsiBF39GL3GWna', category: '기타' },
    { url: 'https://www.youtube.com/playlist?list=PLXF8cvSejlGkqCgLA793Tyuyvjo5NBKDV', category: '기타' },
  ],

  // Supabase 연결 정보 (README 참고). 비워두면 "로컬 모드"로 동작하며
  // 데이터가 이 브라우저에만 저장됩니다.
  // (anon 키는 공개돼도 되는 키예요. 데이터는 멤버로 로그인해야만 보입니다)
  SUPABASE_URL: 'https://xebzhefptewaswiccwtr.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlYnpoZWZwdGV3YXN3aWNjd3RyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE4ODY2MTUsImV4cCI6MjEwNzQ2MjYxNX0.hYZcoM9GuheY_Stjiom0Lb4umF8GXidsEzsvwGVSp-w',
};
