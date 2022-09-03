import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Select,
    Spacer,
    Text,
    Textarea,
    useClipboard,
} from "@chakra-ui/react"
import { Register } from "../utils/atmosphere"
import { useState } from "react"
import useSWR from "swr"

const Home: NextPage = () => {
    const registers: Register[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]

    const [codeName, setCodeName] = useState("")
    const [noexesCode, setNoexesCode] = useState("")
    const [register, setRegister] = useState<Register>("F")
    const [result, setResult] = useState("")

    const { hasCopied, onCopy } = useClipboard(result)

    const onSubmit = async () => {
        const res = await fetch("/api/parse", {
            method: "POST",
            body: JSON.stringify({
                code: noexesCode,
                register,
            }),
        })

        if (!res.ok) {
            setResult("Error")
            return
        }

        const json = await res.json()

        if (json) {
            addCode(json.code)
        }
    }

    const addCode = (code: string) => {
        setResult(result + `[${codeName}]\n${code}\n\n`)
    }

    return (
        <Container maxW={"container.xl"} p={4}>
            <Heading as={"h1"}>Noexes Code Builder</Heading>

            <Box py={4}>
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

                    <HStack mt={2}>
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
                    </HStack>

                    <Button my={2} type="submit">
                        Generate
                    </Button>
                </form>

                <Box mt={4}>
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
            </Box>
        </Container>
    )
}

export default Home
