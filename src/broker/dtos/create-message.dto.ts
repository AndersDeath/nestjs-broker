export class CreateMessageDto {
  body: JSON;
  topicName: string;
  constructor(body: JSON, topicName: string) {
    this.body = body;
    this.topicName = topicName;
  }
}
