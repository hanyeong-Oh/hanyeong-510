// 가나디 스티커 이미지 (images/ganadi/*.png)
// variant: basic | think | good | sad | dots | music | study | cmon | what | sweat
window.Mascot = function (variant, size) {
  const name = variant || 'basic';
  const height = Math.round((size || 96) * 1.17);
  return `<img class="mascot" src="images/ganadi/${name}.png" alt="" style="height:${height}px;width:auto" draggable="false">`;
};
