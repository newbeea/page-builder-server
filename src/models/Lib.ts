import {
  PrimaryGeneratedColumn, Column, OneToMany,
} from 'typeorm';

import { EntityModel } from '@midwayjs/orm';
import Component from './Component';

@EntityModel()
export default class Lib {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
  })
  umdUrl: string;

  @Column({
  })
  name: string;

  @Column({
  })
  desc: string;

  @Column({
    nullable: true,
  })
  cssUrl: string;

  @Column({
    type: 'json',
    nullable: true,
  })
  tags: Object;

  @Column({
    nullable: true,
  })
  thumb: string;

  @Column({
    nullable: true,
  })
  preview: string;

  @OneToMany(
    (type) => Component,
    (component) => component.lib,
  )
  components: Component[];
}
