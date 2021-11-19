import * as React from "react";
import { NativeBaseProvider, Text, Button, Box, Center, Image, Divider } from "native-base";

export const HeaderCard = () => {
    return (
        <Box bgColor="#020202" w="90%" h="150" mx="4" rounded="lg">
            <Image
                h="100%"
                rounded="lg"
                source={require("../assets/images/banner-fitness.png")}
                alt="banner-fitness"
            ></Image>
            <Center position="absolute" mt="5" px="5">
                <Text fontSize="lg" color="white">
                    Reserve Fitness {"\n"}Facilities
                </Text>
            </Center>
        </Box>
    );
};

export const ScorllMenu = () => {
    return (
        <Box bgColor="primary.500" w="90%" h="150" mt="4">
        </Box>
    );
};


export default function Facilities({ navigation }) {
    return (
        <>
            <NativeBaseProvider>
                <Center mt="4">
                    <HeaderCard/>
                    <Divider w="90%" mt="4" thickness="2"/>
                    <ScorllMenu/>
                </Center>
            </NativeBaseProvider>
        </>
    );
}
