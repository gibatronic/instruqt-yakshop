import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'
import { Yak } from '../src/herd/yak.entity'

describe('Herd', () => {
    let app: INestApplication

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        await app.init()
    })

    it.each<[number, Yak[]]>([
        [
            1,
            [
                {
                    name: 'Betty-1',
                    age: expect.closeTo(4.01),
                    sex: 'f',
                    ageLastShaved: expect.closeTo(4.01),
                },
                {
                    name: 'Betty-2',
                    age: expect.closeTo(8.01),
                    sex: 'f',
                    ageLastShaved: expect.closeTo(8.01),
                },
                {
                    name: 'Betty-3',
                    age: expect.closeTo(9.51),
                    sex: 'f',
                    ageLastShaved: expect.closeTo(9.51),
                },
            ],
        ],
        [
            13,
            [
                {
                    name: 'Betty-1',
                    age: expect.closeTo(4.13),
                    sex: 'f',
                    ageLastShaved: expect.closeTo(4.01),
                },
                {
                    name: 'Betty-2',
                    age: expect.closeTo(8.13),
                    sex: 'f',
                    ageLastShaved: expect.closeTo(8.01),
                },
                {
                    name: 'Betty-3',
                    age: expect.closeTo(9.63),
                    sex: 'f',
                    ageLastShaved: expect.closeTo(9.51),
                },
            ],
        ],
        [
            14,
            [
                {
                    name: 'Betty-1',
                    age: expect.closeTo(4.14),
                    sex: 'f',
                    ageLastShaved: expect.closeTo(4.14),
                },
                {
                    name: 'Betty-2',
                    age: expect.closeTo(8.14),
                    sex: 'f',
                    ageLastShaved: expect.closeTo(8.01),
                },
                {
                    name: 'Betty-3',
                    age: expect.closeTo(9.64),
                    sex: 'f',
                    ageLastShaved: expect.closeTo(9.51),
                },
            ],
        ],
        [
            75,
            [
                {
                    name: 'Betty-1',
                    age: expect.closeTo(4.75),
                    sex: 'f',
                    ageLastShaved: expect.closeTo(4.66),
                },
                {
                    name: 'Betty-2',
                    age: expect.closeTo(8.75),
                    sex: 'f',
                    ageLastShaved: expect.closeTo(8.69),
                },
                {
                    name: 'Betty-3',
                    age: expect.closeTo(10),
                    sex: 'f',
                    ageLastShaved: expect.closeTo(9.87),
                },
            ],
        ],
    ])('GET /yak-shop/herd/%i', async (elapsedDays, expectedHerd) => {
        const response = await request(app.getHttpServer())
            .get(`/herd/${elapsedDays}`)
            .expect(200)

        expect(response.body).toEqual({ herd: expectedHerd })
    })
})
