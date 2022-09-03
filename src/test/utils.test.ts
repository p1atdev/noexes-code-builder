import { expect, test } from "vitest"
import { CodeType5, CodeType6, CodeType7 } from "../utils/atmosphere"
import { convertToSXOS } from "../utils/convert"
import { parseNoexesCode } from "../utils/parser"

test("parse test", () => {
    const code = "[[[[main+5A81C78]+F8]+88]+28]+7A8"

    const parsed = parseNoexesCode(code)

    expect(parsed.baseRegion).toBe("main")
    expect(parsed.pointerOffsets).toEqual(["5A81C78", "F8", "88", "28"])
    expect(parsed.lastOffset.operand).toBe("+")
})

test("convert test", () => {
    const code = "[[[[main+5A81C78]+F8]+88]+28]+7A8"

    const parsed = parseNoexesCode(code)

    const converted = convertToSXOS(parsed, "F")

    console.log(converted)
})

test("code block 5", () => {
    const type5 = new CodeType5({
        width: "8",
        region: "main",
        loadFromRegister: false,
        register: "F",
        offset: "5A81C78",
    })

    const result = type5.toString()

    expect(result).toBe("580F0000 05A81C78")
})

test("code block 5 load from register", () => {
    const type5 = new CodeType5({
        width: "8",
        loadFromRegister: true,
        register: "F",
        offset: "1234",
    })

    const result = type5.toString()

    expect(result).toBe("580F1000 00001234")
})

test("code block 6", () => {
    const type6 = new CodeType6({
        width: "8",
        baseRegister: "F",
        incrementEnable: false,
        offsetEnable: false,
        value: "3F800000",
    })

    const result = type6.toString()

    expect(result).toBe("680F0000 00000000 3F800000")
})

test("code block 7", () => {
    const type7 = new CodeType7({
        width: "4",
        register: "F",
        operand: "+",
        value: "7A8",
    })

    const result = type7.toString()

    expect(result).toBe("740F0000 000007A8")
})
