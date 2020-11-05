import {Entity, model, property} from '@loopback/repository';

@model()
export class Asignar extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;


  constructor(data?: Partial<Asignar>) {
    super(data);
  }
}

export interface AsignarRelations {
  // describe navigational properties here
}

export type AsignarWithRelations = Asignar & AsignarRelations;
