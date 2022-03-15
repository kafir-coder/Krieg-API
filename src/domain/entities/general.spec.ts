import { EntityValidationError } from './errors';
import { General, general_type } from './general';
import { EntityValidator } from './interfaces';


type SutTypes = {
    sut: General
    EntityValidator: EntityValidator<general_type>
}

class EntityValidatorMock implements EntityValidator<general_type>{
	validate(entity: general_type): Error | null {
		//console.log(entity);
		return null;
	}           
}

const make_sut = (year: number): SutTypes => {

	const savimbi: general_type = {
		name: 'Jonas Malheiro Savimbi',
		birth: {
			day: 16,
			month: 2,
			year: year
		},
		campaigns: [ 'Guerra da independência angolana', 'Guerra civil angolana' ],
		country: 'Angola',
		general_of: 'FALA'
	};
	const entity_validator = new EntityValidatorMock();
	const entity = new General(savimbi, entity_validator);

	return { sut: entity, EntityValidator: entity_validator };
};

describe('general entity', () => {
	it('should return a general_type obejct', () => {
		const { sut } = make_sut(1939);
		sut.validate();
		expect(sut.getEntity).toHaveProperty('name');
		expect(sut.getEntity).toHaveProperty('birth');
		expect(sut.getEntity).toHaveProperty('general_of');
		expect(sut.getEntity).toHaveProperty('campaigns');
		expect(sut.getEntity).toHaveProperty('country');
	});

	it('should return null', async () => {
		
		const { sut } = make_sut(1939);
		
		expect(await sut.validate()).toBe(null);
	});

	it('should return EntityValidationError if EntityValidator.validate returns EntityValidationError', async () => {

		const { sut,EntityValidator } = make_sut(1939);

		jest.spyOn(EntityValidator, 'validate').mockReturnValue(new EntityValidationError());

		expect(await sut.validate()).toStrictEqual(new EntityValidationError());
	});

});
