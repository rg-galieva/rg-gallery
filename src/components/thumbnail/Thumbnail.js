const Thumbnail = ({src, title}) => (
	`<figure>
			<img src=${src} alt=${title} />
                
			<figcaption>
				 ${title}
			</figcaption>
	</figure>`
);

export default Thumbnail;
