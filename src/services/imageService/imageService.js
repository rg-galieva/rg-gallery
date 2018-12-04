// ToDo: replace with loading by chunks
import imagesJson from '../../../assets/data/dogs';

/*
 ToDo: if other categories are required, update a layout to support multiple sections.
 For this task we are working with dogs only.
 In a real app use fetch/axios with query params related to the image size determined by device.
*/

const fetchImagesForDogs = () => new Promise((resolve, reject) => {
  try {
    const images = imagesJson.dogs;

    let overweightResponse = [...images];

    for (let i = 0; i < 200; i++) {
      overweightResponse = overweightResponse.concat(images);
    }

    resolve(overweightResponse);
  } catch (e) {
    reject(e);
  }
});


export {
  fetchImagesForDogs,
};
