// 문법 개념 — 초보자에게 필요한 순서대로 (쉬운 것 → 어려운 것)
// 카테고리마다: 기초 개념 → 핵심 정리(예문) → 원어민 감각 → 자주 하는 실수
// 문장 안의 **굵게** 는 화면에서 굵은 글씨로 보입니다.
// examples: [영어, 한국어 해석, (선택) 한 줄 설명]   mistakes: [틀린 문장, 맞는 문장, 이유]
// videos: [유튜브 영상 ID 또는 재생목록 ID(PL…), 제목] → 페이지 위 '관련 영상'에 링크로 나와요
// 순서를 바꾸려면 아래 블록 위치를 옮기면 돼요.
window.GRAMMAR = [
  {
    id: 'skeleton',
    title: '문장의 뼈대',
    sub: '주어 · 서술어 · 보어 · 수식어',
    summary: '영어 문장은 결국 "누가 + 어떻다/한다". 나머지는 거들 뿐이에요.',
    basics: [
      '모든 문장에는 **주어**(누가/무엇이)와 **서술어**(어떻다/무엇을 한다)가 꼭 있어요.',
      '**품사**는 단어의 종류(명사, 형용사, 동사, 부사…), **성분**은 문장 안에서 맡은 역할(주어, 서술어, 목적어, 보어, 수식어)이에요. 같은 단어도 역할은 바뀔 수 있어요.',
      '**보어**는 빠지면 말이 안 되는 단어, **수식어**는 빠져도 말이 되는 단어예요.',
    ],
    sections: [
      {
        title: '보어 vs 수식어 구별법',
        points: [
          '"주어 + 그 단어"만 붙여서 말해 보세요. 뜻이 통하면 **보어**, 안 통하면 **수식어**예요.',
          'I am happy → "I happy" (나 행복) 통함 → happy는 보어',
          'They run slowly every day → "They slowly" 안 통함 → slowly, every day는 수식어. 이 문장의 서술어는 run 자체예요.',
        ],
        examples: [
          ['I am a student.', '나는 학생이다.', 'I = student (신분)'],
          ['The game is over.', '게임이 끝났다.', 'game = over (상태)'],
          ['The tall man became a famous doctor after 20 years.', '그 키 큰 남자는 20년 후 유명한 의사가 됐다.', '핵심은 man = doctor. 나머지는 전부 수식어'],
        ],
      },
      {
        title: '연결동사와 본동사',
        points: [
          'am, is, looks, became 처럼 주어와 보어를 **이어 주기만** 하는 동사가 **연결동사**예요. 그 자체로는 뜻이 거의 없어요.',
          'run, eat, study 처럼 동사 자체가 서술어 역할을 하는 동사가 **본동사**예요. 이때는 보어가 필요 없어요.',
        ],
      },
      {
        title: '긴 문장은 거품 빼기',
        points: [
          '긴 문장은 **수식어(거품)를 괄호로 묶어 걷어내고** 뼈대(주어 + 동사)부터 찾아요.',
          '거품 ① **전치사구**: (in N), (about N), (with N)',
          '거품 ② **관계대명사절**: N (who / which / that + 불완전한 문장) → 앞 명사를 꾸며요.',
          '거품 ③ **형용사적 to부정사**: N (to R) → "~할"',
          '단, **명사절은 거품이 아니에요.** what + 불완전 / that + 완전 은 주어·목적어·보어 자리라서 걷어내면 문장이 무너져요.',
        ],
        examples: [
          ['The girl (who is standing over there) (with a red bag) is my sister.', '저기 서 있는 빨간 가방 든 여자애가 내 동생이야.', '뼈대: The girl is my sister.'],
          ['I need a pen (to write with).', '쓸 펜이 필요해.', '뼈대: I need a pen.'],
          ['I know that he is honest.', '나는 그가 정직하다는 걸 안다.', 'that절은 know의 목적어 → 걷어내지 않음'],
        ],
      },
    ],
    native: [
      '연결동사는 뜻이 약해서 대화에선 자주 빠져요. "You okay?", "Game over.", "Me too."',
      '긴 문장도 주어와 서술어부터 찾으면 바로 읽혀요. 수식어는 일단 괄호 치고 읽는 연습을 해 보세요.',
    ],
    mistakes: [
      ['I am agree with you.', 'I agree with you.', 'agree가 이미 동사예요. be동사 + 동사원형은 같이 못 써요.'],
      ['She is very worry.', 'She is very worried.', 'be 뒤 보어 자리엔 형용사(worried)가 와야 해요.'],
    ],
  },

  {
    id: 'tense',
    title: '시제',
    sub: '현재 · 진행 · 현재완료(진행) · 과거 · 과거완료 · 미래 · 미래완료',
    summary: '시제는 "언제"보다 "말하는 사람이 그 일을 어떻게 보느냐"예요.',
    videos: [
      ['3mWbOzQ6kKg', '현재완료 vs 현재완료진행 — 영어실력이 2단계 상승하는 시제 공부'],
      ['Gaw7MoofW8s', 'Been은 대체 언제 쓰는 것인가!'],
    ],
    basics: [
      '**현재형**은 "지금 이 순간"이 아니라 **늘 그런 일**(습관, 사실, 정체성)이에요. I work in Seoul.',
      '**현재진행형**(be + -ing)은 **지금 하고 있는 일**, 또는 **잠깐 동안 하는 일**이에요. I\'m working from home this week.',
      '**현재완료**(have + p.p.)는 **과거의 일이 지금과 연결**돼 있을 때 써요. 한국어에 딱 맞는 시제가 없어서 가장 헷갈려요.',
      '**과거형**은 **끝난 일**이에요. 언제인지(yesterday, last year, in 2020)가 나오면 과거형.',
      '완료형에는 늘 **p.p.(과거분사)**가 들어가요. be동사의 p.p.가 바로 **been**이에요.',
    ],
    sections: [
      {
        title: '현재형 vs 과거형 — 과거형은 지금과 끊겨요',
        points: [
          '**단순 현재형**은 어제도, 오늘도, 내일도 그렇다는 뜻이에요. 그래서 그 사람의 **정체성**(직업, 습관)을 말해요.',
          'I am an English teacher. / I teach English. → 둘 다 "내 직업은 영어 선생님"이라는 말에 가까워요.',
          '**단순 과거형**은 **현재와 단절**돼요. 영어는 냉정한 언어라서, 과거형으로 말하면 듣는 사람은 자동으로 "아, 지금은 아니구나"라고 생각해요.',
          'I was an English teacher. / I taught English. → "예전에 영어 선생님이었다(지금은 아님)"로 들려요.',
          '"과거부터 해 왔고 지금도 이어진다"를 말하고 싶을 때 쓰는 게 **have + p.p.(완료)**예요.',
        ],
        examples: [
          ['I am an English teacher.', '나는 영어 선생님이야.', '정체성 — 어제도 오늘도 내일도'],
          ['I teach English.', '나는 영어를 가르쳐.', '직업을 말하는 느낌'],
          ['I was an English teacher.', '나는 영어 선생님이었어.', '지금은 아니라는 뜻으로 들려요'],
          ['I taught English.', '나는 영어를 가르쳤어.', '현재와 끊긴 과거'],
        ],
      },
      {
        title: '현재완료 vs 과거 — 핵심은 "지금과 연결되나?"',
        points: [
          '경험: I\'ve been to Japan twice. (지금까지 살면서)',
          '계속: I\'ve worked here for 3 years. (지금도 다님)',
          '결과: I\'ve lost my key. (그래서 지금 키가 없음)',
          '완료: I\'ve just finished the report. (방금 끝냄)',
          '**yesterday, last week, ago, in 2020** 처럼 끝난 시점이 나오면 현재완료를 못 써요 → 과거형',
        ],
        examples: [
          ["I've finished the report.", '보고서 다 했어요.', '지금 다 된 상태가 중요'],
          ['I finished the report yesterday.', '어제 보고서 끝냈어요.', '끝난 시점 → 과거형'],
          ["How long have you worked here?", '여기서 일한 지 얼마나 됐어요?'],
        ],
      },
      {
        title: 'have + p.p.의 진짜 뜻 — have는 그대로 "가지고 있다"',
        points: [
          'have의 원래 뜻은 **가지다, 소유하다**예요. 완료형에 빌려 써도 이 뜻은 그대로 남아 있어요.',
          'p.p.는 "**~한, ~된, ~인**" 이라는 뜻이에요. 그래서 have + p.p. = "**~한 것(행위·경험·상태)을 지금 가지고 있다**"예요.',
          'I have been an English teacher for five years. → "나는 **가지고 있다**, 영어 선생님인 **상태를**, 5년간" → 원어민은 "영어 선생님 한 지 5년째구나"라고 들어요.',
          'I have taught English for five years. → "나는 **가지고 있다**, 영어를 가르친 **행위·경험을**, 5년간" → "5년째 영어 선생님으로 일해 왔다"',
          'I have killed ~ → "나는 죽인 그 행위·경험을 지금 가지고 있다" 하나의 그림으로 봐요.',
          '한국어는 **완료**라는 개념이 약해서 우리말로 옮기면 과거와 비슷해 보여요. 하지만 영어에선 과거형과 분명히 다른 뜻이에요. (지금과 이어져 있음)',
        ],
        examples: [
          ['I have been an English teacher for five years.', '나는 5년째 영어 선생님이야.', '영어 선생님인 상태를 5년간 가지고 있음'],
          ['I have taught English for five years.', '나는 5년째 영어를 가르치고 있어.', '가르친 행위·경험을 5년간 가지고 있음'],
        ],
      },
      {
        title: '경험 · 계속 · 결과 · 완료 — 딱 잘라 나눠지지 않아요',
        points: [
          '문법책은 현재완료를 **경험, 계속, 결과, 완료** 네 가지로 나눠요. 정리하기 편하라고 만든 분류일 뿐이에요.',
          '실제 문장은 넷 중 하나에 딱 들어가지 않는 경우가 많아요. 그래서 "이건 무슨 용법?"을 따지는 건 별 의미가 없어요.',
          '예를 들어 면접에서 "I have been an English teacher for five years."라고 하면, "5년간 선생님이었다(계속)"는 말이면서 "그러니까 이 일 잘 알아요(경험)"라는 말이기도 해요. 이때는 I have taught English for five years.라고 해도 거의 같은 뜻이에요.',
          '뒤에 **several times(몇 번)** 같은 말이 붙으면 "지금 직업은 아니어도 그런 경험이 있다"는 **경험** 쪽이 돼요.',
          '결론: 네 가지 이름을 외우기보다 **뒤에 오는 말과 맥락**을 보고 뜻을 잡으세요.',
        ],
        examples: [
          ['I have been an English teacher several times.', '영어 선생님을 몇 번 해 봤어.', '지금 직업이 아니어도 경험이 있음'],
          ['I have taught English several times.', '영어를 몇 번 가르쳐 봤어.', '경험'],
        ],
      },
      {
        title: 'been — be동사의 p.p. ("~인 상태")',
        points: [
          '동사의 3단 변화(원형 – 과거 – 과거분사)에서 **세 번째가 p.p.(과거분사)**예요.',
          '규칙 동사는 과거와 p.p.가 똑같이 생겼어요: study – studied – studied, learn – learned – learned',
          '모양이 다른 동사도 있어요: take – took – **taken**, get – got – **gotten**, teach – taught – **taught**, be – was/were – **been**',
          '"불규칙 동사"라고 부르지만, 영어가 여러 언어에서 단어를 빌려 오면서 원래 언어의 규칙을 따른 거예요. 원래 언어에선 맞는 변화형인데 붙은 **억울한 별명**이에요.',
          'be동사는 혼자서는 뜻이 거의 없는 **연결동사(Linking Verb)**예요. 앞과 뒤를 이어 주고, 뜻은 **앞뒤에 뭐가 오느냐**로 정해져요. I am an English teacher. → I = an English teacher',
          'been이 돼도 연결동사라는 성질은 그대로예요. 모양과 뜻만 조금 달라질 뿐이에요.',
          'p.p.는 "~된, ~인" 느낌이에요 (cook → cooked 요리된, see → seen 본). be의 뜻은 "이다 / 있다"뿐이니까 **been ≈ "~인 상태, ~에 있던 상태"**로 이해하면 돼요.',
          '참고로 -ing(현재분사)는 **능동·진행** 느낌이에요: interest(흥미롭게 하다) → interesting(흥미롭게 하는) → an interesting book',
          'been은 be동사가 하는 일을 다 할 수 있어요. 그래서 **완료형**에도, **수동태**에도 쓰여요.',
        ],
        examples: [
          ['I have been here.', '나 여기 와 본 적 있어.', '여기 있던 상태를 가지고 있음 → 와 봤다'],
          ['I have been to Paris.', '나 파리에 가 본 적 있어.', '파리에 가 있던 경험'],
          ['I have been a teacher.', '나 선생님 해 봤어 / 가르치는 일을 해 왔어.'],
        ],
      },
      {
        title: '현재완료 진행 — have been + -ing',
        points: [
          'I am teaching English. 를 have와 합치고 싶어요. 그런데 have도 동사, am도 동사라서 **I have am teaching ✗** 처럼 나란히 못 써요.',
          '그래서 am을 p.p.인 **been**으로 바꿔요 → **I have been teaching English.**',
          '뜻: 말하는 **지금 이 순간에도 진행 중**이라는 느낌이 더해져요. 앞으로도 계속될 가능성이 높아요.',
          'I have taught English. 는 "가르쳐 본 적 있다(경험)"로도 읽히지만, I have been teaching English. 는 경험으로 읽기 어려워요. 지금도 하고 있는데 "몇 번 해 봤다"고 하면 어색하니까요.',
          '그래서 보통 "**언제부터 지금까지 쭉 ~해 오고 있다**"로 쓰고, **since(~이래로)**와 자주 같이 나와요.',
        ],
        examples: [
          ['I have been teaching English since 2012.', '나는 2012년부터 지금까지 영어를 가르쳐 오고 있어.', '지금도 진행 중'],
          ["I've been working here since 2020.", '2020년부터 여기서 일하고 있어.'],
          ['How have you been?', '그동안 어떻게 지냈어?', '인사로 자주 써요'],
        ],
      },
      {
        title: '과거완료 — had + p.p. (기준점만 과거로)',
        points: [
          'have를 **had**로 바꿔도 원리는 똑같아요. 기준이 "지금"에서 **과거의 어느 시점**으로 옮겨 갈 뿐이에요.',
          '뜻: 과거의 어떤 시점을 기준으로, **그 전부터 그때까지** ~해 왔다 / ~한 적이 있었다',
          'I had taught English. / I had been teaching English. / I had been an English teacher. 모두 가능해요.',
          '현재완료와 과거완료를 따로 외우기보다, **"완료"라는 그림 하나 + 기준 시점(지금 / 과거)**으로 생각하면 편해요.',
        ],
        examples: [
          ['When he was a student, I had been an English teacher.', '그가 학생이었을 때, 나는 (그 전부터) 영어 선생님이었어.', '상태'],
          ['When he was a student, I had been teaching English for five years.', '그가 학생이었을 때, 나는 5년째 영어를 가르쳐 오고 있었어.', '계속'],
          ['When he was a student, I had been teaching English.', '그가 학생이었을 때, 나는 영어를 가르쳐 오고 있는 중이었어.', '과거완료 진행'],
          ['When he was a student, I had been an English teacher several times.', '그가 학생이었을 때, 나는 이미 영어 선생님을 몇 번 해 본 적이 있었어.', '경험(상태)'],
          ['When he was a student, I had taught English several times.', '그가 학생이었을 때, 나는 이미 영어를 몇 번 가르쳐 본 적이 있었어.', '경험(행위)'],
        ],
      },
      {
        title: '완료 + 수동태 — have been + p.p.',
        points: [
          'been 뒤에 **일반 동사의 p.p.**가 오면 **현재완료 수동태**가 돼요. (자세한 원리는 "수동태" 카테고리)',
          'I am taught → I was taught → I have been taught 모두 수동태예요.',
          'I have been taught English for five years. → "나는 가지고 있다, 영어가 가르쳐진 상태를, 5년간" → 5년간 영어를 배웠다',
          'I have been told to study English. → 영어 공부하라는 말을 들어 왔다 (직역: 말해져 왔다)',
        ],
        examples: [
          ['I have been taught English for five years.', '나는 5년간 영어를 배웠어.'],
          ['I have been told to study English for five years.', '5년 동안 영어 공부하라는 말을 들어 왔어.'],
        ],
      },
      {
        title: '미래 표현 3가지',
        points: [
          '**will**: 말하는 순간 정한 일, 예측, 약속 → I\'ll get it! (전화 내가 받을게)',
          '**be going to**: 이미 마음먹은 계획, 근거 있는 예측 → I\'m going to visit my parents this weekend.',
          '**현재진행형**: 약속·일정이 확정된 가까운 미래 → I\'m meeting a client at 3.',
        ],
      },
      {
        title: '미래완료 — 미래의 한 시점에서 뒤돌아보기',
        points: [
          '**will (be going to) + have p.p.** = 미래의 어느 시점까지 **이미 끝나 있을** 일',
          '현재완료가 "지금"을 기준으로 뒤돌아본다면, 미래완료는 **미래의 한 시점**을 기준으로 뒤돌아봐요.',
          '그래서 기준 시점이 꼭 있어요: **when / before / by / by the time** ~',
          '**기간**도 말할 수 있어요: 그 시점이 되면 ~한 지 얼마나 된다 (for + 기간)',
          '해석할 때 "**이미**", "~해 있을 거야"를 넣으면 자연스러워요.',
        ],
        examples: [
          ['When you arrive, the train will have left.', '네가 도착할 때쯤이면 기차는 이미 떠났을 거야.', '도착하는 시점 기준으로 이미 끝남'],
          ['I will have arrived at the office by 8.', '8시까지는 사무실에 도착해 있을 거야.'],
          ['By the time I finish this course, I will have taken ten tests.', '이 수업 끝날 때쯤이면 시험을 열 번 본 셈이 될 거야.'],
          ['By next November, I will have received my promotion.', '내년 11월쯤이면 승진해 있을 거야.'],
          ['Will you have eaten when I pick you up?', '내가 데리러 갈 때쯤엔 밥 먹었을까?'],
          ['I will have been in London for six months by the time I leave.', '떠날 때쯤이면 런던에 온 지 6개월이 될 거야.', '기간'],
          ['Next Monday we will have been married for ten years.', '다음 주 월요일이면 우리 결혼한 지 10년이야.', '기간'],
        ],
      },
      {
        title: '미래 vs 미래완료 — at과 by',
        points: [
          'I will leave **at** 10. → 10시 **정각에** 떠날 거야. (그 순간에 하는 일)',
          'I will have left **by** 10. → 10시 **전에 이미** 떠나 있을 거야. (그때쯤엔 끝나 있음)',
          '덤으로, will have p.p.는 **"아마 ~했을 거야"(지금이나 방금 전 일에 대한 강한 추측)**로도 써요. 이때 will은 미래가 아니라 확신이에요.',
        ],
        examples: [
          ['The train will have left by now.', '기차는 지금쯤 떠났을 거야.', '지금 시점 추측'],
          ['As you will have noticed, ...', '눈치채셨겠지만, ...', '메일·발표에서 자주 쓰는 표현'],
        ],
      },
    ],
    native: [
      '대화에선 going to → **gonna**, want to → **wanna**로 들려요. (글로 쓸 땐 원래대로)',
      '"How have you been?" (그동안 어떻게 지냈어?)처럼 현재완료 진행형도 인사에 자주 나와요.',
      '일정 얘기할 땐 will보다 현재진행형이 더 자연스러워요: "What are you doing this weekend?"',
      '원어민은 "I have been"까지만 듣고는 아무것도 판단하지 않아요. 뒤에 here / to Paris / a teacher / -ing / p.p. 중 뭐가 오는지 끝까지 듣고 뜻을 잡아요.',
      '언어는 살아 있는 몸 같아요. 단어 하나에 뜻이 딱 박혀 있기보다, **어떤 단어와 만나고 어떤 맥락에 놓이느냐**에 따라 역할과 뜻이 달라져요. been 같은 연결 단어가 어려운 게 당연해요.',
    ],
    mistakes: [
      ['I have seen him yesterday.', 'I saw him yesterday.', 'yesterday(끝난 시점)엔 현재완료 ✗'],
      ['I am working here since 2020.', "I've been working here since 2020.", 'since + 과거부터 지금까지 → 현재완료(진행)'],
      ['I have am teaching English.', 'I have been teaching English.', '동사 두 개(have, am)를 나란히 못 써요. am → been'],
      ['I was an English teacher for five years. (지금도 선생님일 때)', 'I have been an English teacher for five years.', '과거형은 "지금은 아니다"로 들려요.'],
      ['I will meet my friend tomorrow. (이미 약속됨)', "I'm meeting my friend tomorrow.", '확정된 약속은 현재진행형이 자연스러워요.'],
      ['I will finish it by the time you will come.', 'I will have finished it by the time you come.', 'by the time 절 안은 현재형, 그때까지 끝나 있을 일은 미래완료'],
    ],
  },

  {
    id: 'form2',
    title: '2형식: 주어 = 보어',
    sub: '보어 자리에 뭐가 올 수 있나',
    summary: '주어 + 연결동사 + 보어. 주어와 보어가 "=" 관계예요.',
    basics: [
      '2형식은 **주어 + 연결동사 + 보어**. 보어가 주어의 신분·상태·성질을 설명해요.',
      '보어 자리에는 **명사 쪽**(누구/무엇)이나 **형용사 쪽**(어떤)만 올 수 있어요. **부사는 보어가 될 수 없어요.**',
      '주어가 어떤 말이냐에 따라 보어 모양이 자연스럽게 정해져요.',
    ],
    sections: [
      {
        title: '명사 쪽 보어 — 주어가 무엇인지',
        points: [
          '주어가 사람/사물 → 보어도 명사: She is a teacher.',
          '주어가 행동(to부정사, -ing) → 보어도 to부정사/-ing가 잘 와요: My plan is to travel.',
          '주어가 사실(point, problem, thing) → that절: The problem is (that) we\'re late.',
          '주어가 질문(question, issue) → whether/의문사절',
        ],
        examples: [
          ['The point is whether they succeed or fail.', '요점은 그들이 성공하느냐 실패하느냐다.'],
          ['The question is how long it will take.', '문제는 그게 얼마나 오래 걸리느냐다.'],
          ['Her past remained a secret to her friends.', '그녀의 과거는 친구들에게 비밀로 남았다.', 'her past = a secret → 3형식 아니고 2형식'],
        ],
      },
      {
        title: '형용사 쪽 보어 — 주어가 어떤지',
        points: [
          '형용사: She is pretty.',
          'to부정사: The bus seems to be full.',
          '분사(-ed/-ing): Everyone looks satisfied with the results.',
          '전치사 + 명사(형용사처럼): He might be **of help**. (= helpful) / Keep practicing until you feel **at ease**. (= easy) / Running with the ball is **against the rule**.',
        ],
        examples: [
          ['He might be of help.', '그는 도움이 될지도 몰라.', 'of help = helpful, 주어의 성질 → 보어'],
          ['He might be in the room.', '그는 방에 있을지도 몰라.', 'in the room은 장소(부사구) → 주어의 성질이 아니라 보어 아님'],
        ],
      },
      {
        title: '형용사는 주어에, 부사는 동사에',
        points: [
          '**형용사**는 주어(Subject)에 더하는 말이에요. 동사 바로 뒤에 형용사가 오면 동사의 원래 뜻이 약해지고 "~이다 / ~가 되다"로 읽혀요.',
          '**부사**는 동사(Verb)에 더하는 말이에요. 동사가 원래 뜻 그대로 살아 있어요.',
          '그래서 똑같은 **ran**이라도 뒤에 형용사(mad)가 오면 "달렸다"가 아니라 "~가 되었다", 부사(madly)가 오면 "달렸다" 그대로예요. 동사 뒤 단어가 **형용사인지 부사인지**부터 보세요.',
        ],
        examples: [
          ['Tom ran mad.', '톰은 미쳐 버렸다.', 'ran을 "달렸다"로 해석하면 안 돼요. 형용사 mad가 와서 "~가 되다"로 바뀜 (요즘 말로는 went mad가 더 흔해요)'],
          ['Tom went mad.', '톰은 미쳐 버렸다.', 'go가 "가다"가 아니라 "~가 되다" (형용사 보어)'],
          ['Tom ran madly.', '톰은 미친 듯이 달렸다.', 'run은 "달리다" 그대로, madly가 동사를 꾸밈'],
        ],
      },
      {
        title: '명사 보어 vs 형용사 보어',
        points: [
          '**명사 보어**는 주어(또는 목적어)와 **같은 것**이에요. 그래서 명사가 보어가 되려면 **주어 = 명사**가 성립해야 해요.',
          '**형용사 보어**는 주어(또는 목적어)를 **설명**만 해요. 같은 것이 아니에요.',
          '헷갈리면 "=" 를 넣어 보세요. She = teacher 는 말이 되지만, She = hungry 는 안 돼요. 그래서 hungry는 "어떤 상태인지" 설명하는 형용사 보어예요.',
        ],
        examples: [
          ['She is a teacher.', '그녀는 선생님이다.', 'She = teacher → 명사 보어'],
          ['She is hungry.', '그녀는 배고프다.', 'She ≠ hungry, 상태 설명 → 형용사 보어'],
          ['Jane is a teacher.', '제인은 교사이다.', 'Jane = a teacher → 명사 보어'],
          ['We call this flower a rose.', '우리는 이 꽃을 장미라고 부른다.', 'this flower = a rose → 목적어의 명사 보어'],
          ['John is honest.', '존은 정직하다.', 'John ≠ honest, 설명 → 형용사 보어'],
          ['We believe John honest.', '우리는 존이 정직하다고 믿는다.', '목적어 John을 설명 → 형용사 보어 (대화에선 We believe John is honest. 가 더 흔해요)'],
        ],
      },
    ],
    native: [
      '"The thing is, ...", "The point is, ...", "The problem is, ..." 는 대화를 시작할 때 원어민이 엄청 자주 쓰는 2형식 패턴이에요.',
      '"of + 추상명사 = 형용사" (of help, of use, of importance)는 조금 격식 있는 표현이에요. 대화에선 helpful, useful, important가 더 흔해요.',
    ],
    mistakes: [
      ['She looks happily.', 'She looks happy.', '보어 자리에 부사(happily)는 못 와요.'],
      ['The problem is we late.', 'The problem is (that) we\'re late.', '보어 자리 문장에도 주어 + 동사가 다 있어야 해요.'],
    ],
  },

  {
    id: 'linking-verbs',
    title: '2형식 동사 4가지',
    sub: '상태변화 · 상태유지 · 오감 · 판단',
    summary: 'be 말고도 "연결만 해 주는" 동사들이 있어요. be로 바꿔도 대충 말이 되면 연결동사예요.',
    basics: [
      '연결동사 뒤에는 **형용사**(또는 명사)가 와요. 동작이 아니라 **상태**를 말하니까 부사가 아니에요.',
      '네 무리로 묶어서 기억하면 쉬워요. 하나씩 외우기보다 예문으로 익히세요.',
    ],
    sections: [
      {
        title: '① 상태변화 — "~이 되다"',
        points: [
          '**become, get, turn, go, grow, come, fall**',
          'become은 명사·형용사 둘 다 OK, **get은 거의 형용사만** 와요. (He became a teacher ✓ / He got a teacher ✗)',
          '**go**는 주로 나쁜 쪽 변화: go bad(상하다), go crazy, go bald',
          '**turn**은 색이나 상태가 확 바뀔 때: turn red, turn 30',
        ],
        examples: [
          ["I'm getting hungry.", '배고파지네.', '대화에선 become보다 get이 훨씬 많이 쓰여요'],
          ['The milk went bad.', '우유가 상했어.'],
          ['He fell asleep on the sofa.', '그는 소파에서 잠들었다.'],
          ['Your dream will come true.', '네 꿈은 이루어질 거야.'],
        ],
      },
      {
        title: '② 상태유지 — "~인 채로 있다"',
        points: [
          '**remain, stay, keep** 세 개만 기억하면 충분해요. (stand, lie, hold, continue, rest 도 있어요)',
          'remain은 격식체, 일상 대화에선 **stay**가 훨씬 흔해요.',
        ],
        examples: [
          ['Stay calm.', '침착해.'],
          ['She exercises every morning to stay healthy.', '그녀는 건강을 유지하려고 매일 아침 운동한다.'],
          ['He wishes to remain anonymous.', '그는 익명으로 남길 원한다.'],
          ['Things remain the same.', '상황은 여전히 그대로다.', 'remain the same은 자주 쓰는 덩어리 표현'],
        ],
      },
      {
        title: '③ 오감 — "~하게 보이다/들리다/느껴지다"',
        points: [
          '**look, sound, feel, smell, taste** 뒤엔 **형용사**!',
          '명사를 쓰고 싶으면 **like**를 붙여요: She looks like her mother. / That sounds like a plan.',
        ],
        examples: [
          ['That sounds good.', '좋은데?', 'sounds well ✗'],
          ['This soup tastes amazing.', '이 수프 진짜 맛있다.'],
          ['I feel bad about it.', '그거 좀 미안하네.', 'feel badly ✗'],
        ],
      },
      {
        title: '④ 판단·입증 — "~인 것 같다 / ~로 드러나다"',
        points: [
          '**seem, appear, prove, turn out**',
          'turn out / prove 는 "해 보니 결국 ~였다"는 결과를 말할 때 써요.',
        ],
        examples: [
          ['He seems nice.', '그 사람 괜찮은 것 같아.'],
          ['It turned out (to be) true.', '그게 사실로 드러났어.'],
        ],
      },
    ],
    native: [
      '"I\'m getting tired / old / hungry / used to it" 처럼 get + 형용사는 일상 대화의 핵심 패턴이에요.',
      '"Sounds good!", "Looks great!", "Smells good in here." 처럼 주어(That, It)를 빼고 말하는 경우가 많아요.',
    ],
    mistakes: [
      ['He got a manager last year.', 'He became a manager last year.', 'get 뒤에는 보통 명사 보어가 안 와요.'],
      ['You look like tired.', 'You look tired.', '형용사 앞엔 like를 안 붙여요. like 뒤엔 명사/문장.'],
      ['It smells well.', 'It smells good.', '오감동사 뒤엔 형용사.'],
    ],
  },

  {
    id: 'look-seem-appear',
    title: 'look · seem · appear',
    sub: '"~처럼 보이다" 뉘앙스 차이',
    summary: '셋 다 "~해 보인다"지만, 판단의 근거와 확신 정도가 달라요.',
    basics: [
      '셋 다 연결동사라서 뒤에 형용사(또는 to be + 명사)가 와요.',
      '핵심 질문: **"무엇을 보고 그렇게 판단했나?"**',
    ],
    sections: [
      {
        title: '세 단어 비교',
        points: [
          '**look**: 눈에 보이는 근거가 있어요. → 실제로 그럴 가능성 높음. He looks tired. (얼굴이 초췌함)',
          '**seem**: 말하는 사람의 주관적인 판단. 확신은 없지만 조심스럽게 말할 때. He seems nice. **대화에서 가장 많이 써요.**',
          '**appear**: 겉으로는 그래 보이는데 실제는 다를 수도. 뉴스·보고서 같은 **격식체**에 많아요. He appears calm.',
        ],
        examples: [
          ['He is tired.', '그는 피곤하다.', '사실'],
          ['He looks tired.', '그는 피곤해 보인다.', '보이는 근거가 있음'],
          ['He seems tired.', '피곤한 것 같아.', '내 생각엔'],
          ['He appears tired.', '피곤해 보이긴 한다.', '겉보기엔 (실제는 모름)'],
        ],
      },
      {
        title: '자주 쓰는 모양',
        points: [
          'seem to + 동사: She seems to like it. (그녀가 그걸 좋아하는 것 같아)',
          'look like + 명사/문장: It looks like rain. / It looks like we\'re late.',
          'It seems like + 문장: It seems like everyone\'s busy today.',
        ],
      },
      {
        title: "What's ~ like? vs How's ~?",
        points: [
          "**What's he like?** → 성격·특징처럼 잘 안 변하는 것 (\"He's quiet and a bit shy.\")",
          "**How's he?** → 요즘 상태·컨디션 (\"He's very well.\")",
          '**What does she look like?** → 외모 ("Short and dark, pretty looking.")',
        ],
      },
    ],
    native: [
      '대화에선 주어를 빼고 "Looks like it\'s gonna rain.", "Seems like a good idea." 처럼 말하는 경우가 정말 많아요.',
      '확신이 없을 때 seem을 쓰면 말투가 부드럽고 공손해져요. 회사에서 의견 낼 때 유용: "It seems like we need more time."',
    ],
    mistakes: [
      ['She seems like happy.', 'She seems happy.', '형용사 앞엔 like 없이.'],
      ['How is your boss like?', 'What is your boss like?', '"어떤 사람이야?"는 What ... like?'],
    ],
  },

  {
    id: 'verb-types',
    title: '자동사 · 타동사',
    sub: '연결동사 vs 의미동사도 함께',
    summary: '동사 뒤에 목적어가 필요한지(타동사) 아닌지(자동사)를 알면 전치사 실수가 확 줄어요.',
    basics: [
      '**자동사**: 목적어 없이 문장이 끝나요. arrive, happen, sleep, go',
      '**타동사**: 바로 뒤에 목적어(누구를/무엇을)가 와야 해요. enjoy, discuss, reach, marry',
      '많은 동사가 **둘 다** 돼요. The door opened. (자동사) / He opened the door. (타동사)',
      '같은 동사도 **연결동사**(뒤에 보어, 상태)와 **의미동사**(진짜 동작)로 쓰일 수 있어요.',
    ],
    sections: [
      {
        title: '연결동사 vs 의미동사',
        examples: [
          ['She looked happy.', '그녀는 행복해 보였다.', '연결동사 → 뒤에 형용사'],
          ['She looked at me angrily.', '그녀는 화난 듯이 나를 쳐다봤다.', '의미동사 → 꾸밀 땐 부사'],
          ['He grew tall.', '그는 키가 컸다.', '연결동사'],
          ['He grows tomatoes.', '그는 토마토를 키운다.', '타동사'],
        ],
      },
      {
        title: '자동사로 쓸까, 타동사로 쓸까',
        points: [
          '누가 했는지 중요하지 않거나 모르면 **자동사**로: Suddenly the door opened.',
          '행동의 대상을 분명히 하고 싶으면 **타동사**로: He opened the door suddenly.',
          '타동사가 더 직접적이에요. He kicked **at** the cat. (발길질만, 안 맞았을 수도) vs He kicked the cat. (찼다)',
        ],
        examples: [
          ['The economy developed during the 1990s.', '90년대에 경제가 발전했다.'],
          ['His latest novel sells well.', '그의 신작 소설은 잘 팔린다.'],
          ['Wine bottles shattered all over the pavement.', '와인병들이 길바닥에 산산조각 났다.'],
        ],
      },
      {
        title: '자동사 + 전치사 = 하나의 타동사구',
        points: [
          '자동사 뒤의 전치사는 뒤 명사와 묶기보다 **앞 동사에 붙여서 한 덩어리 타동사**로 보는 게 편해요.',
          '정확히 말하면 자동사가 타동사로 **변하는 게 아니라**, **[자동사 + 전치사] = [타동사구]** 한 덩어리가 되는 거예요. 그래서 전치사 뒤 명사는 이 덩어리의 목적어예요.',
          'ask for(요청하다) · look at(보다) · listen to(듣다) · wait for(기다리다) · depend on(의존하다) · deal with(처리하다)',
          '같은 동사라도 전치사가 붙으면 뜻이 바뀌어요: ask(묻다) / ask for(요청하다). 이런 건 **단어처럼 통째로** 외우세요.',
          '자동사·타동사 둘 다 되는 동사는, 자동사 뒤에 전치사가 붙어서 **또 다른 타동사 뜻**이 되는 경우가 많아요.',
          '**ask for + 사람**은 굳이 해석하면 "그 사람을 요청하다(찾다)"인데, 실제로는 뒤에 **사물**이 오는 경우가 훨씬 많아요: ask for the money, ask for help',
          '**I ask him.** 처럼 ask 뒤에 사람만 쓰면 "그에게 물어본다"는 뜻밖에 안 되고, 무엇을 물었는지가 빠져서 혼자서는 거의 안 써요. (앞뒤에 물은 내용이 나오면 괜찮아요)',
          'ask가 "묻다"일 땐 물어본 내용이 같이 와야 자연스러워요: I asked him the way. (그에게 길을 물었다)',
        ],
        examples: [
          ['I asked for the money.', '나는 그 돈을 요청했다.', 'ask for = 요청하다 (뒤에 주로 사물)'],
          ['I asked for him at the front desk.', '나는 안내 데스크에서 그를 찾았다(불러 달라고 했다).', 'ask for + 사람 = 그 사람을 찾다, 요청하다'],
          ['I asked him the way.', '나는 그에게 길을 물어봤다.', 'ask = 묻다 (사람 + 물은 내용)'],
          ['Can you wait for me?', '나 좀 기다려 줄래?', 'wait for = 기다리다'],
        ],
      },
      {
        title: '수동태가 안 되는 자동사',
        points: [
          '자동사는 목적어가 없으니 수동태로 못 바꿔요.',
          '**happen, occur, take place, appear, disappear, exist, arrive, rise, function, proceed, consist of, belong to, result in/from**',
          '뜻도 같이: arrive 도착하다 · happen / take place / occur 발생하다 · rise 오르다 · function 작동하다 · consist of 구성되다 · proceed 진행하다',
          '자동사: 동사의 힘이 주어에서 끝나요. / 타동사: 동사의 힘이 주어 → 목적어로 옮겨 가요. (I grow plants. → plants가 목적어)',
        ],
        examples: [
          ['The meeting took place last Friday.', '회의는 지난 금요일에 열렸다.', 'was taken place ✗'],
          ['Prices rose sharply.', '물가가 가파르게 올랐다.', 'were risen ✗'],
          ['I grow plants.', '나는 식물을 키운다.', '주어(I) → 동사(grow) → 목적어(plants). 힘이 옮겨 가니까 타동사'],
        ],
      },
    ],
    native: [
      '한국어 "~에 대해 / ~와 / ~에" 때문에 타동사 뒤에 전치사를 습관적으로 붙이기 쉬워요. 타동사는 목적어를 바로 붙이세요.',
    ],
    mistakes: [
      ["Let's discuss about the plan.", "Let's discuss the plan.", 'discuss는 타동사. about 없이.'],
      ['She married with him.', 'She married him.', 'marry도 타동사. (get married to him 도 OK)'],
      ['We reached to the office.', 'We reached the office.', 'reach는 바로 목적어.'],
      ['Can you explain me?', 'Can you explain it to me?', 'explain 다음엔 설명할 내용, 사람 앞엔 to.'],
      ['The accident was happened.', 'The accident happened.', 'happen은 자동사 → 수동태 불가'],
      ['It is consisted of three parts.', 'It consists of three parts.', 'consist of는 수동태 불가'],
    ],
  },

  {
    id: 'article',
    title: '관사 a / the',
    sub: '처음 말하는 것 vs 서로 아는 것',
    summary: 'a는 "여럿 중 하나 (처음 등장)", the는 "우리 둘 다 아는 그것"이에요.',
    basics: [
      '셀 수 있는 명사가 하나면 **a/an** 이나 **the**, 또는 my/this 같은 말이 꼭 앞에 붙어야 해요. 그냥 "I have car" ✗',
      '**a/an**: 듣는 사람이 아직 모르는, 여럿 중 아무거나 하나',
      '**the**: 듣는 사람도 "어떤 건지" 아는 것 (앞에서 말했거나, 상황상 하나뿐이거나)',
      '셀 수 없는 명사(water, information, advice)나 복수명사를 **일반적으로** 말할 땐 관사 없이.',
    ],
    sections: [
      {
        title: 'a → the 흐름',
        examples: [
          ['I bought a laptop. The laptop is really fast.', '노트북을 샀어. 그 노트북 진짜 빨라.', '처음엔 a, 다시 말할 땐 the'],
          ['Can you close the door?', '문 좀 닫아 줄래?', '이 방에 있는 그 문 (서로 앎)'],
          ['The CEO is coming today.', '대표님 오늘 오신대.', '우리 회사 대표는 한 명뿐'],
        ],
      },
      {
        title: '관사 없이 쓰는 경우',
        points: [
          '일반적인 얘기: I like coffee. / Dogs are loyal.',
          '셀 수 없는 명사: information, advice, news, furniture, equipment (an advice ✗)',
          '습관적 장소·식사: go to work, go to bed, have lunch, at home',
        ],
      },
    ],
    native: [
      '관사는 원어민도 "느낌"으로 써서 100% 규칙은 없어요. 많이 읽고 덩어리로 익히는 게 제일 빨라요: in the morning, at night, on the weekend, go to work.',
      '틀려도 뜻은 통하지만, 관사가 빠지면 원어민 귀에는 바로 어색하게 들려요. 글쓰기 검수 때 관사 수정은 꼭 체크하세요.',
    ],
    mistakes: [
      ['I have car.', 'I have a car.', '셀 수 있는 명사 하나엔 a/the/my 등이 필요'],
      ['Can you give me an advice?', 'Can you give me some advice?', 'advice는 셀 수 없음'],
      ['I go to the work at 9.', 'I go to work at 9.', 'go to work, go to school은 관용적으로 관사 없이'],
    ],
  },

  {
    id: 'preposition',
    title: '전치사',
    sub: 'in / on / at · 시점 · 기간 · 위치 · 방향 · 이유',
    summary: 'at은 점, on은 면(표면·날짜), in은 공간(안·긴 기간)이에요.',
    videos: [
      ['PLhpp-vPvggtctjfjJeZePqCbwkJRRduNN', '전치사, 단 하나의 그림으로 설명 (재생목록)'],
    ],
    basics: [
      '**at** = 콕 찍은 한 점: at 3 p.m., at the station, at the door',
      '**on** = 위에 붙어 있는 면, 날짜·요일·특정한 날: on the desk, on Monday, on May 5th, on Christmas Day, on my birthday',
      '**in** = 둘러싸인 공간, 긴 기간: in the room, in Seoul, in May, in 2024, in the morning',
    ],
    sections: [
      {
        title: '시간',
        examples: [
          ["Let's meet at 3.", '3시에 만나요.', '시각 → at'],
          ['The meeting is on Friday.', '회의는 금요일이야.', '요일·날짜 → on'],
          ['I was born in 1990.', '1990년에 태어났어.', '연도·월·계절 → in'],
          ["I'll be back in 10 minutes.", '10분 뒤에 올게.', 'in + 시간 = ~후에'],
        ],
      },
      {
        title: '장소: in vs at',
        points: [
          '**in** = 큰 공간 **안** (in Seoul, in the building) / **at** = 한 **지점**, 번지 (at the bus stop, at 123 Main Street)',
          '같은 장소라도 그 **안**을 말하면 in, **장소 자체**(거기서 볼일)를 말하면 at: in the office / at the office',
        ],
      },
      {
        title: '시점: since · from · until · by · before',
        points: [
          '**since** ~이래로 (지금까지) / **from** ~부터 / **until** ~까지 / **before, prior to** ~전에 + 시점',
          '**until** = 그때까지 상황·상태가 **계속** / **by** = 그때까지 행동을 한 번 **끝내기** (과제 마감을 떠올리세요: 그 시점까지 늦지 않게 내기만 하면 돼요)',
          '**in time** = 늦지 않게 (여유 있게) / **on time** = 정각에',
        ],
        examples: [
          ["I'll wait until 6.", '6시까지 기다릴게.', '계속 → until'],
          ['Please send it by Friday.', '금요일까지 보내 주세요.', '마감 → by'],
        ],
      },
      {
        title: '기간: for · during · over · within · in',
        points: [
          '**for** + 숫자 기간 → "얼마나 오래" (for two hours)',
          '**during** + 명사 → "언제" (during summer, during the meeting). during 뒤에 **한정사(the, 소유격)**가 오면 숫자 기간도 OK (during the last three years, during my two years in Seoul)',
          '**over / through / throughout** ~동안, ~내내 · **within** ~이내에',
          '**in** + 기간 → 보통 "~후에" (in two days = 이틀 후에)',
        ],
        examples: [
          ['The reporter interviewed Mr. Kim for nearly two hours.', '그 기자는 거의 두 시간 동안 김 씨를 인터뷰했다.', '얼마나 오래 → for'],
          ['Most resorts in the area are busiest during summer.', '그 지역 리조트 대부분은 여름 동안 가장 바쁘다.', '언제 → during'],
          ['Your request for membership will be approved in two days.', '회원 신청은 이틀 후에 승인될 겁니다.', 'in + 기간 = ~후에'],
        ],
      },
      {
        title: '위치 · 방향',
        points: [
          '위치: **over / above** ~위에(~이상) · **under / below** ~아래에(~이하) · **beside / next to** ~옆에 · **behind** ~뒤에 · **between**(둘) / **among**(셋 이상) ~사이에 · **near** 가까이 · **around** 주위에 · **past** ~을 지나 · **opposite** ~맞은편에 · **outside** ~밖에 · **within** ~이내에',
          '방향: **from** ~에서, ~로부터 · **to** ~로 · **across** ~을 가로질러, ~의 전역에 걸쳐 · **through** ~을 통과하여 · **along** ~을 따라 · **for** ~을 향해 · **toward(s)** ~쪽으로(막연한 방향), (상황·결과) ~을 향하여 · **into** ~안으로 · **out of** ~밖으로',
          '**along with** ~와 함께',
        ],
      },
      {
        title: '이유 · 양보 · 목적',
        points: [
          '~때문에: **because of / due to / owing to / on account of** + 명사',
          '~에도 불구하고: **despite / in spite of / with all / notwithstanding** + 명사',
          '~을 위해서: **for** + 명사 (for는 다음 카테고리 "for와 to"에서 자세히)',
          '뒤에 **문장**(주어 + 동사)이 오면 전치사가 아니라 접속사(because, although)를 써요.',
        ],
        examples: [
          ['The flight was delayed due to bad weather.', '악천후 때문에 비행기가 지연됐다.'],
          ['Despite the rain, we went out.', '비가 오는데도 우리는 나갔다.', 'despite + 명사'],
        ],
      },
      {
        title: '통째로 외우는 전치사 표현',
        points: [
          '**under** + 상태: under construction(공사 중) · under review(검토 중) · under discussion(논의 중) · under consideration(고려 중) · under investigation(조사 중) · under pressure(압박받는) · under control(통제되는) · under way(진행 중)',
          '**under** + 관리: under new management(새 경영진하에서) · under the new policy(새 정책하에서) · under close supervision(엄격한 감독하에) · under the current contract(현 계약하에서)',
          '**above** one\'s expectations(기대 이상인) · have an edge / advantage **over** ~(~보다 유리하다)',
          'a difference / gap **between** A and B (A와 B의 차이) · **within** walking distance of ~(~에서 걸어갈 수 있는) · **within** the limit(범위 내에서)',
          '**around** the world(전 세계에) · **around** the corner(길 모퉁이를 돌아 / 위기를 넘겨 / 곧, 임박한)',
        ],
        images: [['images/grammar/notes/10.jpg', '자주 나오는 전치사 표현 표 — above · over · under · between · within · around']],
        examples: [
          ['The new office is still under construction.', '새 사무실은 아직 공사 중이에요.'],
          ['The hotel is within walking distance of the station.', '호텔은 역에서 걸어갈 수 있는 거리예요.'],
          ['The results were above our expectations.', '결과가 기대 이상이었어요.'],
        ],
      },
    ],
    native: [
      'at night / in the morning / on the weekend(미국) 처럼 짝을 통째로 외우세요.',
      '"in the office"(사무실 안에) vs "at the office"(회사에, 근무 중)처럼 at은 "그 장소에서 볼일 중"이라는 느낌이 있어요.',
    ],
    mistakes: [
      ['See you in Monday.', 'See you on Monday.', '요일은 on'],
      ['Please send it until Friday.', 'Please send it by Friday.', '마감은 by'],
      ['I studied during 3 hours.', 'I studied for 3 hours.', '시간 길이는 for'],
      ['Despite it rained, we went out.', 'Despite the rain, we went out. / Although it rained, ...', 'despite 뒤엔 명사, 문장이면 although'],
      ['The project is on construction.', 'The project is under construction.', '공사 중 = under construction'],
    ],
  },

  {
    id: 'for-to',
    title: 'for와 to',
    sub: '전치사 for를 그림 하나로 · to와의 차이',
    summary: 'for는 "앞에 있는 모든 것이 뒤로 **다** 간다(값어치 =)", to는 "**진짜로** 그쪽으로 간다(방향·이동)"예요.',
    videos: [
      ['h8xLNZ0rxhA', 'for, 전치사를 그림 하나로 설명한다: 그냥 \'다\' 줘버려!'],
      ['H6XNM8x3Bt4', 'To와 For의 결정적인 차이!'],
    ],
    basics: [
      'for의 핵심: for **앞에 있는 모든 것**이 for **뒤의 대상에게 \'다\' 간다.** 가장 중요한 단어는 "**다**"예요.',
      '그래서 for 앞과 뒤는 **값어치가 같다(=)**는 느낌이에요. for 뒤에는 값어치를 받는 사람, 가격, 이유·목적, 기간, 거리가 자주 와요.',
      'for는 다른 전치사와 달리 부사처럼 혼자 쓰이는 일이 거의 없어요. 늘 **앞에 단어나 문장, 구**가 와요.',
      '"for = ~을 위해서"라고 번역부터 하지 말고, "앞에 것이 뒤로 다 갔다"는 그림으로 보세요. 한국말을 안 떠올리면 **영어 어순 그대로** 이해할 수 있어요.',
      '**to**는 겨냥만 하는 게 아니라 **실제로 이동**하는 거예요. (물리적인 이동 + 마음의 이동)',
    ],
    sections: [
      {
        title: 'for의 기본 그림 — 모든 걸 for 뒤로 다 준다',
        points: [
          '**단어**가 for 앞에 오면 그 단어의 모든 것이 뒤로 가요. money for books → 돈이 책으로 **다** 감 → "도서 구입비, 책 살 돈"',
          '**문장**이 for 앞에 와도 뜻은 똑같아요. He bought a car for his wife. → 차를 산 행위의 모든 것이 his wife에게 감',
          '한국어로 옮기면 "아내를 위해서 차를 사 줬다"가 되지만, 영어식으로는 그냥 "**다 갔다**"로 이해해요.',
          'for 앞의 것과 뒤의 것은 **값어치가 똑같이** 전달돼요(=). 그래서 for 뒤에는 값어치와 관련된 말이 많이 와요.',
        ],
        images: [
          ['images/grammar/for/for-00.jpg', '전치사 **for** — 그림 하나로 이해하기'],
          ['images/grammar/for/for-01.jpg', '모든 걸 for 뒤로 다 준다(다 가져간다): **money for books** (money = books). 아래: shooting **at** me는 물리적 이동 없이 겨냥(지칭)만, a train **to** Busan은 "진짜로" 가는 것'],
        ],
        examples: [
          ['money for books', '도서 구입비 / 책 살 돈', '돈이 책으로 다 감'],
          ['He bought a car for his wife.', '그는 아내에게 차를 사 줬어.', '차를 산 행위가 다 아내에게'],
        ],
      },
      {
        title: 'for vs to — 겨냥이냐, 진짜 이동이냐',
        points: [
          'for도 어떤 대상을 **향하는** 느낌이 있어요. 하지만 물리적으로 움직인다기보다 **겨냥하고 지칭하는** 느낌이 강해요.',
          'She is running for me. → "나를 향해" 달린다. 실제로 내 쪽으로 오는 것보다 **나를 겨냥·지칭**하는 그림이에요.',
          '**실제로 이동**할 때는 **to**를 써요. 몸이 움직이는 것뿐 아니라 **마음이 움직이는 것**도 to예요.',
          '부산에 간다 → I\'ll go **to** Busan. (진짜로 가는 것)',
        ],
        examples: [
          ['She is running for me.', '그녀가 나를 향해(나를 위해) 달리고 있어.', '겨냥·지칭'],
          ["I'll go to Busan.", '나 부산 갈 거야.', '실제 이동 → to'],
          ['a train to Busan', '부산행 열차', '진짜로 감'],
        ],
      },
      {
        title: '값어치가 뒤로 다 간다 — 가격 · 사람 · 이유 · 목적',
        points: [
          '**가격**: 값어치가 뒤로 다 가니까 가격에도 for를 써요. "두 개에 20달러" = 두 개의 값어치가 20달러로 전달',
          'for 뒤에는 값어치를 받는 **사람**이 올 수도 있고, **이유**나 **목적**이 올 수도 있어요.',
          '사람 → "~에게" / 이유 → "~을 기념하여" / 목적(과시 등) → "~목적으로"',
          '번역은 "~에게, ~기념하여, ~목적으로, ~위해서"로 다 달라지지만, 영어식 사고에선 결국 **값어치가 뒤로 다 간다** 하나예요.',
          '이렇게 이해하면 한국말을 떠올리지 않고도 for가 자연스럽게 읽히고, 영어 어순 그대로 받아들일 수 있어요.',
        ],
        images: [
          ['images/grammar/for/for-02.jpg', '(값어치) **for** → 뒤로 다 준다. 앞과 뒤가 같은 값어치(=)'],
          ['images/grammar/for/for-03.jpg', 'He bought the car **for** + 사람(his wife → ~에게) / 이유(his birthday → ~기념하여) / 목적(show-off 과시 등 → ~목적으로)'],
        ],
        examples: [
          ['Each one is $15, but you can get two for $20.', '하나에 15달러인데, 두 개 사면 20달러예요.', '가격'],
          ['He bought a cup for her.', '그는 그녀에게 컵을 사 줬어.', '사람 → 값어치가 그녀에게'],
          ['He bought a cup for her birthday.', '그는 그녀 생일 기념으로 컵을 샀어.', '이유'],
          ['He bought the car for his wife.', '그는 아내에게 차를 사 줬어.', '사람 → ~에게'],
          ['He bought the car for his birthday.', '그는 자기 생일 기념으로 차를 샀어.', '이유 → ~기념하여'],
          ['He bought the car for show.', '그는 과시하려고 차를 샀어.', '목적 → ~목적으로'],
        ],
      },
      {
        title: 'for 뒤에 동사가 올 때 — 사람이면 to + 동사',
        points: [
          'for 뒤에 동사가 오면 보통 **-ing**를 붙여요: for driving',
          '그런데 주어가 **사람**이고 그 사람이 뭘 하려고 했는지 말할 땐 for -ing가 어색해요.',
          '사람이 움직였다는 것 자체가 **동적인 느낌**이라, 그 사람이 무엇을 하려고 했는지 살리려면 for보다 **to + 동사**가 훨씬 잘 어울려요.',
          'He bought the car for driving. ✗ → He bought the car **to drive**. ✓ / He came **to drive**. ✓',
        ],
        images: [
          ['images/grammar/for/for-04.jpg', 'He bought the car for driving ✗ → 사람이 움직이는 동적인 그림이라 **to 동사**: He bought the car **to drive**.'],
        ],
        examples: [
          ['He came to drive.', '그는 운전하려고 왔어.', '사람의 목적 → to + 동사'],
          ['He bought the car to drive.', '그는 몰려고 차를 샀어.'],
        ],
      },
      {
        title: '목적지 — train for vs train to',
        points: [
          '지하철·기차 목적지를 말할 때 한국 사람은 "어디로 향하는"이니까 to를 쓸 것 같지만, 한국 지하철 안내방송에선 "This train is bound **for** Suseo"처럼 **for**를 써요.',
          '지하철처럼 **정해진 길**을 따라 결국 그 목적지(수서역)로 가는 경우, 그곳이 **최종 도착지**라는 뜻으로 for를 써요. → "**결국에는** 수서역"',
          '중간중간 역에 들르면서 **어느 방향으로 간다**는 걸 말할 땐 **to**를 써요: Subway to Gangnam',
          '보통 "어디로 향한다"는 말에는 for(최종 종착지)도 괜찮지만, **to를 더 많이** 써요: Train to Busan',
        ],
        examples: [
          ['This train is bound for Suseo.', '이 열차는 수서행입니다.', '최종 종착지 → for'],
          ['subway to Gangnam', '강남 가는 지하철', '방향 → to'],
          ['Train to Busan', '부산행', '일반적으로는 to를 더 많이 써요'],
        ],
      },
      {
        title: '기간 · 거리 — for 앞뒤가 같은 크기',
        points: [
          '"~동안", "~만큼"을 말할 때도 for를 써요. 이것도 같은 그림이에요: for 앞뒤가 **똑같은 크기**가 돼요.',
          '**기간**: for 뒤에 **숫자가 들어간 기간**이 오면, 앞의 일이 그 기간과 딱 같아진다고 생각하세요. I\'ve been here for two years. → 여기 있은 것 = 2년',
          '숫자가 아니라 **특정한 때를 가리키는 단어**(the summer, the meeting…)가 오면 for 대신 **during**을 써요.',
          '**거리**: for 뒤에 거리가 오면, 앞의 행동이 그 거리만큼이라는 뜻이에요. I walked for 10km. → 10km를 걸었다',
        ],
        images: [
          ['images/grammar/for/for-05.jpg', "I've been here **for** two years: for 앞뒤가 같은 크기(=) → 여기 있은 기간 = 2년"],
        ],
        examples: [
          ["I've been here for two years.", '나 여기 온 지 2년 됐어.', '숫자 기간 → for'],
          ['I was here during the summer.', '나 여름 동안 여기 있었어.', '특정한 때 → during'],
          ['I walked for 10km.', '나 10km 걸었어.', '거리 → for'],
        ],
      },
      {
        title: '직장 말하기 — I work for 회사',
        points: [
          '"어느 회사에서 일해?"를 한국어 "~에서" 그대로 **in**으로 말하면 어색해요.',
          '영어식으로는 "**내가 일한 가치를 가져가는 곳이 어디야?**" → **for**를 써요: I work for LG. / I work for my employer.',
          '**at** = 일하는 **장소의 종류**: I work at a school. (학교에서 일해요)',
          '**in** = 장소가 아니라 **일하는 분야**: I work in marketing. (마케팅 쪽에서 일해요)',
          '"Where do you work?"라고 물으면 "어느 장소에서 / 어느 동네에서 일해?"라는 느낌이 강해요.',
          '회사를 묻고 싶으면 for를 살려서: What company do you work for? / Who do you work for?',
        ],
        images: [
          ['images/grammar/for/for-06.jpg', 'I work **for** LG(회사): 내가 일한 값어치가 다 회사로 간다(=)'],
        ],
        examples: [
          ['I work for LG.', '저 LG 다녀요.', '일한 값어치를 가져가는 곳 → for'],
          ['I work for my employer.', '저는 고용주 밑에서 일해요.'],
          ['I work at a school.', '저 학교에서 일해요.', '장소의 종류 → at'],
          ['I work in marketing.', '저 마케팅 쪽에서 일해요.', '분야 → in'],
          ['What company do you work for?', '어느 회사 다녀요?'],
          ['Who do you work for?', '누구 밑에서(어디 소속으로) 일해요?'],
          ['Where do you work?', '어디서 일해요?', '장소·동네를 묻는 느낌'],
        ],
      },
      {
        title: 'for vs to 더 깊게 — hard for you / hard to you',
        points: [
          'for와 to를 나란히 놓고 보면 둘 다 훨씬 또렷해져요.',
          'The project looks hard **for** you. → 이 프로젝트가 진짜 **다 너한테 와 있는** 느낌. "네가 **지금 하고 있는** 이 프로젝트, 너한테 어려워 보인다"',
          'The project looks hard **to** you. → 프로젝트가 너한테 다 와 있지 않아요(≠). "네가 **앞으로 하게 될**" 또는 "지금 하는 건 아니지만 너한텐 좀 어려울 것 같다"고 할 때',
        ],
        images: [
          ['images/grammar/for/for-07.jpg', 'The project looks hard **for** you (= 다 너한테 와 있음) vs **to** you (≠ 방향만)'],
        ],
        examples: [
          ['The project looks hard for you.', '(지금 하는) 그 프로젝트 너한테 어려워 보인다.', '다 와 있음 → for'],
          ['The project looks hard to you.', '(앞으로 할) 그 프로젝트 너한텐 어려울 것 같아.', '방향만 → to'],
        ],
      },
      {
        title: '연습 — for일까 to일까?',
        points: [
          '① My mom made a meal ___ us. → 정답 **for**. 엄마가 식사를 **만든 그 값어치가 다** 우리에게 왔어요.',
          '② The world gives joy ___ me. → 정답 **to**. 세상의 모든 기쁨이 **다** 나에게 오는 건 아니죠. 그냥 "나에게"라는 **방향**만 말할 땐 to예요.',
          '③ He gave a gift ___ her. → 정답 **to**. made a meal처럼 행동 자체로 값어치가 만들어지는 게 아니라, gave는 그냥 **건네는** 간단한 행동이라 for는 부담스럽고 to가 어울려요.',
          '④ I showed my dance ___ her. → **둘 다 가능**. 보통은 to(그녀에게 내 춤을 보여 줬어). for를 쓰면 "춤추는 그 값어치를 **온전히 다** 그녀에게 보여 준다"는 느낌이 살아요.',
          '한국어로는 ④의 두 문장이 똑같아 보이지만, for와 to의 그림을 알면 다르게 느껴질 거예요.',
        ],
        images: [
          ['images/grammar/for/for-08.jpg', '문제: My mom made a meal ____ us.'],
          ['images/grammar/for/for-09.jpg', '정답: My mom made a meal **for** us (=). The world gives enjoyment **to** me. / He gave water **to** me. / I showed my dance **to / for** her.'],
        ],
        examples: [
          ['My mom made a meal for us.', '엄마가 우리한테 밥을 해 주셨어.', '만든 값어치가 다 우리에게'],
          ['The world gives joy to me.', '세상은 나에게 기쁨을 줘.', '방향만 → to'],
          ['He gave a gift to her.', '그는 그녀에게 선물을 줬어.', '단순히 건넴 → to'],
          ['He gave water to me.', '그는 나에게 물을 줬어.'],
          ['I showed my dance to her.', '나는 그녀에게 내 춤을 보여 줬어.', '보통'],
          ['I showed my dance for her.', '나는 그녀를 위해 내 춤을 (온전히) 보여 줬어.', '값어치를 다 → for'],
        ],
      },
      {
        title: '한국말 없이 for를 이해하는 연습',
        points: [
          '처음엔 복잡하게 느껴져도 꾸준히 연습하면 익숙해져요.',
          'I make a YouTube clip for ___ 를 보면 "유튜브 클립을 만드는 행위가 **어디로 다 가지?**"를 떠올리세요. 한국어로 번역하거나 어순을 뒤집지 않아도 for가 자연스럽게 써져요.',
          '이렇게 연습하면 한국말을 떠올리지 않고 **영어 어순 그대로** 받아들이는 습관이 생겨요.',
          '일상에서 for를 만날 때마다 이 그림을 대 보세요. 거의 모든 상황이 이해돼요. 다른 전치사도 같은 방식으로 이해할 수 있어요.',
        ],
        examples: [
          ['I make a YouTube clip for you guys to subscribe.', '구독자분들을 위해서 유튜브를 만들고 있어요.', '만드는 행위가 다 you guys에게'],
        ],
      },
    ],
    native: [
      '"for = 위해서"로만 외우면 work for, two for $20, for two years, train for Suseo가 다 따로 놀아요. "**앞에 것이 뒤로 다 간다(=)**" 하나로 묶으세요.',
      'give · send · show · tell처럼 그냥 **건네는** 동사는 to, make · buy · cook · get처럼 뭔가를 **만들거나 구해서 바치는** 동사는 for가 잘 어울려요. (give A to B / make A for B)',
      '사람이 뭘 하려고 했는지(목적)는 for -ing보다 **to + 동사**: I came to see you.',
    ],
    mistakes: [
      ['I work in Samsung.', 'I work for Samsung.', '회사는 for (일한 값어치를 가져가는 곳). in은 분야: I work in marketing.'],
      ['He came for driving.', 'He came to drive.', '사람의 목적은 to + 동사'],
      ['He gave a gift for her.', 'He gave a gift to her.', 'give는 단순히 건네는 동작 → to'],
      ['My mom made a meal to us.', 'My mom made a meal for us.', 'make는 만든 값어치가 다 감 → for'],
      ["I've lived here during two years.", "I've lived here for two years.", '숫자 기간은 for, 특정한 때(the summer)는 during'],
    ],
  },

  {
    id: 'time-conj',
    title: '접속사 · 시간 표현',
    sub: 'and · but · or · so / after · later · in · since · ago / even if · even though · although',
    summary: '"언제부터 세느냐"(기준점)와 "진짜 일어난 일이냐"만 구별하면 돼요.',
    basics: [
      '시간 표현은 **기준점**이 다 달라요. 지금 기준인지, 어떤 일·시점 기준인지 먼저 보세요.',
      '"~지만 / ~라도"(양보)는 **실제로 그런 일인지, 그냥 가정인지**로 나눠요.',
    ],
    sections: [
      {
        title: '시간 표현 — 기준점이 뭐냐',
        points: [
          '**after** = 특정한 일·시점 **다음에** → after lunch, after the meeting, after 6',
          '**later** = 기준 없이 "나중에", 혹은 "그로부터 ~ 뒤에" (과거·미래 둘 다 OK) → See you later. / two days later',
          '**in** = **지금부터** ~ 뒤에 (미래) → in 10 minutes, in a week',
          '**since** = 과거의 한 시점부터 **지금까지** 쭉 → 현재완료와 같이 써요.',
          '**before** = 특정한 일·시점 **전에** → before dinner, before I leave',
          '**ago** = **지금부터** 거꾸로 ~ 전에 → 과거형과 같이 써요. (two years ago)',
        ],
        examples: [
          ["I'll call you after the meeting.", '회의 끝나고 전화할게.', '회의가 기준'],
          ['He left, and two days later he came back.', '그는 떠났고, 이틀 뒤에 돌아왔다.', '"떠난 날"로부터 이틀 뒤 = later'],
          ["I'll be there in 10 minutes.", '10분 뒤에 도착해.', '지금부터 10분 뒤'],
          ["I've lived here since 2020.", '2020년부터 여기 살고 있어.', '2020 → 지금까지'],
          ['I met her three years ago.', '3년 전에 그녀를 만났어.', '지금부터 3년 전, 과거형'],
        ],
      },
      {
        title: '양보 접속사 — 진짜냐, 가정이냐',
        points: [
          '**even if** = (일어날지 모르지만) **설령 ~하더라도** → 가정, 실제 일 아님',
          '**even though** = (이미 그런데도) **~인데도** → 실제 사실, 강조',
          '**although** = ~이지만 → 실제 사실, 조금 격식 있는 말',
          '**though** = ~이지만 → 실제 사실, 더 가벼운 말. 문장 **맨 끝**에도 붙일 수 있어요.',
        ],
        examples: [
          ["Even if it rains, I'll go.", '설령 비가 오더라도 갈 거야.', '비가 올지 안 올지 모름'],
          ['Even though it was raining, I went.', '비가 오고 있었는데도 갔어.', '실제로 비가 왔음'],
          ['Although he is young, he is very wise.', '그는 어리지만 아주 현명하다.'],
          ['It was a good movie. A bit long, though.', '좋은 영화였어. 좀 길긴 했지만.', '문장 끝 though'],
        ],
      },
      {
        title: '등위접속사 — 같은 급끼리 잇기',
        points: [
          '**and** 그리고 · **or** 또는 · **but / yet** 그러나 · **so** 그래서 · **for** 왜냐하면',
          '**so, for**는 문장(절)끼리만 이어요. 단어·구는 못 이어요.',
          '**and so**(그래서) · **and yet**(그런데도) · **and then**(그러고 나서)처럼 붙이면 뜻이 더 분명해져요.',
          '주어를 **and**로 이으면 → **복수 동사** / **or**로 이으면 → **마지막 주어**에 수 일치',
        ],
        examples: [
          ['Tom and Jane are coming.', '톰과 제인이 온다.', 'and → 복수 are'],
          ['Either you or he is wrong.', '너 아니면 그가 틀렸다.', 'or → 마지막 he에 맞춰 is'],
          ['It was late, so I went home.', '늦어서 집에 갔다.', 'so는 문장끼리만'],
          ["He's rich, and yet he's not happy.", '그는 부자인데도 행복하지 않다.'],
        ],
      },
    ],
    native: [
      '말할 땐 although보다 **though**가 훨씬 많이 나와요. 특히 문장 끝에 툭 붙이는 "~, though."',
      '"See you later", "Talk to you later", "Catch you later"는 헤어질 때 인사 단골.',
      '"I\'ll be back in a sec / in a minute"(금방 올게)처럼 in은 회화에서 자주 써요.',
    ],
    mistakes: [
      ['I met her before 3 years.', 'I met her 3 years ago.', '지금부터 ~ 전 = ago'],
      ["I'll be back after 10 minutes.", "I'll be back in 10 minutes.", '지금부터 ~ 뒤 = in'],
      ['I have lived here since 3 years.', "I've lived here for 3 years.", 'since 뒤엔 시점, 기간은 for'],
      ['Even if it was raining, I went out.', 'Even though it was raining, I went out.', '실제로 비가 왔으면 even though'],
      ['Tom and Jane is coming.', 'Tom and Jane are coming.', 'and로 이은 주어는 복수'],
    ],
  },

  {
    id: 'modal',
    title: '조동사',
    sub: 'can · will · should · must · may',
    summary: '조동사는 동사에 "가능·의지·의무·추측·공손함"이라는 기분을 얹어 줘요. 단순히 시제만 나타내는 게 아니라 **확률 · 추측 · 요청 · 조언**의 미묘한 뉘앙스를 만들어요.',
    videos: [
      ['TIx-yVScq9g', '영어 조동사 총정리 — would · could · should · have to'],
    ],
    basics: [
      '조동사 뒤에는 항상 **동사원형**. (He can swim ✓ / He can swims ✗)',
      '부정은 조동사 뒤에 not: can\'t, won\'t, shouldn\'t',
      '대표적인 조동사: **can, may, could, should, have to** 등. 같은 조동사라도 상황에 따라 **확률 · 추측 · 요청 · 조언** 중 어떤 뜻인지가 달라져요.',
      '**과거형(could, would, might)** 은 과거뿐 아니라 **더 공손하거나 더 약한 추측**을 나타낼 때 많이 써요. 과거형이 만드는 **심리적 거리감**이 공손함의 비밀이에요.',
    ],
    sections: [
      {
        title: '조동사의 현재형과 과거형',
        points: [
          '현재형 조동사: **can, may, shall, must, will** 등',
          '짝이 되는 과거형: can → **could**, have to → **had to** (will → would, may → might, shall → should)',
          '**must**는 따로 과거형이 없어요. 과거 뜻을 말하려면 **had to**(~해야 했다) 또는 **should have p.p.**(~했어야 했는데)를 써요.',
          '**should have p.p.** 는 과거에 하지 못한 의무나 **아쉬움·후회**를 나타내요.',
          '**might, would, could have** 같은 표현은 가능성 · 추측 · 과거의 상황을 말할 때 써요.',
        ],
        examples: [
          ['I had to work late yesterday.', '어제 늦게까지 일해야 했어.', 'must / have to의 과거 → had to'],
        ],
      },
      {
        title: '확률 — 얼마나 확실한가',
        points: [
          '세기: **will**(거의 100%) > **should / ought to**(높음) > **may**(반반) > **might / could**(낮음)',
          '**will**: 일기예보가 며칠 전부터 확실하다고 한 수준. 누구나 그럴 거라고 믿는 상황이에요.',
          '예보에서 "There will be snow." / "It\'s going to snow."라고 했는데 눈이 안 오면 큰 화제가 될 정도로 확실한 느낌이에요.',
          '미래를 말할 때 주로 **will / shall**을 쓰는 이유도 이 둘이 확률이 가장 높기 때문이에요.',
          '**should / ought to**: will만큼은 아니지만 여전히 꽤 높은 확률이에요.',
          '**may**: 원어민 감각으로 50 : 50, 올 수도 안 올 수도',
          '**might / could**: 사실 꽤 낮은 확률. 아닐 것 같지만 100% 아니라고는 못 할 때',
        ],
        examples: [
          ['It will snow tonight.', '오늘 밤 눈 올 거야.', '거의 확실'],
          ['It should snow tonight.', '오늘 밤 눈이 올 거야.', 'will보다 약간 약함'],
          ['It ought to snow tonight.', '오늘 밤 눈이 올 거야.', 'should와 같은 세기'],
          ['It may snow tonight.', '오늘 밤 눈이 올 수도 있고 안 올 수도 있어.', '반반'],
          ['It might snow tonight.', '오늘 밤 혹시 눈이 올 수도 있어.', '안 올 가능성이 더 크지만 혹시 몰라'],
          ['It could snow tonight.', '오늘 밤 눈이 올 수도 있어.', 'might와 비슷하게 낮은 확률'],
          ['You might be right.', '네 말이 맞을 수도 있지.', '아닐 것 같지만 완전히 배제는 못 함'],
          ['You could be right.', '네 말이 맞을 수도 있어.', 'might be right와 같은 느낌'],
        ],
      },
      {
        title: '추측: must / should / may / might / can\'t',
        points: [
          '확신 정도: **must**(분명 ~일 거야) > **should**(~일 거야) > **may**(~일 수도 아닐 수도) > **might/could**(~일지도) > **can\'t**(~일 리 없어)',
          '**must**: 가장 강한 추측, "틀림없이 ~일 거야". 전화 오기로 한 사람이 있는데 마침 전화가 울릴 때 딱 맞아요.',
          '**should**: must만큼은 아니어도 "거의 그럴 거야"라는 꽤 강한 추측이에요.',
          '**may**: 50% 정도, "그럴 수도 있고 아닐 수도 있어"',
          '**might / could**: 가장 약한 추측. 솔직히 아닐 것 같지만 완전히 배제할 수는 없을 때',
        ],
        examples: [
          ['It must be Jihoo.', '(전화 울릴 때) 틀림없이 지후일 거야.', '가장 강한 추측'],
          ['It should be Jihoo.', '분명 지후일 거야.'],
          ['It may be Jihoo.', '지후일 수도 있고, 아닐 수도 있어.', '반반'],
          ['It might be Jihoo.', '혹시 지후일지도 몰라.', '아닐 것 같지만 혹시'],
          ['You must be tired.', '피곤하겠다.'],
          ['He might be in a meeting.', '회의 중일지도 몰라.'],
          ["That can't be true.", '그럴 리가 없어.'],
        ],
      },
      {
        title: '부탁·제안: 공손함의 단계',
        points: [
          'Can you ~? < Could you ~? / Would you ~? < Would you mind -ing? (뒤로 갈수록 공손)',
          '**현재형**(can)으로 부탁하면 심리적 거리가 없어서 직접적으로 들려요. **Can you help me?**는 주로 친한 사이에서 써요.',
          '부탁할 땐 **과거형**(could, would): 심리적 거리가 생겨서 상대가 부담을 덜 느끼고 거절할 여유가 있어요.',
          '대답할 땐 **현재형**(I can, I will): 확신을 줘요. 대답까지 과거형이면 "그럴 수도 있고…"처럼 살짝 빠져나가는 느낌이 나서, 상대는 안 들어줄 수도 있다고 느껴요.',
          '상대가 Would you ~? / Could you ~?로 물어봤어도 대답은 현재형으로! 현재형에는 "꼭 들어줄게"라는 의지가 담겨 있어요.',
          '정리: **부탁은 과거형으로 여유 있게, 대답은 현재형으로 확실하게.**',
          '제안: Shall we ~? / Why don\'t we ~? / We could ~',
        ],
        examples: [
          ['Can you help me?', '나 좀 도와줄래?', '친한 사이에서 쓰는 직접적인 말투'],
          ['Could you help me?', '이것 좀 도와주실 수 있어요?', '과거형이라 더 공손'],
          ['Would you help me?', '저 좀 도와주시겠어요?', '과거형이라 더 공손'],
          ['Could you send me the file?', '파일 좀 보내 주실 수 있을까요?'],
          ['Would you mind closing the door?', '문 좀 닫아 주시겠어요?', '대답 "No, not at all." = 괜찮아요(닫아 줄게요)'],
          ['Sure, I can.', '그럼요, 해 드릴게요.', '대답은 현재형으로 확신을 줘요'],
          ['Of course, I will.', '물론이죠, 할게요.', '대답은 현재형으로 확신을 줘요'],
        ],
      },
      {
        title: '의무: must / have to / should',
        points: [
          '**should**: 조언 "~하는 게 좋겠다" (가장 많이 씀)',
          '**have to**: 규칙·상황 때문에 "~해야 한다" (대화에서 must보다 훨씬 흔함)',
          '**must**: 강한 의무, 말하는 사람의 강한 생각 (글, 규정)',
          '**don\'t have to** = 안 해도 된다 / **must not** = 하면 안 된다 (뜻이 완전히 달라요!)',
        ],
        examples: [
          ['You should take a break.', '좀 쉬는 게 좋겠어.'],
          ['I have to leave early today.', '오늘 일찍 가야 해.'],
          ['For us to increase sales, we must make new advertisements.', '매출을 올리기 위해서 우리는 새로운 광고를 만들어야 해요.', '꼭 해야 하는 일 → must'],
          ["You don't have to come.", '안 와도 돼.'],
          ['You must not smoke here.', '여기서 담배 피우면 안 됩니다.'],
        ],
      },
      {
        title: '조언의 세기 — must부터 might까지',
        points: [
          '세기: **must / have to**(거의 명령) > **had better**(안 하면 곤란) > **should**(그게 옳고 이익이야) > **may / might**(가벼운 제안)',
          '**must / have to**는 조언이라기보다 "죽어도 해야 한다", "안 하면 안 된다"는 필수·강제예요. 살짝 협박 같은 느낌까지 있어서 일상 조언엔 잘 안 써요. 꼭 해야만 하는, 피할 수 없는 상황에 써요.',
          '에미넴의 노래 "Lose Yourself"의 가사 "You only get one shot"(기회는 딱 한 번뿐)처럼, "반드시 잡아야 한다"는 절박함이 must / have to의 느낌이에요.',
          '**should**는 must 바로 아래 세기로, 조언으로 가장 자주 써요. 단순히 "이거 하세요"가 아니라, 그렇게 하는 게 **이익**이거나 **도리상 옳다**는 뜻이 숨어 있어요. 그래서 should도 꽤 강한 조언이에요.',
          '**may (want to)**: "이럴 수도 있다"는 가능성의 느낌이라 가벼운 조언·제안이 돼요.',
          '**would**(I would ~ / I\'d ~)는 격식 · 희망 · 정중한 요청 · 조언에 두루 써요. "You should try to read a book."보다 더 부드럽고 가벼워요.',
          '**might**는 "시간 되면 한번 해 봐, 난 크게 상관없어" 정도로 가장 약한 조언이에요.',
        ],
        examples: [
          ['You only get one shot.', '기회는 딱 한 번뿐이야.', '"반드시 잡아야 해" → must / have to의 절박함'],
          ['You should help the dog.', '그 개를 도와줘야지.', '그게 옳다는 조언'],
          ['You should go there.', '거기 가는 게 맞아.', '가는 게 이익이거나 도리상 옳다는 느낌'],
          ['You may want to read this book.', '이 책 한번 읽어 보는 것도 좋아요.', '가벼운 제안'],
          ['You should try to read a book.', '책 좀 읽어 보도록 해.', 'would보다 강한 조언'],
          ["I'd read a book.", '나라면 책을 읽겠어.', 'would → 더 부드러운 조언'],
          ['You might want to read a book when you have time.', '시간 되면 책 한번 읽어 봐.', '가장 약한 조언'],
        ],
      },
      {
        title: 'can / could — could가 "과거"일 때는 능력뿐',
        points: [
          'could가 **과거**로 쓰이면 뜻은 **능력**(~할 수 있었다)뿐이에요.',
          '허가 · 가능성 · 추측의 could는 과거가 아니라 **can보다 정중하거나 불확실한** 뜻이에요. 과거로 해석하지 마세요.',
        ],
        examples: [
          ['I could swim when I was five.', '다섯 살 때 수영할 수 있었어.', '과거 능력'],
          ['Could I have some coffee?', '커피 좀 마실 수 있을까요?', 'can보다 정중한 요청'],
          ['8 Things That Could Fall off Your Car Tomorrow', '내일 당신 차에서 떨어질 수도 있는 8가지', 'can보다 불확실한 가능성'],
          ["Jane could arrive at 6 o'clock.", '제인은 6시에 도착할 수도 있어.', 'can보다 불확실한 추측'],
        ],
      },
      {
        title: '과거 추측·후회: 조동사 + have p.p.',
        points: [
          '조동사 뒤엔 동사원형만 오니까, **과거 일**을 추측하거나 아쉬워할 땐 조동사 + **have p.p.**(현재완료 모양)를 써요.',
          '**must have p.p.**: ~했음이 틀림없다',
          '**can\'t have p.p.**: ~했을 리 없다',
          '**might / may / could have p.p.**: ~했을지도 모른다',
          '**should have p.p.**: ~했어야 했는데 (안 해서 아쉽다)',
        ],
        examples: [
          ["She can't be fired.", '그녀가 해고될 리 없어.', '현재 추측'],
          ["She can't have been fired.", '그녀가 해고됐을 리 없어.', "can't be fired의 과거 추측 → can't have been p.p."],
          ['He must have been at home yesterday.', '그는 어제 집에 있었던 게 틀림없어.', '과거에 대한 강한 추측'],
        ],
      },
      {
        title: '조동사 + 수동태: 조동사 + be p.p.',
        points: [
          '수동태(be p.p.)에 조동사가 붙으면 be는 **동사원형 그대로**: 조동사 + **be p.p.**',
        ],
        examples: [
          ['The company should keep the file confidential.', '회사는 그 파일을 기밀로 유지해야 해요.', '능동태'],
          ['The file should be kept confidential (by the company).', '그 파일은 기밀로 유지되어야 해요.', 'should + be p.p.'],
          ['Your request for membership will be approved in two days.', '회원 신청은 이틀 후에 승인될 거예요.', 'will + be p.p.'],
        ],
      },
    ],
    native: [
      '회사에서 부탁할 땐 Can you보다 **Could you**가 기본이에요.',
      '"You should ~"는 조언이지만 윗사람에겐 강하게 들릴 수 있어요. "You might want to ~" (~하시는 게 좋을 수도 있어요)가 훨씬 부드러워요.',
      '"Could you ~?"로 부탁받으면 "Sure, I can." / "Of course, I will."처럼 현재형으로 시원하게 대답하세요.',
      '과거 후회는 **should have p.p.**인데, 말할 땐 보통 **should\'ve**로 줄여요. → "I should\'ve checked it."',
      '**must**는 거의 강요처럼 들려서 조언할 땐 부담스러워요. 일상 조언은 **should**, 더 부드럽게는 **I\'d ~ / You might want to ~**로 충분해요.',
    ],
    mistakes: [
      ['I must to go now.', 'I have to go now.', '조동사 뒤엔 to 없이 동사원형. 대화에선 have to가 자연스러워요.'],
      ["You mustn't come tomorrow. (안 와도 된다는 뜻으로)", "You don't have to come tomorrow.", 'must not = 금지, don\'t have to = 불필요'],
      ['Can I ask you a favor? (윗사람에게)', 'Could I ask you a favor?', '틀린 건 아니지만 could가 더 공손해요.'],
      ['He must be at home yesterday.', 'He must have been at home yesterday.', '과거 추측은 조동사 + have p.p.'],
      ['Could I have some coffee? → "커피를 마실 수 있었나요?"로 해석', '"커피 좀 마실 수 있을까요?"로 해석', '정중한 요청의 could는 과거가 아니에요. 과거 could는 능력일 때만!'],
      ['(부탁받고) Sure, I could.', 'Sure, I can.', '대답까지 과거형이면 들어줄지 말지 애매하게 들려요.'],
      ['The file should is kept confidential.', 'The file should be kept confidential.', '조동사 뒤에는 be 동사도 원형 be'],
    ],
  },

  {
    id: 'to-ing',
    title: 'to부정사 · 동명사',
    sub: 'to부정사 3가지 용법 · 의미상 주어 · to vs -ing · 일·사·지 · V-ing 세 갈래',
    summary: 'to는 "앞으로 할 일", -ing는 "이미 하고 있거나 해 본 일"의 느낌이에요.',
    videos: [
      ['beQNlMfPqbw', 'To 부정사와 동명사의 비밀!'],
    ],
    basics: [
      '**to부정사** = to + 동사원형 (to eat). 품사가 정해져 있지 않아서 문장 속 **역할(명사·형용사·부사)**로 판단해요.',
      '한 줄 요약: **명사** "~하는 것" / **형용사** 명사 (to R) "~할" / **부사** "~하기 위해서", 결과',
      '**동명사** = 동사 + -ing. 동사를 **명사처럼** 써요. move → moving "옮기는 것"',
      '동사 뒤에 또 동사가 올 땐 **to + 동사원형** 또는 **-ing** 모양으로 바꿔요.',
      '어떤 동사는 to만, 어떤 동사는 -ing만, 어떤 동사는 둘 다 받는데 **뜻이 달라져요**. 외울 땐 **느낌**으로 묶으면 쉬워요.',
      '**to**: 앞으로 향하는 느낌 (원하다, 계획하다, 결정하다) / **-ing**: 이미 있는 일 (즐기다, 끝내다, 피하다)',
    ],
    sections: [
      {
        title: '원어민의 그림: to는 "→ 쪽으로", -ing는 "이미 있는 것"',
        points: [
          '"to부정사"의 **부정(不定)**은 "정해지지 않음"이라는 뜻이에요. 부정적이라는 뜻이 아니에요. 영어로는 **to-infinitive**, 풀어 말하면 "to와 함께 쓰는, **아직 정해지지 않은 동사원형**"이에요.',
          '부정사 to와 전치사 to는 **뿌리가 같아요**. 둘 다 **"어느 방향으로 향함"** → 아직 도착하지 않은, 앞으로의 일',
          '"어느 방향으로"는 멈춰 있지 않고 **움직이는(동적인)** 그림이에요. "오른쪽으로 가"처럼 **물리적인 방향**에도, "좋은 쪽으로 생각해 보자"처럼 **추상적인 방향**에도 써요.',
          'You need **to move** to the front. → 앞의 to는 move라는 **행동 쪽으로**(그래서 "움직여야 한다"), 뒤의 to는 front라는 **장소 쪽으로** 나아가요. 그림은 같지만 앞은 **부정사 to**, 뒤는 **전치사 to**로 불러요.',
          '원어민은 to를 **"뒤에 나오는 것 쪽으로 향하는 그림"**으로 기억해요. 그래서 모양 하나 안 바꾸고 to 하나로 "~할", "~하는 것", "~하기"를 다 표현해요.',
          '이렇게 **역할도, 시기도 정해져 있지 않아서** "정해지지 않은 말", 즉 **부정사**라고 불러요.',
          '**-ing**는 **이미 존재하는 것**(지금 하고 있거나 이미 한 일) → 과정 중심, 현재·과거 쪽',
          '"존재"를 영어로 **being**이라고 하죠? -ing 자체가 "이미 있는 것"의 느낌이에요. 그래서 **to = 아직 존재하지 않는 것**, **-ing = 이미 존재하는 것**',
          '정리하면 **to** = 목표·미래 지향 / **-ing** = 과정·현재·과거 지향. 이 차이만 알면 동사 뒤에 뭐가 올지, 둘 다 올 때 뜻이 어떻게 달라지는지 대부분 풀려요.',
        ],
        examples: [
          ['You need to move to the front.', '앞으로 움직여야 해요.', 'to move = 행동 쪽으로(부정사) / to the front = 장소 쪽으로(전치사)'],
          ['a box to move', '옮길 상자', 'move 쪽으로 향하는 상자 → "~할"'],
          ['I want to move a box.', '상자를 옮기고 싶어.', 'move 쪽으로 가기를 원함 → "옮기는 것을 원한다"'],
          ['Moving a box is hard.', '상자를 옮기는 건 힘들어.', '이미 있는 행동 → -ing (동명사 주어)'],
          ['To be or not to be, that is the question.', '앞으로 살 것인가, 죽을 것인가 그것이 문제로다.', '셰익스피어 — 앞으로 삶과 죽음 중 무엇을 고를지, 앞날의 향방 → to'],
        ],
      },
      {
        title: 'to부정사의 세 가지 용법',
        points: [
          '**명사적** — 주어 "~것은, ~기는"(은·는·이·가) / 목적어 "~것을, ~기를"(을·를) / 보어 "~것이다, ~기이다"',
          '**형용사적** — 명사 수식 "~하는(-ㄴ), ~할(-ㄹ)" → 명사 **뒤에서** 꾸며요: N + (to R)',
          '**형용사적 — be to 용법** (보어 자리) — **예정·의무·가능·운명·의도** 다섯 가지 뜻',
          '**부사적 ★** — 목적 "~하기 위해서" / 형용사 수식 "~하기에" / 감정의 원인 "~해서" / 판단의 근거 "~하다니" / 결과 "그래서 ~가 되었다"',
          '보통 부사는 주로 **원인·이유·목적·결과**를 나타내요. "~하기 위해서", "~때문에", "~을 위해"가 가장 흔한 부사의 뜻이죠. 그래서 to부정사의 부사적 용법도 **원인(이유), 목적, 결과**의 뜻이 돼요.',
        ],
        examples: [
          ['To learn English is fun.', '영어를 배우는 건 재미있어.', '주어 "~것은" (명사적). 대화에선 보통 It is fun to learn English.'],
          ['I want to travel.', '여행 가고 싶어.', '목적어 "~것을" (명사적)'],
          ['My dream is to be a teacher.', '내 꿈은 선생님이 되는 거야.', '보어 "~것이다" (명사적)'],
          ['To be honest is important to be a teacher.', '교사가 되려면 정직한 것이 중요하다.', "To be honest = 주어(명사적) / to be a teacher = 목적(부사적). 대화에선 It's important to be honest if you want to be a teacher."],
          ['They need a house to live in.', '그들은 살 집이 필요하다.', 'a house를 뒤에서 꾸밈 "~할" (형용사적)'],
          ['The meeting is to be held tomorrow.', '회의는 내일 열릴 예정이다.', 'be to — 예정'],
          ['You are to finish this by five.', '너는 이걸 5시까지 끝내야 한다.', 'be to — 의무'],
          ['Not a star was to be seen.', '별 하나 볼 수 없었다.', 'be to — 가능'],
          ['He was never to see his hometown again.', '그는 다시는 고향을 볼 수 없을 운명이었다.', 'be to — 운명'],
          ['If you are to succeed, you must work hard.', '성공하려면 열심히 해야 한다.', 'be to — 의도 (if절에서 자주)'],
          ['She is kind to help the old man.', '할아버지를 돕다니 그녀는 친절하다.', '판단의 근거 "~하다니" (부사적)'],
          ['This book is easy to read.', '이 책은 읽기 쉽다.', '형용사 easy를 꾸밈 "~하기에" (부사적)'],
          ['I was happy to see you.', '널 봐서 기뻤어.', '감정의 원인 "~해서" (부사적)'],
          ['He grew up to be a doctor.', '그는 자라서 의사가 되었다.', '결과 (부사적)'],
        ],
      },
      {
        title: '목적 "~하기 위해서" · 의미상 주어',
        points: [
          '목적을 분명히 할 땐 to 대신 **in order to / so as to**를 써도 돼요.',
          '사람이 하는 행동의 목적엔 **for + -ing ✗** → to부정사만 써요.',
          'to부정사의 주어(행동하는 사람)가 따로 있으면 to 앞에 **for + 명사** 또는 **for + 대명사 목적격**을 붙여요.',
          '단, **kind, nice, sweet, smart, rude**처럼 사람의 성품·성격을 말하는 형용사 뒤엔 **of + 목적격**',
        ],
        examples: [
          ['He studied hard in order to pass the exam.', '그는 시험에 붙으려고 열심히 공부했다.'],
          ['She left early so as to catch the first train.', '그녀는 첫차를 타려고 일찍 나섰다.', 'so as to = in order to'],
          ['For us to increase sales, we must make new advertisements.', '매출을 올리려면 우리는 새 광고를 만들어야 한다.', 'for us = 늘리는 주체'],
          ['It is important for students to read every day.', '학생들이 매일 책을 읽는 게 중요해.', 'for + 명사도 OK'],
          ["It's hard for me to wake up early.", '나는 일찍 일어나기가 힘들어.'],
          ["It's kind of you to help me.", '도와주시다니 친절하시네요.', '성품 형용사 → of'],
        ],
      },
      {
        title: 'to만 받는 동사 — 미래·의지',
        points: [
          '★ "원하다" 계열은 to부정사: **want, need, wish, hope, desire, expect, would like**',
          '계획·결정·선택: **plan, decide, intend, choose, seek, promise, agree, refuse**',
          '이 동사들은 모두 **그 시점에 아직 존재하지 않거나 일어나지 않은 무언가를 향해 나아가는** 그림이에요. 우리는 어떤 목표를 이루려고 원하고, 계획하고, 결정하고, 의도하고, 선택하잖아요.',
          '노력·시도: **strive**(추구하며 애쓰다), **struggle**(분투하다), **try**(시도하다) → 아직 이루지 못한 목표, 다음 단계로 나아가려고 애쓰는 그림',
          '이렇게 **동사 자체의 그림이 목표·미래 지향적**일 때 뒤에 to가 오는 게 자연스러워요.',
        ],
        examples: [
          ['I decided to quit my job.', '회사를 그만두기로 했어.'],
          ["I'd like to book a table.", '자리 예약하고 싶어요.'],
          ['We plan to visit Jeju next month.', '우리는 다음 달에 제주도에 갈 계획이야.', '아직 안 일어난 일 → to'],
          ['She strives to improve every day.', '그녀는 매일 나아지려고 애써.', '목표를 향한 노력 → to'],
        ],
      },
      {
        title: '-ing만 받는 동사 — 이미 하는/한 일',
        points: ['enjoy, finish, avoid, mind, keep, suggest, consider, practice, give up, look forward to'],
        examples: [
          ['I enjoy cooking.', '나는 요리하는 걸 좋아해.'],
          ['I look forward to hearing from you.', '연락 기다리겠습니다.', 'to 뒤지만 전치사 to라서 -ing!'],
        ],
      },
      {
        title: '동명사 vs to부정사 — 언제 일어난 일이냐',
        points: [
          '**동명사(-ing)**: 동사보다 **먼저(과거)** 일어났거나 **동시에** 일어나는 일, **실제로** 일어났거나 일어나는 일',
          '**to부정사**: 동사보다 **나중에(미래)** 일어날 일, **추상적이거나 가정적인** 일',
          '말투 차이도 있어요. **동명사**는 가볍고 **캐주얼한 대화**에서, **to부정사**는 **형식적이고 공식적인** 자리에서 더 자주 쓰여요.',
        ],
        examples: [
          ['I miss talking with my grandmother.', '할머니랑 이야기하던 게 그리워.', '그리워하기 전에 이미 한 일 → -ing'],
          ['Mr. and Mrs. Johnson have decided to have a baby.', '존슨 부부는 아이를 갖기로 했다.', '결정한 뒤에 할 일 → to'],
          ['The entrepreneur seems to have money to burn.', '그 사업가는 돈이 남아도는 것 같다.', '추상적인 일 → to'],
        ],
      },
      {
        title: '둘 다 되는 동사 ① stop',
        points: [
          '우리말 "멈추다"는 **내가 멈추는 것**과 **하던 걸 멈추는 것**을 다 뜻하지만, 영어는 to와 -ing로 딱 구분해요.',
          '**stop + to부정사** = 어떤 **목표를 위해(하려고)** 잠시 멈추다 → to 뒤가 멈춘 목적',
          '**stop + -ing** = **하던(이미 있는) 행동**을 멈추다, 그만두다',
          'stop smoking (담배를 끊다) / stop to smoke (담배 피우려고 멈추다)',
        ],
        examples: [
          ['I stopped to rest.', '쉬려고 멈췄어.', '쉬는 게 목표 → to'],
          ['I stopped working.', '일하던 걸 멈췄어.', '하던 일을 그만둠 → -ing'],
          ['I stopped to see the scenery.', '경치를 보려고 멈춰 섰다.', '여행 중 아름다운 경치를 보려는 목표로 멈춤'],
          ['I stopped sightseeing.', '구경하던 걸 멈췄다.', '이미 하던 구경을 중단'],
          ["I'm getting ready to leave.", '이제 떠날 채비를 하고 있어.', '구경을 멈추고 다음 단계로 → 앞으로 할 일이라 to'],
        ],
      },
      {
        title: '둘 다 되는 동사 ② remember · forget',
        points: [
          '**remember / forget + to** = **앞으로 해야 할 일**을 기억하다/잊다. 또는 과거라도 **잊어서 실제로 안 한 일**(추상적인 일)',
          '**remember / forget + -ing** = **과거에 실제로 한 일**을 기억하다/잊다. -ing가 "이미 존재하는 행동"이니까 그 행동을 떠올리는 거예요.',
          '-ing는 어제, 오늘 아침, 조금 전처럼 **이미 일어난 일**에 대한 기억이에요.',
        ],
        examples: [
          ['I will remember to call her.', '그녀에게 전화하는 거 꼭 기억할게.', '앞으로 할 일 → to'],
          ["Don't forget to call me.", '나한테 전화하는 거 잊지 마.', '앞으로 해야 할 연락 → to (회화 단골)'],
          ['Remember to lock the door.', '문 잠그는 거 잊지 마.', '앞으로 할 일'],
          ['I remember calling her.', '그녀에게 전화했던 게 기억나.', '이미 한 일 → -ing'],
          ['I remember locking the door.', '문 잠근 거 기억나.', '이미 한 일'],
          ["I don't remember calling her.", '그녀에게 전화한 게 기억 안 나.', '술 마신 다음 날, 전화한 기억이 없을 때 → 이미 한 일이라 -ing'],
        ],
      },
      {
        title: '둘 다 되는 동사 ③ regret',
        points: [
          'regret이라는 단어 자체가 **좋지 않은 마음**(후회, 슬픔, 아쉬움)이에요.',
          '**regret + to** = **앞으로 ~하게 되어** 미리 유감이다 → 아직 안 알렸지만, 이제 알릴 내용 때문에 미리 안 좋은 마음',
          '**regret + -ing** = **이미 ~한 것**을 후회하다 → 이미 해 버린 일 때문에 안 좋은 마음',
          '사전에는 보통 **regret to = 유감이다**, **regret -ing = 후회하다**로 따로 나와요. 그림으로 보면 "앞으로 할 일 때문에" vs "이미 한 일 때문에"의 차이예요.',
        ],
        examples: [
          ['I regret to inform you that the book is out of stock.', '유감스럽지만 그 책은 재고가 없음을 알려 드립니다.', '알리게 되어 유감 → to'],
          ['We regret to inform you that the event has been canceled.', '행사가 취소되었음을 알려 드리게 되어 유감입니다.', '공지·메일 단골 표현 → to'],
          ['I regret lending him some money.', '그에게 돈을 빌려준 걸 후회해.', '이미 빌려준 일 → -ing'],
          ['I regret telling him the secret.', '그에게 비밀을 말한 걸 후회해.', '이미 한 일 → -ing'],
        ],
      },
      {
        title: '둘 다 되는 동사 ④ try',
        points: [
          'try 자체는 **시도하고 애쓰는** 느낌이에요.',
          '**try + to** = **~하려고 애쓰다, 노력하다** → to 뒤의 동사가 내가 애써서 이루려는 **최종 목표**예요.',
          '**try + -ing** = **시험 삼아 ~해 보다** → -ing 행동이 이미 머릿속에 있고, 여러 방법(옵션) 중 **하나를 한번 해 보는** 거예요.',
          '사전에는 **try to = 노력하다**, **try -ing = 시도하다(해 보다)**로 나와요. 핵심은 "그게 목표냐, 그냥 한번 해 보는 거냐"예요.',
        ],
        examples: [
          ['He tried to open the door.', '그는 문을 열려고 애썼다.', '문 열기가 최종 목표 → to'],
          ["I'll try opening the door.", '문 한번 열어 볼게요.', '아파트 카드가 되는지 확인하려고 시험 삼아 → -ing (문 열기 자체가 목표 아님)'],
          ['Try restarting your computer.', '컴퓨터 재부팅 한번 해 봐.', '여러 해결법 중 하나 → -ing'],
        ],
      },
      {
        title: '목적격보어 자리의 to부정사 — 일·사·지',
        points: [
          '5형식(주어 + 동사 + **목적어 + 목적격보어**)에서 목적어가 **할 행동**이 보어 자리에 와요. 해석 틀: "주어는 동사한다, **목적어가 보어 하도록**"',
          '암기법 **일·사·지**',
          '**일**반동사(want, tell, ask, get …) + 목적어 + **to V**',
          '**사**역동사(make, have, let) + 목적어 + **동사원형**',
          '**지**각동사(see, hear, watch, feel …) + 목적어 + **동사원형 / -ing**',
          '**help** + 목적어 + **동사원형 / to V** (둘 다 OK). get과 help는 보통 **준사역동사**라고 불러요.',
          '목적어가 **당하는** 쪽이면 (to be) p.p.가 와요. 이때 **to be는 생략**할 수 있어요.',
          '지각동사 문장을 **수동태**로 바꾸면 동사원형이 **to부정사**로 바뀌어요: be + p.p. + to V',
        ],
        examples: [
          ['She wanted me to build a house.', '그녀는 내가 집을 짓기를 원했다.', '일반동사 → to V'],
          ['She got me to build a house.', '그녀는 나에게 집을 짓게 했다.', 'get → to V'],
          ['She had me build a house.', '그녀는 나에게 집을 짓게 했다.', '사역동사 → 동사원형'],
          ['She saw me build a house.', '그녀는 내가 집 짓는 걸 봤다.', '지각동사 → 동사원형'],
          ['She saw me building a house.', '그녀는 내가 집을 짓고 있는 걸 봤다.', '지각동사 → -ing (진행 중인 모습)'],
          ['She helped me (to) build a house.', '그녀는 내가 집 짓는 걸 도와줬다.', 'help → 동사원형 / to V'],
          ['She wanted a house (to be) built by me.', '그녀는 집이 나에 의해 지어지기를 원했다.', '집은 지어지는 쪽 → (to be) p.p.'],
          ['She thought me (to be) a doctor.', '그녀는 나를 의사라고 생각했다.', '명사·형용사 보어 앞 to be 생략 가능'],
          ['I saw Tom run away. → Tom was seen to run away (by me).', '나는 탐이 도망가는 걸 봤어. → 탐이 도망가는 게 보였어.', '수동태가 되면 동사원형 → to부정사'],
        ],
      },
      {
        title: '문장 속 to부정사 찾기 — 거품 빼기 · 가목적어 it',
        points: [
          '긴 문장은 꾸미는 말(거품)을 괄호로 묶어 걷어내고 뼈대를 찾아요. **형용사적 to부정사 N + (to R) "~할"**도 걷어낼 수 있는 거품이에요.',
          '반대로 주어·목적어·보어 자리에 있는 **명사적 to부정사**는 문장 성분이라서 걷어내면 안 돼요.',
          'believe, make, consider, find, think 같은 5형식 동사는 목적어 자리에 to부정사구를 **바로 못 써요**. 대신 **가목적어 it**을 놓고 진짜 목적어(to R)는 뒤로 보내요.',
          '모양: 주어 + 5형식 동사 + **it** + 목적격보어 + **to 동사원형 ~**',
        ],
        examples: [
          ['I have a lot of homework (to do tonight).', '나는 (오늘 밤 할) 숙제가 많아.', '(to do tonight) = a lot of homework를 꾸미는 거품'],
          ['I found it hard to wake up early.', '일찍 일어나는 게 힘들다는 걸 알았어.', 'it = 가목적어, to wake up early = 진목적어'],
          ['She made it a rule to walk every morning.', '그녀는 매일 아침 걷는 걸 규칙으로 삼았다.', 'it = to walk every morning'],
        ],
      },
      {
        title: 'V-ing 세 갈래: 동명사 · 현재분사 · 분사구문',
        points: [
          '**동명사** = 동사 → 명사 "~것, ~기" → 주어·목적어·보어(S, O, C) 자리 모두 가능',
          '**현재분사** = 형용사 "~하는(-ㄴ), ~할(-ㄹ)" → 명사를 꾸미거나 보어',
          '**분사구문** = 서술어가 들어 있던 **문장 덩어리**를 줄인 것 → 부사 "~하면서, ~해서", 문장 전체(주절)를 꾸밈 (분사 · 분사구문에서 자세히)',
          '빈칸 문제에서 **To be**와 **Being**이 같이 나오면: To be = "~하기 위해서"(목적) / Being = 주절을 꾸미는 분사구문 "~로서, ~이어서". 뜻으로 골라요.',
        ],
        examples: [
          ['Swimming is good exercise.', '수영은 좋은 운동이다.', '동명사 (주어)'],
          ['Look at the boy swimming in the pool.', '수영장에서 수영하는 소년을 봐.', '현재분사 (boy를 꾸밈)'],
          ['I like her sitting next to me.', '내 옆에 앉아 있는 그녀가 좋아.', 'sitting = "앉아 있는" → 현재분사'],
          ['Walking home, I met Tom.', '집에 걸어가다가 톰을 만났다.', '분사구문 (~하면서)'],
          ["Being the head chef at Marlena's, Roy Salazar has complete control over the contents of the menus.", "Marlena's의 수석 셰프라서 로이 살라자르는 메뉴 구성을 완전히 책임진다.", '빈칸 문제: (A) To be(~하기 위해서) vs (C) Being(분사구문) → 정답 Being'],
        ],
      },
    ],
    native: [
      '"Thanks for -ing"(~해 줘서 고마워), "How about -ing?"(~하는 거 어때?)처럼 전치사 뒤는 항상 -ing예요.',
      '메일 끝 "I look forward to hearing from you."는 to 뒤 -ing의 대표 예문이에요.',
      '친구끼리 가볍게 말할 땐 -ing(I like cooking), 공식적인 글에선 to부정사(We regret to inform you…)가 더 자주 보여요.',
      '헤어질 때 "Don\'t forget to call me!"(전화하는 거 잊지 마!)처럼 forget/remember + to는 일상에서 정말 자주 써요.',
    ],
    mistakes: [
      ['I enjoy to watch movies.', 'I enjoy watching movies.', 'enjoy는 -ing만'],
      ['I look forward to see you.', 'I look forward to seeing you.', '여기 to는 전치사 → -ing'],
      ['I want going home.', 'I want to go home.', 'want는 to만'],
      ['I went to the store for buying milk.', 'I went to the store to buy milk.', '행동의 목적엔 for -ing ✗ → to부정사'],
      ["It's kind for you to help me.", "It's kind of you to help me.", '성품 형용사 뒤 의미상 주어는 of'],
      ['I regret to tell him the secret. (말한 걸 후회)', 'I regret telling him the secret.', '이미 한 일을 후회하면 -ing'],
      ["Don't forget calling me. (앞으로 전화해 달라는 뜻)", "Don't forget to call me.", '앞으로 할 일은 to'],
      ['I stopped to smoke. (담배를 끊었다는 뜻)', 'I stopped smoking.', '하던 걸 그만두면 -ing / stop to는 "~하려고 멈추다"'],
      ['I want you go home.', 'I want you to go home.', 'want + 목적어 + to V'],
      ['She made me to clean my room.', 'She made me clean my room.', '사역동사 + 목적어 + 동사원형'],
    ],
  },

  {
    id: 'participle',
    title: '분사 · 분사구문',
    sub: '-ing / p.p. 형용사 · 접속사 빼고 줄이기 · 문맥으로 읽는 표현 기법',
    summary: '분사는 형용사(명사 꾸미기), 분사구문은 부사절을 짧게 줄인 거예요. 분사구문은 외울 공식이 아니라, 문맥상 오해가 없을 때 말을 짧고 생생하게 전하는 표현 기법이에요.',
    videos: [
      ['fccvj1TKpkg', '분사구문의 모든 것!'],
    ],
    basics: [
      '**분사 = 형용사** 역할. 명사를 꾸미거나 보어가 돼요.',
      '**현재분사(V-ing)** = 능동 "~하는" / **과거분사(p.p.)** = 수동·완료 "~된, ~해진"',
      '**분사구문** = 부사절에서 **접속사와 주어를 빼고** 동사를 -ing로 바꾼 것. -ing로 바꿨다는 건 **절을 구로 줄였다**는 표시예요. 그래서 분사구문은 **부사구**처럼 문장 전체를 꾸며요.',
      '이름도 그래서 붙었어요. -ing(현재분사)와 -ed(과거분사)는 "지금 ~하는 중인", "~된 상태인" 모습을 그려 주는 말이라, 이 **분사로 만든 구**를 "분사구문"이라고 불러요.',
      '분사구문을 쓰는 진짜 이유: 문맥으로 충분히 알 수 있는 말은 굳이 반복하지 않고, **간결하고 생동감 있게** 그리려는 거예요. "어떻게 만드나"보다 **"왜 쓰나"**를 알면 훨씬 쉽게 읽혀요.',
    ],
    sections: [
      {
        title: '현재분사 vs 과거분사',
        points: [
          '꾸미는 명사가 **직접 하면** -ing(능동), **당하거나 이미 된 상태면** p.p.(수동·완료)',
          '해석: 현재분사는 "**~하는**", 과거분사는 "**~되어진, ~해진**". 우리말로는 "-ㄴ, -ㄹ"처럼 명사 앞에 붙는 말로 풀면 돼요.',
          'a rising sun (떠오르는 해) / fallen leaves (떨어진 낙엽) → rising, fallen 둘 다 명사를 꾸미는 형용사',
          '분사에 다른 말이 붙어 길어지면 명사 **뒤에서** 꾸며요: the boy crying in the park',
          '감정 동사도 같은 원리예요. 감정을 **주는** 쪽이면 -ing(boring, shocking), 감정을 **느끼는** 쪽이면 p.p.(bored, shocked)',
        ],
        examples: [
          ['a rising sun / fallen leaves', '떠오르는 해 / 떨어진 낙엽', '해가 직접 떠오름(능동) / 잎은 이미 떨어진 상태(완료)'],
          ['I saw the boy crying in the park.', '공원에서 울고 있는 소년을 봤다.', '[crying / cried] 중 고르기 → 소년이 직접 운다(능동) → crying'],
          ["The car parked here is my father's.", '여기 주차된 차는 우리 아빠 차야.', '차는 주차되는 쪽(수동) → parked'],
          ['The movie was boring, so I was bored.', '영화가 지루해서 나는 지루했다.', '감정을 주면 -ing, 느끼면 p.p.'],
        ],
      },
      {
        title: '현재분사 vs 동명사 — 똑같이 -ing인데 뭐가 달라요?',
        points: [
          '**현재분사** = 형용사. 해석 "~하는". 명사를 꾸미거나 보어가 돼요.',
          '**동명사** = 명사. 해석 "~것, ~기". 주어·목적어·보어 자리에 와요.',
          '**분사구문** = 서술어가 들어 있는 문장 덩어리를 줄인 것. "~하면서, ~해서"처럼 **부사** 역할을 해요.',
          '헷갈리면 "~하는"으로 풀리는지(현재분사), "~하는 것"으로 풀리는지(동명사) 넣어 보세요.',
        ],
        examples: [
          ['I like her sitting next to me.', '나는 내 옆에 앉아 있는 그녀가 좋아.', 'sitting = "앉아 있는" → her를 꾸미는 현재분사'],
        ],
      },
      {
        title: '분사구문 만들기 — 3단계',
        points: [
          '① 부사절의 **접속사**를 빼요.',
          '② 주절과 부사절의 **주어가 같으면** 부사절 주어도 빼요.',
          '③ 부사절 동사를 **원형으로 바꾼 다음 -ing**를 붙여요. (was → be → being)',
          '[접속사 + S + V], S + V(주절) → **V-ing ~, S + V**',
          'be동사는 Being이 되는데, **Being은 거의 늘 생략**해요. 그래서 수동은 (being) p.p. → p.p.만 남아요.',
        ],
        examples: [
          ['While he was walking his dog in the park, he ran into an old friend, Pete.', '그는 공원에서 개를 산책시키다가 옛 친구 피트를 우연히 만났다.', '원래 문장 (부사절 + 주절)'],
          ['→ (While) (he) was walking his dog in the park, ~', '접속사와 같은 주어를 지운 모습', '① While 생략 → ② 같은 주어 he 생략 → ③ was를 원형 be로 바꾸고 -ing → being'],
          ['→ Walking his dog in the park, he ran into an old friend, Pete.', '공원에서 개를 산책시키다가 그는 옛 친구 피트를 마주쳤다.', 'being은 거의 생략 → 최종 문장'],
          ['When I walked home, I met Tom. → Walking home, I met Tom.', '집에 걸어가다가 톰을 만났다.'],
          ['As she was left alone, she began to cry. → (Being) Left alone, she began to cry.', '혼자 남겨지자 그녀는 울기 시작했다.', 'was left → being left → being 생략 → left'],
        ],
      },
      {
        title: '형태로 보는 시제와 태',
        points: [
          '먼저 재료를 기억해요: **be + -ing = 진행**, **have + p.p. = 완료**, **-ing = 능동**, **be + p.p. = 수동**',
          '접속사를 빼려고 동사를 V-ing로 바꾸면 be는 Being이 돼요. 수동태는 be + p.p.니까 분사구문에선 **being p.p.** → **(being) p.p. = 수동**',
          '**-ing** — 주절과 같은 시제, 능동',
          '**having p.p.** — 주절보다 앞선(과거) 일, 능동',
          '**(being) p.p.** — 주절과 같은 시제, 수동',
          '**having been p.p.** — 주절보다 앞선(과거) 일, 수동',
          '두 절의 시제가 다르면, **더 과거인 쪽**을 Having p.p.로 만들어요.',
        ],
        examples: [
          ['As he had finished his homework, he went to the library.', '그는 숙제를 끝냈기 때문에 도서관에 갔다.', '원래 문장: had finished(더 과거) / went'],
          ['→ Having finished his homework, he went to the library.', '숙제를 끝내고 나서 그는 도서관에 갔다.', 'As 생략 → he 생략 → 더 과거라서 Having p.p.'],
          ['Having finished the report, I went home.', '보고서를 다 끝내고 나서 집에 갔다.', '끝낸 게 먼저 → having p.p.'],
        ],
      },
      {
        title: '주어가 다르면 주어를 남겨요',
        points: ['주어가 서로 달라도 분사구문을 만들 수 있어요. 이때는 부사절의 주어를 빼지 않고 분사 앞에 **그대로 둬요**.'],
        images: [['images/grammar/notes/00.jpg', '주어가 다른 분사구문: Because the weather was nice, I decided ... → **The weather being nice**, I decided to go for a picnic with my friends.']],
        examples: [
          ['Because the weather was nice, I decided to go for a picnic with my friends.', '날씨가 좋아서 나는 친구들과 피크닉을 가기로 했다.', '원래 문장: 주어 the weather ≠ I'],
          ['→ The weather being nice, I decided to go for a picnic with my friends.', '날씨가 좋아서 나는 친구들과 피크닉을 가기로 했다.', '주어가 달라서 the weather는 남김'],
        ],
      },
      {
        title: '분사구문 해석 — 문맥에 맞는 접속사 넣어 보기',
        points: [
          '**시간**: ~할 때, ~하면서 (when, while, after)',
          '**원인**: ~해서, ~여서 (as, since, because)',
          '**조건**: ~라면, ~한다면 (if)',
          '**양보**: ~이긴 하지만 (although, though)',
          '**부대 상황(동시 동작)**: ~하면서, ~한 채로 — 두 장면이 동시에 일어나는 걸 그려요.',
          '문맥에 맞는 접속사를 하나씩 넣어 보며 읽으면 돼요. 정답은 문장 하나가 아니라 **앞뒤 상황**이 정해 줘요.',
        ],
        images: [['images/grammar/notes/01.jpg', '분사구문 해석: 시간(when, while, after) · 원인(as, since, because) · 조건(if) · 양보(although, though)']],
        examples: [
          ['Standing on the top of the mountain, the tree is always strong.', '산꼭대기에 서 있어서(서 있는데도) 그 나무는 늘 굳건하다.', '이유? 양보? → 문장 하나만으론 몰라요. 앞뒤 문맥이 필요해요'],
          ['Throwing down the whip, he said, "Comrades!"', '채찍을 내던지고 그는 "동지들이여!"라고 말했다.', '소설 『동물농장』 속 문장. "던지면서"인지 "던진 후"인지 문맥으로 읽어요'],
          ['Watching the two of them, Daisy said ~', '두 사람을 지켜보며 데이지가 말했다.', '동시에 일어나는 장면 → "~하며, ~하면서"'],
        ],
      },
      {
        title: '분사구문은 왜 쓰나 — 문맥상 오해가 없을 때만',
        points: [
          '분사구문은 공식이 아니라 **표현 기법**이에요. 문맥으로 충분히 알 수 있는 말(접속사·같은 주어)을 빼고, **짧고 생생하게** 그리는 거예요.',
          '이건 **생략의 원칙**이에요. 말을 간단명료하게 한다는 건 **최소 단어로 최대 정보**를 전하는 것, 즉 **언어의 경제성**을 지키는 거예요.',
          '그래서 두 문장의 관계가 **아주 분명해서** 접속사 없이도 뜻이 통할 때만 두 절을 하나로 줄여요.',
          'Walking his dog in the park, he ran into ~ 는 While을 빼도 거의 모든 사람이 "개를 산책시키다가 마주쳤다"로 이해해요. 그래서 줄여도 되는 거예요.',
          '원어민도 뜻을 **문맥**으로 이해해요. 문장 하나만 보고 헷갈리면 원어민도 "**What\'s the context?**"(앞뒤 상황이 뭐야?)라고 되물어요.',
          '우리말도 똑같아요. "휘영청 밝은 달, 모두가 모였구나." "마주 잡은 두 손, 서로를 보며 미소를 짓는다." 이걸 "달이 밝아서? 밝은 와중에? 밝지만?" 하고 따지지 않고 그냥 문맥으로 이해하죠.',
          '뉴스 문장도 그래요. "뿌옇게 잿빛으로 변한 하늘, 숨을 쉬기가 힘듭니다." "점점 빨라지는 토네이도를 피하는 시민들의 모습입니다." "변했기 때문에"인지 "변하면서"인지 따지지 않아도 상황만으로 인과가 분명해요. 영어의 분사구문도 바로 이런 방식이에요.',
        ],
        examples: [
          ['Walking his dog in the park, he ran into an old friend.', '공원에서 개를 산책시키다가 그는 옛 친구를 마주쳤다.', '= While he was walking … (관계가 분명해서 접속사 생략)'],
        ],
      },
      {
        title: 'Being 생략 — p.p.로 시작하는 문장 읽기',
        points: [
          '문맥상 오해할 일이 없으면 ① 접속사를 빼고 ② 반복되는 주어를 빼고 ③ is → be → **being**으로 바꿔요.',
          '**being은 언제나 생략할 수 있어서**, 문장이 **p.p.(Located, Controlled …)로 바로 시작**할 수도 있어요.',
          '"도시 한가운데 있으니 찾기 쉽다"는 상식이라, as나 because를 굳이 안 써요. "한가운데 있는데도 찾기 쉽다"(although)로 읽을 사람은 거의 없으니까요.',
          '전부 풀어 쓰면 너무 길고 번거로워요. 그래서 줄이는 거예요.',
        ],
        examples: [
          ['As(Because) the city hall is located in the middle of the city, the city hall is easy to find.', '시청은 도시 한가운데 있어서 찾기 쉽다.', '다 풀어 쓴 문장 → 너무 길어요'],
          ['→ Being located in the middle of the city, the city hall is easy to find.', '도시 한가운데 있어서 시청은 찾기 쉽다.', '접속사·반복 주어 생략, is → being'],
          ['→ Located in the middle of the city, the city hall is easy to find.', '도시 한가운데 있어서 시청은 찾기 쉽다.', 'being 생략 → p.p.로 시작'],
          ['Controlled by the forces of human beings, it is dangerous.', '인간의 힘에 의해 통제되면 그것은 위험하다.', '(Being) controlled → p.p.로 시작하는 수동 분사구문'],
          ['Singing and dancing together, they had a good time.', '함께 노래하고 춤추며 그들은 즐거운 시간을 보냈다.', '동시 동작 → "~하며"'],
        ],
      },
      {
        title: '접속사를 남기는 경우 — when, while은 OK, because·although는 풀어 말하기',
        points: [
          '접속사를 **무조건** 빼는 건 아니에요. 영문법은 수학처럼 절대 진리가 아니라서, 뜻을 분명히 하려고 접속사를 남기기도 해요.',
          '문법책에서도 "생략이 원칙이지만, 주절과의 관계가 흐려질 수 있으면 **when, while, as** 등은 남겨서 뜻을 분명히 하기도 한다"고 해요: While walking home, I ~',
          '**because**를 빼면 오해가 생길 수 있어요. 개 덕분에 그녀와 얘기할 기회가 생겼다는 뜻으로 "Walking his dog in the park, he had a chance to talk with her."라고 하면, 거의 다 "산책하다가 **우연히** 기회가 생겼구나"로 읽어요.',
          '그래서 "개 **덕분에**"라는 뜻을 살리려면 Because를 남겨야 하는데(Because walking ~ / Because having walked ~), 원어민은 이런 표현을 **어색하게** 느껴요. 빼면 헷갈리고, 남기면 줄인 효과가 없으니 오랫동안 이렇게 쓰지 않았거든요.',
          '**although**도 마찬가지예요. 개를 싫어하는 상대에게 개를 데리고 나갔는데도 잘 됐다는 뜻으로 접속사를 빼면, "산책시켰는데도"로 읽을 사람은 거의 없어요. 배경 설명 없이 빼면 오해의 책임은 **말한 사람**에게 있어요.',
          '결론: because·although는 분사구문으로 만들기보다 **그냥 절로 풀어서** 말하는 게 자연스러워요: Because he walked his dog in the park, ~ / Although he walked his dog in the park, ~',
          '같은 접속사인데 어떤 건 남기고 어떤 건 안 쓰는 건 법칙 때문이 아니에요. **문법은 말이라는 현상을 정리한 수납장** 같은 거예요. 사람들이 오래 써 온 건 "이렇게 쓴다", 안 써 온 건 "이렇게 안 쓴다"고 적힐 뿐이에요.',
          '말이 바뀌면 수납장도 바뀌어요. 예전엔 썼지만 지금은 안 쓰는 표현도, 예전엔 안 썼지만 지금은 쓰는 표현도 있어요. 다수가 쓰거나 안 쓰게 되면 그게 그때의 "룰"이 되는 거예요.',
        ],
        examples: [
          ['Walking his dog in the park, he had a chance to talk with her.', '공원에서 개를 산책시키다가 그는 그녀와 얘기할 기회가 생겼다.', '이렇게 줄이면 "개 덕분에"(because)로 읽는 사람이 거의 없어요'],
          ['Because he was walking his dog in the park, he had a chance to talk with her.', '공원에서 개를 산책시키고 있었던 덕분에 그는 그녀와 얘기할 기회가 생겼다.', '원래 뜻 (because)'],
          ['Because walking his dog in the park, he had a chance to talk with her.', '개를 산책시킨 덕분에 그녀와 얘기할 기회가 생겼다.', 'Because를 남긴 분사구문 → 원어민에겐 어색'],
          ['Because he had walked his dog in the park, he is now her boyfriend.', '공원에서 개를 산책시켰던 덕분에 그는 이제 그녀의 남자친구다.', '시제가 다른 원래 문장'],
          ['→ Because having walked his dog in the park, he is now her boyfriend.', '개를 산책시켰던 덕분에 그는 이제 그녀의 남자친구다.', 'Having p.p. + Because 남김 → 역시 어색'],
          ['Although he walked his dog in the park, he had a chance to talk with her.', '공원에서 개를 산책시켰는데도 그는 그녀와 얘기할 기회가 생겼다.', '원래 뜻 (although)'],
          ['Although walking his dog in the park, he had a chance to talk with her.', '개를 산책시켰는데도 그녀와 얘기할 기회가 생겼다.', 'Although를 남겨야 "~인데도"가 전달돼요'],
          ['Although he had walked his dog in the park, he is now her boyfriend.', '공원에서 개를 산책시켰는데도 그는 이제 그녀의 남자친구다.', '시제가 다른 원래 문장'],
          ['→ Although having walked his dog in the park, he is now her boyfriend.', '개를 산책시켰는데도 그는 이제 그녀의 남자친구다.', 'Having p.p. + Although 남김'],
          ['Because he walked his dog in the park, he had a chance to talk with her.', '공원에서 개를 산책시킨 덕분에 그는 그녀와 얘기할 기회가 생겼다.', '원어민이 더 자연스럽게 여기는 방식: 그냥 절로 풀어 말하기'],
        ],
      },
      {
        title: '그림처럼 받아들이기 — 콤마 찍고 -ing',
        points: [
          '분사구문은 같은 장면을 다른 각도에서 찍은 **사진 여러 장을 겹쳐 놓은 그림**처럼 생각하면 쉬워요.',
          '처음엔 문장이 길면 **콤마 찍고 동사에 -ing**를 붙여 **뒤에** 이어 붙이면 돼요.',
          '익숙해지면 그 -ing 덩어리를 **앞으로 보내도** 돼요. 뜻은 같아요.',
          '처음 연습할 땐 "음악을 들으면서(listening to music)"처럼 한 표현을 여러 문장에 붙여 보며 구조에 익숙해지는 것도 좋은 방법이에요.',
        ],
        examples: [
          ['I made my neighbor happy, I was walking on the street. → I made my neighbor happy, walking on the street.', '길을 걸으면서 나는 이웃을 기쁘게 했다.', '콤마 + -ing로 뒤에 붙이기'],
          ['I was listening to music, I was studying. → Listening to music, I was studying.', '음악을 들으면서 나는 공부하고 있었다.', '-ing 덩어리를 앞으로'],
          ['I was listening to music, I was doing my homework. → Listening to music, I was doing my homework.', '음악을 들으면서 나는 숙제를 하고 있었다.', '같은 표현으로 연습하며 구조 익히기'],
        ],
      },
      {
        title: '부정 · with 분사구문 · 어디서 쓰나',
        points: [
          '부정은 **not을 분사 앞에**: Not feeling well, ~ (Feeling not well ✗)',
          '**with + 명사 + 분사** = ~한 채로. 문법책에서 "**with 분사구문**"이라고 불러요. 뉴스 보도문이나 기사에서 많이 봐요.',
          '기자가 처음에 As his arms were folded, Because his arms were folded라고 썼다가 지워서 줄인 게 아니에요. 처음부터 **장면을 짧게 그리는 표현**으로 쓰는 거예요.',
          '분사구문은 대화보다는 **소설·문학 작품·기사·뉴스**에서 주로 써요. 말할 때 분사구문을 쓰면 "책이나 뉴스에 나오는 말 같다"는 느낌을 줘요.',
          '말할 땐 풀어서 해요: "I\'m not feeling well, so I want to take a rest."',
        ],
        examples: [
          ['Not feeling well, I went to bed early.', '몸이 안 좋아서 일찍 잤다.', 'not은 맨 앞'],
          ['Not feeling well, I want to take a rest.', '몸이 안 좋아서 좀 쉬고 싶어.', '맞는 문장이지만 대화에선 글말처럼 들려요'],
          ["I'm not feeling well, so I want to take a rest.", '몸이 안 좋아서 좀 쉬고 싶어.', '대화에서 더 자연스러운 말'],
          ['With his arms folded, he stood there.', '그는 팔짱을 낀 채로 거기 서 있었다.', 'with + 명사 + p.p. (팔이 접힌 상태)'],
        ],
      },
      {
        title: '문제 유형: To be vs Being',
        points: [
          '빈칸 뒤에 콤마 + 완전한 문장(주절)이 오면, 빈칸은 주절을 꾸미는 **분사구문(Being)** 자리예요.',
          '**To be**는 to부정사로 "~하기 위해서"(목적)라서 뜻이 안 맞으면 오답이에요.',
        ],
        images: [['images/grammar/notes/02.jpg', '문제 유형: ____ the head chef at Marlena\'s, Roy Salazar has complete control ... → (A) To be = ~하기 위해서 vs (C) Being = 분사구문(나머지)']],
        examples: [
          ["_____ the head chef at Marlena's, Roy Salazar has complete control over the contents of the menus. (A) To be (C) Being", '빈칸에 알맞은 것은?', '빈칸 뒤 콤마 + 완전한 주절 → 분사구문 자리 → 정답 (C) Being'],
          ["Being the head chef at Marlena's, Roy Salazar has complete control over the contents of the menus.", '말레나 식당의 수석 셰프라서 로이 살라자르는 메뉴 구성을 전부 책임진다.', 'To be(~하기 위해서) ✗ / Being(~이므로, 주절 수식) ✓'],
        ],
      },
    ],
    native: [
      '분사구문은 글(보고서, 기사, 소설)에서 많이 써요. 대화에선 접속사를 살려 말하는 게 더 자연스러워요: "When I was walking home, I met Tom."',
      '"Generally speaking", "Judging from ~", "Considering ~" 같은 덩어리 분사구문은 회화에서도 자주 써요.',
      '원어민도 분사구문의 뜻을 공식으로 따지지 않고 **앞뒤 문맥**으로 읽어요. 이유·시간·조건·양보 중 뭔지 고민되면 "이 상황에서 제일 자연스러운 연결"을 고르면 돼요.',
      'because·although를 남긴 분사구문(Because walking ~, Although having walked ~)은 원어민 귀에 어색해요. 그럴 땐 그냥 절로 말해요.',
      '분사구문은 "어떻게 만드나"보다 "**왜 쓰나**"(짧고 생생하게, 문맥이 분명할 때)를 이해하면 처음 보는 문장도 그림처럼 읽혀요.',
    ],
    mistakes: [
      ['The news was very shocked.', 'The news was very shocking.', '뉴스가 충격을 줌 → -ing'],
      ['The car parking here is mine.', 'The car parked here is mine.', '차는 주차되는 쪽 → p.p.'],
      ['I saw the boy cried in the park.', 'I saw the boy crying in the park.', '소년이 직접 우는 것(능동) → crying'],
      ['Walking home, the rain started.', 'Walking home, I got caught in the rain.', '분사구문의 주어 = 주절의 주어. 비가 걸어간 게 아니에요.'],
      ['Feeling not well, I went home.', 'Not feeling well, I went home.', '부정어 not은 분사 앞'],
      ['Walking his dog in the park, he had a chance to talk with her. (개 덕분에 라는 뜻)', 'Because he walked his dog in the park, he had a chance to talk with her.', '접속사를 빼서 뜻이 달라 보이면 줄이지 말고 절로 풀어요'],
    ],
  },

  {
    id: 'form5',
    title: '5형식: 목적어 + 목적격보어',
    sub: '일·사·지 · 가목적어 it',
    summary: '"주어는 동사한다, 목적어가 목적보어 하도록 / 상태이도록." 이 틀 하나로 해석해요.',
    basics: [
      '5형식은 **주어 + 동사 + 목적어 + 목적격보어(O.C)**. 목적격보어는 목적어의 **동작**이나 **상태**를 말해요.',
      '해석 틀: 주어는 **동사한다**, 목적어가 **목적보어 하도록 / 상태이도록**.',
      '목적격보어 모양은 동사가 정해요: **명사·형용사**(상태) · **to부정사**(동작) · **동사원형**(사역·지각) · **-ing / p.p.**(능동 / 수동)',
      '모양마다 뜻이 있어요. **to V / 동사원형** → 목적어가 그 **동작을 해요** · **명사 / 형용사** → 목적어의 **상태** · **-ing** → 목적어가 하는 쪽(능동) · **p.p.** → 목적어가 당하는 쪽(수동). p.p. 앞의 **(to be)**는 자주 생략돼요.',
    ],
    sections: [
      {
        title: '목적격보어 암기: 일 · 사 · 지',
        points: [
          '**일**반동사(want, tell, ask, expect, allow …) + 목적어 + **to V**',
          '**사**역동사(make, have, let) + 목적어 + **동사원형**',
          '**지**각동사(see, watch, hear, feel) + 목적어 + **동사원형 / -ing**',
          '**help** + 목적어 + **동사원형 / to V** (둘 다 OK) · **get** + 목적어 + **to V** (get, help는 "준사역동사")',
          '목적어가 동작을 **당하는** 쪽이면 **p.p.** → She had a house built.',
          'want, tell, ask 뒤의 to V는 **목적어가 하는 동작**이에요. She told me to wait. → 기다리는 사람은 "나"',
          'to 없이 쓰는 동사원형 보어는 "to 없는 부정사"라서 **원형부정사**라고도 불러요.',
        ],
        examples: [
          ['She wanted me to build a house.', '그녀는 내가 집을 짓기를 원했다.', '일반동사 → to V'],
          ['She told me to wait.', '그녀는 나에게 기다리라고 했다.', '기다리는 건 목적어(me)'],
          ['She had me build a house.', '그녀는 나에게 집을 짓게 했다.', '사역동사 → 동사원형'],
          ['She saw me building a house.', '그녀는 내가 집을 짓고 있는 걸 봤다.', '지각동사 → -ing (하고 있는 중)'],
          ['She helped me (to) build a house.', '그녀는 내가 집 짓는 걸 도왔다.', 'help → 동사원형 / to V'],
          ['She got me to build a house.', '그녀는 나에게 집을 짓게 했다.', 'get → to V'],
          ['She had a house built.', '그녀는 집을 짓게 했다.', '집은 지어지는 쪽 → p.p.'],
        ],
      },
      {
        title: '목적격보어 종류와 형태 한눈에 보기',
        points: [
          '동사 종류와 **목적어가 하는 쪽(능동)인지 당하는 쪽(수동)인지**에 따라 목적격보어 모양이 정해져요. 같은 문장 "집을 짓다"로 비교해 볼게요.',
          '① **일반동사(think)** + 명사: She thought me (to be) a doctor. · ② + 형용사: She thought me (to be) happy.',
          '③ **일반동사(want)** 능동 → to부정사: She wanted me to build a house. · ④ 수동 → (to be) p.p.: She wanted a house (to be) built by me.',
          '⑤ **지각동사** 능동 → 원형부정사: She saw me build a house. · ⑥ 능동 → 현재분사: She saw me building a house. · ⑦ 수동 → 과거분사: She saw a house built by me.',
          '⑧ **사역동사** 능동 → 원형부정사: She had me build a house. · ⑨ 수동 → 과거분사: She had a house built by me.',
          '⑩ **get** 능동 → to부정사: She got me to build a house. · ⑪ 수동 → (to be) p.p.: She got a house (to be) built by me.',
          '⑫ **help** 능동 → to부정사 / 원형부정사: She helped me (to) build a house.',
          '목적어가 **사람(me)**이면 직접 짓는 쪽이라 to V·원형·-ing, **사물(a house)**이면 지어지는 쪽이라 p.p.가 와요.',
        ],
        images: [
          ['images/grammar/notes/11.jpg', '목적격보어 정리 ①~⑦: 일반동사(think, want)와 지각동사'],
          ['images/grammar/notes/12.jpg', '목적격보어 정리 ⑧~⑫: 사역동사, get, help'],
        ],
        examples: [
          ['She thought me (to be) a doctor.', '그녀는 나를 의사라고 생각했다.', '목적어 = 명사 보어 (me = a doctor)'],
          ['She thought me (to be) happy.', '그녀는 내가 행복하다고 생각했다.', '형용사 보어. 대화에선 She thought I was happy. 가 더 흔해요'],
          ['She wanted a house (to be) built by me.', '그녀는 그 집이 나에 의해 지어지기를 원했다.', '집은 지어지는 쪽 → (to be) p.p.'],
          ['She saw me build a house.', '그녀는 내가 집을 짓는 걸 (처음부터 끝까지) 봤다.', '원형 = 동작 전체 / -ing = 하고 있는 장면'],
          ['She saw a house built by me.', '그녀는 집이 나에 의해 지어지는 걸 봤다.', '지각동사 + 사물 + p.p.'],
          ['She got a house (to be) built by me.', '그녀는 나를 시켜서 집을 짓게 했다.', 'get + 사물 + (to be) p.p.'],
        ],
      },
      {
        title: '명사 · 형용사 보어 — 목적어의 상태',
        points: [
          '**keep · find · consider · call · make · leave · think · believe** + 목적어 + 명사/형용사',
          '명사가 보어면 **목적어 = 보어 명사**여야 해요.',
          'think / consider 뒤의 (to be)는 자주 생략해요: She thought me (to be) happy.',
          '**hold + 목적어 + accountable / responsible for** = (목적어에게) ~의 책임을 묻다',
          '뜻 정리: **keep** 목적어를 ~하게 (유지)하다 · **consider** ~라고 여기다 · **make** ~하게 만들다 · **find** ~라고 알게 되다, 느끼다 · **leave** ~한 상태로 두다 · **call** ~라고 부르다 · **hold ... accountable / responsible for** ~의 책임을 묻다(지우다)',
        ],
        examples: [
          ['Please keep the file confidential.', '그 파일은 기밀로 유지해 주세요.', 'keep + 목적어 + 형용사'],
          ['Mr. Jason considers the project a success.', '제이슨 씨는 그 프로젝트를 성공이라고 여긴다.', 'the project = a success'],
          ['I found the book interesting.', '그 책 재밌더라.', 'find + 목적어 + 형용사 = ~라고 알게 되다'],
          ['The news made me happy.', '그 소식이 나를 기쁘게 했다.', 'make + 목적어 + 형용사 = ~하게 만들다'],
          ['Please leave the door open.', '문을 열어 둔 채로 두세요.', 'leave + 목적어 + 형용사 = ~한 상태로 두다'],
          ['We call him Mr. Fix-it.', '우리는 그를 "해결사"라고 불러.', 'call + 목적어 + 명사 (him = Mr. Fix-it)'],
          ['They hold him responsible for the mistake.', '그들은 그 실수의 책임을 그에게 묻는다.'],
        ],
      },
      {
        title: '가목적어 it — 목적어가 길 때',
        points: [
          '5형식 목적어 자리에는 **that절 · to부정사구 · what절** 같은 긴 명사 덩어리를 바로 못 써요.',
          '그 자리에 **it(가목적어)**을 두고, 진짜 목적어(진목적어)는 **맨 뒤로** 보내요.',
          '모양: **S + 동사(believe, make, consider, find, think) + it + 목적격보어 + 진목적어**',
          '진목적어로 오는 것: ① **to + 동사원형 ~** (명사구) ② **that + 주어 + 동사 ~** (명사절) ③ **what + 주어 + 동사 ~** (명사절)',
          'that절은 **3형식** 목적어로는 바로 써도 돼요 (I think that ~). 5형식 목적어, 4형식 간접목적어 자리는 ✗',
          '즉 같은 명사절이라도 **어느 형식의 목적어 자리냐**에 따라 바로 쓸 수 있기도, 없기도 해요.',
        ],
        images: [
          ['images/grammar/notes/13.jpg', '목적어 자리에 바로 못 쓰는 덩어리(that절, to부정사구, what절) → 가목적어 it을 두고 뒤로 보내요'],
        ],
        examples: [
          ['I find it hard to wake up early.', '일찍 일어나는 게 힘들어.', 'it = to wake up early'],
          ['She made it clear that she was not interested.', '그녀는 관심 없다는 걸 분명히 했다.', 'it = that절'],
          ['He made it clear what he wanted.', '그는 자기가 뭘 원하는지 분명히 밝혔다.', 'it = what절'],
          ['I think it important to be honest.', '나는 정직한 게 중요하다고 생각해.', "대화에선 I think it's important to be honest. 가 더 흔해요"],
        ],
      },
    ],
    native: [
      '"make it clear that ~", "find it hard to ~", "make it easy to ~"는 회의·메일에서 정말 자주 쓰는 가목적어 패턴이에요.',
      '"Let me know.", "Let me check.", "Have him call me."처럼 사역동사 + 동사원형은 회사 대화의 기본이에요.',
      '"I\'ll get it done by Friday." (금요일까지 끝낼게요)처럼 get + 목적어 + p.p.도 많이 써요.',
    ],
    mistakes: [
      ['She made me to clean the room.', 'She made me clean the room.', '사역동사 make 뒤엔 to 없이 동사원형'],
      ['I want you come.', 'I want you to come.', 'want는 목적어 + to V'],
      ['I find to wake up early hard.', 'I find it hard to wake up early.', '긴 목적어는 가목적어 it으로'],
      ['I had my car repair.', 'I had my car repaired.', '차는 수리되는 쪽 → p.p.'],
    ],
  },

  {
    id: 'comparison',
    title: '비교',
    sub: '비교급 · 최상급 · as ~ as',
    summary: '두 개 비교는 -er/more, 셋 이상에서 최고는 -est/most, 같으면 as ~ as.',
    basics: [
      '짧은 단어: **-er / -est** (tall → taller → tallest)',
      '긴 단어(2음절 이상 대부분): **more / most** (expensive → more expensive → most expensive)',
      '불규칙: good → better → best / bad → worse → worst / far → further → furthest',
      '비교 대상 앞엔 **than**, 같을 땐 **as + 원급 + as**',
    ],
    sections: [
      {
        title: '자주 쓰는 비교 패턴',
        examples: [
          ['This one is much cheaper than that one.', '이게 저것보다 훨씬 싸.', '비교급 강조: much, a lot, way(구어)'],
          ['The sooner, the better.', '빠를수록 좋아.', 'the 비교급, the 비교급'],
          ["It's not as hard as I thought.", '생각보다 안 어렵네.'],
          ["It's getting better and better.", '점점 좋아지고 있어.'],
          ['This is the best coffee I\'ve ever had.', '이게 지금까지 마셔 본 커피 중 최고야.'],
        ],
      },
    ],
    native: [
      '대화에선 much 대신 **way**를 자주 써요: "way better", "way more expensive".',
      '"Better late than never." (늦어도 안 하는 것보단 낫다), "The more, the merrier." (많을수록 좋지) 같은 관용 표현이 많아요.',
    ],
    mistakes: [
      ['This is more cheaper.', 'This is cheaper.', 'more와 -er을 같이 쓰지 않아요.'],
      ['He is more taller than me.', 'He is taller than me.', '같은 실수'],
      ['very better', 'much better', '비교급 강조는 very가 아니라 much/a lot/way'],
    ],
  },

  {
    id: 'passive',
    title: '수동태',
    sub: '원리 · 원어민은 왜, 언제 쓸까 · 완료 수동 · get 수동',
    summary: '수동태는 능동태를 뒤집은 공식이 아니라, p.p.(당한/된)의 힘을 be동사라는 다리로 주어에게 돌려보내는 문장이에요.',
    videos: [
      ['SQg2yWp-_RM', '수동태의 정확한 원리 — 원어민은 수동태를 이렇게 인식한다'],
      ['Gaw7MoofW8s', 'Been은 대체 언제 쓰는 것인가!'],
    ],
    basics: [
      '**태(voice)**는 주어가 동작을 **하는 쪽**인지, 동작을 **받는 쪽**인지를 말해요. 하는 쪽이면 **능동태(Active voice)**, 받는 쪽이면 **수동태(Passive voice)**예요.',
      '능동태는 쉬워요. I use a laptop. → I가 랩탑을 쓰는 주인공이라는 게 바로 보여요.',
      '수동태 모양: **be + 과거분사(p.p.)** → "주어가 ~되다/당하다"',
      '능동태가 기본이에요. 수동태는 **필요할 때만** 써요.',
      'by + 행위자는 대부분 생략해요. 누가 했는지가 중요하면 애초에 능동태로 쓰니까요.',
    ],
    sections: [
      {
        title: '공식만 외우면 막히는 이유',
        points: [
          '수동태 공식 "**목적어 + be동사 + p.p. + by 주어**"가 틀린 건 아니에요. 문제는 **왜 be동사가 들어가는지** 모른 채 공식만 외운다는 거예요.',
          'I kill mosquitoes. → Mosquitoes are killed by me. 여기서 갑자기 are가 왜 생길까요?',
          'kill 같은 일반 동사는 능동태에서 be동사와 같이 안 써요. I am kill ✗ / I was kill ✗ — **한 절에 동사 두 개를 나란히 쓸 수 없다**는 게 영어의 대원칙이에요.',
          '예문 단어가 쉬워서 수동태가 쉬워 보일 뿐, 원리 자체가 쉬운 건 아니에요. 단어만 보고 뜻을 대충 꿰어 맞추는 습관이 있으면, 단어가 조금만 어려워져도 수동태인지 못 알아봐요.',
          '그래서 "I have done"만 봐도 "be동사 p.p.네? 수동태!"라고 떠올리는 실수가 생겨요. "be + p.p. = 수동태"라는 **조각 지식**만 있어서 그래요. (have done은 수동태가 아니에요 → 아래 "현재완료 수동태")',
        ],
        examples: [
          ['I kill mosquitoes. → Mosquitoes are killed by me.', '나는 모기를 죽인다 → 모기는 나에게 죽임을 당한다.'],
          ['I use a laptop.', '나는 랩탑을 쓴다.', '능동태: I가 하는 쪽'],
        ],
      },
      {
        title: '한국어는 조사, 영어는 자리',
        points: [
          '한국어는 단어 뒤에 **조사·접사**를 붙여서 뜻을 만들어요. 수동태도 "**되다, 당하다**"를 붙이면 끝이에요.',
          '나는 책을 쓴다 → 책**이** 쓰여진다. ("을"이 "이"로, "쓰다"가 "쓰여진다"로)',
          '한국어엔 주격 조사(은/는/이/가)와 목적격 조사(을/를)가 있어서 **어순이 자유로워요.** "좋아한다, 개들은 고양이들을" / "개들은 좋아한다, 고양이들을" 이라고 해도 누가 누굴 좋아하는지 그대로예요.',
          '영어엔 조사가 없어요. 대신 **단어의 모양을 바꾸고 자리를 옮겨서** 뜻을 만들어요.',
          '영어는 **단어의 자리가 역할을 정해요.** 동사를 기준으로 **앞에 있으면 주어, 뒤에 있으면 목적어**예요.',
          'dogs, cats는 그냥 명사예요. 두 단어만 봐선 누가 주어인지 몰라요. like 앞이냐 뒤냐가 정해 줘요.',
        ],
        examples: [
          ['Dogs like cats.', '개들은 고양이들을 좋아한다.', 'dogs가 like 앞 → 주어'],
          ['Cats like dogs.', '고양이들은 개들을 좋아한다.', '자리만 바꿨는데 뜻이 뒤집힘'],
        ],
      },
      {
        title: 'p.p.(과거분사)는 뭘까?',
        points: [
          'p.p.는 **Past Participle(과거분사)**의 줄임말이에요.',
          '사전 뜻: "보통 -ed(또는 -ing)로 끝나는 동사의 한 모양으로, **형용사처럼** 쓰이거나 **완료형·수동태**를 만들 때 쓰인다."',
          '**-ed (과거분사)** = **수동 · 완료** 느낌 → cooked 요리**된**, killed 죽임을 **당한**',
          '**-ing (현재분사)** = **능동 · 진행** 느낌 → cooking 요리**하는**',
          '정리: p.p.는 "단어 자체에 **수동과 완료의 그림**이 들어 있는, 수동태와 완료형을 만드는 데 쓰이는 형용사"예요.',
          '모양이 다른 p.p.도 있어요: take → taken, teach → taught, tell → told, sleep → slept, be → been',
        ],
        examples: [
          ['cook → cooked', '요리하다 → 요리된'],
          ['kill → killed', '죽이다 → 죽임을 당한'],
          ['a cooked meal', '요리된 음식', 'p.p.가 형용사처럼 명사를 꾸밈'],
        ],
      },
      {
        title: 'p.p.만 쓰면 수동태가 아니에요',
        points: [
          '많은 사람이 "killed = 죽임을 당한" 이니까 Mosquitoes killed. 하면 "모기들이 죽임을 당했다"가 될 거라고 생각해요.',
          '하지만 원어민은 Mosquitoes killed를 보면 "**모기들이 (뭔가를) 죽였다**"로 읽어요. 동사 앞에 있으니 모기가 주어고, killed는 그냥 **과거형**으로 봐요. 그리고 "killed 뒤에 대상이 나와야 하는데 왜 말이 끝나?" 하고 어색해해요.',
          '마찬가지로 The dogs attack the cats.(개들이 고양이들을 공격한다)에서 the cats를 앞으로 빼서 **The cats attack the dogs.** 라고 하면 "고양이들이 개들을 공격한다"는 능동태가 돼 버려요.',
          'attacked(공격당한)를 써서 **The cats attacked the dogs.** 라고 해도, 원어민은 "고양이들이 개들을 공격했다(과거형 능동)"로만 읽어요.',
          '그래서 영어는 "이 단어는 p.p.야, 그리고 그 힘이 **앞의 주어 쪽**으로 간다"는 걸 알려 줄 **연결 장치**가 필요해요. 그게 바로 **be동사**예요.',
        ],
        examples: [
          ['Mosquitoes killed. ✗', '(모기들이 죽였다…? 뭘?)', '수동태 아님. 말이 덜 끝난 느낌'],
          ['The cats attacked the dogs.', '고양이들이 개들을 공격했다.', '과거형 능동태'],
        ],
      },
      {
        title: 'be동사 = 연결 다리 (수동태의 진짜 원리)',
        points: [
          '한국어는 "그 개들은 그 고양이들을 공격한다" → "그 고양이들**은** 그 개들**에게** 공격을 **당한다**" 처럼 새 단어 없이 조사와 어미만 바꿔요.',
          '영어는 3단계예요. ① 공격을 **당하는 대상**(the cats)을 **앞으로** 끌어와요. ② 뒤에 **be동사**를 붙여서 the cats가 주어라는 걸 밝혀요. ③ p.p.(attacked)를 붙여요. → **The cats are attacked.**',
          '종이비행기 끝을 접으면 날아가는 방향이 바뀌죠? attack 뒤에 **-ed**가 붙으면 힘의 방향이 뒤쪽이 아니라 **앞쪽**으로 바뀌고, **be동사(are)가 다리**가 돼서 그 힘이 주어(the cats)까지 건너가요.',
          '"The cats are"까지만 들으면 고양이만 떠오르고 다음 말을 기다려요. attacked가 나오는 순간 are + attacked가 한 덩어리로 붙으면서 "공격의 힘이 고양이 쪽으로 온다"는 그림이 잡혀요.',
          '누가 공격했는지는 상황을 보면 알아요. 고양이가 개랑 싸우고 있었다면 머릿속에 개가 떠오르죠. 그래서 **by the dogs**를 붙일 수 있지만, 문장에 안 쓰일 때도 많아요. 원어민은 **(by the dogs)**를 괄호 속에 갇힌 것처럼 보고 "The cats are attacked" 정도로 읽고 지나가요.',
          '이 과정을 그대로 공식으로 만든 게 문법책의 수동태 공식이에요.',
          '같은 원리: taught(가르쳐진)가 be를 타고 앞의 I에게 건너가면 I am taught. (나는 가르침을 받는다)',
        ],
        examples: [
          ['The dogs attack the cats.', '그 개들이 그 고양이들을 공격한다.', '능동'],
          ['The cats are attacked (by the dogs).', '그 고양이들은 (그 개들에게) 공격당한다.', 'be = 다리, by ~는 괄호 속'],
          ['I am taught.', '나는 가르침을 받는다.'],
          ['I was taught.', '나는 가르침을 받았다.', 'be를 과거로'],
        ],
      },
      {
        title: '시제별 수동태 모양',
        points: [
          '능동태: **단순** = 현재 / 과거 / 미래 · **진행** = be + -ing · **완료** = have + p.p.',
          '수동태는 여기에 be + p.p.를 겹쳐요 ↓',
          '**단순**: be + p.p. (is / was / will be + p.p.)',
          '**진행**: be being p.p. → The road is being repaired. (수리 중이다)',
          '**완료**: have been p.p. → The report has been sent. (보내졌다)',
          '능동태: 주어가 행위의 **주체** / 수동태: 주어가 행위의 **대상**',
        ],
      },
      {
        title: '현재완료 수동태 — have been + p.p.',
        points: [
          '"I have done"을 원어민에게 보여 주면, 이것만으로는 능동인지 수동인지 **아무 정보가 없다**고 생각해요. 뒤에 뭐가 오느냐에 따라 달라지니까요.',
          '현재완료(have + p.p.)는 그냥 **have(가지고 있다)** + **p.p.(~한, ~된)**예요. I have killed → "나는 가지고 있다, 죽인 그 행위·경험을" → 내가 **능동적으로** 한 일을 지금 가지고 있다 = 현재완료',
          '**I have been**도 마찬가지예요. "나는 가지고 있다, ~이었던 / ~에 있었던 것을". 여기까진 능동·수동과 상관없는 **그냥 현재완료**예요.',
          'I have been + **here / to Paris / a teacher** → 현재완료 능동: 와 봤다 / 가 봤다 / 해 봤다',
          'I have been + **일반 동사의 p.p.** → 드디어 **현재완료 수동태**: "나는 가지고 있다, ~당한 그 경험을"',
          '원어민은 덩어리로 끊어 봐요: I have been here(와 봤다) / I have been **cheated**(속아 왔다) / I have been **punished**(벌 받았다)',
          '한국어는 "가르쳐졌다", "말해졌다" 대신 "**배웠다**", "**들었다**"라고 해요. 영어는 단어 모양을 바꾸고 이어 주는 단어(be)를 넣어서 뜻을 만드는 언어라 이런 수동 표현이 아주 흔해요.',
          'tell(말하다) → told(말해진): I am told 나는 듣는다(말해진다) / I was told to leave 떠나라는 말을 들었다 / I have been told to ~ ~하라는 말을 들어 왔다',
        ],
        examples: [
          ['I have been here.', '나 여기 와 본 적 있어.', '현재완료 능동'],
          ['I have been to Paris.', '나 파리에 가 본 적 있어.', '현재완료 능동'],
          ['I have been a teacher.', '나 가르치는 일 해 봤어.', '현재완료 능동'],
          ['I have been cheated.', '나 속아 왔어 / 속았어.', '현재완료 수동'],
          ['I have been punished.', '나 벌 받았어 / 혼났어.', 'been punished = 혼난 경험'],
          ['I have been taught English for five years.', '나는 5년간 영어를 배웠어.', '영어가 가르쳐진 상태를 5년간 가지고 있음'],
          ['I was told to leave.', '떠나라는 말을 들었어.', '직역: 떠나라고 말해졌다'],
          ['I have been told to study English for five years.', '5년 동안 영어 공부하라는 말을 들어 왔어.'],
        ],
      },
      {
        title: '자동사는 왜 수동태가 안 될까',
        points: [
          '동사는 크게 **타동사(transitive verb)**와 **자동사(intransitive verb)**로 나뉘어요.',
          'transitive는 어원이 "**건너가다**"예요. I kill mosquitoes. → kill이라는 힘이 I에서 mosquitoes 쪽으로 **건너가요.** 이게 타동사예요.',
          'I sleep. → sleep 뒤엔 영향을 받는 대상을 못 붙여요. "침대를 잔다", "밤을 잔다"는 말은 없죠. "침대에서 잔다", "밤에 잔다"는 되지만 그건 목적어가 아니에요. 그래서 I sleep it ✗, I sleep them ✗',
          'sleep은 I가 하는 행동이긴 하지만 다른 대상에게 건너가지 않아요. 이게 **자동사**예요.',
          'sleep의 p.p.는 slept(잔)예요. 그런데 원래 **건너가는 성질이 없으니까**, be동사를 타고 주어 쪽으로 돌아오는 성질도 없어요. → **I am slept ✗** (나는 잔이다…?)',
          '현재완료는 돼요: **I have slept.** (잔 행위를 가지고 있다 = 잤다) 하지만 I am slept가 없듯이 **I have been slept ✗**도 없어요.',
          '동사의 성질 때문에 당연히 그렇게 되는 걸, 문법책에선 "자동사는 수동태로 쓸 수 없다"고 정리한 거예요. (happen, arrive, occur, disappear 같은 단어도 같아요 → "동사의 종류" 카테고리)',
        ],
        examples: [
          ['I kill mosquitoes.', '나는 모기를 죽인다.', '타동사: 힘이 건너감'],
          ['I sleep.', '나는 잔다.', '자동사: 건너가지 않음'],
          ['I have slept.', '나 잤어.', '현재완료 능동은 OK'],
        ],
      },
      {
        title: '수동태를 쓰는 때',
        points: [
          '행위자를 모를 때: My bike was stolen.',
          '행위자가 뻔하거나 중요하지 않을 때: Rice is grown in India. / This house was built in 1935.',
          '결과·대상에 초점을 맞출 때, 격식 있는 글(보고서, 공지): The meeting has been postponed.',
          '행위자가 중요하면 능동으로: My grandmother built this house.',
        ],
      },
      {
        title: '상태 수동태 = -ed 형용사 (원어민 감각의 핵심)',
        points: [
          '대화에서 원어민이 쓰는 수동태는 대부분 "~당하다"는 동작이 아니라 **지금 상태**를 말해요.',
          'The door is locked. → 누가 잠갔는지보다 "지금 잠겨 있다"가 중요',
          '그래서 be + p.p. 덩어리 표현이 많아요: be interested in, be worried about, be used to, be married to, be made of, be covered with, be satisfied with, be involved in',
        ],
        examples: [
          ['The door is locked.', '문이 잠겨 있어.'],
          ['The window is broken.', '창문이 깨져 있어.'],
          ["I'm satisfied with my job.", '내 일에 만족해.'],
          ["I'm used to it.", '그거 익숙해.'],
        ],
      },
      {
        title: 'get + p.p. — 움직임이 보이는 수동태',
        points: [
          'get은 원래 catch(잡다)에서 온 단어로 "**얻다, 도달하다**" 같은 그림이에요.',
          'be동사는 "이다 / 있다"라는 **정적인(가만히 있는)** 그림, get은 **동적인(움직이는)** 그림이에요.',
          '그래서 be 자리에 get을 넣으면 **동적인 수동태**가 돼요. 주어가 뭔가를 **당하는 그 순간의 변화**가 보여요.',
          'The mosquitoes **were** killed. → 모기들이 죽임을 당한 **상태**에 있다 (정적) / The mosquitoes **got** killed. → 모기들이 죽임을 **당한다** (동적)',
          '개한테 공격당한 적이 있다면: I **was** attacked by a dog. → 그런 일이 있었다는 **사실 자체** / I **got** attacked by a dog. → 공격당한 **그 순간**의 생생한 그림',
          '대화에서 "야, 나 방금 ~당해서 ~됐어"라고 할 때 원어민은 습관처럼 get을 정말 많이 써요.',
          '감정도 그래요: I\'m shocked. → 충격받은 **상태** / I got shocked. → **방금** 충격받았어 (그 감정을 느낀 순간)',
          '특히 동작 자체가 격한 단어일수록 get을 더 써요: I was punched보다 **I got punched**가 더 생생하고 자연스러워요.',
          '결국 be와 get의 차이는 **뉘앙스 차이**예요. 뜻이 틀리는 게 아니라 그림이 달라요.',
        ],
        examples: [
          ['The mosquitoes were killed.', '모기들은 죽었다(죽임을 당한 상태).', '정적'],
          ['The mosquitoes got killed.', '모기들이 죽임을 당했다.', '동적'],
          ['I was attacked by a dog.', '나 개한테 공격당한 적 있어.', '사실 묘사'],
          ['I got attacked by a dog.', '나 개한테 공격당했어!', '그 순간의 그림'],
          ["I'm shocked.", '충격받았어(충격받은 상태야).'],
          ['I got shocked.', '방금 충격받았어.'],
          ['I got punched.', '나 주먹으로 맞았어.', 'was punched보다 생생'],
          ['He got fired.', '그 사람 잘렸어.'],
          ['I got stuck in traffic.', '차가 막혀서 꼼짝 못 했어.'],
          ['They got married last year.', '그들은 작년에 결혼했어.'],
        ],
      },
      {
        title: '능동인데 수동 뜻 (잘 ~되다)',
        points: [
          'sell, read, wash, peel 같은 동사는 능동 모양으로 "~가 잘 된다"는 뜻을 내요.',
        ],
        examples: [
          ['This cake sells well.', '이 케이크는 잘 팔려.'],
          ['The magazine reads well.', '그 잡지는 잘 읽혀.'],
          ['This shirt washes easily.', '이 셔츠는 세탁이 쉬워.'],
        ],
      },
      {
        title: '4형식 수동태 — 목적어가 두 개',
        points: [
          '**간접목적어(사람)**를 주어로 → 직접목적어가 그대로 남아요. (목적어가 있는 수동태)',
          '**직접목적어(사물)**를 주어로 → 사람 앞에 **to**를 붙여요.',
          '그래서 사람이 주어면 **3형식처럼**(목적어 a book이 남음), 사물이 주어면 **1형식처럼**(to + 사람만 붙음) 보면 돼요.',
          'Q. 수동태는 원래 목적어를 주어로 올려서 목적어가 없는데, 4형식에서 사람을 주어로 하면 "목적어가 있는 수동태", 사물을 주어로 하면 "1형식 수동태"라고 생각해도 되나요? → **네, 그렇게 생각해도 돼요.**',
          '이렇게 쓰는 4형식 동사: give · grant(주다) · offer(제공하다) · send(보내다) · assign(할당하다) · award(수여하다)',
        ],
        examples: [
          ['Jason gave Joan a book. → Joan was given a book.', '조앤은 (제이슨에게) 책을 받았다.', '사람이 주어 → a book이 남음'],
          ['→ A book was given to Joan.', '책이 조앤에게 주어졌다.', '사물이 주어 → to Joan'],
          ['I was offered the job.', '그 일자리를 제안받았어.', '회화에서 자주 써요'],
        ],
      },
      {
        title: '5형식 수동태 — 보어는 그대로',
        points: [
          '목적어가 주어가 되고, 목적격보어는 **주격보어**로 그대로 남아요. (5형식 → 2형식) 모양: be p.p. + 보어',
          '**keep · find · consider · call · make · leave · hold** + 목적어 + 명사/형용사 → be kept / found / considered / held ... + 보어',
          'consider O + 보어: ~라고 여기다 → 수동: **~라고 여겨진다** / hold O accountable(responsible) for ~: ~의 책임을 묻다 → 수동: ~의 책임을 지게 되다',
          '목적격보어가 **동사원형**(사역·지각)이면 수동태에서 **to부정사**로 바뀌어요.',
        ],
        examples: [
          ['Mr. Jason considers the project a success. → The project is considered a success.', '그 프로젝트는 성공으로 여겨진다.'],
          ['The company should keep the file confidential. → The file should be kept confidential.', '그 파일은 기밀로 유지돼야 한다.'],
          ['He was held responsible for the mistake.', '그는 그 실수의 책임을 지게 됐다.', 'hold O responsible → 수동'],
          ['I saw Tom run away. → Tom was seen to run away (by me).', '나는 톰이 도망가는 걸 봤어 → 톰이 도망가는 게 보였어.', '동사원형 → to부정사'],
          ['They made him wait. → He was made to wait.', '그는 기다려야 했다.'],
        ],
      },
      {
        title: '수동태로 못 바꾸는 타동사',
        points: [
          '움직임 없이 **소유·어울림·상태**를 말하는 동사: have, resemble, fit, suit, lack, equal, cost',
          'They have a large house. → A large house is had by them. ✗',
          'Nobody / Nothing 주어는 by nobody로 못 바꿔요. 회화에선 그냥 능동이 제일 자연스러워요: Nobody can do it.',
        ],
      },
    ],
    native: [
      '수동태 공식(목적어 → 주어, be + p.p., by + 주어)을 기계적으로 적용하지 마세요. "이 문장에서 누가 했는지가 중요한가?"부터 생각하세요.',
      '원어민은 be + p.p.를 따로따로 듣지 않고 **한 덩어리**로 들어요. "are attacked" → 힘이 주어 쪽으로 온다는 그림이 바로 잡혀요.',
      '"I have been ~"은 뒤를 끝까지 들어야 해요. here / to Paris / a teacher면 능동(해 봤다), 일반 동사 p.p.면 수동(당했다)이에요.',
      '방금 일어난 일을 말할 땐 get 수동태가 더 자연스러워요: I got fired / I got punched / I got shocked.',
      '회사 메일에서 실수를 부드럽게 말할 때도 수동태를 써요: "The file was sent to the wrong address." (누가 보냈는지 굳이 안 밝힘)',
    ],
    mistakes: [
      ['Mosquitoes killed. (모기가 죽었다는 뜻으로)', 'Mosquitoes were killed. / Mosquitoes got killed.', 'p.p.만 쓰면 "모기들이 (뭔가를) 죽였다"로 읽혀요. be(get)가 다리 역할을 해야 해요.'],
      ['I am kill mosquitoes.', 'I kill mosquitoes.', '한 절에 동사 두 개(am, kill)를 나란히 못 써요.'],
      ['I was slept.', 'I slept.', 'sleep은 자동사 → 수동태 ✗'],
      ['I have been slept for 8 hours.', 'I have slept for 8 hours.', '자동사는 현재완료 능동(have slept)만 돼요.'],
      ['I am interesting in movies.', 'I am interested in movies.', '감정은 -ed (내가 흥미를 느낌), -ing는 원인 (영화가 흥미로움)'],
      ["I'm boring.", "I'm bored.", "I'm boring은 '나는 지루한 사람이야'라는 뜻이 돼요."],
      ['This dress is fitted by me.', 'This dress fits me.', 'fit은 수동태 불가'],
      ['It can be done by nobody.', 'Nobody can do it.', 'by nobody ✗. 능동으로 말하는 게 자연스러워요.'],
      ['He was made wait.', 'He was made to wait.', '사역·지각동사의 동사원형 보어는 수동태에서 to부정사'],
      ['A book was given Joan.', 'A book was given to Joan.', '사물이 주어면 사람 앞에 to'],
    ],
  },

  {
    id: 'relative',
    title: '관계사 (형용사절)',
    sub: 'who · which · that · whose · what',
    summary: '명사 뒤에 문장을 붙여서 "어떤 명사인지" 설명하는 연결고리예요.',
    videos: [
      ['yv8aBYXPOZ8', '[관계대명사] 가장 쉽게 설명하는 까다로운 필수 문법'],
      ['VFwgqMjWeEc', '한 번 보면 전두엽에 박히는 관계부사 15분 완벽정리'],
    ],
    basics: [
      '관계대명사 = **접속사 + 대명사**. 두 문장을 붙이는 본드예요: I have a friend. + She lives in London. → I have a friend **who** lives in London.',
      '**선행사(명사) + 관계대명사 + 불완전한 문장** = 앞 명사를 꾸미는 **형용사절**이에요.',
      '"불완전한 문장" = 주어나 목적어가 하나 빠진 문장. 빠진 자리를 관계대명사가 대신해요.',
      '사람 → **who**, 사물 → **which**, 둘 다 → **that** (대화에선 that이 제일 흔해요), 소유 → **whose**',
      '**what** = the thing which (~하는 것). 앞에 명사(선행사)가 없어요. → 형용사절이 아니라 **명사절**이에요.',
    ],
    sections: [
      {
        title: '두 문장을 하나로 — 관계사절은 형용사',
        points: [
          'This is the house. + I live in **the house**. → 겹치는 명사(the house)를 관계대명사로 바꿔서 뒤 문장을 앞 명사에 붙여요.',
          '→ This is the house **(which I live in)**. the house = **선행사**(꾸밈 받는 명사) / which I live in = **형용사** 역할 → "~하는(-ㄴ), ~할(-ㄹ)"로 해석',
          '한국어는 꾸미는 말이 명사 앞에 오지만, 영어는 **긴 수식은 명사 뒤**에서 해요. "내가 사는 집" = the house which I live in',
          '선행사가 ① **사람** → who(m) ② **사물·동물** → which. **that**은 who(m)·which 대신 쓸 수 있어요 (선행사가 **있을 때**).',
          '**what**은 the thing(s) which / that을 한 단어로 줄인 거라 선행사가 **없어요** → "~것"이라는 **명사절**',
          '관계사 정리: **관계대명사** who · which · that · what / **관계부사** when · where · why · how → **선행사(명사) + 관계사절 = 형용사** (what만 예외로 명사절)',
        ],
        examples: [
          ['This is the house which I live in.', '여기가 내가 사는 집이야.', 'which I live in이 the house를 뒤에서 꾸밈'],
          ['I have a dog which loves water.', '나는 물을 좋아하는 개가 있어.', '동물도 which (대화에선 that도 OK)'],
        ],
      },
      {
        title: '주격 vs 목적격 — 빠진 자리 찾기',
        points: [
          '관계대명사 바로 뒤에 **동사**가 오면 → 주어가 빠진 것 (**주격**)',
          '관계대명사 뒤에 **주어 + 동사**가 오면 → 목적어가 빠진 것 (**목적격**)',
          '격 정리: **주격** who / which / that (관계사절의 주어) · **목적격** whom(who) / which / that (관계사절의 목적어) · **소유격** whose + 명사 (누구의 ~)',
        ],
        examples: [
          ['The box that is on the table is mine.', '탁자 위에 있는 상자는 내 거야.', 'that = 주어 (that is on the table)'],
          ['There is a girl that I met.', '내가 만났던 여자애가 있어.', 'that = met의 목적어'],
          ['I have a friend whose father is a pilot.', '아빠가 조종사인 친구가 있어.', 'whose + 명사 = 누구의'],
          ['I still remember the boys who were kind to me.', '나한테 친절했던 그 남자애들이 아직도 기억나.', '주격 who (who가 were의 주어)'],
          ['They are the students whom Mr. Smith taught.', '그들은 스미스 선생님이 가르친 학생들이다.', '목적격 whom (taught의 목적어)'],
          ['I saw a man whose hair was red.', '머리카락이 빨간 남자를 봤어.', '소유격 whose (그의 머리카락)'],
        ],
      },
      {
        title: 'what — 꾸밈 받는 명사까지 품은 관계대명사',
        points: [
          'That is the thing. + James said **it**. → it 대신 which를 써서 붙이면 That is the thing **(which James said)**.',
          '여기서 **the thing which**를 한 단어로 줄인 게 **what**이에요 → That is **what** James said.',
          '그래서 what 앞에는 명사(선행사)가 **없어요**. 꾸밈 받는 명사(the thing)를 이미 품고 있으니까요.',
          'what 뒤는 **주어 + 동사**인데 목적어(또는 주어)가 빠진 **불완전한 문장**이에요. what절 전체는 "~것"이라는 **명사**예요.',
        ],
        images: [
          ['images/grammar/notes/03.jpg', 'the thing which James said → what James said: what은 꾸밈 받는 명사(the thing)를 품고 있어요'],
        ],
        examples: [
          ['That is the thing which James said.', '그게 제임스가 말한 그것이다.', 'the thing + which절(형용사)'],
          ['That is what James said.', '그게 제임스가 말한 거야.', 'the thing which → what'],
        ],
      },
      {
        title: '생략할 수 있을 때',
        points: [
          '**목적격** 관계사는 생략 가능 → 원어민은 대부분 생략해요.',
          '**주격 관계사 + be** 뒤에 -ing / p.p.가 오면 (주격 관계사 + be)를 **함께** 생략할 수 있어요.',
          'This is the book (that) I bought yesterday. / Everything (that) she told you is true.',
        ],
        examples: [
          ['The guy I met yesterday was really nice.', '어제 만난 그 남자 진짜 괜찮았어.', 'guy (who) I met → 생략'],
          ['This is the boy (whom) I found at the hotel.', '이 아이가 내가 호텔에서 찾은 소년이야.', '목적격 whom 생략'],
          ['This is the building (which) I built.', '이게 내가 지은 건물이야.', '목적격 which 생략'],
          ['The girl (who is) standing over there is my sister.', '저기 서 있는 여자애가 내 동생이야.', '주격 + be 함께 생략'],
          ["The car (which is) parked here is my father's.", '여기 주차된 차는 아빠 차야.', '주격 + be 함께 생략'],
          ["That's not what I meant.", '내 말은 그게 아니야.', 'what = 내가 의미한 것'],
        ],
      },
      {
        title: 'that을 못 쓰는 3가지',
        points: [
          '① **소유격 없음** → whose 자리에 that ✗',
          '② **콤마(,) 뒤 ✗** → 덧붙이는 설명엔 who / which',
          '③ **전치사 바로 뒤 ✗** → the house in which I live ⭕ / in that ✗ (전치사를 뒤로 빼면 OK: the house that I live in)',
        ],
      },
      {
        title: '콤마(,) 있는 관계사 = 덧붙이는 설명',
        points: [
          'My brother, who lives in Busan, is a doctor. (형이 한 명뿐, 부산 산다는 건 추가 정보)',
          '관계대명사 앞에 **콤마(,)**를 찍고 이어 쓰는 걸 **계속적 용법**이라고 해요. 콤마가 없으면 앞 명사를 콕 집어 범위를 좁히는 **한정적 용법**이에요.',
          '콤마 뒤 관계사절은 **추가 정보**라서 빼도 문장의 뜻이 안 바뀌어요.',
          '해석은 앞에서부터 쭉: "~인데, 그 ~는 …" 처럼 이어서 읽으면 돼요.',
          'which는 앞 문장 **전체**를 받을 수도 있어요: He was late again, which made me angry.',
        ],
        examples: [
          ['He has two sons, who became doctors.', '그는 아들이 둘 있는데, (둘 다) 의사가 되었다.', '아들은 딱 두 명'],
          ['He has two sons who became doctors.', '그는 의사가 된 아들이 둘 있다.', '다른 아들이 더 있을 수도 있음'],
        ],
      },
      {
        title: '관계형용사 — what / which / whose + 명사',
        points: [
          '**whose + 명사**: 누구의 ~ (I saw a man whose hair was red.)',
          '**what + 명사**: ~하는 모든, ~만큼의 (얼마 안 되지만 있는 것 전부)',
          '**which + 명사**: 주로 콤마 뒤 계속적 용법에서 → in which case(그런 경우에는)',
        ],
        examples: [
          ['I gave him what money I had.', '나는 가진 돈을 전부 그에게 줬다.', 'what + 명사 = ~하는 모든'],
          ["He may be late, in which case we'll start without him.", '그가 늦을 수도 있는데, 그러면 그 없이 시작할게요.', 'in which case = 그런 경우에는'],
        ],
      },
      {
        title: '관계부사 — where · when · why · how',
        points: [
          '관계부사는 **접속사 역할을 하는 부사**예요. 관계부사 + 문장 = 앞 명사를 꾸미는 **형용사절**',
          '관계부사 뒤에는 **완전한 문장**이 와요. (관계대명사 뒤는 불완전)',
          'where = 장소, when = 때, why = 이유, how = 방법 (the way 와 how는 둘 중 하나만)',
          '해석: when "~할 때" · where "~하는 장소" · why "~하는 이유" · how "~하는 방법"',
        ],
        examples: [
          ['This is the café where we first met.', '여기가 우리 처음 만난 카페야.'],
          ["I remember the day when I got this job.", '이 일 얻은 날이 기억나.'],
          ["That's the reason (why) I called you.", '그래서 너한테 전화한 거야.'],
          ["That's how I learned English.", '그렇게 영어를 배웠어.', 'the way how ✗'],
        ],
      },
      {
        title: '관계부사 vs 의문부사 — 해석으로 구분',
        points: [
          '둘 다 **접속사 역할을 하는 부사**예요 (when, where, why, how).',
          '공통점 ②: 둘 다 **명사절**을 이끌 수 있어요. 관계부사도 앞의 명사(the time, the place …)가 빠지면 명사절이 되거든요.',
          '**관계부사**: "~할 때, ~하는 장소, ~하는 이유, ~하는 방법" → 앞 명사를 꾸미는 형용사절 (또는 부사절)',
          '**의문부사**: "언제, 어디서, 왜, 어떻게" → 간접의문문으로 항상 **명사절**',
          '모양이 같아서 문장만 보면 헷갈려요. **우리말 해석**이 자연스러운 쪽으로 구분해요.',
          '짝 정리: when "~할 때" / "언제" · where "~하는 장소" / "어디에서" · how "~하는 방법" / "어떻게" · why "~하는 이유" / "왜"',
        ],
        images: [
          ['images/grammar/notes/06.jpg', '같은 문장도 관계부사(~할 때, ~하는 장소…)와 의문부사(언제, 어디에서…)로 해석이 갈려요'],
        ],
        examples: [
          ["I don't know when we'll get together.", '우리가 언제 모일지 모르겠어.', '의문부사 "언제" (명사절)'],
          ["Tell me the time when we'll get together.", '우리가 모일 시간을 알려 줘.', '관계부사 "~할 때" (the time을 꾸밈)'],
          ["I don't know where we'll get together.", '우리가 어디에서 모일지 모르겠어.', '의문부사 "어디에서" / 관계부사로 읽으면 "우리가 모이는 장소를 모르겠어"'],
          ["I don't know how we'll get together.", '우리가 어떻게 모일지 모르겠어.', '의문부사 "어떻게" / 관계부사로 읽으면 "우리가 모이는 방법을 모르겠어"'],
          ["I don't know why we'll get together.", '우리가 왜 모이는지 모르겠어.', '의문부사 "왜" / 관계부사로 읽으면 "우리가 모이는 이유를 모르겠어"'],
          ["I don't know why he left.", '그가 왜 떠났는지 모르겠어.', '의문부사 "왜"'],
        ],
      },
      {
        title: '헷갈리는 짝: that · what',
        points: [
          '**that 관계대명사**: 뒤가 불완전(주어나 목적어 없음), 앞 명사를 꾸밈',
          '**that 접속사**: 뒤가 완전(주어·목적어·보어 다 있음), 문장을 이어 주기만 함',
          '**what 관계대명사**: 뒤가 불완전, "~것" (= the thing which)',
          '**what 의문사**: 뒤가 불완전, "무엇" → ask, wonder, don\'t know 뒤라면 대개 의문사',
        ],
        examples: [
          ['This is what I needed.', '이게 내가 필요했던 거야.', '= the thing which I needed'],
          ["I don't like what he is doing.", '그가 하는 짓이 마음에 안 들어.', '"~것" → 관계대명사'],
          ['I will ask him what he is doing.', '그에게 뭘 하고 있는지 물어볼게.', 'ask 뒤 "무엇" → 의문사'],
        ],
      },
    ],
    native: [
      '말할 땐 which보다 **that**, 목적격 관계사는 **생략**이 기본이에요: "the movie I saw", "the guy I told you about".',
      '"That\'s what I\'m saying!" (내 말이 그거야!), "What I mean is ~" 처럼 what 표현은 회화 필수.',
      '"That\'s why ~"(그래서 ~한 거야), "That\'s how ~"(그렇게 ~한 거야)는 대화에서 엄청 자주 써요.',
    ],
    mistakes: [
      ['The man which I met was kind.', 'The man (who) I met was kind.', '사람엔 who/that'],
      ['This is the thing what I wanted.', 'This is what I wanted. / the thing (that) I wanted', 'what 앞엔 명사 안 씀'],
      ['My mom, that lives in Daegu, called me.', 'My mom, who lives in Daegu, called me.', '콤마 뒤 that ✗'],
      ['This is the house in that I live.', 'This is the house in which I live. / the house (that) I live in', '전치사 바로 뒤 that ✗'],
      ['The girl standing over there she is my sister.', 'The girl standing over there is my sister.', '관계사절(거품)을 빼면 뼈대는 The girl is ~. 주어를 또 쓰지 않아요.'],
    ],
  },

  {
    id: 'noun-clause',
    title: '명사절',
    sub: 'that · if/whether · what · 의문사절',
    summary: '문장 하나를 통째로 "명사"처럼 쓰는 방법이에요. "~하는 것", "~인지"로 해석돼요.',
    videos: [
      ['GzzaEedWRXQ', '명사절 접속사의 종류'],
    ],
    basics: [
      '**명사절** = 문장이 명사 역할을 하는 것. 명사니까 **주어 / 목적어 / 보어 / 전치사의 목적어** 자리에 들어가요.',
      '명사절을 만드는 접속사: **that**(~라는 것), **if / whether**(~인지 아닌지), **what**(~하는 것), **의문사**(누가/언제/어디서/왜/어떻게 ~인지)',
      '구별 포인트: that · if · whether · 의문부사(when/where/why/how) 뒤는 **완전한 문장**, what · who · which 뒤는 **불완전한 문장**이에요.',
      '관계사와의 차이: 관계사(형용사절)는 **앞에 꾸며 줄 명사**가 있고, 명사절은 **그 자체가 명사**예요.',
    ],
    sections: [
      {
        title: '① that + 완전한 문장 = "~라는 것"',
        points: [
          '주어, 목적어, 보어 자리에 다 쓸 수 있어요.',
          '단, **전치사 뒤에는 못 써요.** (about that he… ✗)',
          '목적어 자리 that은 대화에서 거의 **생략**해요: I think (that) ~',
          '4형식 동사 뒤 직접목적어로도 써요. "**~에게 ~라고 하다**"로 해석이 자연스러우면 OK → He told me that he was busy.',
        ],
        examples: [
          ['That he attended the event is unusual.', '그가 행사에 참석했다는 것은 이례적이다.', '주어'],
          ['I think that my mother is pretty.', '나는 우리 엄마가 예쁘다고 생각한다.', '목적어'],
          ['The best thing about this car is that it is very convenient.', '이 차의 가장 좋은 점은 아주 편리하다는 거야.', '보어'],
          ['He told me that he was busy.', '그는 나에게 바쁘다고 말했다.', '4형식 직접목적어'],
        ],
      },
      {
        title: '동격의 that — 앞 명사의 "내용"을 설명',
        points: [
          '**fact / news / claim / rumor / opinion / truth / idea + that + 완전한 문장** = "~라는 사실/소식/소문"',
          '관계대명사 that과 달리 뒤가 **완전한 문장**이에요. 앞 명사 = that 이하 내용.',
        ],
        examples: [
          ['The rumor that he stole the money is true.', '그가 돈을 훔쳤다는 소문은 사실이다.', 'rumor = 그가 돈을 훔쳤다'],
          ['I heard the news that she got married.', '그녀가 결혼했다는 소식을 들었어.'],
        ],
      },
      {
        title: '② if / whether + 완전한 문장 = "~인지 (아닌지)"',
        points: [
          '**whether (or not)** 은 주어·목적어·보어·전치사 뒤 어디든 OK.',
          '**if** 는 **동사의 목적어** 자리에서만 써요. 문장 맨 앞 주어 자리 ✗, 전치사 뒤 ✗',
        ],
        examples: [
          ["I don't know if he will come.", '그가 올지 모르겠어.', '목적어 → if OK'],
          ['Whether he comes or not is not important.', '그가 오든 안 오든 중요하지 않아.', '주어 → whether만'],
          ["It depends on whether we have time.", '우리가 시간이 있느냐에 달렸어.', '전치사 뒤 → whether만'],
        ],
      },
      {
        title: '③ what + 불완전한 문장 = "~하는 것"',
        points: [
          '관계대명사 what = **the thing which**. 앞에 명사(선행사)가 없어요.',
          '**what vs that**: 뒤 문장이 **불완전**하면 what, **완전**하면 that',
        ],
        examples: [
          ['What I really want is that I live happily.', '내가 정말 원하는 건 행복하게 사는 거야.', 'What I want (want의 목적어가 빠짐) / that I live happily (완전)'],
          ["I can't believe what he said.", '그가 한 말을 믿을 수가 없어.'],
          ['I believe that he is honest.', '나는 그가 정직하다고 믿어.', '뒤가 완전 → that'],
        ],
      },
      {
        title: '④ 의문사절 = 간접의문문',
        points: [
          '의문문이 문장 안으로 들어가면 순서가 바뀌어요: **의문사 + 주어 + 동사** (평서문 순서)',
          'Where does he live? → I know **where he lives**. (does 사라짐)',
          '**의문사 + to 동사원형** = 의문사 + 주어 + should + 동사원형 → I don\'t know what to do. = what I should do',
          '의문사 자리에 **whether**도 쓸 수 있어요: whether to go or not (갈지 말지)',
          '**의문대명사 what** = "무엇" (뒤가 불완전) / **의문형용사 what + 명사** = "어떤 ~" → what color, what time',
          '**what vs which**: what은 범위가 정해지지 않은 "무엇", which는 정해진 범위 안에서 "어느 것" → Which do you prefer, tea or coffee?',
        ],
        examples: [
          ['Do you know where he lives?', '그가 어디 사는지 알아?', 'where does he live ✗'],
          ['Can you tell me what time it is?', '지금 몇 시인지 알려 줄래요?', 'what + 명사 = 어떤 ~'],
          ["I don't know what to say.", '뭐라고 말해야 할지 모르겠어.', '= what I should say'],
          ['Who do you want to meet?', '누구를 만나고 싶어?', 'who = meet의 목적어 (불완전)'],
        ],
      },
      {
        title: '⑤ 복합관계사 — ~ever',
        points: [
          '**whoever, whatever, whichever** + 불완전한 문장 → **명사절**(~하는 누구든/무엇이든) 또는 **부사절**(누가/무엇을 ~하더라도)',
          '**whenever, wherever, however** + 완전한 문장 → **부사절**(언제/어디서/아무리 ~하더라도)',
          '정리 팁: 관계사절 = **형용사** / 복합관계대명사절 = **명사, 부사** / 복합관계부사절 = **부사**',
          '복합관계사 = 관계사 + ever, "의문사 + 든지"(누구든지, 무엇이든지, 언제든지…). 앞의 선행사를 이미 품고 있어요.',
          '복합관계대명사가 **명사절**이면 "~하는 누구든 / 무엇이든 / 어느 것이든"(= anyone who, anything that), **부사절**이면 "누가 / 무엇을 / 어느 것을 ~하더라도"(= no matter who, what, which)로 해석해요.',
          '복합관계부사: **whenever** 언제 ~하든, ~할 때마다 · **wherever** 어디에 ~하든 · **however + 형용사/부사** 아무리 ~하더라도',
        ],
        images: [
          ['images/grammar/notes/08.jpg', '관계사 + ever = 선행사를 품은 관계사. 복합관계대명사 + 문장 = 명사·부사, 복합관계부사 + 문장 = 부사'],
        ],
        examples: [
          ['You can invite whoever you want.', '네가 원하는 누구든 초대해도 돼.', '명사절 (목적어)'],
          ['Whatever you do, do your best.', '무엇을 하든 최선을 다해.', '부사절'],
          ['Take whichever you like.', '마음에 드는 거 아무거나 가져가.', '명사절 (어느 것이든)'],
          ['Call me whenever you need help.', '도움이 필요할 땐 언제든 전화해.'],
          ["Wherever you go, I'll follow you.", '네가 어디에 가든 따라갈게.', '부사절'],
          ["However hard it is, don't give up.", '아무리 힘들어도 포기하지 마.', 'however + 형용사 = 아무리 ~해도'],
        ],
      },
      {
        title: 'that의 쓰임 총정리',
        points: [
          '① **관계대명사**: the book that I read (앞 명사 꾸밈, 뒤 불완전)',
          '② **명사절 접속사**: I think that ~ (~라는 것, 뒤 완전)',
          '③ **동격**: the fact that ~ (앞 명사 = 뒤 내용, 뒤 완전)',
          '④ **부사절 접속사**: so that(~하도록), now that(~이니까), in that(~라는 점에서), so ~ that(너무 ~해서)',
          '④-2 **감정·판단의 이유** "~이기에, ~해서": I\'m glad (that) you came. (와 줘서 기뻐) / I\'m sorry (that) I\'m late. (늦어서 미안해)',
          '⑤ **지시대명사**: That is my car. (저것)',
          '⑥ **지시형용사**: that man (저 ~)',
          '⑦ **지시부사**: It\'s not that hard. (그렇게, 그 정도로)',
          '⑧ **가주어-진주어**: It is true that ~ (긴 that절을 뒤로 보내고 it을 앞에)',
          '⑨ **강조 구문**: It was Tom that broke the window. (깬 건 바로 톰이었어)',
        ],
      },
    ],
    native: [
      '"I think ~", "I guess ~", "I heard ~", "I\'m sure ~" 뒤 that은 거의 생략해요: "I heard you got promoted!"',
      '긴 that절을 주어로 쓰는 건 어색해요. **It ~ that** 으로 바꿔 말하는 게 자연스러워요: "It\'s weird that he came."',
      '물어볼 땐 직접 묻기보다 간접의문문이 더 공손해요: "Do you know where the restroom is?", "Can I ask what you do?"',
      '"Whatever." (알게 뭐야 / 아무거나), "Whenever you\'re ready." (준비되면 언제든)은 회화 단골.',
    ],
    mistakes: [
      ['Do you know where does he live?', 'Do you know where he lives?', '간접의문문은 주어 + 동사 순서'],
      ["I'm worried about that he is sick.", "I'm worried that he is sick.", '전치사 뒤 that절 ✗'],
      ['If he comes is not important.', 'Whether he comes (or not) is not important.', '주어 자리엔 if ✗'],
      ['That I want is a vacation.', 'What I want is a vacation.', '뒤가 불완전(want의 목적어 없음) → what'],
    ],
  },

  {
    id: 'conditional',
    title: '가정법',
    sub: '"만약 ~라면" · I wish · as if',
    summary: '핵심은 하나예요. 현실이 아닌 상상을 말할 땐 시제를 한 칸 과거로 내린다.',
    videos: [
      ['PLxoOU8azGw9Wnc1o0bdvfbBJBwa1Q-v9F', '가정법 정복 (재생목록)'],
    ],
    basics: [
      '"만약 ~라면"에는 두 종류가 있어요. **실제로 일어날 수 있는 일**(조건문)과 **사실이 아닌 상상**(가정법).',
      '상상일 때는 시제를 **한 칸 과거로** 내려서 "이건 현실이 아니야"라는 거리감을 줘요.',
      '지금 사실과 반대 → **과거형** (If I had…, I would…)',
      '과거 사실과 반대 → **과거완료형** (If I had done…, I would have done…)',
      '시제는 과거형이지만 뜻은 **지금/과거의 반대 상황**이라는 점만 기억하면 돼요.',
      '영어 원서에서는 if 문장을 **조건문(Conditional)** 0 · 1 · 2 · 3 · 혼합 5가지로 나눠요. 학교에서 "가정법 현재"라고 배운 If you study hard, you will pass. 는 사실 가정법이 아니라 **현실 조건문(1형)**이에요.',
      '진짜 "가정법"이라고 부를 수 있는 건 **2형(지금 사실의 반대)부터**예요. 0형·1형은 사실을 그대로 말하는 **직설법** 문장이에요.',
      '영어에서 사실과 다른 상상을 표현하는 도구는 딱 두 가지예요. ① 동사의 시제를 한 칸 뒤로 미루기(시제 후퇴) ② **would · could · might** 같은 조동사 과거형 붙이기.',
    ],
    sections: [
      {
        title: '"가정법"이라는 이름부터 정리 — 직설법 · 조건문 · 가정법',
        points: [
          '"가정법(假定法)"을 한자로 풀면 **거짓 가(假) · 정할 정(定) · 법 법(法)**, 즉 "사실이 아닌 것을 사실로 정해서 말하는 방법"이에요. 그런데 이 번역이 딱 맞는지는 논란이 많아요.',
          '영어로 가정법은 **subjunctive (mood)** 예요. 핵심 뜻은 "사실이 아니라 **상상 속에만 있는 행동이나 상태**를 말할 때 쓰는 표현", 다시 말해 말하는 사람의 **심리적 태도**를 보여 주는 말투예요.',
          'subjunctive라는 단어는 사실 "가정"과는 별 상관이 없고, "**종속된**(아래에 딸린)"이라는 말과 뿌리가 같아요. 고대 그리스어에서 시작해 라틴어를 거쳐 지금의 유럽 언어들까지 이어져 온 아주 오래된 개념이에요.',
          '**직설법(Indicative)**: 말하는 내용을 **사실이라고 인정하고** 그대로 말하는 방법이에요. 우리가 평소에 쓰는 대부분의 문장이 직설법이에요.',
          '**조건문(Conditional)**: 어떤 일이 일어나려면 **어떤 조건이 먼저 따라와야 한다**는 걸 말하는 문장이에요. 학교에서 "가정법"이라고 배운 것들은 대부분 이 조건문이에요.',
          '그래서 원서(예: Practical English Usage, Cambridge Grammar of the English Language)는 **조건문**(사실·가능성)과 **가정법**(상상·비현실·소망·명령·권고 같은 심리적 태도)을 엄격하게 나눠요.',
          '학교에서 배운 세 문장을 비교해 보면 ①번과 ②번은 우리말로는 거의 똑같이 해석돼서 헷갈렸어요. 하지만 ①번은 **가정법이 아니라 직설법 조건문**이고, ②번은 "실제로는 공부를 안 하지만, 만약 열심히 한다면 붙을 수 있을 텐데"라는 **상상**이에요. ②번의 이 뉘앙스는 우리말로 깔끔하게 옮기기가 어려워요.',
        ],
        examples: [
          ['If he studies hard, he will pass the exam.', '그가 열심히 공부하면 시험에 붙을 거야.', '학교에선 "가정법 현재" → 사실은 직설법 조건문(1형). 공부하면 → 붙는다는 조건과 결과'],
          ['If he studied hard, he would pass the exam.', '(실제론 안 하지만) 그가 열심히 공부한다면 합격할 텐데.', '학교에선 "가정법 과거" → 2형. studied = 과거가 아니라 현실과 거리'],
          ['If he had studied hard, he would have passed the exam.', '그가 (그때) 열심히 공부했더라면 시험에 붙었을 텐데.', '학교에선 "가정법 과거완료" → 3형'],
        ],
      },
      {
        title: '시제 후퇴(backshift) — 과거형은 "현실과의 거리"',
        points: [
          '가정법의 과거형은 시간이 과거라는 뜻이 아니라, 일부러 시제를 **한 칸 뒤로 미뤄서** "이건 현실이 아니야(상상·소망)"라는 **심리적 거리**를 나타내요.',
          '이 기법을 **시제 후퇴(backshift)** 라고 해요. 영어·독일어·프랑스어·스페인어 같은 **인도유럽어** 계통 언어에서 옛날부터 지금까지 흔히 쓰는 아주 간단한 방법이에요.',
          '시제를 후퇴시키는 이유는 이런 걸 말하고 싶을 때예요: **사실이 아님 · 사실과 반대 · 가능성 · 소망**.',
          'If he studied hard, he would pass the exam. → studied는 과거형이지만 "(지금) 열심히 공부한다면"이라는 **현재의 상상**이에요. 실제로는 공부를 안 한다는 걸 깔고 하는 말이죠. will도 한 칸 후퇴시켜 **would**로 쓰면 "붙을 수도 있겠지"라는 **상상 속 시나리오**가 돼요.',
          'will → **would**, can → **could**도 같은 원리예요. 그래서 조동사 과거형이 **공손함·불확실함**을 나타내요.',
          'will은 원래 동사였다가 조동사가 된 말이라 시제를 바꿀 수 있어요. 다만 요즘 영어에서 조동사를 후퇴시키는 건 **시간**보다는 **뉘앙스**를 위해서예요.',
          'Will you open the door? < **Would** you open the door? (한 발 물러서서 묻는 느낌 → 더 공손)',
          '왜 공손해질까요? 과거형으로 바꾸면 현실과 거리가 생겨 **불확실함 = 망설임**이 드러나요. 망설인다는 건 상대방 눈치를 본다는 뜻이니까, 결과적으로 **신중하고 예의 바른 말**이 돼요. 이걸 "**심리적 거리 두기**"라고 해요.',
          'I can go. > I **could** go. (갈 수는 있는데… 가능성이 더 낮게 들림)',
          'I will go. > I **might** go. (갈지도 몰라 → 확신이 없어서 한 발 물러난 말)',
          '허가·추측의 could가 과거로 해석되지 않는 것도 같은 이유예요. 시간이 아니라 **거리감**을 나타내니까요. (조동사 편 참고)',
          '이 원리 하나만 알면 따로따로 외웠던 가정법·공손 표현·추측 표현이 한 줄로 꿰어져요.',
        ],
        examples: [
          ['If I had wings, I would fly to you.', '날개가 있다면 너한테 날아갈 텐데.', '불가능한 상상'],
          ['If I were a bird, I would fly to you.', '내가 새라면 너한테 날아갈 텐데.', 'were는 과거가 아니라 "나는 새가 아니다"라는 현실과의 거리'],
          ['Would you open the door?', '문 좀 열어 주시겠어요?', 'Will you…?보다 공손. 상대의 뜻을 존중해 한 발 물러선 말'],
          ['I might go.', '갈지도 몰라.', 'I will go.보다 훨씬 불확실'],
        ],
      },
      {
        title: '0형 조건문 — 늘 그런 일 (if = when)',
        points: [
          '**If + 현재형, 현재형**: 과학적 사실, 일반적인 일, 습관',
          '아무것도 가정하지 않으니 **if를 when으로 바꿔도** 대부분 통해요.',
          '상상이나 소망이 아니라 너무나 당연한 사실을 말하는 거라서 "가정법"이라고 부르긴 어려워요. 정확히는 **직설법으로 쓴 조건문**이에요.',
          '과학처럼 **이미 증명된 사실**을 말할 때 특히 많이 써요.',
        ],
        examples: [
          ['If you heat ice, it melts.', '얼음을 가열하면 녹는다.', '= When you heat ice, it melts.'],
          ['If the temperature drops below 0°C, water freezes.', '기온이 0도 아래로 내려가면 물은 얼어요.', '과학적 사실'],
          ['If I have some free time, I usually go hiking.', '시간이 나면 보통 등산을 가.', '습관'],
          ["If you're sad, I'm sad too.", '네가 슬프면 나도 슬퍼.', '일반적인 상태'],
        ],
      },
      {
        title: '① 현실 조건문 — 진짜 일어날 수 있는 일',
        points: [
          '**If + 현재형, will + 동사원형**',
          '학교에서 **"가정법 현재"** 라고 배운 게 바로 이거예요. 단순한 조건이 들어 있고, **현실에서 일어날 가능성이 있는 일**을 말해요.',
          'if절에는 미래라도 **will을 쓰지 않아요.** (If it will rain ✗)',
          '쓰임새가 다양해요: 조건에 따른 결과, **경고·협박**, **설득·호의(제안)**.',
          'if절에 **should**를 넣으면 가능성이 확 떨어져서 "**혹시라도** ~하면"이라는 느낌이 돼요.',
          'should가 들어간 문장은 **법 조항·계약서·공문서**처럼 딱딱하고 격식 있는 글에 자주 나와요. 이때 if를 빼고 **Should + 주어** 로 순서를 바꾼(도치) 모양이 특히 많아요.',
          '영국 영어는 이 should를 많이 쓰고, 미국 영어는 should 없이 그냥 If you have… 로 말하는 경우가 많아요.',
        ],
        examples: [
          ['If you study hard, you will pass the exam.', '열심히 공부하면 시험에 붙을 거야.', '학교에서 말하는 "가정법 현재" = 1형'],
          ["If it rains tomorrow, I'll stay home.", '내일 비 오면 집에 있을 거야.', '비가 올 수도 있음'],
          ["If you're busy, I'll come back tomorrow.", '바쁘면 내일 다시 올게.', '조건에 따른 결과'],
          ["If you don't come early, I'll lock the door.", '일찍 안 오면 문 잠글 거야.', '경고도 1형'],
          ["If you give me a cupcake, I'll buy you a coffee.", '컵케이크 주면 커피 사 줄게.', '설득·호의'],
          ['If you should have any questions, please contact us.', '혹시라도 질문이 있으시면 연락 주세요.', 'should → "혹시라도" (가능성 낮춤)'],
          ['Should you have any questions, please contact us.', '혹시 궁금한 점이 있으시면 저희에게 연락 주세요.', 'if 생략 + 도치. 공문서·안내문 단골'],
        ],
      },
      {
        title: '② 가정법 과거 — 지금 사실과 반대',
        points: [
          '**If + 과거형, would/could(might) + 동사원형**',
          '진짜 "가정법"이라고 부를 수 있는 문장은 **여기서부터**예요. 지금 사실과 반대되거나 현실적이지 않은 일을 말해요.',
          '말하는 순간 이미 "**이건 사실이 아니야**"라고 깔고 말하는 거예요. if절의 동사도, 뒤의 조동사도 **둘 다 한 칸씩 후퇴**해요.',
          '현실적으로 **불가능한 상상**(날개, 나이를 거꾸로 먹기 등)에도 써요.',
          'be동사는 주어와 상관없이 **were**가 기본이에요. (If I were you) 이걸 **were 가정법(were-subjunctive)** 이라고 불러요.',
          '사실과 반대되거나 있을 법하지 않은 일엔 be동사를 무조건 were로 쓴다는 전통이 옛날 영어부터 지금까지 이어져 왔어요. were는 "이건 **가상 세계** 이야기야"라는 표시인 셈이에요. if절의 were 규칙은 지금도 잘 지켜지고 있어요.',
          '요즘 회화에선 원어민도 **If I was**를 많이 써요. 시험·글에서는 were가 안전해요.',
          '깐깐한 원어민들은 여전히 were만 맞다고 하지만, 언어는 누군가의 주장대로 유지되지 않고 자연스럽게 변해요. 나중엔 was가 표준이 될 수도 있어요. 사실과 반대인 내용을 **과거형으로 말한다**는 원리 자체는 같아요.',
        ],
        examples: [
          ['If I had more time, I would travel more.', '시간이 더 있으면 여행을 더 할 텐데.', '실제론 시간이 없음'],
          ["If I were you, I'd take the job.", '내가 너라면 그 일 할 거야.', '조언할 때 최고로 많이 쓰는 문장'],
          ['If I knew his number, I could call him.', '번호를 알면 전화할 수 있을 텐데.', '실제론 모름'],
          ["If he weren't treating me like a child, I would be with him.", '그가 나를 애 취급하지만 않는다면 그와 함께 있을 텐데.', "실제론 지금 애 취급 중 → wasn't를 후퇴시킨 weren't. would be도 후퇴형 = 지금 같이 있지 않음"],
          ["If I were younger, I would call you 'hyung'.", '내가 더 어리다면 너를 "형"이라고 부를 텐데.', '나이를 거꾸로 먹을 순 없으니 불가능한 상상'],
          ['If I were rich, I would hire him.', '내가 부자라면 그를 고용할 텐데.', '실제론 부자가 아님 → were'],
          ['If I were rich, I would buy a house.', '내가 부자라면 집을 살 텐데.', '현실과 반대되는 상상'],
        ],
      },
      {
        title: '③ 가정법 과거완료 — 과거 사실과 반대 (후회)',
        points: [
          '**If + had p.p., would/could/might have p.p.**',
          '이미 지나간 일에 대한 후회나 아쉬움을 말할 때 써요. "그때 그런 일이 **없었더라면** / **있었더라면**" 하고 과거 사실과 반대로 상상하는 거예요.',
          '그래서 **자책·반성**, 또는 상대를 **책망**하는 느낌이 자주 담겨요. ("왜 그때 그렇게 했어?")',
          '공식이 이렇게 생긴 이유: 과거 사실(천천히 운전 안 했음)과 반대라는 걸 보여 주려고 과거에서 **한 칸 더 후퇴**시켜 **had p.p.(과거완료)** 를 써요.',
          '결과 쪽도 한 칸 더 과거로 밀어야 하는데, **would 뒤에는 동사원형**만 올 수 있으니 had 대신 원형 **have**를 써요. 그래서 **would have p.p.** 가 돼요.',
          '이 원리로 **If + 주어 + had p.p., 주어 + would have p.p.** 라는 공식이 완성돼요.',
          'would have p.p.의 have p.p.를 "**현재완료**"라고 설명하는 경우가 있는데 잘못된 설명이에요. 현재완료는 과거와 결이 다르고, "작년(last year)" 같은 과거 이야기에 현재완료를 쓰면 말이 안 돼요. 이건 had p.p.가 조동사 뒤에서 have p.p. 모양이 된 것뿐이에요.',
        ],
        examples: [
          ["If I had known, I would have told you.", '알았더라면 너한테 말했을 텐데.', '실제론 몰랐음'],
          ['If we had left earlier, we could have caught the train.', '더 일찍 나왔으면 기차를 탈 수 있었을 텐데.'],
          ["If you had driven slowly, you wouldn't have had that accident.", '천천히 운전했으면 그 사고는 안 났을 텐데.', '실제론 빨리 몰았고 사고가 났음 → 책망·자책의 느낌'],
          ['If you had helped me then, I would have finished the project last year.', '네가 그때 도와줬더라면 작년에 그 프로젝트를 끝냈을 텐데.', '"왜 안 도와줬어?"라는 책망. last year와 함께 써도 OK'],
        ],
      },
      {
        title: '④ 혼합 가정법 — 과거의 일이 지금에 영향',
        points: [
          '**If + had p.p.(과거), would + 동사원형(지금)**',
          '과거 사실과 반대로 가정하고, 그 **결과가 지금** 어떨지를 말할 때 써요.',
          '과거↔현재만 있는 게 아니라 **여러 시점을 섞을 수 있어요.** (지금 사실의 반대 → 과거 결과, 과거 사실의 반대 → 미래 결과 등)',
          '정해진 공식 하나로 끝나지 않으니, **각 절이 언제 이야기인지** 따로따로 따져서 시제를 맞춰야 해요. 그래서 연습이 많이 필요해요.',
        ],
        examples: [
          ['If I had studied harder, I would be a doctor now.', '그때 더 열심히 공부했더라면 지금 의사일 텐데.'],
          ["If I hadn't gotten married, I wouldn't be living like this.", '그 결혼만 안 했어도 지금 이렇게 안 살 텐데.', '드라마 대사 느낌. 과거(결혼) → 지금(삶)'],
          ['If you had helped me yesterday, I would be going on vacation tomorrow.', '어제 네가 도와줬더라면 내일쯤엔 휴가를 가고 있을 텐데.', '과거 조건 → 미래 결과'],
          ["If I weren't so shy, I would have talked to her yesterday.", '내가 이렇게 수줍음이 많지 않았다면 어제 그녀에게 말을 걸었을 텐데.', '지금(성격) → 과거 결과'],
        ],
      },
      {
        title: '⑤ I wish / If only / as if / It\'s time / were to',
        points: [
          '**I wish + 과거형** → 지금 이랬으면 좋겠다 / **I wish + had p.p.** → 그때 그랬으면 좋았을 텐데',
          '**If only** 는 I wish 보다 더 간절한 느낌',
          '**as if (= as though) + 과거형** → 실제로는 아닌데 마치 ~인 것처럼',
          "**It's time + 과거형** → 진작 했어야 할 시간이야 (It's time we left.)",
          '**If + 주어 + were to + 동사원형** → "(그럴 리 없겠지만) 혹시라도 ~한다면". 일어날 가능성이 아주 낮은 미래를 상상할 때 써요.',
        ],
        examples: [
          ['I wish I knew the answer.', '답을 알면 좋을 텐데.'],
          ['I wish I had gone to the party.', '그 파티 갈 걸 그랬어.'],
          ['He talks as if he knew everything.', '그는 마치 다 아는 것처럼 말한다.'],
          ["It's about time we went home.", '이제 진짜 집에 갈 시간이야.'],
          ['If it were to rain tomorrow, the game would be canceled.', '혹시라도 내일 비가 온다면 경기는 취소될 거예요.', 'were to = 가능성이 아주 낮은 미래'],
        ],
      },
      {
        title: '⑥ if 없이 쓰는 가정 — 업무 메일에서 자주',
        points: [
          '**Should you ~** = If you should ~ (혹시 ~하시면) → 메일 끝인사의 단골. 법 조항·계약서 같은 격식 문서에 많아요. (①에서 본 "혹시라도"의 should)',
          '**Had I known** = If I had known (격식체)',
          '**Without / But for ~** = ~이 없다면/없었다면',
        ],
        examples: [
          ['Should you have any questions, please let me know.', '궁금한 점 있으시면 말씀해 주세요.'],
          ['Had I known, I would have told you.', '알았더라면 말씀드렸을 거예요.', '= If I had known (격식체 도치)'],
          ['Without your help, I couldn\'t have finished it.', '네 도움이 없었으면 못 끝냈을 거야.'],
        ],
      },
      {
        title: '⑦ 동사원형 가정법 — 명령 · 권고 · 소망',
        points: [
          '가정법(subjunctive)은 원래 사실과 반대되는 상상만이 아니라 **의심 · 권고 · 소망 · 명령**처럼 "사실을 말하는 게 아닌" 모든 경우에 쓰던 말투예요.',
          '라틴어로 보면 쉬워요. **dico** = "나는 말한다"(사실), **dicam** = "내가 말하기를(바란다/명령한다)"(가정법). 영어로는 둘 다 I say지만 라틴어는 **동사 모양 자체가 달라요.**',
          '**It is important / essential that + 주어 + 동사원형**: 권고·요구를 나타내는 옛 가정법 모양 (영국 영어·구어에선 should + 동사원형도 많이 써요)',
          '이렇게 that절에 동사원형을 써서 "중요하다 → 그러니 그렇게 해라"처럼 **권고·명령에 가까운 내용**을 나타내요.',
          '원어민도 It is important that he **be** here. 같은 문장을 보면 "이게 뭐지?" 하거나 **옛날 말처럼** 느끼기도 해요. 학교에서 배운 옛날 문법 같은 느낌이죠.',
          '한국에선 흔히 "**should가 생략된 것**"이라고 가르쳐요. 하지만 엄밀히는 should가 빠진 게 아니라, 원래 **동사원형을 쓰는 게 전통**이었어요. 이 원리를 모르는 원어민도 있고, 영국 영어는 아예 should를 넣어 평범한 문장처럼 쓰기도 해요. 특히 말할 땐 should를 넣는 경우가 훨씬 많아요.',
        ],
        examples: [
          ['It is important that he be here on time.', '그가 제시간에 여기 오는 게 중요해요.', 'he be (동사원형)'],
          ['It is important that he be here.', '그가 여기 있는 게 중요해요.', '원어민에게도 격식·옛 말투로 들림'],
          ['It is important that he should be here.', '그가 여기 있는 게 중요해요.', '영국 영어·회화식'],
          ['He ordered that I say it.', '그는 나에게 그걸 말하라고 명령했어요.', 'I say는 사실이 아니라 "명령된 내용" → 가정법. 하지만 모양이 그대로라 헷갈려요'],
        ],
      },
      {
        title: '더 알아보기 — 영어 가정법은 왜 이렇게 헷갈릴까? (굴절 이야기)',
        points: [
          '영어·독일어·프랑스어·스페인어 같은 **인도유럽어** 계통 언어는 **사실**을 말할 때와 **소망·권고·명령**을 말할 때 동사 모양 자체가 달라지는 특징이 있어요.',
          '이렇게 단어 끝이 바뀌거나 휘어지는 걸 **굴절(inflection)** 이라고 해요. 단어 모양이 주어·시제·수 같은 문법 기능에 따라 변하는 거예요.',
          '스페인어는 que 뒤의 딸린 절(종속절)에서 동사 모양을 바꿔요. 그래서 동사만 봐도 "사실이 아니라 소망이구나"를 알 수 있어요. 스페인어·프랑스어·독일어에선 이걸 **접속법**이라고 부르고 다들 배우는 기본 문법이에요.',
          '그런데 현대 영어는 굴절을 거의 잃어버려서 사실이든 소망이든 동사 모양이 **똑같아요.**',
          '영어에 남은 굴절의 거의 유일한 흔적이 주어가 he/she일 때 붙는 **-s**예요. (I study / he stud**ies**) 옛날 영어는 인칭에 따라 동사 모양이 훨씬 많이 바뀌었어요.',
          '다른 유럽어는 인칭별로 한 번 바뀌고, 사실이 아닌 걸 말할 때 **또 한 번** 바뀌어요.',
          '영어는 시간이 지나며 동사 모양이 단순해졌고, 가정법을 쓸 땐 복잡하게 끝을 바꾸는 대신 **인칭과 상관없이 동사원형**을 쓰기로 정리됐어요. 그래서 옛날 영어에선 동사원형만 보고도 "사실이 아닌 가능성·권고·명령"인 걸 바로 알 수 있었어요.',
          '그런데 현대 영어는 he/she 말고는 동사원형과 평소 모양이 똑같아져서, **원어민조차 가정법인지 못 알아보는 경우**가 많아요. 그래서 요즘 회화에선 동사원형 대신 평소 동사 모양을 쓰는 경우가 늘고 있어요.',
          'If I **were**처럼 I 뒤에 was 대신 were를 쓰는 것도 옛날 굴절이 남긴 **흔적(잔재)** 이에요. 중세 영어까지는 사실과 반대인 내용을 동사 과거형으로 말하는 게 아주 일반적이었어요.',
          '옛날 영어(셰익스피어 시대 등)는 이런 가정법 원리를 동사에 충실히 적용해서, 지금 들으면 낯설고 괴상하게 들리기도 해요.',
          '굴절이 사라지자 영어는 동사만으로는 "가정"의 뉘앙스를 낼 방법이 없어졌어요. 그 빈자리를 **would · could · might 같은 조동사 과거형**이 채우게 됐죠. 그래서 지금 영어에서 조동사 과거형은 없으면 표현 자체가 안 될 만큼 중요해요.',
          'Will you vs **Would** you의 공손함 차이, I can go vs I **could** go의 가능성 차이는 모두 후퇴한 조동사가 만들어 낸 **"작품"** 이에요. 이 원리를 제대로 알면 원하는 뉘앙스를 자유롭게 표현할 수 있고, 특히 **글쓰기**에서 큰 무기가 돼요.',
        ],
        examples: [
          ['Victoria estudia español.', '빅토리아는 스페인어를 공부해요.', '스페인어: 사실 → estudia'],
          ['Espero que Victoria estudie español.', '나는 빅토리아가 스페인어를 공부하길 바라요.', '스페인어: 소망 → estudie (모양이 바뀜)'],
          ['Victoria studies Spanish.', '빅토리아는 스페인어를 공부해요.', '영어: 사실'],
          ['I hope that Victoria studies Spanish.', '나는 빅토리아가 스페인어를 공부하길 바라요.', '영어: 소망인데도 studies 그대로 (굴절 없음)'],
        ],
      },
    ],
    native: [
      '조언은 거의 항상 "**If I were you, I\'d ~**". 회화에선 "If I was you"도 흔히 들려요. (글에선 were가 안전)',
      '말할 땐 축약해요: I would → **I\'d**, would have → **would\'ve** (발음은 "우더브/woulda").',
      '가정법의 "거리감"은 공손함에도 쓰여요. "**I was wondering if** you could help me." / "**Would** you mind…?" / "**I\'d appreciate it if** you could…" — 현재형보다 훨씬 부드러워요.',
      '후회 말할 때 짧게: "**I should\'ve** told you." (말했어야 했는데) / "**You could\'ve** asked me." (나한테 물어봐도 됐잖아)',
      'It is important that he **be** here. 같은 동사원형 가정법은 원어민 귀에도 격식 있거나 옛날 말처럼 들려요. 말할 땐 "It\'s important that he **is** here." 또는 "he **should be** here."가 흔해요.',
      '"Should you have any questions…"는 회사 메일·안내문용 격식체예요. 친구한테는 "If you have any questions, just let me know."면 충분해요.',
    ],
    mistakes: [
      ["If it will rain, I'll stay home.", "If it rains, I'll stay home.", 'if절에는 미래도 현재형으로.'],
      ['If I would have known, I would have told you.', 'If I had known, I would have told you.', 'if절에는 would가 아니라 had p.p.'],
      ['I wish I can speak English fluently.', 'I wish I could speak English fluently.', 'I wish 뒤엔 한 칸 과거로 (can → could).'],
      ['If I am you, I will quit.', "If I were you, I'd quit.", '상상이니까 과거형 + would.'],
      ['I would of called you.', "I would've (would have) called you.", "would've 발음 때문에 생긴 철자 실수. of 아니에요."],
      ['If he studied hard, he will pass the exam.', 'If he studied hard, he would pass the exam.', 'if절을 후퇴시켰으면 결과(will)도 would로 같이 후퇴.'],
      ['If you had helped me then, I would finish the project last year.', 'If you had helped me then, I would have finished the project last year.', '과거 사실의 반대 결과는 would have p.p.'],
      ['If I would have more time, I would travel more.', 'If I had more time, I would travel more.', 'if절엔 would를 쓰지 않고 과거형.'],
    ],
  },
];
