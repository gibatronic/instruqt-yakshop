import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'
import { Stock } from '../src/stock/stock.entity'

describe('Stock', () => {
    let app: INestApplication

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        await app.init()
    })

    it.each<[number, number, Stock, Partial<Stock>]>([
        [14, 201, { milk: 1000, skins: 3 }, { milk: 1000, skins: 3 }],
        [14, 206, { milk: 1200, skins: 3 }, { skins: 3 }],
        [14, 206, { milk: 1100, skins: 5 }, { milk: 1100 }],
        [1, 404, { milk: 1100, skins: 5 }, {}],
    ])(
        'POST /yak-shop/order/%i',
        (elapsedDays, statusCode, order, response) => {
            return request(app.getHttpServer())
                .post(`/order/${elapsedDays}`)
                .send({ customer: 'John Doe', order })
                .expect(statusCode)
                .expect(response)
        },
    )
})
