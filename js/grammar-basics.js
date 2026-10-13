// 기본 문법 — Claude 작성 (노트가 생기면 js/grammar.js 쪽 노트 기반 카테고리로 옮겨서 다시 정리)
// 형식은 js/grammar.js 와 같아요.
window.GRAMMAR = (window.GRAMMAR || []).concat([
  {
    id: 'tense',
    title: '시제',
    sub: '현재 · 진행 · 현재완료 · 과거 · 미래',
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
    ],
  },

  {
    id: 'to-ing',
    title: 'to부정사 · 동명사',
    sub: '동사 뒤에 to + 동사? -ing?',
    summary: 'to는 "앞으로 할 일", -ing는 "이미 하고 있거나 해 본 일"의 느낌이에요.',
    basics: [
      '동사 뒤에 또 동사가 올 땐 **to + 동사원형** 또는 **-ing** 모양으로 바꿔요.',
      '어떤 동사는 to만, 어떤 동사는 -ing만 받아요. 외울 땐 **느낌**으로 묶으면 쉬워요.',
      '**to**: 앞으로 향하는 느낌 (원하다, 계획하다, 결정하다) / **-ing**: 이미 있는 일 (즐기다, 끝내다, 피하다)',
    ],
    sections: [
      {
        title: 'to만 받는 동사 — 미래·의지',
        points: ['want, hope, plan, decide, need, expect, promise, agree, refuse, would like'],
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
        title: '둘 다 되는데 뜻이 달라지는 동사',
        points: [
          '**stop**: stop smoking (담배를 끊다) / stop to smoke (담배 피우려고 멈추다)',
          '**remember / forget**: + to (할 일을) / + -ing (한 일을)',
          '**try**: try to (애써 해 보다) / try -ing (시험 삼아 해 보다)',
        ],
        examples: [
          ['Remember to lock the door.', '문 잠그는 거 잊지 마.', '앞으로 할 일'],
          ['I remember locking the door.', '문 잠근 거 기억나.', '이미 한 일'],
          ['Try restarting your computer.', '컴퓨터 재부팅 한번 해 봐.'],
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
    title: '전치사 in / on / at',
    sub: '시간 · 장소 · 기간',
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
        title: '헷갈리는 짝',
        points: [
          '**for vs during**: for + 시간 길이 (for 2 hours) / during + 일·행사 (during the meeting)',
          '**by vs until**: by = 그때까지 한 번 끝내기 (Send it by Friday) / until = 그때까지 계속 (I\'ll wait until 6)',
          '**in time vs on time**: in time = 늦지 않게 (여유 있게) / on time = 정각에',
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
    ],
  },

  {
    id: 'relative',
    title: '관계사',
    sub: 'who · which · that · what',
    summary: '명사 뒤에 문장을 붙여서 "어떤 명사인지" 설명하는 연결고리예요.',
    basics: [
      '두 문장을 하나로 잇는 방법: I have a friend. + She lives in London. → I have a friend **who** lives in London.',
      '사람 → **who**, 사물 → **which**, 둘 다 → **that** (대화에선 that이 제일 흔해요)',
      '**what** = the thing which (~하는 것). 앞에 명사가 없어요.',
    ],
    sections: [
      {
        title: '생략할 수 있을 때',
        points: [
          '관계사 뒤에 주어가 또 있으면(목적격) 생략 가능 → 원어민은 대부분 생략해요.',
          'This is the book (that) I bought yesterday.',
        ],
        examples: [
          ['The guy I met yesterday was really nice.', '어제 만난 그 남자 진짜 괜찮았어.', 'guy (who) I met → 생략'],
          ["That's not what I meant.", '내 말은 그게 아니야.', 'what = 내가 의미한 것'],
        ],
      },
      {
        title: '콤마(,) 있는 관계사 = 덧붙이는 설명',
        points: [
          'My brother, who lives in Busan, is a doctor. (형이 한 명뿐, 부산 산다는 건 추가 정보)',
          '콤마 뒤에는 **that을 못 써요.**',
        ],
      },
    ],
    native: [
      '말할 땐 which보다 **that**, 목적격 관계사는 **생략**이 기본이에요: "the movie I saw", "the guy I told you about".',
      '"That\'s what I\'m saying!" (내 말이 그거야!), "What I mean is ~" 처럼 what 표현은 회화 필수.',
    ],
    mistakes: [
      ['The man which I met was kind.', 'The man (who) I met was kind.', '사람엔 who/that'],
      ['This is the thing what I wanted.', 'This is what I wanted. / the thing (that) I wanted', 'what 앞엔 명사 안 씀'],
      ['My mom, that lives in Daegu, called me.', 'My mom, who lives in Daegu, called me.', '콤마 뒤 that ✗'],
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
].map((c) => Object.assign({ source: 'claude' }, c)));
