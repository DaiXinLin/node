import { EntityModel } from "@midwayjs/orm";
import {
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import Deptcate from "./deptcate";

@EntityModel({
  name: 'department'
  //表名
})
export default class Department extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id'
  })
  id: number;

  @Column({
    type: 'varchar',
    name: 'dept_name'
  })
  deptName: string;

  @Column({
    type: 'int',
    name: 'cate_id'
  })
  cateId: string;

  @ManyToOne(() => Deptcate, deptcate => deptcate.depts)
  @JoinColumn({
    name: 'cate_id'
  })
  deptcate: Deptcate
}