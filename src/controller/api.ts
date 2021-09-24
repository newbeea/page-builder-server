import { Body, Get, Param } from '@midwayjs/decorator';
import { Inject, Controller, Post, Provide, Query } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Context } from 'egg';
import { createQueryBuilder, Repository } from 'typeorm';
import { IGetUserResponse } from '../interface';
import Component from '../models/Component';
import Font from '../models/Font';
import Lib from '../models/Lib';
import Page from '../models/Page';
import Panel from '../models/Panel';
import { DslService } from '../service/dsl-service';
import { UserService } from '../service/user';

@Provide()
@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @InjectEntityModel(Page)
  pageRepo: Repository<Page>;

  @InjectEntityModel(Panel)
  panelRepo: Repository<Panel>;

  @InjectEntityModel(Component)
  componentRepo: Repository<Component>;

  @InjectEntityModel(Lib)
  libRepo: Repository<Lib>;
  
  @InjectEntityModel(Font)
  fontRepo: Repository<Font>;

  @Inject()
  dslService: DslService;

  @Post('/get_user')
  async getUser(@Query() uid: string): Promise<IGetUserResponse> {
    console.log(uid)
    const user = await this.userService.getUser({ uid });
    return { success: true, message: 'OK', data: user };
  }

  @Post('/pages')
  async createPage(@Body() json: Object, @Body() name: string, @Body() description: string) {
    const page = new Page();
    page.json = json
    page.name = name
    page.description = description
    const record = await this.pageRepo.save(page)
    return { success: true, message: 'OK', data: record };
  }

  @Get('/pages')
  async getPages(@Query() pageIndex: number, @Param() pageSize = 10) {
    console.log(pageIndex, pageSize)
    let builder = await createQueryBuilder('Page')
    if (pageIndex) {
      builder = builder.skip(pageSize * (pageIndex - 1));
    }
    builder = builder.take(pageSize);
    const result = await builder.getManyAndCount();
    return { success: true, message: 'OK', data: {
      pages: result[0],
      count: result[1],
    } };
  }

  @Post('/pages/:id')
  async updatePage(@Body() json: Object, @Param() id: number) {
    await this.pageRepo.update({
      id
    }, {
      json
    })
    return { success: true, message: 'OK' };
  }

  @Get('/pages/:id')
  async getPage(@Body() json: Object, @Param() id: number) {
    const page = await this.pageRepo.findOne({
      id
    })
    return { success: true, data: page };
  }

  @Post('/components')
  async createComponent(@Body() lib: Lib, @Body() components: Component[]) {
    const l = new Lib();
    Object.assign(l, lib);
    await this.libRepo.save(l)
    for(let i = 0; i < components.length; i += 1) {
      const c = new Component();
      Object.assign(c, components[i]);
      c.lib = l;
      await this.componentRepo.save(c);
    }
    return { success: true, message: 'OK', data: {}};
  }

  @Post('/template')
  async createTemplate(@Body() component: Component) {
    const c = new Component();
    Object.assign(c, component);
    c.config.name = component.label;
    await this.componentRepo.save(c);
    return { success: true, message: 'OK', data: {}};
  }

  @Get('/panels')
  async getPanels() {
    const panels = await this.panelRepo.find();
    return { success: true, message: 'OK', data: panels };
  }

  @Get('/components')
  async getComponents() {
    const components = await this.componentRepo.find({
      relations: ['lib']
    });
    return { success: true, message: 'OK', data: components };
  }

  @Get('/libs')
  async getLibs() {
    const libs = await this.libRepo.find();
    return { success: true, message: 'OK', data: libs };
  }

  @Get('/fonts')
  async getFonts() {
    const fonts = await this.fontRepo.find();
    return { success: true, message: 'OK', data: fonts };
  }

  @Post('/fonts')
  async uploadFont(@Body() url: string, @Body() fontFamily: string) {
    const font = new Font();
    font.url = url;
    font.fontFamily = fontFamily
    const result = await this.fontRepo.save(font);
    return { success: true, message: 'OK', data: result };
  }

  @Post('/code')
  async getCode(@Body() json: number, @Body() dslType: string) {
    const code = await this.dslService.getCode(dslType, json)
    return { success: true, data: code };
  }
}
