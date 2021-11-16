import * as React from "react";
import { NativeBaseProvider, Text, Button,
    Box,
} from "native-base";

export default function Home({ navigation }) {
    return (
        <>
            <NativeBaseProvider>
                <Box bg="primary.600" mt='4' mx="2" p="12" rounded="lg">
                    <Text>Social Networking Page</Text>
                </Box>
            </NativeBaseProvider>
        </>
    );
}
