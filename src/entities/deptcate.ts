import { EntityModel } from "@midwayjs/orm";
import {
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import Department from "./department";

@EntityModel({
  name: 'deptcate'
  //表名
})
export default class Deptcate extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id'
  })
  id: number;

  @Column({
    type: 'varchar',
    name: 'cate_name'
  })
  cateName: string;

  @OneToMany(() => Department, dept => dept.deptcate)
  depts: Department[]
  
}