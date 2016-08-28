import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Entity} from 'draft-js';
import ImageWrapper from './ImageWrapper';
import AtomicImage from './AtomicImage';

export default class Atomic extends Component {

	constructor() {
		super();
		this.renderImageComponent = this.renderImageComponent.bind(this);
		this.onAlign = this.onAlign.bind(this);
		this.onResize = this.onResize.bind(this);
	}

	onAlign(alignment) {
		const {block} = this.props;
        const entityKey = block.getEntityAt(0);
        Entity.mergeData(entityKey, {alignment});
    }

    onResize(width, height) {
    	const {block} = this.props;
        const entityKey = block.getEntityAt(0);
    	Entity.mergeData(entityKey, {width, height});
    }

	renderImageComponent(entityData) {
		const {isEditor} = this.props.blockProps;
	    return isEditor ? (
	        <ImageWrapper 
	        	onAlign={this.onAlign}
	        	onResize={this.onResize} 
	        	entityData={entityData}> 
	        </ImageWrapper>
	        ) : (
	        <AtomicImage 
	        	entityData={entityData}
	        />
	    );
	}

    render() {
    	const {block} = this.props;
    	const entity = Entity.get(block.getEntityAt(0));
    	const type = entity.getType();
		switch(type) {
			case 'image': {
				return this.renderImageComponent(entity.getData());
			}
			default:
				return '';
		}
    }
}