import * as React from "react";
import { NativeBaseProvider, Text, Button } from "native-base";

export default function Home({ navigation }) {
    return (
        <>
            <NativeBaseProvider>
                <Text>Progress Monitoring Page</Text>
            </NativeBaseProvider>
        </>
    );
}
