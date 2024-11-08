import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { USER_ENTITY } from "../common/constants";
import { GenericEntity } from "../common/entities/Generic.entity";
import { UserRoles } from "../common/enums";

@Entity(USER_ENTITY)
export class User extends GenericEntity {
  @Column({
    name: "first_name",
  })
  firstName: string;

  @Column({
    name: "last_name",
  })
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: "enum",
    enum: UserRoles,
  })
  role: UserRoles;
}
