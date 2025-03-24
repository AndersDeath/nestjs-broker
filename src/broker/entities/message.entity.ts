import { UUID } from 'crypto';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  uuid: UUID;

  @Column({ name: 'topic_name' })
  topicName: string;

  @Column('jsonb', { nullable: false, default: {} })
  body: any;

  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  dataCreate?: Date;
}
