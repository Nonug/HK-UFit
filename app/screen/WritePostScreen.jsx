import * as React from "react";
import {
    NativeBaseProvider,
    Text,
    Center,
    TextArea,
    IconButton,
    HStack,
    Button,
    Box
} from "native-base";
import { useState, useEffect } from "react";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import Routes from "../navigation/routes";

async function PostContent(content) {
    console.log("Content to be post: " + content);

    try{
        let userId = await SecureStore.getItemAsync('userId');
        userId = JSON.parse(userId);
        console.log(userId);

        let REQUEST_URL = "http://groupproject26.top/api/social/create-post";
        let parameters = new FormData();
        parameters.append("google_user_id", userId);
        parameters.append('post_content', content);

        try{
            let response = await fetch(REQUEST_URL, { method: "POST", body: parameters});
            let responseJSON = await response.json();
            return responseJSON;
        }catch(error){
            console.error(error);
        }

    } catch (err) {
        console.error(err);
    }
}

function PostTextArea({navigation}){
    
    const [textAreaValue, setTextAreaValue] = useState("");

    return (
        <>
            <TextArea
                onChangeText={setTextAreaValue}
                value={textAreaValue}
                totalLines={8}
                w="90%"
                h="120"
                mt='4'
                bgColor="#ffffff"
                rounded='lg'
                borderWidth='1'
                borderColor='muted.500'
            />
            <HStack
                mt='4'
                h="30"
                w="90%"
            >
                <IconButton
                    colorScheme='primary'
                    size='10'
                    _icon={{
                    as: FontAwesome5,
                    name: "image",
                    }}
                />
                <IconButton
                    colorScheme='primary'
                    size='10'
                    _icon={{
                    as: Feather,
                    name: "hash",
                    }}
                />
            </HStack>
            <HStack mt='4'>
                <Button
                    h="10"
                    w='90%'
                    isDisabled={ textAreaValue == "" ? true : false }
                    onPress={() => {
                        PostContent(textAreaValue).then((response) => {
                            if (response == true){
                                navigation.navigate('Social Networking', {
                                    refresh: true
                                });
                            } else {

                            }
                        });
                    }}
                >
                    Send
                </Button>
            </HStack>
        </>
    )
}

export function PostScreen({route, navigation}) {
    return (
        <>
            <NativeBaseProvider>
                <Center mt="4">
                    <PostTextArea navigation={navigation}/>
                </Center>
            </NativeBaseProvider>
        </>
    )
}

export default PostScreen;