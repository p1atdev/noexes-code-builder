export interface NoexesCode {
    baseRegion: "main" | "heap"
    pointerOffsets: string[]
    lastOffset: {
        operand: "+" | "-"
        value: string
    }
}

export const parseNoexesCode = (code: string) => {
    const tokens = code.split(/[\[\]]/).filter((token) => token !== "")

    const region = tokens[0].split("+")[0]

    tokens[0] = tokens[0].split("+")[1]

    const offests: string[] = []

    for (const token of tokens.slice(0, Math.max(tokens.length - 1, 1))) {
        offests.push(token.replace("+", ""))
    }

    const [lastOperand, ...lastOffset] = tokens[tokens.length - 1].split("")

    const parsed: NoexesCode = {
        baseRegion: region as "main" | "heap",
        pointerOffsets: offests,
        lastOffset: {
            operand: lastOperand as "+" | "-",
            value: lastOffset.join(""),
        },
    }

    return parsed
}
