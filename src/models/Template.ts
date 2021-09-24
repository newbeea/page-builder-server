import {
  PrimaryGeneratedColumn, Column,
} from 'typeorm';

import { EntityModel } from '@midwayjs/orm';

@EntityModel()
export default class Template {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'json',
    nullable: true,
  })
  json: Object;
}
