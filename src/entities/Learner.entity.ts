import {
    Entity,
    Column,
    OneToMany,
    OneToOne,
    JoinColumn,
  } from "typeorm";
  import { User } from "./User.entity";
  import { LEARNER_ENTITY } from "../common/constants";
  import { Rating } from "./Rating.entity";
  import { GenericEntity } from "../common/entities/Generic.entity";
  
  @Entity(LEARNER_ENTITY)
  export class Learner extends GenericEntity {
    @OneToOne(() => User)
    @JoinColumn({ name: "user_id" }) // Foreign key column
    user: User;
  
    @Column({ type: "text", nullable: true })
    bio: string;
  
    @OneToMany(() => Rating, (rating) => rating.learner)
    ratings: Rating[];
  }
  