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

    it.each<[number, Stock]>([
        [1, { milk: expect.closeTo(85.5), skins: 3 }],
        [13, { milk: expect.closeTo(1104.48), skins: 3 }],
        [14, { milk: expect.closeTo(1188.81), skins: 4 }],
        [75, { milk: expect.closeTo(5671.75), skins: 14 }],
    ])('GET /yak-shop/stock/%i', async (elapsedDays, expectedStock) => {
        const response = await request(app.getHttpServer())
            .get(`/stock/${elapsedDays}`)
            .expect(200)

        expect(response.body).toEqual(expectedStock)
    })
})
