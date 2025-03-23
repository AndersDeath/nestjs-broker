import { Topic } from './../entities/topic.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
  ) {}

  save(topics: Partial<Topic>[]): Promise<Topic[]> {
    return this.topicRepository.save(topics);
  }

  findAll(): Promise<Topic[]> {
    return this.topicRepository.find();
  }

  findOne(uuid: UUID): Promise<Topic | null> {
    return this.topicRepository.findOneBy({ uuid });
  }

  findOneByName(name: string): Promise<Topic | null> {
    return this.topicRepository.findOneBy({ name });
  }

  isExist(name: string): Promise<boolean> {
    return this.topicRepository.existsBy({ name });
  }

  async remove(uuid: string): Promise<void> {
    await this.topicRepository.delete(uuid);
  }
}
