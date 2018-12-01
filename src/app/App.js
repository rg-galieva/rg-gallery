import Gallery from '../components/gallery/Gallery';
import './app.css';

window.onerror = (message, url, line, col, error) => {
  console.error('[App Uncaught Global Error: ]', `${message}\n At ${line}:${col} of ${url}`, error);
};

(function App() {
  try {
    const gallery = Gallery('gallery');
    gallery.init();
  } catch (e) {
    console.error('[App Global Error: ]', e);
  }
}());
