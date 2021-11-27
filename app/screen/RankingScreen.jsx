import * as React from "react";
import {
    NativeBaseProvider,
    Text
} from "native-base";

export function RankingScreen({navigation}) {
    return (
        <>
            <NativeBaseProvider>
                <Text>Ranking Screen</Text>
            </NativeBaseProvider>
        </>
    )
}

export default RankingScreen;