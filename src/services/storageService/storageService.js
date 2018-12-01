export const clearStorage = () => {
  window.localStorage.clear();
  window.sessionStorage.clear();
};

export const saveImages = (images) => {
  const savedImages = window.sessionStorage.getItem('images');

  if (!savedImages) {
    window.sessionStorage.setItem('images', images);
  } else {
    // ToDo: merge? Depends on images data format
  }
};
