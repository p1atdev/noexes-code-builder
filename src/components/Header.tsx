import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import { Button, Heading, HStack, Spacer, Switch, useColorMode } from "@chakra-ui/react"

const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <HStack>
            <Heading as={"h1"}>Noexes Code Builder</Heading>
            <Spacer />
            <Button onClick={toggleColorMode}>{colorMode === "light" ? <MoonIcon /> : <SunIcon />}</Button>
        </HStack>
    )
}

export default Header
