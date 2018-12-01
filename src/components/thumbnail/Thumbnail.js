const Thumbnail = ({ src, title }, className) => (
  `<figure class="${className}">
     <img src=${src} alt=${title} />
     <figcaption>${title}</figcaption>
  </figure>`
);

export default Thumbnail;
