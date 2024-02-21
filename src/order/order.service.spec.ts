jest.mock('@nestjs/config')
jest.mock('../inventory/inventory.service')

import { ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { InventoryService } from '../inventory/inventory.service'
import { Stock } from '../stock/stock.entity'
import { OrderProducts } from './order-products.interface'
import { OrderService } from './order.service'

describe('OrderService', () => {
    let service: OrderService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ConfigService, InventoryService, OrderService],
        }).compile()

        service = module.get(OrderService)
    })

    it.each<{
        expectedStatus: ReturnType<typeof service.getOrderStatus>
        order: OrderProducts
        bought: OrderProducts
    }>([
        {
            expectedStatus: 'all',
            order: { milk: 5, skins: 1 },
            bought: { milk: 5, skins: 1 },
        },
        {
            expectedStatus: 'all',
            order: { milk: 5 },
            bought: { milk: 5 },
        },
        {
            expectedStatus: 'all',
            order: { skins: 1 },
            bought: { skins: 1 },
        },
        {
            expectedStatus: 'some',
            order: { milk: 5, skins: 1 },
            bought: { milk: 5 },
        },
        {
            expectedStatus: 'some',
            order: { milk: 5, skins: 1 },
            bought: { skins: 1 },
        },
        {
            expectedStatus: 'none',
            order: { milk: 5, skins: 1 },
            bought: {},
        },
    ])(
        'should give an order status of "$expectedStatus"',
        ({ expectedStatus, order: ordered, bought }) => {
            const status = service.getOrderStatus(ordered, bought)
            expect(status).toBe(expectedStatus)
        },
    )

    it.each<{
        stock: Stock
        order: OrderProducts
        bought: OrderProducts
    }>([
        {
            stock: { milk: 50, skins: 5 },
            order: { milk: 10, skins: 1 },
            bought: { milk: 10, skins: 1 },
        },
        {
            stock: { milk: 50, skins: 5 },
            order: { milk: 10 },
            bought: { milk: 10 },
        },
        {
            stock: { milk: 50, skins: 5 },
            order: { skins: 5 },
            bought: { skins: 5 },
        },
        {
            stock: { milk: 50, skins: 5 },
            order: { milk: 100, skins: 10 },
            bought: {},
        },
        {
            stock: { milk: 50, skins: 5 },
            order: { milk: 100 },
            bought: {},
        },
        {
            stock: { milk: 50, skins: 5 },
            order: { skins: 10 },
            bought: {},
        },
    ])(
        'should place an order and return what was bought',
        ({ stock, order, bought }) => {
            jest.spyOn(service, 'calculateStock').mockReturnValue(stock)
            expect(service.placeOrder(order, 42)).toEqual(bought)
        },
    )
})
