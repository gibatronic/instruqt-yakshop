import { XMLParser } from 'fast-xml-parser'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { Yak } from '../herd/yak.entity'
import { Config } from './config.entity'

type Data = {
    herd: {
        labyak: Yak[]
    }
}

function isDataValid(data: unknown): data is Data {
    return data &&
        typeof data === 'object' &&
        'herd' in data &&
        data.herd &&
        typeof data.herd === 'object' &&
        'labyak' in data.herd
        ? true
        : false
}

export async function loader(): Promise<Config> {
    const content = await readFile(join(__dirname, 'herd.xml'), 'utf-8')

    const parser = new XMLParser({
        attributeNamePrefix: '',
        ignoreAttributes: false,
        isArray: (_, jPath) => jPath === 'herd.labyak',
        parseAttributeValue: true,
    })

    const data = parser.parse(content, true)

    if (!isDataValid(data)) {
        throw new Error('invalid config')
    }

    return {
        herd: data.herd.labyak.map((yak: Yak) => ({
            ...yak,
            ageLastShaved: 0,
        })),
    }
}
