import { EntityModel } from "@midwayjs/orm";
import {
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
 
} from "typeorm";

@EntityModel({
  name: 'doctor'
  //表名
})
export default class Doctor extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id'
  })
  id: number;

  @Column({
    type: 'varchar',
    name: 'name'
  })
  name: string;

  @Column({
    type: 'varchar',
    name: 'category'
  })
  category: string;

  @Column({
    type: 'int',
    name: 'deptid'
  })
  deptid: number;

  @Column({
    type: 'varchar',
    name: 'desc'
  })
  desc: string;

  @Column({
    type: 'varchar',
    name: 'illness'
  })
  illness: string;
}