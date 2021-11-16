import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
    NativeBaseProvider,
    Button,
    Box,
    Center,
    VStack,
    Icon,
    Text,
    Heading,
    FormControl,
    Input,
    Link,
    HStack,
} from "native-base";
import { TokenResponse } from "expo-auth-session";
import { AuthContext } from "../App"
import { AntDesign } from "@expo/vector-icons";

export default function App() {

    const { signIn } = React.useContext(AuthContext);
    
    WebBrowser.maybeCompleteAuthSession();

    //initial useAuthRequest class
    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId:
            "981969536391-4p959o3c3o4tchq5iac4peje9ll0sgm5.apps.googleusercontent.com",
    });

    //React Hook useEffect
    React.useEffect(() => {
        if (response?.type === "success") {
            const { authentication } = response;
            signIn({ authentication });
        }
    }, [response]);

    return (
        <NativeBaseProvider>
            <Center flex={1} px="3">
                <Box safeArea p="2" py="8" w="90%" maxW="290">
                    <Heading
                        size="lg"
                        fontWeight="600"
                        color="coolGray.800"
                    >
                        Welcome
                    </Heading>
                    <Heading
                        mt="1"
                        color="coolGray.600"
                        fontWeight="medium"
                        size="xs"
                    >
                        Sign in to continue!
                    </Heading>

                    <VStack space={3} mt="5">
                        <FormControl>
                            <FormControl.Label>Email ID</FormControl.Label>
                            <Input />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Password</FormControl.Label>
                            <Input type="password" />
                            <Link
                                _text={{
                                    fontSize: "xs",
                                    fontWeight: "500",
                                    color: "indigo.500",
                                }}
                                alignSelf="flex-end"
                                mt="1"
                            >
                                Forget Password?
                            </Link>
                        </FormControl>
                        <Button mt="2" colorScheme="indigo">
                            Sign in
                        </Button>
                        <Button
                            mt="2"
                            leftIcon={
                                <Icon as={AntDesign} name="google" size="sm" />
                            }
                            colorScheme="indigo"
                            onPress={() => {
                                promptAsync();
                            }}
                        >
                            Sign-in with Google
                        </Button>
                        <HStack mt="6" justifyContent="center">
                            <Text
                                fontSize="sm"
                                color="coolGray.600"
                                _dark={{
                                    color: "warmGray.200",
                                }}
                            >
                                I'm a new user.{" "}
                            </Text>
                            <Link
                                _text={{
                                    color: "indigo.500",
                                    fontWeight: "medium",
                                    fontSize: "sm",
                                }}
                                href="#"
                            >
                                Sign Up
                            </Link>
                        </HStack>
                    </VStack>
                </Box>
            </Center>
        </NativeBaseProvider>
    );
}
