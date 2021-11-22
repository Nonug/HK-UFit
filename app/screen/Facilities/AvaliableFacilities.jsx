import * as React from 'react';
import {
    NativeBaseProvider,
    Text,
    Button,
    Box,
    VStack,
    HStack,
    Image,
    Center,
    Divider
} from "native-base"
import { useState, useEffect } from "react";

function HeaderCard(props){

    const [isLoading, setLoading] = useState(true);
    const [gymData, setGymData] = useState([]);

    useEffect(() => {
        const GetData = async () => {
            const url = "https://groupproject26.top/api/facilities/get-gym-by-id/" + props.id;
            try {
                let response = await fetch(url, {
                    method: "GET",
                });
                let gymObj = await response.json();
                setGymData(gymObj);
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
                    <Box
                        bgColor="#ffffff"
                        w="90%"
                        h="110"
                        rounded="lg"
                        shadow="3"
                    >
                        <HStack>
                            <Image
                                h="110"
                                w="100"
                                position="absolute"
                                left="0"
                                borderRadius="lg"
                                source={{
                                    uri: gymData.picture_url
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
                                    {gymData.name}
                                </Text>
                                <Text
                                    fontSize="10"
                                >
                                    {gymData.location}
                                </Text>
                            </VStack>
                        </HStack>
                    </Box>
                </>
            )}
        </>

    )
}

export function AvaliableScreen({ route, navigation }) {
    const { gymId, gymName } = route.params;

    return (
        <>
            <NativeBaseProvider>
                <Center mt="4">
                    <HeaderCard id={gymId} />
                    <Divider w="90%" my="4"/>
                </Center>
            </NativeBaseProvider>
        </>
    )
}

export default AvaliableScreen;