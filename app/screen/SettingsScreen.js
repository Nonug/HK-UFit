import * as React from "react";
import { useState, useEffect } from "react";
import {
    NativeBaseProvider,
    Text,
    Button,
    Center,
    HStack,
    Box,
    Avatar,
    VStack,
    Divider,
    Heading,
    FlatList,
    Spacer,
    Icon,
    Pressable
} from "native-base";
import { AuthContext } from "../../App";
import * as SecureStore from "expo-secure-store";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import MenuItem from "../components/MenuItem";

const Menu = () => {
    const data = [
        {
            id: "1",
            func: "Profile",
            componentName: "person",
        },
        {
            id: "2",
            func: "Preferences",
            componentName: "settings",
        },
        {
            id: "3",
            func: "Contributors",
            componentName: "emoji-people",
        },
        {
            id: "4",
            func: "Privacy Policy & Terms of Service",
            componentName: "privacy-tip",
        },
    ];
    return (
        <Box
            w={{
                base: "100%",
                md: "25%",
            }}
        >
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <MenuItem onPress={() => console.log(item.func + " was pressed")} data={item}/>
                )}
                keyExtractor={(item) => item.id}
            />
        </Box>
    );
};

export default function Setting() {

    const [isLoading, setLoading] = useState(true);
    const [email, setEmail] = useState([]);
    const [imgUrl, setImgUrl] = useState([]);
    const [name, setName] = useState([]);

    const { signOut } = React.useContext(AuthContext);

    useEffect(() => {

        const bootstrapAsync = async () => {
            try {
                //Get userId from SecureStore, remember to JSON.parse()
                var userId = await SecureStore.getItemAsync('userId');
                userId = JSON.parse(userId);
                
                try{
                    let response = await fetch("https://groupproject26.top/api/get-user-by-id/" + userId);
                    let responseJson = await response.json();
                    setName(responseJson.name);
                    setEmail(responseJson.email);
                    setImgUrl(responseJson.picture_url);
                    setLoading(false);
                } catch (error) {
                    console.error(error);
                }
                
            } catch (e) {
                console.log(e);
            }
        };
        bootstrapAsync();

    }, []);

    return (
        <>
            <NativeBaseProvider>
                <Box bg="primary.500" mb="4" mx="3" mt="4" p="15" rounded="lg">
                    <Center>
                        <HStack space="sm" mx="3">
                            <Center>
                                {isLoading ? null : (
                                    <Avatar
                                        borderWidth="2"
                                        borderColor="primary.200"
                                        size="lg"
                                        source={{
                                            uri: imgUrl,
                                        }}
                                    ></Avatar>
                                )}
                            </Center>
                            <Center w="250">
                                <VStack>
                                    <Center>
                                        <Text color="#ffffff" fontSize="md">
                                            {isLoading ? null : name}
                                        </Text>
                                    </Center>
                                    <Center pt="2">
                                        <Text color="#ffffff" fontSize="xs">
                                            {isLoading ? null : email}
                                        </Text>
                                    </Center>
                                </VStack>
                            </Center>
                        </HStack>
                    </Center>
                </Box>
                <Divider thickness="2" />
                <Menu />
                <Box mt="4">
                    <Button
                        h="10"
                        mx="3"
                        colorScheme="primary"
                        bg="primary.500"
                        onPress={() => {
                            signOut();
                        }}
                    >
                        Sign out
                    </Button>
                </Box>
            </NativeBaseProvider>
        </>
    );
}
