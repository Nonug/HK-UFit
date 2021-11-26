import * as React from "react";
import { NativeBaseProvider, HStack,
    Text, Button, Box, Center, Image, Divider, VStack,
    IconButton,
    CloseIcon,
    Alert
} from "native-base";
import { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { AvaliableScreen } from './Facilities/AvaliableFacilities'

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

export function ScorllMenu({ navigation }){

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
                                                variant="subtle"
                                                onPress={
                                                    () => {
                                                        navigation.navigate("Avaliable Facilities", {
                                                            gymId: item.id,
                                                            gymName: item.name
                                                        })
                                                    }
                                                }
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

export function Facilities({ route, navigation }){

    return (
        <>
            <NativeBaseProvider>
                { route.params != null && route.params.showInfo == true ? (
                        <Alert w="100%" status={route.params.toastStatus}>
                            <VStack space={2} flexShrink={1} w="100%">
                                <HStack flexShrink={1} space={2} justifyContent="space-between">
                                    <HStack space={2} flexShrink={1}>
                                    <Alert.Icon mt="1" />
                                    <Text fontSize="md" color="coolGray.800">
                                        {route.params.toastContent}
                                    </Text>
                                    </HStack>
                                    <IconButton
                                        variant="unstyled"
                                        icon={<CloseIcon size="3" color="coolGray.600" />}
                                        onPress={() => {
                                            console.log("set Params");
                                            navigation.setParams({
                                                showInfo: false,
                                                toastStatus: null,
                                                toastContent: null
                                            });
                                        }}
                                    />
                                </HStack>
                            </VStack>
                        </Alert>
                ) : null}
                <Center mt="4">

                    <HeaderCard />
                    <Divider w="90%" mt="4" thickness="2" />
                    <ScorllMenu navigation={navigation}/>
                </Center>

            </NativeBaseProvider>
        </>
    );
}

export default function FacilitiesScreen({ navigation }) {
    const Stack = createStackNavigator();

    return (
        <>
            <Stack.Navigator
                initialRouteName="FindFacilities"
                headerShown = 'false'
            >
                <Stack.Screen
                    name="Avaliable Facilities"
                    component={AvaliableScreen}
                />
                <Stack.Screen
                    name="FindFacilities"
                    component={Facilities}
                    options={{
                        title: "Facilities Booking"
                    }}
                />
            </Stack.Navigator>
        </>
    );
};


