import * as React from "react";
import {
    NativeBaseProvider,
    Text,
    Button,
    Box,
    Center,
    Image,
    Pressable,
    Divider,
    TextArea,
    ScrollView,
    VStack,
    HStack,
    IconButton,
    Avatar
} from "native-base";
import { createStackNavigator } from '@react-navigation/stack';
import { RankingScreen } from './RankingScreen';
import { PostScreen } from './WritePostScreen';
import { useState, useEffect } from "react";
import { FontAwesome5, Feather } from "@expo/vector-icons";

const HeaderCardRanking = ({navigation}) => {
    return (
        <Box bgColor="#020202" w="50%" h="100" rounded="lg">
            <Pressable
                onPress={() => {
                    navigation.navigate('Daily Ranking');
                }}
            >
                <Image
                    h="100%"
                    rounded="lg"
                    source={require("../assets/images/Ranking_Banner.png")}
                    alt="banner-fitness"
                ></Image>
            </Pressable>
        </Box>
    );
};

const HeaderCardPost = ({navigation}) => {
    return (
        <Box bgColor="#020202" w="90%" h="100" mt='2' mx="4" rounded="lg">
            <Pressable
                onPress={() => {
                    navigation.navigate('Write Post');
                }}
            >
                <Image
                    h="100%"
                    rounded="lg"
                    source={require("../assets/images/Post_Banner.png")}
                    alt="banner-fitness"
                ></Image>
            </Pressable>
        </Box>
    );
};

const PostsList = ({route, navigation}) => {

    const [isLoading, setLoading] = useState(true);
    const [postsData, setPostsData] = useState([]);

    const refreshComponent = async () => {
        try{
            let response = await fetch("https://groupproject26.top/api/social/get-all-posts");
            let responseJson = await response.json();
            console.log(responseJson.data);
            setPostsData(responseJson.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const bootstrapAsync = async () => {
            try{
                let response = await fetch("https://groupproject26.top/api/social/get-all-posts");
                let responseJson = await response.json();
                console.log(responseJson.data);
                return responseJson.data;
            } catch (error) {
                console.error(error);
            }
        };
        bootstrapAsync().then((responseData) => {
            setPostsData(responseData);
        }).then(setLoading(false));
    }, []);

    if (route.params != null && route.params.refresh == true) {
        refreshComponent();
        navigation.setParams({
            refresh: false
        });
    }

    return (<>
        <HStack
            w="90%"
            space={1}
        >   
            <HeaderCardRanking navigation={navigation}/>
            <Box bgColor="#020202" w="50%" h="100" rounded="lg">
                <Pressable
                    onPress={() => {
                        navigation.navigate('Write Post');
                    }}
                >
                    <Image
                        h="100%"
                        rounded="lg"
                        source={require("../assets/images/Post_Banner.png")}
                        alt="banner-fitness"
                    ></Image>
                </Pressable>
            </Box>
        </HStack>



        <Divider w="90%" mt="4" thickness="2" />

        { isLoading ? null : (
            <>
                {
                    postsData.map(function(item){
                        return (
                            <>
                                <HStack
                                    mt='2'
                                    w="90%"
                                    space='4'
                                >
                                    <Avatar
                                        bg="indigo.500"
                                        alignSelf="center"
                                        size="md"
                                        source={{
                                            uri: item.user_avatar_url,
                                        }}
                                    />
                                    <VStack>
                                        <HStack
                                            w="280"
                                        >
                                            <Text
                                                fontSize='xs'
                                                color={'light.500'}
                                            >{item.user_name}</Text>
                                            <Text
                                                fontSize='xs'
                                                color={'light.500'}
                                                position='absolute'
                                                right='0'
                                            >{item.timestamp}
                                            </Text>
                                        </HStack>
                                        <Text mt='2'>{item.post_content}</Text>
                                    </VStack>
                                </HStack>
                                <Divider
                                    mt='2'
                                />
                            </>
                        );
                    })
                }
            </>
        )}
    </>)
}

export function SocialMainPage({ route, navigation }) {

    return (
        <>
            <NativeBaseProvider>
                <ScrollView>
                    <Center mt="4">
                            
                            <PostsList route={route} navigation={navigation}/>
                    </Center>
                </ScrollView>
            </NativeBaseProvider>
        </>
    );
}

export default function SocialScreen() {

    const Stack = createStackNavigator();

    return (
        <>
            <Stack.Navigator
                initialRouteName="Social Networking"
                headerShown="false"
            >
                <Stack.Screen
                    name="Social Networking"
                    component={SocialMainPage}
                    initialParams={{ refresh: true }}
                />
                <Stack.Screen
                    name="Daily Ranking"
                    component={RankingScreen}
                />
                <Stack.Screen
                    name="Write Post"
                    component={PostScreen}
                />
            </Stack.Navigator>
        </>
    );
};
