import { EntityValidationError } from './errors';
import { EntityValidator } from './interfaces';
import { War, war_type } from './war';


class EntityValidatorMock implements EntityValidator<war_type>{
	validate(entity: war_type): Error | null {
		//console.log(entity);
		return null;
	}           
}


type SutTypes = {
    sut: War
    EntityValidator: EntityValidator<war_type>
}
const make_sut = (year: number): SutTypes => {

	const ww2: war_type = {
		name: 'World War 2',
		begin: {
			day: 16,
			month: 2,
			year: year
		}
	};
	const entity_validator = new EntityValidatorMock();
	const entity = new War(ww2, entity_validator);

	return { sut: entity, EntityValidator: entity_validator };
};
describe('war entity', () => {
	it('should return a war_type obejct', () => {
		const { sut } = make_sut(1939);
		sut.validate();
		expect(sut.getEntity).toEqual({
			name: expect.any(String),
			begin: {
				day: expect.any(Number),
				month: expect.any(Number),
				year: expect.any(Number)
			}
		});
	});
    
	it('should return null', async () => {
		
		const { sut, EntityValidator } = make_sut(1939);

		jest.spyOn(EntityValidator, 'validate').mockReturnValue(null);
		
		expect(await sut.validate()).toBe(null);
	});

	it('should return EntityValidationError if begin.year greater than currenct year',  async () => {

		const date = new Date();
		const { sut } = make_sut(date.getFullYear()+1);

		expect(await sut.validate()).toStrictEqual(new EntityValidationError());
	});

	it('should return EntityValidationError if EntityValidator.validate returns EntityValidationError', async () => {

		const { sut,EntityValidator } = make_sut(1939);

		jest.spyOn(EntityValidator, 'validate').mockReturnValue(new EntityValidationError());

		expect(await sut.validate()).toStrictEqual(new EntityValidationError());
	});
});
