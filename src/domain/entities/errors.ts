export class EntityValidationError extends Error {
	constructor () {
		super('Couldn\'t validate the entity');
		this.name = 'EntityValidationError';
	}
}
