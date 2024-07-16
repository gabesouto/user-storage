import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../modules/user/controller/user.controller';
import { UserService } from '../modules/user/service/user.service';

describe('UserService tests', () => {
  let userService: UserService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userService = app.get<UserService>(UserService);
  });

  describe('root', () => {
    const newUser = {
      name: "John Doe",
      password: "password123",
      email: "john.doe@example.com",
      role: "user",
      age: 30
    };

    it('should successfully register a new user and return the new user data', () => {
   
      const response = userService.post(newUser);

      expect(response).toEqual({
        data: expect.objectContaining({
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          age: newUser.age,
          id: expect.any(String),
          createdAt: expect.any(Date)
        })
      });


      expect(response.data).not.toHaveProperty('password');
      });
    });
  });

