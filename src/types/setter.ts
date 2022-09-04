import { CodeType6, CodeType8, ConditionBlock, KeyName, Register } from "../utils/atmosphere"

export class Setter {
    register: Register
    offset: string
    value: string

    condition: ConditionBlock

    constructor(register: Register, offset: string, value: string, condition: ConditionBlock) {
        this.register = register
        this.offset = offset
        this.value = value
        this.condition = condition
    }
}

export class KeyPressSetter extends Setter {
    constructor(register: Register, offset: string = "0", value: string, keys: KeyName[]) {
        super(
            register,
            offset,
            value,
            new CodeType8({
                keys,
            })
        )
    }

    toString() {
        const { register, offset, value, condition } = this

        const start = condition.toString()

        const end = condition.endBlock.toString()

        const setter = new CodeType6({
            width: "8",
            baseRegister: register,
            incrementEnable: false,
            offsetEnable: false,
            offset: offset,
            value,
        }).toString()

        return `${start}\n${setter}\n${end}`
    }
}

export interface SetterOptions {
    type: "key"
    register: Register
    value: string
    keys?: KeyName[]
}

export const createSetter = (options: SetterOptions) => {
    switch (options.type) {
        case "key": {
            return new KeyPressSetter(options.register, "0", options.value, options.keys!)
        }
        default: {
            throw new Error("Invalid setter type")
        }
    }
}
