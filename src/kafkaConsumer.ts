import { Kafka } from 'kafkajs';

import { logerHandler } from "./handlers/logerHandler";

class KafkaConsumer {
  private kafka;
  private consumer;

  constructor () {
    this.kafka = new Kafka({
      clientId: 'phantom-coin',
      brokers: ['localhost:9092'],
    });
      this.consumer = this.kafka.consumer({ groupId: 'loger-group' });
  }

  async startConsumer () {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: 'loger', fromBeginning: true });
    await this.consumer.run({
      eachMessage: async ({ topic, message }) => {
        console.log(`📩 Получено сообщение в ${topic}`);
        switch(topic) {
          case "loger": return logerHandler(message);
          default: throw new Error(`Not expected message from ${topic}`);
        }
      },
    });
  };
}

export const kafkaConsumer = new KafkaConsumer();