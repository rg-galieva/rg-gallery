import Gallery from '../components/gallery/Gallery';
import Lightbox from '../components/lightbox/Lightbox';
import { LIGHTBOX_DEFAULT_SETTINGS } from '../components/lightbox/lightbox.helper';
import { GALLERY_DEFAULT_SETTINGS } from '../components/gallery/gallery.helper';
import './app.css';

window.onerror = (message, url, line, col, error) => {
  console.error('[App Uncaught Global Error: ]', `${message}\n At ${line}:${col} of ${url}`, error);
};

(function App() {
  try {
    const gallery = Gallery(GALLERY_DEFAULT_SETTINGS);
    gallery.init();

    const lightbox = Lightbox(LIGHTBOX_DEFAULT_SETTINGS);
    lightbox.init();
  } catch (e) {
    console.error('[App Global Error: ]', e);
  }
}());
