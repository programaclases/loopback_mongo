import {DefaultCrudRepository} from '@loopback/repository';
import {Asignar, AsignarRelations} from '../models';
import {DsMongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AsignarRepository extends DefaultCrudRepository<
  Asignar,
  typeof Asignar.prototype.id,
  AsignarRelations
> {
  constructor(
    @inject('datasources.DsMongo') dataSource: DsMongoDataSource,
  ) {
    super(Asignar, dataSource);
  }
}
