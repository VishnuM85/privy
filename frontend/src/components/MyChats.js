import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import { Button } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import GroupChatModal from "./miscellaneous/GroupChatModal";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  },[fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "30%" }}
      borderRadius="3px"
      background={"RGBA(0, 0, 0, 0.3)"}
    >
      <Box
        pb={3}
        px={2}
        fontSize={{ base: "28px", md: "30px" }}
        // fontFamily="Work sans"
        flexDir={{base:"row",md:"column",lg:"row"}}
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        // background={"transparent"}
      >
        <Text color={"white"} display="flex" fontFamily="satisfy" fontWeight={"800"}>ChaTs</Text>
        <GroupChatModal>
          <Button
            display="flex"
            // flexDir={"column"}
            fontSize={{ base: "17px", md: "17px", lg: "17px" }}
            // width={{ base: "100%", md: "auto", lg: "100%" }}
            background={"RGBA(0, 0, 0, 0.2)"}
            color={"lightgrey"}
            _hover={{bg:"RGBA(0, 0, 0, 0.4)"}}
            borderRadius="3px"
            rightIcon={<AddIcon />}
            fontFamily="poppins"
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={2}
        // bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg="transparent"
                background={selectedChat === chat ? "RGBA(0, 176, 179,0.7)" : "RGBA(0, 0, 0, 0.2)"}
                _hover={{background:"RGBA(0, 176, 179,0.3)"}}
                color={selectedChat === chat ? "#f2f2f2" : "black"}
                px={3}
                py={2}
                borderRadius="5px"
                // border={selectedChat === chat ?"2px solid darkgrey":"0px solid white"}
                key={chat._id}
              >
                <Text fontFamily={"poppins"}><b>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </b></Text>
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;