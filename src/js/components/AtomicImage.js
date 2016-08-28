import React, {Component} from 'react';

export default class AtomicImage extends Component {

	render() {
		const {entityData} = this.props;
		const {src, caption, alignment, width, height} = entityData;
		return(
			<img 
				src={src} 
				alt={caption}
				style={{
					width,
					height,
					float: alignment === 'center' ? 'none' : alignment, 
					margin: alignment === 'center' ? '0 auto' : ''
				}}
			/>
		);
	}
}
