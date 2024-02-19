import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'

describe('Herd', () => {
    let app: INestApplication

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        await app.init()
    })

    it.each([
        [
            1,
            [
                { name: 'Betty-1', age: 401, sex: 'f', ageLastShaved: 401 },
                { name: 'Betty-2', age: 801, sex: 'f', ageLastShaved: 801 },
                { name: 'Betty-3', age: 951, sex: 'f', ageLastShaved: 951 },
            ],
        ],
        [
            13,
            [
                { name: 'Betty-1', age: 413, sex: 'f', ageLastShaved: 401 },
                { name: 'Betty-2', age: 813, sex: 'f', ageLastShaved: 801 },
                { name: 'Betty-3', age: 963, sex: 'f', ageLastShaved: 951 },
            ],
        ],
        [
            14,
            [
                { name: 'Betty-1', age: 414, sex: 'f', ageLastShaved: 414 },
                { name: 'Betty-2', age: 814, sex: 'f', ageLastShaved: 801 },
                { name: 'Betty-3', age: 964, sex: 'f', ageLastShaved: 951 },
            ],
        ],
        [
            75,
            [
                { name: 'Betty-1', age: 475, sex: 'f', ageLastShaved: 466 },
                { name: 'Betty-2', age: 875, sex: 'f', ageLastShaved: 869 },
                { name: 'Betty-3', age: 1000, sex: 'f', ageLastShaved: 987 },
            ],
        ],
    ])('GET /yak-shop/herd/%s', async (elapsedDays, expectedHerd) => {
        const response = await request(app.getHttpServer())
            .get(`/herd/${elapsedDays}`)
            .expect(200)
            .expect({ herd: expectedHerd })
    })
})
