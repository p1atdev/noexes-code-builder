import { NoexesCode } from "./parser"
import { CodeType5, CodeType7, Register } from "./atmosphere"

export const convertToSXOS = (code: NoexesCode, register: Register) => {
    const { baseRegion, pointerOffsets, lastOffset } = code

    const region = baseRegion === "main" ? "main" : "heap"

    const sxosCode = []

    sxosCode.push(
        new CodeType5({
            width: "8",
            region,
            loadFromRegister: false,
            register: register,
            offset: pointerOffsets[0],
        })
    )

    for (const offset of pointerOffsets) {
        sxosCode.push(
            new CodeType5({
                width: "8",
                loadFromRegister: true,
                register: register,
                offset,
            })
        )
    }

    sxosCode.push(
        new CodeType7({
            width: "8",
            register: register,
            operand: lastOffset.operand,
            value: lastOffset.value,
        })
    )

    return sxosCode
}
