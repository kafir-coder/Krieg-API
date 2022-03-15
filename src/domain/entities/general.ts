import { EntityValidationError } from './errors';
import { Entity, EntityValidator } from './interfaces';

export class General implements Entity<general_type> {

	constructor(
		private readonly entity: general_type,
        private readonly validator: EntityValidator<general_type>
	) {}

	async validate(): Promise<EntityValidationError | null> {
		return this.validator.validate(this.entity) ;		
	}
	
	public get getEntity() : general_type {
		return this.entity;
	}
	
}


export type general_type = {
    name: string
    country: string
	birth: {
		day: number
		month: number
		year: number
	}
	general_of: string
	campaigns: string[]
}


