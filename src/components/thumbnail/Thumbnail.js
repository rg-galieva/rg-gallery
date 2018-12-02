const Thumbnail = ({ id, src, title }, className) => (
  `<div class="${className}">
     <img src="${src}" alt="${title}" data-id="${id}"/>
  </div>`
);

export default Thumbnail;
