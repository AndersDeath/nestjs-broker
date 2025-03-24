import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UUID } from 'crypto';
import { Message } from '../entities/message.entity';
import { TopicService } from './topic.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly topicService: TopicService,
  ) {}

  async save(messages: Omit<Message, 'uuid' | 'dateCreate'>): Promise<Message> {
    if (await this.topicService.isExist(messages.topicName)) {
      return this.messageRepository.save(messages);
    } else {
      throw new NotFoundException("Topic doesn't exist");
    }
  }

  findAll(): Promise<Message[]> {
    return this.messageRepository.find();
  }

  findOne(uuid: UUID): Promise<Message | null> {
    return this.messageRepository.findOneBy({ uuid });
  }

  findOneByTopicName(topicName: string): Promise<Message | null> {
    return this.messageRepository.findOneBy({ topicName });
  }

  async remove(uuid: string): Promise<void> {
    await this.messageRepository.delete(uuid);
  }
}
