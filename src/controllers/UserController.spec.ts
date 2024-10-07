import { UserController } from "./UserController";
import { UserService } from '../services/UserService';
import { Request } from 'express';
import { makeMockResponse } from "../__mocks__/mockResponse.mock";

describe('UserController', () => {
    let mockUserService: Partial<UserService>;
    let userController: UserController; 

    beforeEach(() => {
        mockUserService = {
            createUser: jest.fn(),
            getAllUsers: jest.fn(),
            deleteUser: jest.fn() 
        };

        userController = new UserController(mockUserService as UserService)
    });

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'Nath',
                email: 'nath@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse()

        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(201);
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' })
    })

    it('Deve retornar erro 400 caso o name não seja informado', () => {
        const mockRequest = {
            body: {
                email: 'nath@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse()

        userController.createUser(mockRequest, mockResponse)

        expect(mockResponse.state.status).toBe(400)

        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Nome e e-mail são obrigatórios!'})
    })

    it('Deve retornar erro 400 caso o email não seja informado', () => {
        const mockRequest = {
            body: {
                name: 'Nath'
                
            }
        } as Request;
        const mockResponse = makeMockResponse();
    
        userController.createUser(mockRequest, mockResponse);
    
        expect(mockResponse.state.status).toBe(400);
    
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Nome e e-mail são obrigatórios!' });
    });

    it('Deve retornar erro 400 caso nenhum campo (name e email) seja informado', () => {
        const mockRequest = {
            body: {
                
            }
        } as Request;
        const mockResponse = makeMockResponse();
    
        userController.createUser(mockRequest, mockResponse);
    
        
        expect(mockResponse.state.status).toBe(400);
    
        
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Nome e e-mail são obrigatórios!' });
    });

    it('Deve chamar getAllUsers', () => {
        const mockRequest = {} as Request
        const mockResponse = makeMockResponse()

        userController.getAllUsers(mockRequest, mockResponse)
             
        expect(mockUserService.getAllUsers).toHaveBeenCalled()
        expect(mockResponse.state.status).toBe(200)
    })

    it('Deve deletar um usuário existente', () => {
        const mockRequest = {
            body: {
                email: 'nath@test.com' 
            }
        } as Request;
        const mockResponse = makeMockResponse();

        mockUserService.deleteUser = jest.fn().mockImplementation((email) => {
            return { message: `Usuário com e-mail ${email} deletado` }
        });

        userController.deleteUser(mockRequest, mockResponse);

        expect(mockUserService.deleteUser).toHaveBeenCalledWith('nath@test.com')
        expect(mockResponse.state.status).toBe(200)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário com e-mail nath@test.com deletado' })
    })
})


    
    