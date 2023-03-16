import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/react";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from "@chakra-ui/menu";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay
} from "@chakra-ui/modal";
import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";  
import { useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";   
import { useToast } from "@chakra-ui/toast";
import ChatLoading from "../ChatLoading";
import { Spinner } from "@chakra-ui/spinner";
// import ProfileModal from "./ProfileModal";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import UserListItem from "../UserAvatar/UserListItem";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { getSender } from "../../config/ChatLogics";

const SideDrawer=()=>{
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);


// function SideDrawer() {
//   const [search, setSearch] = useState("");
//   const [searchResult, setSearchResult] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [loadingChat, setLoadingChat] = useState(false);

  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats
  } = ChatState();

  const { isOpen, onClose, onOpen } = useDisclosure();
  const history = useHistory();
  
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };
  
  const toast = useToast();  

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Invalid Search",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
//     console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    // <div>SideDrawer</div>
    <>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems="center"
        bg="transparent"
        w="100%"
        padding="7px 10px 0px 10px"
        // borderWidth="1px"
      >
        <Tooltip>
          <Button background={"transparent"} _hover={{bgColor:"rgba(0,0,0,0.1)"}} 
          onClick={onOpen}
          >
            <i className="fas fa-search"></i>
            <Text color={"RGBA(0, 0, 0, 1)"} fontSize={17} fontFamily="poppins" display={{ base: "none", md: "flex",lg:"inline" }} px={2}>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Box>
        <Text as={"span"} fontSize="3xl" fontWeight={1000} fontFamily="Satisfy">
          Pri
          <Text as="span" color={"white"}>V</Text>y
        </Text>
        </Box>
        <div>
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            <MenuList pl={2}> 
               {!notification.length && "No new messages."}
               {notification.map(notif=>(
                 <MenuItem key={notif._id} 
                    onClick={()=>{setSelectedChat(notif.chat);
                    setNotification(notification.filter((n)=>n!==notif));}}
                 >  
                   {notif.chat.isGroupChat
                      ? `New message in ${notif.chat.chatName}`
                      : `New message from ${getSender(user,notif.chat.users)}`}
                 </MenuItem>
               ))}
            </MenuList>
          </Menu>
          <Menu color="white" backgroundColor={"rgba(0,0,0,0.8)"}>
            <MenuButton background={"transparent"} as={Button} rightIcon={<ChevronDownIcon mt={2}/>}
            _hover={{ bgColor:"rgba(0, 0, 0, 0.1)"}} variant="unstyled"
            padding={"0px 10px"} margin={"0px"}
            >
              <Avatar size="sm" cursor="pointer" name={user.name} src={user.pic}/>
            </MenuButton>
            <MenuList color="white" backgroundColor={"rgba(0,0,0,0.8)"} pl={2} pr={2} border="none" lineHeight="28px">
              <ProfileModal user={user}>
                <MenuItem bg={"transparent"} borderRadius="3px" _hover={{background:"RGBA(0, 176, 179,0.3)"}} border="none">My Profile</MenuItem>
              </ProfileModal>
              <MenuItem bg={"transparent"} borderRadius="3px" _hover={{background:"RGBA(255, 0, 0, 0.3)"}} border="none" onClick={logoutHandler}>Log Out</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement='left' onClose={onClose} fontFamily="poppins" isOpen={isOpen }>
        <DrawerOverlay/>
        <DrawerContent fontFamily={"poppins"} color="white" backgroundColor={"rgba(0,0,0,0.8)"}>
          {/* <DrawerHeader  marginBottom="7px" >Search Users</DrawerHeader> */}
        <DrawerBody>
          
          <Box display={"flex"} pt={3} pb={5}>
            <Input
              placeholder="Name or email"
              mr={2}
              ml={0}
              value={search}
              borderStyle="none"
              background={"transparent"}
              variant="flushed"
              focusBorderColor="purple.500"
              onChange={(e)=>setSearch(e.target.value)}
              />
            <Button 
            onClick={handleSearch} colorScheme="purple"
            >Go</Button> 
          </Box>
          
          {loading?(
             <ChatLoading/>
          ):(
            searchResult?.map(user=>(
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={()=>accessChat(user._id)}
              />
            ))
          )}
          {loadingChat && <Spinner ml={"auto"} display={"flex"}/>}
        </DrawerBody>
        </DrawerContent>
      </Drawer>

    </>
  );
};

export default SideDrawer;