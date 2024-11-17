import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Instructor } from "./Instructor.entity";
import { Learner } from "./Learner.entity";
import { RATING_ENTITY } from "../common/constants";
import { GenericEntity } from "../common/entities/Generic.entity";

@Entity(RATING_ENTITY)
export class Rating extends GenericEntity {
  @Column({ type: "int" })
  score: number; // Rating score from 1 to 5, for example

  @Column({ type: "text", nullable: true })
  feedback: string; // Optional feedback provided by the student

  @ManyToOne(() => Instructor, (instructor) => instructor.ratings)
  @JoinColumn({ name: "instructor_id" })
  instructor: Instructor; // The teacher who received the rating

  @ManyToOne(() => Learner, (learner) => learner.ratings)
  @JoinColumn({ name: "learner_id" })
  learner: Learner; // The student who gave the rating
}
