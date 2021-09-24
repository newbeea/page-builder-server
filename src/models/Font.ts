import {
  PrimaryGeneratedColumn, Column,
} from 'typeorm';

import { EntityModel } from '@midwayjs/orm';

@EntityModel()
export default class Font {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
  })
  url: string;

  @Column({
    nullable: true,
  })
  fontFamily: string;
}
