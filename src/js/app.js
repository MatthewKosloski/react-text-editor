import React, {Component} from 'react';
import {render} from 'react-dom';
import TextEditor from './components/TextEditor';
import Preview from './components/Preview';

const renderOutput = (rawContent) => {
	render(<Preview rawContent={rawContent} />, document.getElementById('output'));
};

render(
	<div>
		<TextEditor onChange={renderOutput}/>
	</div>
, document.getElementById('app'));