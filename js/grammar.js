// 문법 개념 노트 — 카테고리별 기초 개념 · 핵심 정리 · 원어민 감각 · 자주 하는 실수
// 문장 안의 **굵게** 는 화면에서 굵은 글씨로 보입니다.
// examples: [영어, 한국어 해석, (선택) 한 줄 설명]   mistakes: [틀린 문장, 맞는 문장, 이유]
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
        title: '수동태가 안 되는 자동사',
        points: [
          '자동사는 목적어가 없으니 수동태로 못 바꿔요.',
          '**happen, occur, take place, appear, disappear, exist, arrive, consist of, belong to, result in/from**',
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
