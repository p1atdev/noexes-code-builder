// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { Register } from "../../utils/atmosphere"
import { convertToSXOS } from "../../utils/convert"
import { parseNoexesCode } from "../../utils/parser"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.status(405).json({ error: "Method not allowed" })
        return
    }

    const body = JSON.parse(req.body)

    const code = body.code
    const register = body.register

    if (!code || !register) {
        res.status(400).json({ error: "Missing value" })
        return
    }

    if (typeof code !== "string" || typeof register !== "string") {
        res.status(400).json({ error: "Value must be a string" })
        return
    }

    const parsed = parseNoexesCode(code)
    const converted = convertToSXOS(parsed, register as Register)
        .map((code) => code.toString())
        .join("\n")

    res.status(200).json({ code: converted })
}
