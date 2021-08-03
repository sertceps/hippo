import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TagFindAllResDto } from '../src/modules/tag/dtos/tag-find-all.res.dto';
import { Model } from 'mongoose';
import { Tag, TagDocument } from '../src/modules/tag/schemas/tag.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('hippo (e2e)', () => {
  let app: INestApplication;
  let tagModel: Model<TagDocument>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    tagModel = moduleFixture.get(getModelToken(Tag.name));

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('tags (GET)', () => {
    beforeAll(async () => {
      await tagModel.create({ tag: 'e2e1' });
    });

    afterAll(async () => {
      await tagModel.deleteMany({});
    });

    it('获取 tag 列表', async () => {
      const { body, status } = await request(app.getHttpServer()).get('/tags');
      expect(status).toBe(200);
      expect((body as TagFindAllResDto[]).length > 0).toBe(true);
    });
  });
});
