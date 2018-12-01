// ToDo: replace with loading by chunks
import imagesJson from '../../../assets/data/dogs';

/*
 ToDo: if other categories are required, update a layout to support multiple sections.
 For this task we are working with dogs only.
*/

const fetchImagesForDogs = () => new Promise((resolve, reject) => {
  try {
    const images = imagesJson.dogs;
    resolve(images);
  } catch (e) {
    reject(e);
  }
});


export {
  fetchImagesForDogs,
};
