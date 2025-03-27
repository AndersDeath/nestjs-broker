import { Topic } from '../entities/topic.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UUID } from 'crypto';
import { getExceptionText } from 'src/common/error.dict';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
  ) { }

  async findByUUID(uuid: UUID) {
    try {
      const response = await this.findOne(uuid);
      if (response === null) {
        throw new NotFoundException();
      }
      return response;
    } catch (error: any) {
      if (error.status === 404) {
        throw new NotFoundException(getExceptionText["GET_TOPIC_NOT_FOUND"]('uuid'));
      } else {
        throw new BadRequestException(getExceptionText["GET_TOPIC_BAD_REQUEST"]('uuid'));
      }
    }
  }

  async findByName(name: string) {
    try {
      const response = await this.findOneByName(name);;
      if (response === null) {
        throw new NotFoundException();
      }
      return response;
    } catch (error: any) {
      if (error.status === 404) {
        throw new NotFoundException(getExceptionText["GET_TOPIC_NOT_FOUND"]('name'));
      } else {
        throw new BadRequestException(getExceptionText["GET_TOPIC_BAD_REQUEST"]('name'));
      }
    }
  }

  save(topics: Partial<Topic>[]): Promise<Topic[]> {
    return this.topicRepository.save(topics);
  }

  findAll(): Promise<Topic[]> {
    return this.topicRepository.find();
  }

  findOne(uuid: UUID): Promise<Topic | null> {
    return this.topicRepository.findOneBy({ uuid });
  }

  findOneByName(name: any): Promise<Topic | null> {
    return this.topicRepository.findOneBy({ name });
  }

  isExist(name: string): Promise<boolean> {
    return this.topicRepository.existsBy({ name });
  }

  async remove(uuid: string): Promise<void> {
    await this.topicRepository.delete(uuid);
  }


}
