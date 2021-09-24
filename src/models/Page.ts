import {
  PrimaryGeneratedColumn, Column,
} from 'typeorm';

import { EntityModel } from '@midwayjs/orm';

@EntityModel()
export default class Page {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
  })
  name: string;

  @Column({
  })
  description: string;

  @Column({
    type: 'json',
    nullable: true,
  })
  json: Object;
}
