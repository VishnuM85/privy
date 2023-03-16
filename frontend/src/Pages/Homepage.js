import React, { useEffect } from "react";
import {
  Box,
  Text,
  Image,
  Link,
  HStack,
  Grid,
  GridItem,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import instaimg from "../insta.png";
import gmailimg from "../gmail.png";
import twitterimg from "../twitter.png";
import downarrowimg from "../chevrons.png";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { useHistory } from "react-router-dom";

const Homepage = () => {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  return (
    <Grid
      className="grid-container"
      // id="homegrid" templateColumns='repeat(2, 1fr)' gap={0}
    >
      <GridItem
        className="grid-item"
        // id="homegrid1"
      >
        <Box align="middle" marginLeft={"5"} id="privytitle">
          <Box paddingTop={"10"}>
            <Text
              display="flex"
              as="span"
              fontSize="7xl"
              fontFamily="Satisfy"
              color="Black"
              justifyContent={"center"}
              fontWeight={1000}
            >
              Pri
            <Text
              d="flex"
              as="span"
              fontSize="7xl"
              // fontFamily=""
              color="White"
            >
              V
            </Text>
              y.
            </Text>
          </Box>
          <Text
            marginLeft={"-8"}
            paddingRight="10px"
            marginTop="-5"
            fontFamily={"Montserrat Alternates"}
          >
            Funky Secured
          </Text>
        </Box>
        <Box>
          <div className="main">
            <div className="roller">
              <span id="rolltext">
                <div id="quotes">
                  <Text>Privacy is not</Text>
                  <Text>negotiable</Text>
                </div>
                <br />
                <div id="quotes">
                  <Text>Music when you're</Text>
                  <Text>out of talk</Text>
                </div>
                <br />
                <div id="quotes">
                  <Text>Connect with</Text>
                  <Text>different profiles</Text>
                </div>
                <br />
                <div id="quotes">
                  <Text>Want a suggestion?</Text>
                  <Text>Watch-Party!</Text>
                </div>
                <br />
              </span>
            </div>
          </div>
        </Box>
        <HStack id="homeContact" spacing="20px">
          <Box w="35px" h="35px">
            <Link href="https://twitter.com/_v4vishnu_">
              <Image src={twitterimg} />
            </Link>
          </Box>
          <Box w="40px" h="40px">
            <Link href="mailto: vithvishnu@gmail.com">
              <Image src={gmailimg} />
            </Link>
          </Box>
          <Box w="30px" h="30px">
            <Link href="https://www.instagram.com/__v4vishnu__/">
              <Image src={instaimg} />
            </Link>
          </Box>
        </HStack>
        <Box>
          <Box id="arrow">
            <Image w="30px" src={downarrowimg} />
          </Box>
        </Box>
      </GridItem>
      <GridItem id="homegrid2" className="grid-item">
        <Tabs variant="soft-rounded" id="tablist" width="50%">
          <TabList>
            <Tab color="#F56565" width={"50%"}>
              Login
            </Tab>
            <Tab color="#F56565" width={"50%"}>
              Sign Up
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </GridItem>
    </Grid>
  );
};

export default Homepage;
