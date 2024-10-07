import { request, Request, Response } from 'express'
import { UserService } from '../services/UserService'

export class UserController {
    userService: UserService

    constructor(
        userService = new UserService()
    ){
        this.userService = userService
    }

    createUser = (request: Request, response: Response): Response => {
        const user = request.body

        if(!user.name || !user.email){
            return response.status(400).json({ message: 'Bad request! Nome e e-mail são obrigatórios!'})
        } 

        this.userService.createUser(user.name, user.email)
        return response.status(201).json({ message: 'Usuário criado'})
    }

    getAllUsers = (request: Request, response: Response) => {
        const users = this.userService.getAllUsers()
        return response.status(200).json( users )
    } 

    deleteUser = (request: Request, response: Response) => {
        const { email } = request.body; // Assume que o e-mail do usuário a ser deletado é passado no corpo da requisição

        if (!email) {
            return response.status(400).json({ message: 'Bad request! E-mail é obrigatório para deletar um usuário!' });
        }

        this.userService.deleteUser(email); // Chama o método deleteUser do UserService
        return response.status(200).json({ message: `Usuário com e-mail ${email} deletado` });
    };
}


    