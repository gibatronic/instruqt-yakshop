import { XMLParser } from 'fast-xml-parser'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { Yak } from '../herd/yak.entity'
import { Config } from './config.entity'

type Data = {
    herd: {
        // fast-xml-parser returns a single object when
        // there's only one child instead of a list
        labyak: Yak | Yak[]
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
        parseAttributeValue: true,
    })

    const data = parser.parse(content, true)

    if (!isDataValid(data)) {
        throw new Error('invalid data')
    }

    return {
        herd: Array.isArray(data.herd.labyak)
            ? data.herd.labyak.map(normalizeYak)
            : [normalizeYak(data.herd.labyak)],
    }
}

function normalizeYak(yak: Yak): Yak {
    return {
        ...yak,
        age: yak.age * 100,
        ageLastShaved: 0,
    }
}
