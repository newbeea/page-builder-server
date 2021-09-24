import {
  PrimaryGeneratedColumn, Column,
} from 'typeorm';

import { EntityModel } from '@midwayjs/orm';

@EntityModel()
export default class Symbol {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'json',
    nullable: true,
  })
  json: Object;
}
