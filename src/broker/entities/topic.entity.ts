import { UUID } from 'crypto';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Topic {
  @PrimaryGeneratedColumn('uuid')
  uuid: UUID;

  @Column()
  name: string;

  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  dataCreate?: Date;
}
