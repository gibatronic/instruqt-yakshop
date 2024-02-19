import { ConfigModule as ConfigBuilder } from '@nestjs/config'
import { loader } from './config.loader'

export const ConfigModule = ConfigBuilder.forRoot({
    load: [loader],
})
