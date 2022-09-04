// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { createSetter } from "../../types/setter"
import { KeyName, Register } from "../../utils/atmosphere"

interface SetterOptions {
    type: "key"
    register: Register
    keys?: KeyName[]
    value: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.status(405).json({ error: "Method not allowed" })
        return
    }

    const body = JSON.parse(req.body)
    const setter: SetterOptions = body.setter

    if (!setter) {
        res.status(400).json({ error: "Missing value" })
        return
    }

    const setterBlock = createSetter({ ...setter })

    const result = setterBlock.toString()

    res.status(200).json({ setter: result })
}
