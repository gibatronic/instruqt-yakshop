import { TransformFnParams } from 'class-transformer'
import { toFixedTransformer } from './to-fixed-transformer'

describe('toFixedTransformer', () => {
    it.each([
        { input: 0.1 + 0.2, digits: 2, output: 0.3 },
        { input: 9.987, digits: 2, output: 9.99 },
        { input: 9.987, digits: 1, output: 10 },
        { input: undefined, digits: 3, output: undefined },
        { input: NaN, digits: 3, output: NaN },
        { input: null, digits: 3, output: null },
    ])('should transform $input into $output', ({ input, digits, output }) => {
        const transformer = toFixedTransformer(digits)
        expect(transformer({ value: input } as TransformFnParams)).toBe(output)
    })
})
