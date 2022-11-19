import { User } from '../../schemas/user.schema'


export const userStub = (): User => {
	return {
		userId: '123',
		email: 'test@mail.com',
		age: 23,
		favoriteFoods: ['creme brulee', 'pizza']
	}
}