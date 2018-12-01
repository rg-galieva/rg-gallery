import Gallery from './components/gallery/Gallery';

window.onerror = function (message, url, line, col, error) {
	console.error('[App Uncaught Global Error: ]', `${message}\n At ${line}:${col} of ${url}`, error);
};

(function () {
	try {
		console.info(["Hello world!"]);

		const gallery = Gallery('gallery');
		gallery.init();
	} catch (e) {

	}
})();
