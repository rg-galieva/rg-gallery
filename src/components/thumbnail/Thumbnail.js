const Thumbnail = ({ id, src, title }, className) => (
  `<div class="${className}" data-id="${id}">
     <img src=${src} alt=${title} />
  </div>`
);

export default Thumbnail;
