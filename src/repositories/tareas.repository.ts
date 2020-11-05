import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Tareas, TareasRelations, Asignar} from '../models';
import {DsMongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {AsignarRepository} from './asignar.repository';

export class TareasRepository extends DefaultCrudRepository<
  Tareas,
  typeof Tareas.prototype.id,
  TareasRelations
> {

  public readonly asignars: HasManyRepositoryFactory<Asignar, typeof Tareas.prototype.id>;

  constructor(
    @inject('datasources.DsMongo') dataSource: DsMongoDataSource, @repository.getter('AsignarRepository') protected asignarRepositoryGetter: Getter<AsignarRepository>,
  ) {
    super(Tareas, dataSource);
    this.asignars = this.createHasManyRepositoryFactoryFor('asignars', asignarRepositoryGetter,);
  }
}
