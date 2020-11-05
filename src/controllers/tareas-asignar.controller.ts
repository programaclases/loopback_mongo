import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Tareas,
  Asignar,
} from '../models';
import {TareasRepository} from '../repositories';

export class TareasAsignarController {
  constructor(
    @repository(TareasRepository) protected tareasRepository: TareasRepository,
  ) { }

  @get('/tareas/{id}/asignars', {
    responses: {
      '200': {
        description: 'Array of Tareas has many Asignar',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Asignar)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Asignar>,
  ): Promise<Asignar[]> {
    return this.tareasRepository.asignars(id).find(filter);
  }

  @post('/tareas/{id}/asignars', {
    responses: {
      '200': {
        description: 'Tareas model instance',
        content: {'application/json': {schema: getModelSchemaRef(Asignar)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Tareas.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asignar, {
            title: 'NewAsignarInTareas',
            exclude: ['id'],
            optional: ['tareasId']
          }),
        },
      },
    }) asignar: Omit<Asignar, 'id'>,
  ): Promise<Asignar> {
    return this.tareasRepository.asignars(id).create(asignar);
  }

  @patch('/tareas/{id}/asignars', {
    responses: {
      '200': {
        description: 'Tareas.Asignar PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asignar, {partial: true}),
        },
      },
    })
    asignar: Partial<Asignar>,
    @param.query.object('where', getWhereSchemaFor(Asignar)) where?: Where<Asignar>,
  ): Promise<Count> {
    return this.tareasRepository.asignars(id).patch(asignar, where);
  }

  @del('/tareas/{id}/asignars', {
    responses: {
      '200': {
        description: 'Tareas.Asignar DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Asignar)) where?: Where<Asignar>,
  ): Promise<Count> {
    return this.tareasRepository.asignars(id).delete(where);
  }
}
