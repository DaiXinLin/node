import { EntityModel } from "@midwayjs/orm";
import {
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
} from "typeorm";

@EntityModel({
  name: 'user'
  //表名
})
export default class User extends BaseEntity {
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
    name: 'phone'
  })
  phone: string;

  @Column({
    type: 'varchar',
    name: 'password'
  })
  password: string;
}
