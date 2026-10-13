// 가나디 스티커 이미지 (images/ganadi/*.svg — 선을 벡터로 따서 크게 봐도 선명함)
// variant: basic | think | good | sad | dots | music | study | cmon | what | sweat
window.Mascot = function (variant, size) {
  const name = variant || 'basic';
  const height = Math.round((size || 96) * 1.17);
  return `<img class="mascot" src="images/ganadi/${name}.svg" alt="" style="height:${height}px;width:auto" draggable="false">`;
};
