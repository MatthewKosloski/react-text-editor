import React, {Component} from 'react';
import ActionBar from './ActionBar';
import AtomicImage from './AtomicImage';
import {getImageWrapperStyle} from '../helpers';
import {Resizable} from 'react-resizable';

export default class ImageWrapper extends Component {

	constructor() {
		super();
		this.state = {
			hasLoaded: false,
			showDimensions: false,
			showActionBar: false,
			stateWidth: null,
			stateHeight: null
		};
		this.handleResize = this.handleResize.bind(this);
		this.handleImageLoad = this.handleImageLoad.bind(this);
		this.toggleDimensionsDisplay = this.toggleDimensionsDisplay.bind(this);
		this.showActionBar = this.showActionBar.bind(this);
		this.hideActionBar = this.hideActionBar.bind(this);
	}

	handleResize(event, {element, size}) {
		const {width, height} = size;
		this.setState({stateWidth: width, stateHeight: height});
		this.props.onResize(width, height);
	};

	handleImageLoad() {
		const {img} = this.refs;
		const {clientWidth, clientHeight} = img;
		this.setState({hasLoaded: true, stateWidth: clientWidth, stateHeight: clientHeight});
		this.props.onResize(clientWidth, clientHeight);
	}

	toggleDimensionsDisplay() {
		this.setState({showDimensions: !this.state.showDimensions});
	}

	showActionBar() {
		this.setState({showActionBar: true});
    }

    hideActionBar() {
		this.setState({showActionBar: false});
    }

	render() {
		const {onAlign, onResize, entityData} = this.props;
		const {src, caption, alignment, width, height} = entityData;
		const {hasLoaded, showDimensions, showActionBar, stateWidth, stateHeight} = this.state;
		let imgWrapperStyle = getImageWrapperStyle(alignment);
		const dimensionStyle = {
			position: 'absolute', top: '50%',
			left: '50%', backgroundColor: 'rgba(0, 0, 0, 0.7)',
    		padding: '7px 10px', fontSize: '13px',
    		fontFamily: 'sans-serif', color: '#fff',
			transform: 'translate(-50%, -50%)', borderRadius: '4px'
		}
		const editorImgStyle = {
			width: stateWidth,
			height: stateHeight
		}

		return(
			<div 
				className="image-wrapper" 
				style={imgWrapperStyle} 
				onMouseOver={this.showActionBar} 
				onMouseLeave={this.hideActionBar}>
					<div className="image-wrapper__inner">
						{showActionBar ? <ActionBar 
								onClickLeft={onAlign.bind(null, 'left')}
								onClickCenter={onAlign.bind(null, 'center')}
								onClickRight={onAlign.bind(null, 'right')}>
							</ActionBar>
						: false}
							<div style={{display: 'inline-block'}}>
								<Resizable 
									width={stateWidth}
									height={stateHeight} 
									onResize={this.handleResize}
									onResizeStart={this.toggleDimensionsDisplay}
									onResizeStop={this.toggleDimensionsDisplay} 
									lockAspectRatio={true}>
									<div style={editorImgStyle}>
										<img 
											ref="img" 
											src={src} 
											style={editorImgStyle} 
											alt={caption}
											onLoad={this.handleImageLoad}
										/>
										{hasLoaded && showDimensions ? 
											<span style={dimensionStyle}>
												{stateWidth.toFixed()} x {stateHeight.toFixed()}
											</span> 
										: false}
									</div>
								</Resizable>
							</div> 
					</div>
			</div>
		);
	}
}