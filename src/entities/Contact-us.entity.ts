import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { CONTACT_US_ENTITY } from '../common/constants';
import { GenericEntity } from '../common/entities/Generic.entity';

@Entity(CONTACT_US_ENTITY)
export class ContactUS extends GenericEntity{

  @Column()
  email: string;

  @Column({ type: 'text' })
  message: string;

}
