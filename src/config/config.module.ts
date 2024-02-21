import { ConfigModule as ConfigBuilder } from '@nestjs/config'
import { join } from 'path'
import { loader } from './config.loader'

export const ConfigModule = ConfigBuilder.forRoot({
    load: [loader(join(__dirname, '..', '..', 'config', 'herd.xml'))],
})
