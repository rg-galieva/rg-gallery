const Thumbnail = ({ src, title }, className) => (
  `<div class="${className}">
     <img src=${src} alt=${title} />
  </div>`
);

export default Thumbnail;
