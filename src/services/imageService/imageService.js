import imagesJson from '../../../assets/data/dogs';

/*
 If other categories are required, update a layout to support multiple sections.
 For this task we are working with dogs only.
 In a real app use fetch/axios with query params related to the image size determined by device.

 For this project there is no need of promises or try/catch.
 The goal was to make it look more real
*/
const fetchImagesForDogs = () => new Promise((resolve, reject) => {
  try {
    const images = imagesJson.dogs;

    // mock a response for 2000 images
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
