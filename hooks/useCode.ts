import { createSetter, SetterOptions } from "../src/types/setter"
import { KeyName, Register } from "../src/utils/atmosphere"
import { convertToSXOS } from "../src/utils/convert"
import { NoexesCode, parseNoexesCode } from "../src/utils/parser"

interface CodeOptions {
    noexesCode: string
    register: Register
}

export const useCode = () => {
    const parse = (code: string) => {
        return parseNoexesCode(code)
    }
    const convert = (code: NoexesCode, register: Register) => {
        return convertToSXOS(code, register)
    }

    const generateCode = (name: string, codeOptions: CodeOptions, setterOptions: SetterOptions) => {
        const parsed = parse(codeOptions.noexesCode)
        const converted = convert(parsed, codeOptions.register)
        const setter = createSetter(setterOptions).toString()

        const result = converted.map((code) => code.toString()).join("\n")

        return `[${name}]\n${result}\n${setter}`
    }

    return {
        generateCode,
    }
}
