import { EntityModel } from "@midwayjs/orm";
import {
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
} from "typeorm";

@EntityModel({
  name: 'patient'
  //表名
})
export default class Patient extends BaseEntity {
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
    type: 'int',
    name: 'user_id'
  })
  userId: number;

  @Column({
    type: 'varchar',
    name: 'idcard'
  })
  idcard: string;

  @Column({
    type: 'varchar',
    name: 'visitcard'
  })
  visitcard: string;

  @Column({
    type: 'varchar',
    name: 'phone'
  })
  phone: string;

  @Column({
    type: 'varchar',
    name: 'address'
  })
  address: string;

  @Column({
    type: 'int',
    name: 'relation'
  })
  relation: number;

  @Column({
    type: 'int',
    name: 'checked'
  })
  checked: number;

}
