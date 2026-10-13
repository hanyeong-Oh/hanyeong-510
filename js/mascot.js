// 손그림 느낌의 강아지 마스코트 (SVG)
// variant: 'basic' | 'happy' | 'sad' | 'think' | 'good'
window.Mascot = function (variant, size) {
  variant = variant || 'basic';
  size = size || 96;
  const ink = 'var(--ink, #222)';
  const s = `stroke="${ink}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"`;

  const eyes = {
    basic: '<circle cx="49" cy="57" r="3.2" fill="#222"/><circle cx="73" cy="57" r="3.2" fill="#222"/>',
    happy: `<path d="M44 58 Q49 52 54 58" fill="none" ${s}/><path d="M68 58 Q73 52 78 58" fill="none" ${s}/>`,
    sad: '<circle cx="49" cy="58" r="3" fill="#222"/><circle cx="73" cy="58" r="3" fill="#222"/>' +
      `<path d="M43 52 L53 48" fill="none" ${s} stroke-width="2"/><path d="M79 52 L69 48" fill="none" ${s} stroke-width="2"/>`,
    think: '<circle cx="51" cy="57" r="3" fill="#222"/><circle cx="75" cy="57" r="3" fill="#222"/>',
    good: '<circle cx="49" cy="57" r="3.2" fill="#222"/><circle cx="73" cy="57" r="3.2" fill="#222"/>',
  }[variant] || '';

  const extra = {
    happy: '<g fill="#222"><path d="M12 22 l0 -14 l9 -3 l0 14" stroke="#222" stroke-width="2.2" fill="none"/><ellipse cx="9.5" cy="22" rx="3.5" ry="2.6"/><ellipse cx="18.5" cy="19" rx="3.5" ry="2.6"/>' +
      '<path d="M104 30 l0 -11" stroke="#222" stroke-width="2.2"/><ellipse cx="101.5" cy="30" rx="3.5" ry="2.6"/><path d="M104 19 q5 2 6 7" stroke="#222" stroke-width="2.2" fill="none"/></g>' +
      '<ellipse cx="42" cy="68" rx="5" ry="3" fill="#f6b8b8" opacity=".8"/><ellipse cx="80" cy="68" rx="5" ry="3" fill="#f6b8b8" opacity=".8"/>',
    sad: '<path d="M47 63 q-3 7 0 10 q3 -3 0 -10z" fill="#a9cbe8"/><path d="M75 63 q-3 7 0 10 q3 -3 0 -10z" fill="#a9cbe8"/>' +
      '<path d="M30 136 q8 -4 16 0 M76 136 q8 -4 16 0" stroke="#a9cbe8" stroke-width="3" stroke-linecap="round" fill="none"/>',
    think: `<path d="M100 18 q6 -6 12 0 q0 6 -6 8 l0 4" fill="none" ${s} stroke-width="2.4"/><circle cx="106" cy="36" r="1.6" fill="#222"/>`,
    good: `<path d="M96 104 q-2 -10 4 -14 q2 -6 6 -4 q2 4 -1 10 l8 0 q4 1 2 6 q2 4 -2 6 q1 4 -3 5 l-12 0 z" fill="#fff" ${s} stroke-width="2.4"/>` +
      `<path d="M112 84 l6 -5 M114 92 l8 -1 M108 78 l2 -7" ${s} stroke-width="2"/>`,
  }[variant] || '';

  const mouth = variant === 'sad'
    ? `<path d="M56 74 Q61 70 66 74" fill="none" ${s} stroke-width="2.4"/>`
    : `<path d="M55 70 Q58 74 61 70 Q64 74 67 70" fill="none" ${s} stroke-width="2.4"/>`;

  const arms = variant === 'good'
    ? `<path d="M42 98 Q47 106 54 101" fill="none" ${s}/><path d="M80 96 Q88 100 96 100" fill="none" ${s}/>`
    : variant === 'happy'
      ? `<path d="M44 96 Q46 86 54 84" fill="none" ${s}/><path d="M78 96 Q76 86 68 84" fill="none" ${s}/>`
      : `<path d="M42 98 Q47 106 54 101" fill="none" ${s}/><path d="M80 98 Q75 106 68 101" fill="none" ${s}/>`;

  return `<svg class="mascot" width="${size}" height="${Math.round(size * 1.17)}" viewBox="0 0 122 142" aria-hidden="true">
    <path d="M39 86 Q34 112 38 130 Q47 135 55 131 Q57 123 61 123 Q65 123 67 131 Q75 135 84 130 Q88 112 83 86 Z" fill="#fff" ${s}/>
    <path d="M83 118 Q95 117 97 105" fill="none" ${s}/>
    ${arms}
    <path d="M31 32 Q61 21 92 31 Q100 60 93 85 Q61 95 30 85 Q22 59 31 32 Z" fill="#fff" ${s}/>
    <path d="M35 32 Q15 27 12 44 Q13 56 25 52 Q29 42 35 38" fill="#fff" ${s}/>
    <path d="M88 32 Q108 27 111 44 Q110 56 98 52 Q94 42 88 38" fill="#fff" ${s}/>
    ${eyes}
    <circle cx="61" cy="66" r="1.8" fill="#222"/>
    ${mouth}
    ${extra}
  </svg>`;
};

// 손그림 발바닥 아이콘
window.Paw = function (size) {
  size = size || 26;
  return `<svg class="paw" width="${size}" height="${size}" viewBox="0 0 32 32" aria-hidden="true" fill="#fff" stroke="#222" stroke-width="2.2">
    <ellipse cx="16" cy="21" rx="7.5" ry="6.5"/>
    <ellipse cx="6.5" cy="13" rx="3" ry="3.8" transform="rotate(-20 6.5 13)"/>
    <ellipse cx="12.5" cy="7.5" rx="3" ry="3.8"/>
    <ellipse cx="19.5" cy="7.5" rx="3" ry="3.8"/>
    <ellipse cx="25.5" cy="13" rx="3" ry="3.8" transform="rotate(20 25.5 13)"/>
  </svg>`;
};
