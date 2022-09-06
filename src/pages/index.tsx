import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import {
    Box,
    Button,
    Checkbox,
    CheckboxGroup,
    Container,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Select,
    Spacer,
    Stack,
    Text,
    Textarea,
    useClipboard,
} from "@chakra-ui/react"
import { KeyName, Register } from "../utils/atmosphere"
import { useState } from "react"
import Header from "../components/Header"
import { useCode } from "../../hooks/useCode"

const Home: NextPage = () => {
    const registers: Register[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]
    const keyNames: KeyName[] = [
        "A",
        "B",
        "X",
        "Y",
        "L",
        "R",
        "ZL",
        "ZR",
        "MINUS",
        "PLUS",
        "LSTICK",
        "RSTICK",
        "LSTICK_LEFT",
        "LSTICK_RIGHT",
        "LSTICK_UP",
        "LSTICK_DOWN",
        "RSTICK_LEFT",
        "RSTICK_RIGHT",
        "RSTICK_UP",
        "RSTICK_DOWN",
        "DLEFT",
        "DUP",
        "DRIGHT",
        "DDOWN",
    ]

    const [codeName, setCodeName] = useState("")
    const [noexesCode, setNoexesCode] = useState("")
    const [register, setRegister] = useState<Register>("F")
    const [result, setResult] = useState("")

    const [conditionEnabled, setConditionEnabled] = useState(false)

    const [keys, setKeys] = useState<KeyName[]>([])
    const [setterValue, setSetterValue] = useState("")

    const { hasCopied, onCopy } = useClipboard(result)

    const { generateCode } = useCode()

    const onSubmit = async () => {
        const code = generateCode(
            codeName,
            {
                noexesCode,
                register,
            },
            {
                type: conditionEnabled ? "key" : "always",
                register,
                value: setterValue,
                keys,
            }
        )

        addCode(code)
    }

    const addCode = (code: string) => {
        setResult(result + `${code}\n\n`)
    }

    return (
        <Container maxW={"container.xl"} p={4}>
            <Header />

            <Stack direction={["column", "row"]} py={4} gap="4">
                <Box>
                    <Text fontSize="2xl" fontWeight={"bold"}>
                        Parameters
                    </Text>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            onSubmit()
                        }}
                    >
                        <FormControl>
                            <FormLabel>Code name</FormLabel>
                            <Input
                                placeholder="My wonderful code"
                                onChange={(e) => {
                                    setCodeName(e.target.value)
                                }}
                            />
                        </FormControl>

                        <Stack direction={{ base: "column", xl: "row" }} mt={2}>
                            <FormLabel w={"full"}>
                                <FormLabel>Pointer code</FormLabel>
                                <Input
                                    placeholder="Noexes pointer here..."
                                    onChange={(e) => {
                                        setNoexesCode(e.target.value)
                                    }}
                                />
                            </FormLabel>
                            <FormLabel w={"full"}>
                                <FormLabel>Register</FormLabel>
                                <Select
                                    placeholder="Register to use"
                                    defaultValue={"F"}
                                    onChange={(e) => {
                                        setRegister(e.target.value as Register)
                                    }}
                                >
                                    {registers.map((register) => (
                                        <option key={register} value={register}>
                                            {register}
                                        </option>
                                    ))}
                                </Select>
                            </FormLabel>
                        </Stack>

                        <FormLabel w={"full"}>
                            <FormLabel>Value</FormLabel>
                            <Input
                                placeholder="3F800000"
                                onChange={(e) => {
                                    setSetterValue(e.target.value)
                                }}
                            />
                        </FormLabel>

                        <Checkbox
                            isChecked={conditionEnabled}
                            onChange={() => {
                                setConditionEnabled(!conditionEnabled)
                            }}
                        >
                            Use keypress combination
                        </Checkbox>

                        <Box color={conditionEnabled ? "default" : "gray.500"}>
                            <FormLabel w={"full"}>
                                <FormLabel>Key combination</FormLabel>
                                <CheckboxGroup>
                                    {keyNames.map((key) => (
                                        <Checkbox
                                            key={key}
                                            value={key}
                                            px={3}
                                            disabled={!conditionEnabled}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setKeys([...keys, key])
                                                } else {
                                                    setKeys(keys.filter((k) => k !== key))
                                                }
                                            }}
                                        >
                                            {key}
                                        </Checkbox>
                                    ))}
                                </CheckboxGroup>
                            </FormLabel>
                        </Box>

                        <Button my={2} size="lg" type="submit">
                            Generate
                        </Button>
                    </form>
                </Box>

                <Box mt={4} minW={{ md: "lg" }}>
                    <Text fontSize="2xl" fontWeight={"bold"}>
                        Result
                    </Text>

                    <Textarea my={4} placeholder="code result will be here..." value={result} />

                    <HStack>
                        <Button colorScheme="blue" size={"lg"} onClick={onCopy}>
                            {hasCopied ? "Copied!" : "Copy"}
                        </Button>

                        <Spacer />

                        <Button
                            variant={"outline"}
                            onClick={() => {
                                setResult("")
                            }}
                        >
                            Clear result
                        </Button>
                    </HStack>
                </Box>
            </Stack>
        </Container>
    )
}

export default Home
