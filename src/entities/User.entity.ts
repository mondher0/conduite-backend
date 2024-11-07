import {
  Entity,
  Column,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";
import { USER_ENTITY } from "../common/constants";
import { GenericEntity } from "../common/entities/Generic.entity";

@Entity(USER_ENTITY)
export class User extends GenericEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
