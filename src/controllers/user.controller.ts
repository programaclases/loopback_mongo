import {
    Count,
    CountSchema,
    Filter,
    FilterExcludingWhere,
    repository,
    Where,
} from '@loopback/repository';
import {
    post,
    param,
    get,
    getModelSchemaRef,
    patch,
    put,
    del,
    requestBody,
    ResponseObject,
    HttpErrors,
} from '@loopback/rest';
import { Usuarios } from '../models';
import { UsuariosRepository } from '../repositories';


export type Credentials = {
    email: string;
    password: string;
};

const CreateUserResponse: ResponseObject = {
    description: 'Create user',
    content: {
        schema: getModelSchemaRef(Usuarios),
    },
}

export class UserController {

    constructor(
        @repository(UsuariosRepository)
        public userRepository: UsuariosRepository) {

    }

    @post('user/create', {
        responses: {
            200: {
                content: {
                    schema: getModelSchemaRef(Usuarios),
                  },
            }
        },
    })
    async crearUsuario(@requestBody({
        content: {
            'application/json': {
                schema: getModelSchemaRef(Usuarios, {
                    title: 'NewUsuario',
                }),
            },
        },
    }) userData: Usuarios): Promise<Usuarios> {
        const userEmail = await this.userRepository.findOne({
            where: {
                email: userData['email']
            }
        }
        );
        if (!userEmail ){
            const savedUser = await this.userRepository.create(userData);
            return savedUser;
    
        } else {
            throw new HttpErrors.NotFound(
                `user found with this ${ userData['email'] }`,
              );
        }

    
    }
}