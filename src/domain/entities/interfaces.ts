export interface EntityValidator<T> {
    validate(entity: T): Error | null
}

export interface Entity<T> {
    validate(): Promise<Error | null> 
}
