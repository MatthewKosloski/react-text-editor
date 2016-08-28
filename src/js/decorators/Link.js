import {Entity} from 'draft-js';
import Link from '../entities/Link';

export function findLinkEntities(contentBlock, callback) {
	contentBlock.findEntityRanges((character) => {
		const entityKey = character.getEntity();
		return (
			entityKey !== null &&
			Entity.get(entityKey).getType() === 'LINK'
		);
	}, callback);
}

export default {
	strategy: findLinkEntities,
	component: Link
};
