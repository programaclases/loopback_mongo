import {Entity, model, property, hasMany} from '@loopback/repository';
import {Asignar} from './asignar.model';

@model({ 
  settings: { 
  strictObjectIDCoercion: true, 
  } 
  }) 
  
export class Tareas extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
  })
  descripcion?: string;

  @hasMany(() => Asignar)
  asignars: Asignar[];

  constructor(data?: Partial<Tareas>) {
    super(data);
  }
}

export interface TareasRelations {
  // describe navigational properties here
}

export type TareasWithRelations = Tareas & TareasRelations;
