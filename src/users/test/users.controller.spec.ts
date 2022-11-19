import { Test } from '@nestjs/testing';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../schemas/user.schema';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { userStub } from './stubs/user.stub';

jest.mock('../users.service')

describe('UsersController', () => {
	
	let usersController: UsersController
	let usersService: UsersService

	
	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [],
			controllers: [UsersController],
			providers: [UsersService]
		}).compile()
		

		usersController = moduleRef.get<UsersController>(UsersController)
		usersService = moduleRef.get<UsersService>(UsersService)

		// clear each mock before each test
		jest.clearAllMocks()
	})

	describe('get user', () => { 
		describe('when getUser is being called', () => {
			let user: User
			beforeEach(async () => {
				user = await usersController.getUser(userStub().userId)
			})
			test('it should call usersService', () => {
				// console.log(user, "USER")
				expect(usersService.getUserById).toBeCalledWith(userStub().userId)
			})

			test('it should return a user', () => {
				expect(user).toEqual(userStub())
			})
		})
	 })
	
	describe('get users', () => {
		describe('when getUsers is being called', () => {
			let users: User[]
			beforeEach(async () => {
				users = await usersController.getUsers()
			})
			test('it should call usersService', () => {
				// console.log(user, "USER")
				expect(usersService.getUsers).toBeCalled()
			})

			test('it should return a users array', () => {
				expect(users).toEqual([userStub()])
			})
		})
	})
	
		describe('create user', () => {
			describe('when createUser is being called', () => {
				let user: User
				let createUserDto: CreateUserDto
	
				beforeEach(async () => {
					createUserDto = {
						email: userStub().email,
						age: userStub().age
					}
					user = await usersController.createUser(createUserDto)
				})
				test('it should call usersService', () => {
					// console.log(user, "USER")
					expect(usersService.createUser).toBeCalledWith(userStub().email, userStub().age)
				})
	
				test('it should return a users array', () => {
					expect(user).toEqual(userStub())
				})
			})
		})
	
		describe('update user', () => {
			describe('when updateUser is being called', () => {
				let user: User
				let updateUserDto: UpdateUserDto
	
				beforeEach(async () => {
					updateUserDto = {
						favoriteFoods: ['burgers'],
						age: 69
					}
					user = await usersController.updateUser(userStub().userId, updateUserDto)
				})
				test('it should call usersService', () => {
					expect(usersService.updateUser).toBeCalledWith(userStub().userId, updateUserDto)
				})
	
				test('it should return a users array', () => {
					expect(user).toEqual(userStub())
				})
			})
		})
})