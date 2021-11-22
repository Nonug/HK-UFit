import * as React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import {
    NativeBaseProvider,
    Text,
    Button
} from "native-base"

export function TestScreen({ navigation }) {
    return (
        <NativeBaseProvider>
            <Text>
                Hello There!
            </Text>
            <Button
                title="Test"
                onPress={() => navigation.goBack()}
            />
        </NativeBaseProvider>
    )
}

export default TestScreen;