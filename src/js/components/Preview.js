import React, {Component} from 'react';
import {stateToHTML} from 'draft-js-export-html';
import Atomic from './Atomic';
import Link from '../decorators/Link';

import {
	Editor, 
	EditorState, 
	CompositeDecorator,
	convertFromRaw
} from 'draft-js';

class TextEditor extends React.Component {

	constructor(props) {
		super(props);
		this.decorator = new CompositeDecorator([Link]);
		this.state = {
			editorState: EditorState.createWithContent(convertFromRaw(props.rawContent), this.decorator),
			showHTML: false
		};
		this.toggleHTML = this.toggleHTML.bind(this);
	}

	componentWillReceiveProps(nextProps) {
        if (nextProps.rawContent) {
            const newContent = convertFromRaw(nextProps.rawContent);
            this.setState({
                editorState: EditorState.createWithContent(newContent, this.decorator)
            });
        }
    }

	blockStyleFn(block) {
		switch (block.getType()) {
			case 'blockquote': return 'text-editor__blockquote';
			default: return null;
		}
	}

	toggleHTML() {
		this.setState({showHTML: !this.state.showHTML});
	}

	blockRenderer(contentBlock) {
		if (contentBlock.getType() === 'atomic') {
			return {
				component: Atomic,
				editable: false,
				props: {
					isEditor: false
				}
			};
		}
		return null;
	}

	render() {
		const {editorState, showHTML} = this.state;
		const htmlOutput = stateToHTML(editorState.getCurrentContent());

		const htmlOutputStyle = {
			display: showHTML ? 'block' : 'none'
		}

		return (
			<div className="text-editor">
				<div className="text-editor__editor">
					<Editor
						blockRendererFn={this.blockRenderer}
						blockStyleFn={this.blockStyleFn}
						editorState={editorState}
						spellCheck
						readOnly
					/>
				</div>
			</div>
		);
	}
}

export default TextEditor;