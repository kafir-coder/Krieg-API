import { EntityValidationError } from './errors';

test('EntityValidationError', () => {
	const error = new EntityValidationError();

	expect(error.name).toBe('EntityValidationError');
	expect(error.message).toBe('Couldn\'t validate the entity');
});
