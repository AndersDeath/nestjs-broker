import {
    Controller,
    Get,
    NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, } from '@nestjs/swagger';
import { BrokerSubscription } from '../models/broker-subscription';
import { BrokerSubscriptionService } from '../services/broker-subscription.service';

@ApiTags('Broker')
@Controller('broker')
export class SubscriptionController {
    constructor(
        private brokerSubscriptionService: BrokerSubscriptionService,
    ) { }

    @Get('subscriptions')
    @ApiOperation({ summary: 'Get subscriptions list' })
    async getSubscriptions(): Promise<BrokerSubscription[] | null> {
        const subscriptions = await this.brokerSubscriptionService.getList();
        if (subscriptions.length === 0) throw new NotFoundException('');
        return subscriptions;
    }
}
