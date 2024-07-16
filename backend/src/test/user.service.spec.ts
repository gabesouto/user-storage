import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../modules/user/controller/user.controller';
import { UserService } from '../modules/user/service/user.service'

describe('AppController', () => {
  let userService: UserService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userService = app.get<UserService>(UserService);
  });

  describe('root', () => {
    const newUser: User = {
      name: "test",
      password: "test",
      email: "test@test.com",
      role: "admin",
      age: 26

    } 

    const response = newUser

    it('should successfully register a new user and return user data', () => {
      expect(userService.post(newUser)).toBe(response);
    });
  });
});
