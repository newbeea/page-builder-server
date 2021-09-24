import {
  PrimaryGeneratedColumn, Column,
} from 'typeorm';

import { EntityModel } from '@midwayjs/orm';

@EntityModel()
export default class Panel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
  })
  umdUrl: string;

  @Column({
    nullable: true,
  })
  cssUrl: string;

  @Column({
  })
  name: string;

  @Column({
  })
  title: string;

  @Column({
    nullable: true,
  })
  previewUrl: string;
}
