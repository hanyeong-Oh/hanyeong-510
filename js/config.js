// =============================================================
//  사이트 설정 파일 — 이 파일만 수정하면 됩니다.
// =============================================================
window.APP_CONFIG = {
  SITE_NAME: 'English Study Club',

  // 스터디 멤버 (2명). name 은 화면에 표시되는 이름,
  // email 은 Supabase 로그인에 사용하는 이메일입니다. (로컬 모드에서는 비워둬도 됨)
  MEMBERS: [
    { name: '오한영', email: '' },
    { name: '박정민', email: '' },
  ],

  // 이름을 바꿨을 때: 예전 이름으로 저장된 글·영상 기록을 새 이름으로 옮겨줌 { 예전: 새 }
  MEMBER_RENAMES: { '한영': '오한영', '정민': '박정민' },

  // 글쓰기 주제를 정하는 멤버 (MEMBERS 의 name 과 같아야 함). 다른 멤버는 주제를 추가/수정/삭제할 수 없습니다.
  TOPIC_MANAGER: '오한영',

  // 글쓰기 요일 (0=일, 1=월, 2=화, 3=수, 4=목, 5=금, 6=토) — 기본: 월/수/금
  WRITING_DAYS: [1, 3, 5],

  // 영어공부 영상 카테고리
  VIDEO_CATEGORIES: ['리스닝', '스피킹', '문법', '어휘·표현', '발음', '비즈니스 영어', '기타'],

  // 영상 목록에 기본으로 넣어둘 유튜브 영상/재생목록 (위에 적은 것이 위에 보임)
  // 나중에 여기에 추가해도 아직 안 들어간 것만 자동으로 추가됩니다.
  // (제목과 썸네일은 사이트를 열면 자동으로 채워집니다)
  DEFAULT_VIDEOS: [
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
  SUPABASE_URL: '',
  SUPABASE_ANON_KEY: '',
};
