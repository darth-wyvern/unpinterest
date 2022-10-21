import { Box, Button, Flex, Input, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { querySearch } from "../image-management/imageSlice";

export default function AppHeader() {
	const dispatch = useDispatch()
	const bgColorHeader = useColorModeValue('white', 'gray.800')
	const btnThemeToggle = useColorModeValue('light', 'dark')
	const searchInputRef = useRef()

	const { toggleColorMode } = useColorMode()

	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch(querySearch(searchInputRef.current.value))
		searchInputRef.current.focus()
	}

	return (
		<Box position='fixed' left='0' right='0' top={0} bg={bgColorHeader}>
			<Flex gap={3} p='2rem 3rem'>
				<Box as="form" onSubmit={handleSubmit} style={{ flex: '1' }}>
					<Input placeholder='search here' ref={searchInputRef} />
					<Button type="submit" display='none'>Search</Button>
				</Box>
				<Button onClick={toggleColorMode} fontSize='small'>
					{btnThemeToggle}
				</Button>
			</Flex>
		</Box >
	)
}