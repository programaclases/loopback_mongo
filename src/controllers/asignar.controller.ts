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
} from '@loopback/rest';
import {Asignar} from '../models';
import {AsignarRepository} from '../repositories';

export class AsignarController {
  constructor(
    @repository(AsignarRepository)
    public asignarRepository : AsignarRepository,
  ) {}

  @post('/asignars', {
    responses: {
      '200': {
        description: 'Asignar model instance',
        content: {'application/json': {schema: getModelSchemaRef(Asignar)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asignar, {
            title: 'NewAsignar',
            
          }),
        },
      },
    })
    asignar: Asignar,
  ): Promise<Asignar> {
    return this.asignarRepository.create(asignar);
  }

  @get('/asignars/count', {
    responses: {
      '200': {
        description: 'Asignar model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Asignar) where?: Where<Asignar>,
  ): Promise<Count> {
    return this.asignarRepository.count(where);
  }

  @get('/asignars', {
    responses: {
      '200': {
        description: 'Array of Asignar model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Asignar, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Asignar) filter?: Filter<Asignar>,
  ): Promise<Asignar[]> {
    return this.asignarRepository.find(filter);
  }

  @patch('/asignars', {
    responses: {
      '200': {
        description: 'Asignar PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asignar, {partial: true}),
        },
      },
    })
    asignar: Asignar,
    @param.where(Asignar) where?: Where<Asignar>,
  ): Promise<Count> {
    return this.asignarRepository.updateAll(asignar, where);
  }

  @get('/asignars/{id}', {
    responses: {
      '200': {
        description: 'Asignar model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Asignar, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Asignar, {exclude: 'where'}) filter?: FilterExcludingWhere<Asignar>
  ): Promise<Asignar> {
    return this.asignarRepository.findById(id, filter);
  }

  @patch('/asignars/{id}', {
    responses: {
      '204': {
        description: 'Asignar PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asignar, {partial: true}),
        },
      },
    })
    asignar: Asignar,
  ): Promise<void> {
    await this.asignarRepository.updateById(id, asignar);
  }

  @put('/asignars/{id}', {
    responses: {
      '204': {
        description: 'Asignar PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() asignar: Asignar,
  ): Promise<void> {
    await this.asignarRepository.replaceById(id, asignar);
  }

  @del('/asignars/{id}', {
    responses: {
      '204': {
        description: 'Asignar DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.asignarRepository.deleteById(id);
  }
}
