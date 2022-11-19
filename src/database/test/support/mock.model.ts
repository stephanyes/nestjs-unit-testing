
export abstract class MockModel<T> {
	protected abstract entityStub: T;

	/*
	If we check in entity.repository.ts the create function we are going to need to mock the
	the entityModel call and the .save() on itself
	we want to make sure save() is called and that is been instanciated with the data we expect
	*/
	constructor(createEntityData: T) {
		this.constructorSpy(createEntityData)
	}

	constructorSpy(_createEntityData: T): void {}


	async findOne(): Promise<T> {
		return this.entityStub
	}

	async find(): Promise<T[]> {
    return [this.entityStub]
  }

	async save(): Promise<T> {
		return this.entityStub
	}

	async findOneAndUpdate(): Promise<T> {
		return this.entityStub
	}
}
