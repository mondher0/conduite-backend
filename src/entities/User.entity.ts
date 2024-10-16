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

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp with time zone",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp with time zone",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
