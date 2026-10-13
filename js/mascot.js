// 대충 그린 듯한 무표정 강아지 마스코트 (SVG)
// variant: 'basic' | 'think' | 'sad' | 'good' | 'dots'
window.Mascot = (function () {
  let uid = 0;

  return function (variant, size) {
    variant = variant || 'basic';
    size = size || 96;
    const id = `rough${++uid}`;
    const s = 'stroke="#1a1a1a" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"';
    const label = (txt, x, y, fs) =>
      `<text x="${x}" y="${y}" font-family="'Nanum Pen Script', cursive" font-size="${fs || 26}" fill="#1a1a1a">${txt}</text>`;

    // 무표정 점 눈 + 작은 입
    let face = `<circle cx="47" cy="60" r="2.6" fill="#1a1a1a"/><circle cx="75" cy="60" r="2.6" fill="#1a1a1a"/>
      <path d="M58 70 Q60 72 61 70 Q62 72 64 70" fill="none" ${s} stroke-width="2"/>`;
    let extra = '';
    let arms = `<path d="M42 100 Q45 108 52 106" fill="none" ${s}/><path d="M81 100 Q78 108 71 106" fill="none" ${s}/>`;

    if (variant === 'think') {
      extra = label('흠.', 88, 22);
      arms = `<path d="M42 100 Q45 108 52 106" fill="none" ${s}/><path d="M80 98 Q74 90 64 80" fill="none" ${s}/>`;
    } else if (variant === 'dots') {
      face = `<circle cx="47" cy="61" r="2.4" fill="#1a1a1a"/><circle cx="75" cy="61" r="2.4" fill="#1a1a1a"/>
        <path d="M57 72 L65 72" ${s} stroke-width="2"/>`;
      extra = label('...', 92, 70, 30);
    } else if (variant === 'sad') {
      face = `<path d="M41 57 Q46 55 51 52" fill="none" ${s} stroke-width="2"/><path d="M81 57 Q76 55 71 52" fill="none" ${s} stroke-width="2"/>
        <circle cx="47" cy="61" r="2.6" fill="#1a1a1a"/><circle cx="75" cy="61" r="2.6" fill="#1a1a1a"/>
        <path d="M55 76 Q60 70 67 76" fill="none" ${s} stroke-width="2"/>`;
      extra = `<path d="M46 66 Q44 80 47 92 M76 66 Q78 80 75 92" stroke="#a9cbe8" stroke-width="3.2" stroke-linecap="round" fill="none"/>
        <path d="M24 138 Q40 132 61 136 Q84 132 100 138" stroke="#a9cbe8" stroke-width="3.5" stroke-linecap="round" fill="none"/>
        ${label('흑...', 4, 22, 24)}`;
    } else if (variant === 'good') {
      extra = `${label('굿.', 90, 24)}
        <path d="M86 104 Q84 94 90 91 Q91 84 95 85 Q97 89 95 94 L103 94 Q107 95 105 99 Q107 103 103 105 Q104 109 100 109 L88 109 Z" fill="#fff" ${s} stroke-width="2.3"/>
        <path d="M108 82 L113 77 M110 90 L117 89" ${s} stroke-width="2"/>`;
      arms = `<path d="M42 100 Q45 108 52 106" fill="none" ${s}/><path d="M80 100 Q83 100 87 100" fill="none" ${s}/>`;
    }

    return `<svg class="mascot" width="${size}" height="${Math.round(size * 1.17)}" viewBox="0 0 122 142" aria-hidden="true">
      <defs><filter id="${id}" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="${uid % 7}"/>
        <feDisplacementMap in="SourceGraphic" scale="2.6"/>
      </filter></defs>
      <g filter="url(#${id})">
        <path d="M40 88 Q36 112 39 131 L54 131 Q56 124 61 124 Q66 124 68 131 L83 131 Q86 112 82 88 Z" fill="#fff" ${s}/>
        <path d="M83 120 Q92 121 95 112" fill="none" ${s}/>
        ${arms}
        <path d="M32 34 Q60 25 91 33 Q97 58 92 87 Q60 94 31 87 Q26 60 32 34 Z" fill="#fff" ${s}/>
        <path d="M36 35 Q20 30 15 40 Q13 55 21 60 Q27 58 30 47" fill="#fff" ${s}/>
        <path d="M87 35 Q103 30 108 40 Q110 55 102 60 Q96 58 93 47" fill="#fff" ${s}/>
        ${face}
        <path d="M59.5 66.5 L62.5 66.5" ${s} stroke-width="3"/>
        ${extra}
      </g>
    </svg>`;
  };
})();
