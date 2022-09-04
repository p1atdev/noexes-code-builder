export type CodeType = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "A" | "B"
export type Register = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "A" | "B" | "C" | "D" | "E" | "F"

export class CodeBlock {
    type: CodeType
    first: string
    other: string[] = []

    constructor(type: CodeType, first: string, other: string[]) {
        this.type = type
        this.first = first
        this.other = other
    }

    toString() {
        return `${this.type}${this.first} ${this.other.join(" ")}`
    }
}

export class ConditionBlock extends CodeBlock {
    endBlock = new CodeType2()
}

export class CodeType2 extends CodeBlock {
    constructor() {
        super("2", "0000000", [])
    }
}

export interface CodeType5Options {
    width: "1" | "2" | "4" | "8"
    region?: "main" | "heap"
    loadFromRegister: Boolean
    register: Register
    offset: string
}

export class CodeType5 extends CodeBlock {
    constructor({ width, region, loadFromRegister = false, register, offset }: CodeType5Options) {
        const regionNum = (() => {
            if (loadFromRegister) {
                return "0"
            }
            switch (region) {
                case "main": {
                    return "0"
                }
                case "heap": {
                    return "1"
                }
            }
        })()
        const fullOffset = offset.padStart(10, "0")

        super("5", `${width}${regionNum}${register}${loadFromRegister ? "1" : "0"}0${fullOffset.slice(0, 2)}`, [
            fullOffset.slice(2, 10),
        ])
    }
}

export interface CodeType6Options {
    width: "1" | "2" | "4" | "8"
    baseRegister: Register
    incrementEnable: Boolean
    offsetEnable: Boolean
    offset?: string
    value: string
}

export class CodeType6 extends CodeBlock {
    constructor({ width, baseRegister, incrementEnable, offsetEnable, offset = "0", value }: CodeType6Options) {
        const incrementEnableNum = incrementEnable ? "1" : "0"
        const offsetEnableNum = offsetEnable ? "1" : "0"
        const fullValue = value.padStart(16, "0")

        super("6", `${width}0${baseRegister}${incrementEnableNum}${offsetEnableNum}${offset}0`, [
            fullValue.slice(0, 8),
            fullValue.slice(8, 16),
        ])
    }
}

export type LegacyOperand = "+" | "-" | "*" | "<" | ">"

export interface CodeType7Options {
    width: "1" | "2" | "4" | "8"
    register: Register
    operand: LegacyOperand
    value: string
}

export class CodeType7 extends CodeBlock {
    constructor({ width, register, operand, value }: CodeType7Options) {
        const fullValue = value.padStart(8, "0")
        const operandNum =
            operand === "+" ? "0" : operand === "-" ? "1" : operand === "*" ? "2" : operand === "<" ? "3" : "4"

        super("7", `${width}0${register}${operandNum}000`, [fullValue])
    }
}

export const KeyCodes: Record<KeyName, number> = {
    A: 0x00000001,
    B: 0x00000002,
    X: 0x00000004,
    Y: 0x00000008,
    LSTICK: 0x00000010,
    RSTICK: 0x00000020,
    L: 0x00000040,
    R: 0x00000080,
    ZL: 0x00000100,
    ZR: 0x00000200,
    PLUS: 0x00000400,
    MINUS: 0x00000800,
    DLEFT: 0x00001000,
    DUP: 0x00002000,
    DRIGHT: 0x00004000,
    DDOWN: 0x00008000,
    LSTICK_LEFT: 0x00010000,
    LSTICK_UP: 0x00020000,
    LSTICK_RIGHT: 0x00040000,
    LSTICK_DOWN: 0x00080000,
    RSTICK_LEFT: 0x00100000,
    RSTICK_UP: 0x00200000,
    RSTICK_RIGHT: 0x00400000,
    RSTICK_DOWN: 0x00800000,
}

export type KeyName =
    | "A"
    | "B"
    | "X"
    | "Y"
    | "LSTICK"
    | "RSTICK"
    | "L"
    | "R"
    | "ZL"
    | "ZR"
    | "PLUS"
    | "MINUS"
    | "DLEFT"
    | "DUP"
    | "DRIGHT"
    | "DDOWN"
    | "LSTICK_LEFT"
    | "LSTICK_UP"
    | "LSTICK_RIGHT"
    | "LSTICK_DOWN"
    | "RSTICK_LEFT"
    | "RSTICK_UP"
    | "RSTICK_RIGHT"
    | "RSTICK_DOWN"

export interface CodeType8Options {
    keys: KeyName[]
}

export class CodeType8 extends ConditionBlock {
    constructor({ keys }: CodeType8Options) {
        const keyCode = keys.reduce((acc, cur) => acc + KeyCodes[cur], 0)

        super("8", keyCode.toString(16).padStart(7, "0"), [])
    }
}
