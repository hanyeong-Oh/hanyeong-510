// 문법 개념 — 초보자에게 필요한 순서대로 (쉬운 것 → 어려운 것)
// 카테고리마다: 기초 개념 → 핵심 정리(예문) → 원어민 감각 → 자주 하는 실수
// 문장 안의 **굵게** 는 화면에서 굵은 글씨로 보입니다.
// examples: [영어, 한국어 해석, (선택) 한 줄 설명]   mistakes: [틀린 문장, 맞는 문장, 이유]
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
    sub: '현재 · 진행 · 현재완료 · 과거 · 미래 · 미래완료',
    summary: '시제는 "언제"보다 "말하는 사람이 그 일을 어떻게 보느냐"예요.',
    basics: [
      '**현재형**은 "지금 이 순간"이 아니라 **늘 그런 일**(습관, 사실)이에요. I work in Seoul.',
      '**현재진행형**(be + -ing)은 **지금 하고 있는 일**, 또는 **잠깐 동안 하는 일**이에요. I\'m working from home this week.',
      '**현재완료**(have + p.p.)는 **과거의 일이 지금과 연결**돼 있을 때 써요. 한국어에 딱 맞는 시제가 없어서 가장 헷갈려요.',
      '**과거형**은 **끝난 일**이에요. 언제인지(yesterday, last year, in 2020)가 나오면 과거형.',
    ],
    sections: [
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
    ],
    mistakes: [
      ['I have seen him yesterday.', 'I saw him yesterday.', 'yesterday(끝난 시점)엔 현재완료 ✗'],
      ['I am working here since 2020.', "I've been working here since 2020.", 'since + 과거부터 지금까지 → 현재완료(진행)'],
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
        ],
        examples: [
          ['Tom went mad.', '톰은 미쳐 버렸다.', 'go가 "가다"가 아니라 "~가 되다" (형용사 보어)'],
          ['Tom ran madly.', '톰은 미친 듯이 달렸다.', 'run은 "달리다" 그대로, madly가 동사를 꾸밈'],
        ],
      },
      {
        title: '명사 보어 vs 형용사 보어',
        points: [
          '**명사 보어**는 주어(또는 목적어)와 **같은 것**이에요. 그래서 명사가 보어가 되려면 **주어 = 명사**가 성립해야 해요.',
          '**형용사 보어**는 주어(또는 목적어)를 **설명**만 해요. 같은 것이 아니에요.',
        ],
        examples: [
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
          'ask for(요청하다) · look at(보다) · listen to(듣다) · wait for(기다리다) · depend on(의존하다) · deal with(처리하다)',
          '같은 동사라도 전치사가 붙으면 뜻이 바뀌어요: ask(묻다) / ask for(요청하다). 이런 건 **단어처럼 통째로** 외우세요.',
          'ask가 "묻다"일 땐 물어본 내용이 같이 와야 자연스러워요: I asked him the way. (그에게 길을 물었다)',
        ],
        examples: [
          ['I asked for the money.', '나는 그 돈을 요청했다.', 'ask for = 요청하다 (뒤에 주로 사물)'],
          ['I asked him the way.', '나는 그에게 길을 물어봤다.', 'ask = 묻다 (사람 + 물은 내용)'],
          ['Can you wait for me?', '나 좀 기다려 줄래?', 'wait for = 기다리다'],
        ],
      },
      {
        title: '수동태가 안 되는 자동사',
        points: [
          '자동사는 목적어가 없으니 수동태로 못 바꿔요.',
          '**happen, occur, take place, appear, disappear, exist, arrive, rise, function, proceed, consist of, belong to, result in/from**',
          '자동사: 동사의 힘이 주어에서 끝나요. / 타동사: 동사의 힘이 주어 → 목적어로 옮겨 가요. (I grow plants. → plants가 목적어)',
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
    basics: [
      '**at** = 콕 찍은 한 점: at 3 p.m., at the station, at the door',
      '**on** = 위에 붙어 있는 면, 특정한 날: on the desk, on Monday, on May 5th',
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
          '**during** + 명사 → "언제" (during summer, during the meeting). during the + 숫자 기간은 OK (during the last three years)',
          '**over / through / throughout** ~동안, ~내내 · **within** ~이내에',
          '**in** + 기간 → 보통 "~후에" (in two days = 이틀 후에)',
        ],
        examples: [
          ['The reporter interviewed Mr. Kim for nearly two hours.', '그 기자는 거의 두 시간 동안 김 씨를 인터뷰했다.', '얼마나 오래 → for'],
          ['Most resorts in the area are busiest during summer.', '그 지역 리조트 대부분은 여름 동안 가장 바쁘다.', '언제 → during'],
          ['Your request will be approved in two days.', '신청은 이틀 후에 승인될 겁니다.', 'in + 기간 = ~후에'],
        ],
      },
      {
        title: '위치 · 방향',
        points: [
          '위치: **over / above** ~위에(~이상) · **under / below** ~아래에(~이하) · **beside / next to** ~옆에 · **behind** ~뒤에 · **between**(둘) / **among**(셋 이상) ~사이에 · **near** 가까이 · **around** 주위에 · **past** ~을 지나 · **opposite** ~맞은편에 · **outside** ~밖에',
          '방향: **from** ~에서 · **to** ~로 · **across** ~을 가로질러 · **through** ~을 통과하여 · **along** ~을 따라 · **for** ~을 향해 · **toward(s)** ~쪽으로 · **into** ~안으로 · **out of** ~밖으로',
          '**along with** ~와 함께',
        ],
      },
      {
        title: '이유 · 양보 · 목적',
        points: [
          '~때문에: **because of / due to / owing to / on account of** + 명사',
          '~에도 불구하고: **despite / in spite of / notwithstanding** + 명사',
          '~을 위해서: **for** + 명사',
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
          '**around** the world(전 세계에) · **around** the corner(모퉁이 돌아서 / 곧, 임박한)',
        ],
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
    summary: '조동사는 동사에 "가능·의지·의무·추측·공손함"이라는 기분을 얹어 줘요.',
    basics: [
      '조동사 뒤에는 항상 **동사원형**. (He can swim ✓ / He can swims ✗)',
      '부정은 조동사 뒤에 not: can\'t, won\'t, shouldn\'t',
      '**과거형(could, would, might)** 은 과거뿐 아니라 **더 공손하거나 더 약한 추측**을 나타낼 때 많이 써요.',
    ],
    sections: [
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
          ["You don't have to come.", '안 와도 돼.'],
          ['You must not smoke here.', '여기서 담배 피우면 안 됩니다.'],
        ],
      },
      {
        title: '추측: must / might / can\'t',
        points: [
          '확신 정도: **must**(분명 ~일 거야) > **should**(~일 거야) > **may/might/could**(~일지도) > **can\'t**(~일 리 없어)',
        ],
        examples: [
          ['You must be tired.', '피곤하겠다.'],
          ['He might be in a meeting.', '회의 중일지도 몰라.'],
          ["That can't be true.", '그럴 리가 없어.'],
        ],
      },
      {
        title: '부탁·제안: 공손함의 단계',
        points: [
          'Can you ~? < Could you ~? < Would you mind -ing? (뒤로 갈수록 공손)',
          '제안: Shall we ~? / Why don\'t we ~? / We could ~',
        ],
        examples: [
          ['Could you send me the file?', '파일 좀 보내 주실 수 있을까요?'],
          ['Would you mind closing the door?', '문 좀 닫아 주시겠어요?', '대답 "No, not at all." = 괜찮아요(닫아 줄게요)'],
        ],
      },
      {
        title: 'can / could — could가 "과거"일 때는 능력뿐',
        points: [
          'could가 **과거**로 쓰이면 뜻은 **능력**(~할 수 있었다)뿐이에요.',
          '허가 · 가능성 · 추측의 could는 과거가 아니라 **can보다 정중하거나 불확실한** 뜻이에요. 과거로 해석하지 마세요.',
          '**과거 추측**은 조동사 + **have p.p.**: can\'t have p.p.(~했을 리 없다), must have p.p.(~했음이 틀림없다), might have p.p.(~했을지도)',
        ],
        examples: [
          ['I could swim when I was five.', '다섯 살 때 수영할 수 있었어.', '과거 능력'],
          ['Could I have some coffee?', '커피 좀 마실 수 있을까요?', 'can보다 정중한 요청'],
          ['8 Things That Could Fall off Your Car Tomorrow', '내일 당신 차에서 떨어질 수도 있는 8가지', 'can보다 불확실한 가능성'],
          ["Jane could arrive at 6 o'clock.", '제인은 6시에 도착할 수도 있어.', 'can보다 불확실한 추측'],
          ["She can't have been fired.", '그녀가 해고됐을 리 없어.', "can't be fired의 과거 추측 → can't have been p.p."],
        ],
      },
    ],
    native: [
      '회사에서 부탁할 땐 Can you보다 **Could you**가 기본이에요.',
      '"You should ~"는 조언이지만 윗사람에겐 강하게 들릴 수 있어요. "You might want to ~" (~하시는 게 좋을 수도 있어요)가 훨씬 부드러워요.',
      '과거 후회: **should have p.p.** (했어야 했는데) → "I should\'ve checked it."',
    ],
    mistakes: [
      ['I must to go now.', 'I have to go now.', '조동사 뒤엔 to 없이 동사원형. 대화에선 have to가 자연스러워요.'],
      ["You mustn't come tomorrow. (안 와도 된다는 뜻으로)", "You don't have to come tomorrow.", 'must not = 금지, don\'t have to = 불필요'],
      ['Can I ask you a favor? (윗사람에게)', 'Could I ask you a favor?', '틀린 건 아니지만 could가 더 공손해요.'],
      ['He must be at home yesterday.', 'He must have been at home yesterday.', '과거 추측은 조동사 + have p.p.'],
    ],
  },

  {
    id: 'to-ing',
    title: 'to부정사 · 동명사',
    sub: 'to부정사 3가지 용법 · 의미상 주어 · to vs -ing · V-ing 세 갈래',
    summary: 'to는 "앞으로 할 일", -ing는 "이미 하고 있거나 해 본 일"의 느낌이에요.',
    basics: [
      '**to부정사** = to + 동사원형. 품사가 정해져 있지 않아서 문장 속 **역할(명사·형용사·부사)**로 판단해요.',
      '한 줄 요약: **명사** "~하는 것" / **형용사** 명사 (to R) "~할" / **부사** "~하기 위해서", 결과',
      '동사 뒤에 또 동사가 올 땐 **to + 동사원형** 또는 **-ing** 모양으로 바꿔요.',
      '어떤 동사는 to만, 어떤 동사는 -ing만 받아요. 외울 땐 **느낌**으로 묶으면 쉬워요.',
      '**to**: 앞으로 향하는 느낌 (원하다, 계획하다, 결정하다) / **-ing**: 이미 있는 일 (즐기다, 끝내다, 피하다)',
    ],
    sections: [
      {
        title: 'to부정사의 세 가지 용법',
        points: [
          '**명사적** — 주어 "~것은, ~기는" / 목적어 "~것을, ~기를" / 보어 "~것이다, ~기이다"',
          '**형용사적** — 명사 수식 "~하는, ~할" / be to 용법(예정·의무·가능·운명·의도)',
          '**부사적 ★** — 목적 "~하기 위해서" / 형용사 수식 "~하기에" / 감정의 원인 "~해서" / 판단의 근거 "~하다니" / 결과 "그래서 ~가 되었다"',
          '부사는 주로 원인·이유·목적·결과를 나타내요. 그래서 to부정사의 부사적 용법도 원인, 목적, 결과의 뜻이 돼요.',
        ],
        examples: [
          ['To be honest is important to be a teacher.', '교사가 되려면 정직한 것이 중요하다.', "To be honest = 주어(명사적) / to be a teacher = 목적(부사적). 대화에선 It's important to be honest if you want to be a teacher."],
          ['She is kind to help the old man.', '할아버지를 돕다니 그녀는 친절하다.', '판단의 근거 "~하다니" (부사적)'],
          ['They need a house to live in.', '그들은 살 집이 필요하다.', 'a house를 뒤에서 꾸밈 "~할" (형용사적)'],
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
          'to부정사의 주어(행동하는 사람)가 따로 있으면 to 앞에 **for + 목적격**을 붙여요.',
          '단, **kind, nice, sweet, smart, rude**처럼 사람의 성품을 말하는 형용사 뒤엔 **of + 목적격**',
        ],
        examples: [
          ['He studied hard in order to pass the exam.', '그는 시험에 붙으려고 열심히 공부했다.'],
          ['For us to increase sales, we must make new advertisements.', '매출을 올리려면 우리는 새 광고를 만들어야 한다.', 'for us = 늘리는 주체'],
          ["It's hard for me to wake up early.", '나는 일찍 일어나기가 힘들어.'],
          ["It's kind of you to help me.", '도와주시다니 친절하시네요.', '성품 형용사 → of'],
        ],
      },
      {
        title: 'to만 받는 동사 — 미래·의지',
        points: [
          '★ "원하다" 계열은 to부정사: **want, need, wish, hope, desire, expect, would like**',
          'plan, decide, promise, agree, refuse도 to만 받아요.',
        ],
        examples: [
          ['I decided to quit my job.', '회사를 그만두기로 했어.'],
          ["I'd like to book a table.", '자리 예약하고 싶어요.'],
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
          '**동명사(-ing)**: 동사보다 **먼저** 일어났거나 **동시에** 일어나는 일, **실제로** 일어난 일',
          '**to부정사**: 동사보다 **나중에(미래)** 일어날 일, **추상적이거나 가정적인** 일',
        ],
        examples: [
          ['I miss talking with my grandmother.', '할머니랑 이야기하던 게 그리워.', '그리워하기 전에 이미 한 일 → -ing'],
          ['Mr. and Mrs. Johnson have decided to have a baby.', '존슨 부부는 아이를 갖기로 했다.', '결정한 뒤에 할 일 → to'],
          ['The entrepreneur seems to have money to burn.', '그 사업가는 돈이 남아도는 것 같다.', '추상적인 일 → to'],
        ],
      },
      {
        title: '둘 다 되는데 뜻이 달라지는 동사',
        points: [
          '**stop**: stop smoking (담배를 끊다) / stop to smoke (담배 피우려고 멈추다)',
          '**remember / forget**: + to (앞으로 할 일, 또는 잊어서 실제로 안 한 일) / + -ing (과거에 실제로 한 일)',
          '**regret**: + -ing (~한 것을 후회하다) / + to (~하게 되어 유감이다)',
          '**try**: try to (애써 해 보다) / try -ing (시험 삼아 해 보다)',
        ],
        examples: [
          ['Remember to lock the door.', '문 잠그는 거 잊지 마.', '앞으로 할 일'],
          ['I remember locking the door.', '문 잠근 거 기억나.', '이미 한 일'],
          ['Try restarting your computer.', '컴퓨터 재부팅 한번 해 봐.'],
          ['I regret telling him the secret.', '그에게 비밀을 말한 걸 후회해.', '이미 한 일 → -ing'],
          ['We regret to inform you that the event has been canceled.', '행사가 취소되었음을 알려 드리게 되어 유감입니다.', '공지·메일 단골 표현 → to'],
        ],
      },
      {
        title: 'V-ing 세 갈래: 동명사 · 현재분사 · 분사구문',
        points: [
          '**동명사** = 명사 "~것, ~기" → 주어·목적어·보어 자리',
          '**현재분사** = 형용사 "~하는" → 명사를 꾸미거나 보어',
          '**분사구문** = 부사 "~하면서, ~해서" → 문장 전체를 꾸밈 (분사 · 분사구문에서 자세히)',
        ],
        examples: [
          ['Swimming is good exercise.', '수영은 좋은 운동이다.', '동명사 (주어)'],
          ['Look at the boy swimming in the pool.', '수영장에서 수영하는 소년을 봐.', '현재분사 (boy를 꾸밈)'],
          ['Walking home, I met Tom.', '집에 걸어가다가 톰을 만났다.', '분사구문 (~하면서)'],
        ],
      },
    ],
    native: [
      '"Thanks for -ing"(~해 줘서 고마워), "How about -ing?"(~하는 거 어때?)처럼 전치사 뒤는 항상 -ing예요.',
      '메일 끝 "I look forward to hearing from you."는 to 뒤 -ing의 대표 예문이에요.',
    ],
    mistakes: [
      ['I enjoy to watch movies.', 'I enjoy watching movies.', 'enjoy는 -ing만'],
      ['I look forward to see you.', 'I look forward to seeing you.', '여기 to는 전치사 → -ing'],
      ['I want going home.', 'I want to go home.', 'want는 to만'],
      ['I went to the store for buying milk.', 'I went to the store to buy milk.', '행동의 목적엔 for -ing ✗ → to부정사'],
      ["It's kind for you to help me.", "It's kind of you to help me.", '성품 형용사 뒤 의미상 주어는 of'],
      ['I regret to tell him the secret. (말한 걸 후회)', 'I regret telling him the secret.', '이미 한 일을 후회하면 -ing'],
    ],
  },

  {
    id: 'participle',
    title: '분사 · 분사구문',
    sub: '-ing / p.p. 형용사 · 접속사 빼고 줄이기',
    summary: '분사는 형용사(명사 꾸미기), 분사구문은 부사절을 짧게 줄인 거예요.',
    basics: [
      '**분사 = 형용사** 역할. 명사를 꾸미거나 보어가 돼요.',
      '**현재분사(V-ing)** = 능동 "~하는" / **과거분사(p.p.)** = 수동·완료 "~된, ~해진"',
      '**분사구문** = 부사절에서 **접속사와 주어를 빼고** 동사를 -ing로 바꾼 것. -ing로 바꿨다는 건 절을 구로 줄였다는 표시예요.',
    ],
    sections: [
      {
        title: '현재분사 vs 과거분사',
        points: [
          '꾸미는 명사가 **직접 하면** -ing, **당하거나 이미 된 상태면** p.p.',
          'a rising sun (떠오르는 해) / fallen leaves (떨어진 낙엽) → 둘 다 명사를 꾸미는 형용사',
          '분사에 다른 말이 붙어 길어지면 명사 **뒤에서** 꾸며요: the boy crying in the park',
        ],
        examples: [
          ['I saw the boy crying in the park.', '공원에서 울고 있는 소년을 봤다.', '소년이 직접 운다(능동) → crying'],
          ["The car parked here is my father's.", '여기 주차된 차는 우리 아빠 차야.', '차는 주차되는 쪽(수동) → parked'],
          ['The movie was boring, so I was bored.', '영화가 지루해서 나는 지루했다.', '감정을 주면 -ing, 느끼면 p.p.'],
        ],
      },
      {
        title: '분사구문 만들기',
        points: [
          '① 부사절의 **접속사** 빼기 → ② 주절과 같은 **주어** 빼기 → ③ 동사를 **-ing**로',
          '[접속사 + S + V], S + V → **V-ing ~, S + V**',
          'be동사는 Being이 되고, **Being은 생략**할 수 있어요. 그래서 수동은 (being) p.p. → p.p.만 남아요.',
        ],
        examples: [
          ['When I walked home, I met Tom. → Walking home, I met Tom.', '집에 걸어가다가 톰을 만났다.'],
          ['As she was left alone, she began to cry. → (Being) Left alone, she began to cry.', '혼자 남겨지자 그녀는 울기 시작했다.', 'was left → being left → being 생략 → left'],
        ],
      },
      {
        title: '형태로 보는 시제와 태',
        points: [
          '**-ing** — 주절과 같은 시제, 능동',
          '**having p.p.** — 주절보다 앞선 일, 능동',
          '**(being) p.p.** — 주절과 같은 시제, 수동',
          '**having been p.p.** — 주절보다 앞선 일, 수동',
        ],
        examples: [
          ['Having finished the report, I went home.', '보고서를 다 끝내고 나서 집에 갔다.', '끝낸 게 먼저 → having p.p.'],
        ],
      },
      {
        title: '주어가 다르면 주어를 남겨요',
        points: ['부사절과 주절의 주어가 다르면, 분사구문 앞에 그 주어를 그대로 둬요.'],
        examples: [
          ['Because the weather was nice, I went on a picnic. → The weather being nice, I went on a picnic.', '날씨가 좋아서 소풍을 갔다.'],
        ],
      },
      {
        title: '분사구문 해석 — 4가지',
        points: [
          '**시간**: ~할 때, ~하면서 (when, while, after)',
          '**원인**: ~해서, ~여서 (as, since, because)',
          '**조건**: ~라면, ~한다면 (if)',
          '**양보**: ~이긴 하지만 (although, though)',
          '문맥에 맞는 접속사를 하나씩 넣어 보며 읽으면 돼요.',
        ],
      },
      {
        title: '문제 유형: To be vs Being',
        points: [
          '빈칸 뒤에 콤마 + 완전한 문장(주절)이 오면, 빈칸은 주절을 꾸미는 **분사구문(Being)** 자리예요.',
          '**To be**는 "~하기 위해서"(목적)라서 뜻이 안 맞으면 오답이에요.',
        ],
        examples: [
          ["Being the head chef at Marlena's, Roy Salazar has complete control over the menus.", '말레나 식당의 수석 셰프라서 로이 살라자르는 메뉴를 전부 책임진다.', 'To be(~하기 위해서) ✗ / Being(~이므로) ✓'],
        ],
      },
    ],
    native: [
      '분사구문은 글(보고서, 기사, 소설)에서 많이 써요. 대화에선 접속사를 살려 말하는 게 더 자연스러워요: "When I was walking home, I met Tom."',
      '"Generally speaking", "Judging from ~", "Considering ~" 같은 덩어리 분사구문은 회화에서도 자주 써요.',
    ],
    mistakes: [
      ['The news was very shocked.', 'The news was very shocking.', '뉴스가 충격을 줌 → -ing'],
      ['The car parking here is mine.', 'The car parked here is mine.', '차는 주차되는 쪽 → p.p.'],
      ['Walking home, the rain started.', 'Walking home, I got caught in the rain.', '분사구문의 주어 = 주절의 주어. 비가 걸어간 게 아니에요.'],
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
        ],
        examples: [
          ['She wanted me to build a house.', '그녀는 내가 집을 짓기를 원했다.', '일반동사 → to V'],
          ['She had me build a house.', '그녀는 나에게 집을 짓게 했다.', '사역동사 → 동사원형'],
          ['She saw me building a house.', '그녀는 내가 집을 짓고 있는 걸 봤다.', '지각동사 → -ing (하고 있는 중)'],
          ['She helped me (to) build a house.', '그녀는 내가 집 짓는 걸 도왔다.', 'help → 동사원형 / to V'],
          ['She got me to build a house.', '그녀는 나에게 집을 짓게 했다.', 'get → to V'],
          ['She had a house built.', '그녀는 집을 짓게 했다.', '집은 지어지는 쪽 → p.p.'],
        ],
      },
      {
        title: '명사 · 형용사 보어 — 목적어의 상태',
        points: [
          '**keep · find · consider · call · make · leave · think · believe** + 목적어 + 명사/형용사',
          '명사가 보어면 **목적어 = 보어 명사**여야 해요.',
          'think / consider 뒤의 (to be)는 자주 생략해요: She thought me (to be) happy.',
          '**hold + 목적어 + accountable / responsible for** = (목적어에게) ~의 책임을 묻다',
        ],
        examples: [
          ['Please keep the file confidential.', '그 파일은 기밀로 유지해 주세요.', 'keep + 목적어 + 형용사'],
          ['Mr. Jason considers the project a success.', '제이슨 씨는 그 프로젝트를 성공이라고 여긴다.', 'the project = a success'],
          ['I found the book interesting.', '그 책 재밌더라.', 'find + 목적어 + 형용사 = ~라고 알게 되다'],
          ['They hold him responsible for the mistake.', '그들은 그 실수의 책임을 그에게 묻는다.'],
        ],
      },
      {
        title: '가목적어 it — 목적어가 길 때',
        points: [
          '5형식 목적어 자리에는 **that절 · to부정사구 · what절** 같은 긴 명사 덩어리를 바로 못 써요.',
          '그 자리에 **it(가목적어)**을 두고, 진짜 목적어(진목적어)는 **맨 뒤로** 보내요.',
          '모양: **S + 동사(believe, make, consider, find, think) + it + 목적격보어 + 진목적어**',
          'that절은 **3형식** 목적어로는 바로 써도 돼요 (I think that ~). 5형식 목적어, 4형식 간접목적어 자리는 ✗',
        ],
        examples: [
          ['I find it hard to wake up early.', '일찍 일어나는 게 힘들어.', 'it = to wake up early'],
          ['She made it clear that she was not interested.', '그녀는 관심 없다는 걸 분명히 했다.', 'it = that절'],
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
    sub: '원어민은 왜, 언제 쓸까',
    summary: '수동태는 능동태를 뒤집은 공식이 아니라, "누가 했는지가 중요하지 않을 때" 일부러 고르는 문장이에요.',
    basics: [
      '모양: **be + 과거분사(p.p.)** → "주어가 ~되다/당하다"',
      '능동태가 기본이에요. 수동태는 **필요할 때만** 써요.',
      'by + 행위자는 대부분 생략해요. 누가 했는지가 중요하면 애초에 능동태로 쓰니까요.',
    ],
    sections: [
      {
        title: '시제별 수동태 모양',
        points: [
          '**단순**: be + p.p. (is / was / will be + p.p.)',
          '**진행**: be being p.p. → The road is being repaired. (수리 중이다)',
          '**완료**: have been p.p. → The report has been sent. (보내졌다)',
          '능동태: 주어가 행위의 **주체** / 수동태: 주어가 행위의 **대상**',
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
        title: 'get + p.p. — 대화용 수동태',
        points: [
          '일이 "벌어졌다"는 변화·사건을 말할 땐 be 대신 **get**을 많이 써요.',
        ],
        examples: [
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
          '**keep · find · consider · call · make · leave** + 목적어 + 명사/형용사 → be kept / found / considered ... + 보어',
          '목적격보어가 **동사원형**(사역·지각)이면 수동태에서 **to부정사**로 바뀌어요.',
        ],
        examples: [
          ['Mr. Jason considers the project a success. → The project is considered a success.', '그 프로젝트는 성공으로 여겨진다.'],
          ['The company should keep the file confidential. → The file should be kept confidential.', '그 파일은 기밀로 유지돼야 한다.'],
          ['I saw Tom run away. → Tom was seen to run away.', '톰이 도망가는 게 보였다.', '동사원형 → to부정사'],
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
      '회사 메일에서 실수를 부드럽게 말할 때도 수동태를 써요: "The file was sent to the wrong address." (누가 보냈는지 굳이 안 밝힘)',
    ],
    mistakes: [
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
    basics: [
      '관계대명사 = **접속사 + 대명사**. 두 문장을 붙이는 본드예요: I have a friend. + She lives in London. → I have a friend **who** lives in London.',
      '**선행사(명사) + 관계대명사 + 불완전한 문장** = 앞 명사를 꾸미는 **형용사절**이에요.',
      '"불완전한 문장" = 주어나 목적어가 하나 빠진 문장. 빠진 자리를 관계대명사가 대신해요.',
      '사람 → **who**, 사물 → **which**, 둘 다 → **that** (대화에선 that이 제일 흔해요), 소유 → **whose**',
      '**what** = the thing which (~하는 것). 앞에 명사(선행사)가 없어요. → 형용사절이 아니라 **명사절**이에요.',
    ],
    sections: [
      {
        title: '주격 vs 목적격 — 빠진 자리 찾기',
        points: [
          '관계대명사 바로 뒤에 **동사**가 오면 → 주어가 빠진 것 (**주격**)',
          '관계대명사 뒤에 **주어 + 동사**가 오면 → 목적어가 빠진 것 (**목적격**)',
        ],
        examples: [
          ['The box that is on the table is mine.', '탁자 위에 있는 상자는 내 거야.', 'that = 주어 (that is on the table)'],
          ['There is a girl that I met.', '내가 만났던 여자애가 있어.', 'that = met의 목적어'],
          ['I have a friend whose father is a pilot.', '아빠가 조종사인 친구가 있어.', 'whose + 명사 = 누구의'],
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
          '콤마 뒤 관계사절은 **추가 정보**라서 빼도 문장의 뜻이 안 바뀌어요.',
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
          '**what + 명사**: ~하는 모든 (얼마 안 되지만 있는 것 전부)',
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
          '관계부사 뒤에는 **완전한 문장**이 와요. (관계대명사 뒤는 불완전)',
          'where = 장소, when = 때, why = 이유, how = 방법 (the way 와 how는 둘 중 하나만)',
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
          '**관계부사**: "~할 때, ~하는 장소, ~하는 이유, ~하는 방법" → 앞 명사를 꾸미는 형용사절 (또는 부사절)',
          '**의문부사**: "언제, 어디서, 왜, 어떻게" → 간접의문문으로 항상 **명사절**',
          '모양이 같아서 문장만 보면 헷갈려요. **우리말 해석**이 자연스러운 쪽으로 구분해요.',
        ],
        examples: [
          ["I don't know when we'll get together.", '우리가 언제 모일지 모르겠어.', '의문부사 "언제" (명사절)'],
          ["Tell me the time when we'll get together.", '우리가 모일 시간을 알려 줘.', '관계부사 "~할 때" (the time을 꾸밈)'],
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
        ],
        examples: [
          ['You can invite whoever you want.', '네가 원하는 누구든 초대해도 돼.', '명사절 (목적어)'],
          ['Whatever you do, do your best.', '무엇을 하든 최선을 다해.', '부사절'],
          ['Call me whenever you need help.', '도움이 필요할 땐 언제든 전화해.'],
        ],
      },
      {
        title: 'that의 쓰임 총정리',
        points: [
          '① **관계대명사**: the book that I read (앞 명사 꾸밈, 뒤 불완전)',
          '② **명사절 접속사**: I think that ~ (~라는 것, 뒤 완전)',
          '③ **동격**: the fact that ~ (앞 명사 = 뒤 내용, 뒤 완전)',
          '④ **부사절 접속사**: so that(~하도록), now that(~이니까), in that(~라는 점에서), so ~ that(너무 ~해서)',
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
    basics: [
      '"만약 ~라면"에는 두 종류가 있어요. **실제로 일어날 수 있는 일**(조건문)과 **사실이 아닌 상상**(가정법).',
      '상상일 때는 시제를 **한 칸 과거로** 내려서 "이건 현실이 아니야"라는 거리감을 줘요.',
      '지금 사실과 반대 → **과거형** (If I had…, I would…)',
      '과거 사실과 반대 → **과거완료형** (If I had done…, I would have done…)',
      '시제는 과거형이지만 뜻은 **지금/과거의 반대 상황**이라는 점만 기억하면 돼요.',
    ],
    sections: [
      {
        title: '① 현실 조건문 — 진짜 일어날 수 있는 일',
        points: [
          '**If + 현재형, will + 동사원형**',
          'if절에는 미래라도 **will을 쓰지 않아요.** (If it will rain ✗)',
        ],
        examples: [
          ["If it rains tomorrow, I'll stay home.", '내일 비 오면 집에 있을 거야.', '비가 올 수도 있음'],
          ['If you heat ice, it melts.', '얼음을 데우면 녹는다.', '항상 그런 사실'],
        ],
      },
      {
        title: '② 가정법 과거 — 지금 사실과 반대',
        points: [
          '**If + 과거형, would/could + 동사원형**',
          'be동사는 주어와 상관없이 **were**가 기본이에요. (If I were you)',
        ],
        examples: [
          ['If I had more time, I would travel more.', '시간이 더 있으면 여행을 더 할 텐데.', '실제론 시간이 없음'],
          ["If I were you, I'd take the job.", '내가 너라면 그 일 할 거야.', '조언할 때 최고로 많이 쓰는 문장'],
          ['If I knew his number, I could call him.', '번호를 알면 전화할 수 있을 텐데.', '실제론 모름'],
        ],
      },
      {
        title: '③ 가정법 과거완료 — 과거 사실과 반대 (후회)',
        points: [
          '**If + had p.p., would/could have p.p.**',
          '이미 지나간 일에 대한 후회나 아쉬움을 말할 때 써요.',
        ],
        examples: [
          ["If I had known, I would have told you.", '알았더라면 너한테 말했을 텐데.', '실제론 몰랐음'],
          ['If we had left earlier, we could have caught the train.', '더 일찍 나왔으면 기차를 탈 수 있었을 텐데.'],
        ],
      },
      {
        title: '④ 혼합 가정법 — 과거의 일이 지금에 영향',
        points: [
          '**If + had p.p.(과거), would + 동사원형(지금)**',
        ],
        examples: [
          ['If I had studied harder, I would be a doctor now.', '그때 더 열심히 공부했더라면 지금 의사일 텐데.'],
        ],
      },
      {
        title: '⑤ I wish / If only / as if',
        points: [
          '**I wish + 과거형** → 지금 이랬으면 좋겠다 / **I wish + had p.p.** → 그때 그랬으면 좋았을 텐데',
          '**If only** 는 I wish 보다 더 간절한 느낌',
          '**as if + 과거형** → 실제로는 아닌데 마치 ~인 것처럼',
          "**It's time + 과거형** → 진작 했어야 할 시간이야 (It's time we left.)",
        ],
        examples: [
          ['I wish I knew the answer.', '답을 알면 좋을 텐데.'],
          ['I wish I had gone to the party.', '그 파티 갈 걸 그랬어.'],
          ['He talks as if he knew everything.', '그는 마치 다 아는 것처럼 말한다.'],
          ["It's about time we went home.", '이제 진짜 집에 갈 시간이야.'],
        ],
      },
      {
        title: '⑥ if 없이 쓰는 가정 — 업무 메일에서 자주',
        points: [
          '**Should you ~** = If you should ~ (혹시 ~하시면) → 메일 끝인사의 단골',
          '**Had I known** = If I had known (격식체)',
          '**Without / But for ~** = ~이 없다면/없었다면',
        ],
        examples: [
          ['Should you have any questions, please let me know.', '궁금한 점 있으시면 말씀해 주세요.'],
          ['Without your help, I couldn\'t have finished it.', '네 도움이 없었으면 못 끝냈을 거야.'],
        ],
      },
    ],
    native: [
      '조언은 거의 항상 "**If I were you, I\'d ~**". 회화에선 "If I was you"도 흔히 들려요. (글에선 were가 안전)',
      '말할 땐 축약해요: I would → **I\'d**, would have → **would\'ve** (발음은 "우더브/woulda").',
      '가정법의 "거리감"은 공손함에도 쓰여요. "**I was wondering if** you could help me." / "**Would** you mind…?" / "**I\'d appreciate it if** you could…" — 현재형보다 훨씬 부드러워요.',
      '후회 말할 때 짧게: "**I should\'ve** told you." (말했어야 했는데) / "**You could\'ve** asked me." (나한테 물어봐도 됐잖아)',
    ],
    mistakes: [
      ["If it will rain, I'll stay home.", "If it rains, I'll stay home.", 'if절에는 미래도 현재형으로.'],
      ['If I would have known, I would have told you.', 'If I had known, I would have told you.', 'if절에는 would가 아니라 had p.p.'],
      ['I wish I can speak English fluently.', 'I wish I could speak English fluently.', 'I wish 뒤엔 한 칸 과거로 (can → could).'],
      ['If I am you, I will quit.', "If I were you, I'd quit.", '상상이니까 과거형 + would.'],
      ['I would of called you.', "I would've (would have) called you.", "would've 발음 때문에 생긴 철자 실수. of 아니에요."],
    ],
  },
];
