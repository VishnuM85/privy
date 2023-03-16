import React from 'react'
import { ViewIcon } from '@chakra-ui/icons';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    IconButton,
    Text,
    Image
  } from "@chakra-ui/react";

const ProfileModal = ({user,children}) => {

  const { isOpen,onOpen,onClose}=useDisclosure();

  return (
    <>
        {children?(
            <span onClick={onOpen} >{children}</span>
        ):(
            <IconButton d={{base:"flex"}} background="transparent" _hover={{backgroundColor:"rgba(0,0,0,0.5)"}} icon={<ViewIcon/>} onClick={onOpen}/>
        )}

    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent background={"RGBA(0, 0, 0, 0.9)"} color="lightgrey">
          <ModalHeader
            fontFamily={"Righteous"}
            fontSize="40px"
            display={"flex"}
            justifyContent="center"
          >{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody 
          display={"flex"}
          flexDir="column"
          alignItems={"center"}
          justifyContent={"space-between"}
          >
            <Image
            borderRadius={"full"}
            boxSize={"200px"}
            src={user.pic}
            alt={user.name}
            marginBottom="3vh"
            />
            <Text as={"span"}
            fontSize={{base:"28px",md:"30px"}}
            fontFamily="poppins"
            >
               E-mail: <Text as={"span"} fontSize={{base:"28px",md:"30px"}}>&ensp;{user.email}</Text>
            </Text>
          </ModalBody>

          <ModalFooter>
            {/* <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProfileModal