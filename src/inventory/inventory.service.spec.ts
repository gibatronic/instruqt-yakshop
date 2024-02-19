import { Test, TestingModule } from '@nestjs/testing'
import { Yak } from 'src/herd/yak.entity'
import { InventoryService } from './inventory.service'

const initHerd = [
    {
        age: 400,
        ageLastShaved: 0,
    },
    {
        age: 800,
        ageLastShaved: 0,
    },
    {
        age: 950,
        ageLastShaved: 0,
    },
]

describe('InventoryService', () => {
    let service: InventoryService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [InventoryService],
        }).compile()

        service = module.get(InventoryService)
    })

    it.each([
        {
            elapsedDays: 1,
            initHerd: [
                {
                    age: 0,
                    ageLastShaved: 0,
                },
            ],
            expectedIventory: {
                stock: {
                    milk: 50,
                    skins: 0,
                },
                herd: [
                    {
                        age: 1,
                        ageLastShaved: 0,
                    },
                ],
            },
        },
        {
            elapsedDays: 5,
            initHerd: [
                {
                    age: 1000,
                    ageLastShaved: 0,
                },
            ],
            expectedIventory: {
                stock: {
                    milk: 0,
                    skins: 0,
                },
                herd: [
                    {
                        age: 1000,
                        ageLastShaved: 0,
                    },
                ],
            },
        },
        {
            elapsedDays: 100,
            initHerd: [
                {
                    age: 0,
                    ageLastShaved: 0,
                },
            ],
            expectedIventory: {
                stock: {
                    milk: 4851.5,
                    skins: 1,
                },
                herd: [
                    {
                        age: 100,
                        ageLastShaved: 100,
                    },
                ],
            },
        },
        {
            elapsedDays: 13,
            initHerd,
            expectedIventory: {
                stock: {
                    milk: 1104.48,
                    skins: 3,
                },
                herd: [
                    {
                        age: 413,
                        ageLastShaved: 401,
                    },
                    {
                        age: 813,
                        ageLastShaved: 801,
                    },
                    {
                        age: 963,
                        ageLastShaved: 951,
                    },
                ],
            },
        },
        {
            elapsedDays: 14,
            initHerd,
            expectedIventory: {
                stock: {
                    milk: 1188.81,
                    skins: 4,
                },
                herd: [
                    {
                        age: 414,
                        ageLastShaved: 414,
                    },
                    {
                        age: 814,
                        ageLastShaved: 801,
                    },
                    {
                        age: 964,
                        ageLastShaved: 951,
                    },
                ],
            },
        },
        {
            elapsedDays: 75,
            initHerd,
            expectedIventory: {
                stock: {
                    milk: 5671.75,
                    skins: 14,
                },
                herd: [
                    {
                        age: 475,
                        ageLastShaved: 466,
                    },
                    {
                        age: 875,
                        ageLastShaved: 869,
                    },
                    {
                        age: 1000,
                        ageLastShaved: 987,
                    },
                ],
            },
        },
    ])(
        'should calculate the iventory when elapsed days is $elapsedDays',
        ({ elapsedDays, initHerd, expectedIventory }) => {
            const {
                herd,
                stock: { milk, skins },
            } = service.calculate(initHerd as Yak[], elapsedDays)

            expect(herd).toEqual(expectedIventory.herd)
            expect(milk).toBeCloseTo(expectedIventory.stock.milk)
            expect(skins).toBe(expectedIventory.stock.skins)
        },
    )
})
