import {
  PrimaryGeneratedColumn, Column, ManyToOne,
} from 'typeorm';

import { EntityModel } from '@midwayjs/orm';
import Lib from './Lib';

@EntityModel()
export default class Component {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
  })
  componentName: string;

  @Column({
  })
  label: string;

  @Column({
  })
  category: string;

  @Column({
    nullable: true,
  })
  thumb: string;

  @Column({
    nullable: true,
  })
  preview: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    type: 'json',
    nullable: true,
  })
  config: any;

  @Column({
    type: 'json',
    nullable: true,
  })
  props: Object;

  @Column({
    default: false,
  })
  buildIn: Boolean;

  @ManyToOne(
    (type) => Lib,
    (lib) => lib.components,
  )
  lib: Lib;
  
}
