import { EntityModel } from "@midwayjs/orm";
import {
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
} from "typeorm";

@EntityModel({
  name: 'admin_user'
  //表名
})
export default class Admin_User extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id'
  })
  id: number;

  @Column({
    type: 'varchar',
    name: 'lname'
  })
  lname: string;

  @Column({
    type: 'varchar',
    name: 'lpass'
  })
  lpass: string;
}