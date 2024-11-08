import { Entity, Column, OneToMany, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User.entity";
import { INSTRUCTOR_ENTITY } from "../common/constants";
import { Rating } from "./Rating.entity";
import { GenericEntity } from "../common/entities/Generic.entity";

@Entity(INSTRUCTOR_ENTITY)
export class Instructor extends GenericEntity {
  @OneToOne(() => User)
  @JoinColumn({ name: "id" })  // Foreign key column
  user: User;

  @Column({ type: "text", nullable: true })
  bio: string;

  @Column("int", { nullable: true })
  experience: number; // Years of experience

  @Column("text", { nullable: true })
  qualification: string; // Teacher qualifications

  @Column("decimal", { precision: 5, scale: 2, nullable: true })
  pricePerHour: number; // Hourly rate for teaching

  @Column("boolean", { default: true })
  available: boolean; // Whether the teacher is currently available for new students

  @OneToMany(() => Rating, (rating) => rating.instructor)
  ratings: Rating[];
}
