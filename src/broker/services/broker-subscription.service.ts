import { Injectable } from '@nestjs/common';
import { TopicService } from './topic.service';
import { BrokerSubscription } from '../models/broker-subscription';
import { Topic } from '../entities/topic.entity';

@Injectable()
export class BrokerSubscriptionService {
  constructor(private topicService: TopicService) {}

  async getList(): Promise<BrokerSubscription[]> {
    const topics: Topic[] = await this.topicService.findAll();
    return topics.map((topic: Topic) => ({
      name: `topic-[${topic.name}]`,
    }));
  }
}
