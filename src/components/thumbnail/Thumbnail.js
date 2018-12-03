const Thumbnail = ({ id, src, title }) => (
  `<img src="${src}" alt="${title}" data-id="${id}"/>`
);

export default Thumbnail;
