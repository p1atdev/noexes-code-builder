import { CodeType8, KeyName, Register } from "./atmosphere"

export const createKeyPressCondition = (keys: KeyName[]) => {
    const code = new CodeType8({
        keys,
    })
    return code
}
