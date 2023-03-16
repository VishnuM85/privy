import React, 
{ 
  // useEffect,
   useState } from 'react';
// import axios from 'axios';
import { Box } from "@chakra-ui/react";
import ChatBox from "../components/ChatBox";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/MyChats";
import { ChatState } from "../Context/ChatProvider";

const ChatPage = () => {
  const [fetchAgain,setFetchAgain]=useState(false);
//   const [chats, setChats] = useState([])
//   const fetchChats=async()=>{
//   const {data}=await axios.get("/api/chat");
//   setChats(data);
// };
// useEffect(()=>{
//   fetchChats();
// },[]);
  const {user}= ChatState();

  return (
    <div style={{width:"100%"}}>
      {user && <SideDrawer/>}
      <Box
      display="flex"
      justifyContent={"space-between"}
      w="100%"
      h="92vh"
      p="10px"
      >
          {user && <MyChats fetchAgain={fetchAgain}/>}
          {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
      </Box>
    </div>
  );
};

export default ChatPage;