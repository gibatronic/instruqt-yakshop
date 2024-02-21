import { Test, TestingModule } from '@nestjs/testing'
import type { Yak } from '../herd/yak.interface'
import type { Inventory } from './inventory.interface'
import { InventoryService } from './inventory.service'

describe('InventoryService', () => {
    const initHerd = [
        {
            age: 4,
            ageLastShaved: 0,
        },
        {
            age: 8,
            ageLastShaved: 0,
        },
        {
            age: 9.5,
            ageLastShaved: 0,
        },
    ]

    let service: InventoryService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [InventoryService],
        }).compile()

        service = module.get(InventoryService)
    })

    it.each<{
        elapsedDays: number
        initHerd: Partial<Yak>[]
        expectedIventory: Omit<Inventory, 'herd'> & { herd: Partial<Yak>[] }
    }>([
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
                        age: 0.01,
                        ageLastShaved: 0,
                    },
                ],
            },
        },
        {
            elapsedDays: 5,
            initHerd: [
                {
                    age: 10,
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
                        age: 10,
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
                        age: expect.closeTo(1),
                        ageLastShaved: expect.closeTo(1),
                    },
                ],
            },
        },
        {
            elapsedDays: 13,
            initHerd,
            expectedIventory: {
                stock: {
                    milk: expect.closeTo(1104.48),
                    skins: 3,
                },
                herd: [
                    {
                        age: expect.closeTo(4.13),
                        ageLastShaved: expect.closeTo(4.01),
                    },
                    {
                        age: expect.closeTo(8.13),
                        ageLastShaved: expect.closeTo(8.01),
                    },
                    {
                        age: expect.closeTo(9.63),
                        ageLastShaved: expect.closeTo(9.51),
                    },
                ],
            },
        },
        {
            elapsedDays: 14,
            initHerd,
            expectedIventory: {
                stock: {
                    milk: expect.closeTo(1188.81),
                    skins: 4,
                },
                herd: [
                    {
                        age: expect.closeTo(4.14),
                        ageLastShaved: expect.closeTo(4.14),
                    },
                    {
                        age: expect.closeTo(8.14),
                        ageLastShaved: expect.closeTo(8.01),
                    },
                    {
                        age: expect.closeTo(9.64),
                        ageLastShaved: expect.closeTo(9.51),
                    },
                ],
            },
        },
        {
            elapsedDays: 75,
            initHerd,
            expectedIventory: {
                stock: {
                    milk: expect.closeTo(5671.75),
                    skins: 14,
                },
                herd: [
                    {
                        age: expect.closeTo(4.75),
                        ageLastShaved: expect.closeTo(4.66),
                    },
                    {
                        age: expect.closeTo(8.75),
                        ageLastShaved: expect.closeTo(8.69),
                    },
                    {
                        age: expect.closeTo(10),
                        ageLastShaved: expect.closeTo(9.87),
                    },
                ],
            },
        },
    ])(
        'should calculate the iventory when elapsed days is $elapsedDays',
        ({ elapsedDays, initHerd, expectedIventory }) => {
            const inventory = service.calculate(initHerd as Yak[], elapsedDays)
            expect(inventory).toEqual(expectedIventory)
        },
    )
})
