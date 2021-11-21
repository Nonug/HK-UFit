import * as React from "react";
import { NativeBaseProvider, HStack,
    Text, Button, Box, Center, Image, Divider, VStack } from "native-base";
import { useState, useEffect } from "react";

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

export function ScorllMenu(){

    const [isLoading, setLoading] = useState(true);
    const [gymData, setGymData] = useState([]);

    useEffect(() => {
        const GetData = async () => {
            const url = "https://groupproject26.top/api/facilities/get-gym";
            try {
                let response = await fetch(url, {
                    method: "GET",
                });
                let gymObj = await response.json();
                setGymData(gymObj.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        GetData();
    }, [])

    return (
        <>
            {isLoading ? null : (
                <>
                    {
                        gymData.map(function (item){
                            return (
                                <Box
                                    key={item.id}
                                    bgColor="#ffffff"
                                    w="90%"
                                    h="110"
                                    rounded="lg"
                                    shadow="5"
                                    mt="4"
                                >
                                    <HStack>
                                        <Image
                                            h="110"
                                            w="100"
                                            position="absolute"
                                            left="0"
                                            borderRadius="lg"
                                            source={{
                                                uri: item.picture_url
                                            }}
                                            alt="image"
                                        />
                                        <VStack
                                            space={2}
                                            position="absolute"
                                            left='120'
                                            top="3"
                                        >
                                            <Text>
                                                {item.name}
                                            </Text>
                                            <Text
                                                fontSize="10"
                                            >
                                                {item.location}
                                            </Text>
                                            <Button
                                                h="8"
                                                w="50"
                                                size="sm"
                                            >
                                                Book
                                            </Button>
                                        </VStack>
                                    </HStack>
                                </Box>
                            );
                        })
                    }
                </>
            )}
        </>
    );
}


export default function Facilities({ navigation }) {
    return (
        <NativeBaseProvider>
            <Center mt="4">
                <HeaderCard/>
                <Divider w="90%" mt="4" thickness="2"/>
                <ScorllMenu/>
            </Center>
        </NativeBaseProvider>
    );
};
