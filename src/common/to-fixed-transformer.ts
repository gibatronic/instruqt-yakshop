import { TransformFnParams } from 'class-transformer'

export function toFixed(number: number, digits: number = 2) {
    return parseFloat(number.toFixed(digits))
}

export function toFixedTransformer(digits: number) {
    return function ({ value }: TransformFnParams) {
        if (typeof value !== 'number') {
            return value
        }

        return toFixed(value, digits)
    }
}
