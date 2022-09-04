// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { Register } from "../../utils/atmosphere"
import { convertToSXOS } from "../../utils/convert"
import { parseNoexesCode } from "../../utils/parser"

interface CodeOptions {
    noexesCode: string
    register: Register
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.status(405).json({ error: "Method not allowed" })
        return
    }

    const body = JSON.parse(req.body)

    const code: CodeOptions = body.code

    if (!code) {
        res.status(400).json({ error: "Missing value" })
        return
    }

    const parsed = parseNoexesCode(code.noexesCode)
    const converted = convertToSXOS(parsed, code.register)
        .map((code) => code.toString())
        .join("\n")

    res.status(200).json({ code: converted })
}
