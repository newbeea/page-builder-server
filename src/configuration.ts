import { App, Configuration } from '@midwayjs/decorator';
import { ILifeCycle } from '@midwayjs/core';
import { Application } from 'egg';
import { join } from 'path';
import { getConnection } from 'typeorm';
import * as orm from '@midwayjs/orm';

@Configuration({
  imports: [
    orm
  ],
  importConfigs: [join(__dirname, './config')],
  conflictCheck: true,
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: Application;

  async onReady() {
    this.app.context.connection = getConnection();
    console.log(`[ TypeORM ] connection [${this.app.context.connection.name}] established`);
  }
}
