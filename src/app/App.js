import Gallery from '../components/gallery/Gallery';
import Lightbox from '../components/lightbox/Lightbox';
import './app.css';

window.onerror = (message, url, line, col, error) => {
  console.error('[App Uncaught Global Error: ]', `${message}\n At ${line}:${col} of ${url}`, error);
};

(function App() {
  try {
    const gallery = Gallery('gallery', 'content');
    gallery.init();

    const lightbox = Lightbox('gallery');
    lightbox.init();
  } catch (e) {
    console.error('[App Global Error: ]', e);
  }
}());
