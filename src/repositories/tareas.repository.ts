import {DefaultCrudRepository} from '@loopback/repository';
import {Tareas, TareasRelations} from '../models';
import {DsMongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TareasRepository extends DefaultCrudRepository<
  Tareas,
  typeof Tareas.prototype.id,
  TareasRelations
> {
  constructor(
    @inject('datasources.DsMongo') dataSource: DsMongoDataSource,
  ) {
    super(Tareas, dataSource);
  }
}
