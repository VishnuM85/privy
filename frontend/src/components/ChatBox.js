import React from 'react'
import { Box } from "@chakra-ui/react";
// import "./styles.css";
import { ChatState } from "../Context/ChatProvider";
import SingleChat from './SingleChat';

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      // bg="white"
      w={{ base: "100%", md: "69%" }}
      borderRadius="3px"
      background={"RGBA(0, 0, 0, 0.5)"}
      color="white"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default Chatbox;