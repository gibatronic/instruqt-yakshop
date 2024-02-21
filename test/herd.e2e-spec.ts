import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'
import { YakViewDto } from '../src/herd/herd-view.dto'

describe('Herd', () => {
    let app: INestApplication

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        await app.init()
    })

    it.each<[number, Partial<YakViewDto>[]]>([
        [
            1,
            [
                {
                    name: 'Betty-1',
                    age: 4.01,
                    'age-last-shaved': 4,
                },
                {
                    name: 'Betty-2',
                    age: 8.01,
                    'age-last-shaved': 8,
                },
                {
                    name: 'Betty-3',
                    age: 9.51,
                    'age-last-shaved': 9.5,
                },
            ],
        ],
        [
            13,
            [
                {
                    name: 'Betty-1',
                    age: 4.13,
                    'age-last-shaved': 4,
                },
                {
                    name: 'Betty-2',
                    age: 8.13,
                    'age-last-shaved': 8,
                },
                {
                    name: 'Betty-3',
                    age: 9.63,
                    'age-last-shaved': 9.5,
                },
            ],
        ],
        [
            14,
            [
                {
                    name: 'Betty-1',
                    age: 4.14,
                    'age-last-shaved': 4.1,
                },
                {
                    name: 'Betty-2',
                    age: 8.14,
                    'age-last-shaved': 8,
                },
                {
                    name: 'Betty-3',
                    age: 9.64,
                    'age-last-shaved': 9.5,
                },
            ],
        ],
        [
            75,
            [
                {
                    name: 'Betty-1',
                    age: 4.75,
                    'age-last-shaved': 4.7,
                },
                {
                    name: 'Betty-2',
                    age: 8.75,
                    'age-last-shaved': 8.7,
                },
                {
                    name: 'Betty-3',
                    age: 10,
                    'age-last-shaved': 9.9,
                },
            ],
        ],
    ])('GET /yak-shop/herd/%i', async (elapsedDays, expectedHerd) => {
        await request(app.getHttpServer())
            .get(`/herd/${elapsedDays}`)
            .expect(200)
            .expect({ herd: expectedHerd })
    })
})
