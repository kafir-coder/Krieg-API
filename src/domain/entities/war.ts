import { EntityValidationError } from './errors';
import { Entity, EntityValidator } from './interfaces';

export class War implements Entity<war_type> {

	constructor(
		private readonly entity: war_type,
        private readonly validator: EntityValidator<war_type>
	) {}

	async validate(): Promise<EntityValidationError | null> {
		if (this.entity.begin.year > (new Date()).getFullYear()) {
			return new EntityValidationError();
		}
		return this.validator.validate(this.entity) ;		
	}
	
	public get getEntity() : war_type {
		return this.entity;
	}
	
}


export type war_type = {
    name: string
    begin: {
		day: number,
		month: number,
		year: number
	}
	end: {
		day: number,
		month: number,
		year: number
	}
	countries: string[]
	century: number
	reason: string[]
	consequences: string[]
	photos: string[]
}


