import { INestApplication, Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap(routePrefix: string, title: string) {
    const app = await createApp(routePrefix)
    const logger = new Logger('bootstrap')

    setupSwagger(app, routePrefix, title)
    await app.listen(3000)

    logger.log(`Serving at ${await app.getUrl()}`)
}

async function createApp(routePrefix: string) {
    const app = await NestFactory.create<NestExpressApplication>(AppModule)

    app.disable('x-powered-by')
    app.setGlobalPrefix(routePrefix)

    return app
}

function setupSwagger(
    app: INestApplication,
    routePrefix: string,
    title: string,
) {
    const swaggerConfig = new DocumentBuilder()
        .setTitle(title)
        .setExternalDoc('OpenAPI JSON', `/${routePrefix}-json`)
        .build()

    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig)

    SwaggerModule.setup(routePrefix, app, swaggerDocument, {
        customSiteTitle: title,
    })
}

bootstrap('yak-shop', 'YakShop')
