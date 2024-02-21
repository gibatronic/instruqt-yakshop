import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule)

    app.disable('x-powered-by')
    app.setGlobalPrefix('yak-shop')

    const swaggerConfig = new DocumentBuilder()
        .setTitle('YakShop')
        .setExternalDoc('OpenAPI JSON', 'yak-shop-json')
        .build()

    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig)

    SwaggerModule.setup('yak-shop', app, swaggerDocument, {
        customSiteTitle: 'YakShop',
    })

    await app.listen(3000)
}

bootstrap()
