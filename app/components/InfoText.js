import * as React from "react";
import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { NativeBaseProvider, Text } from 'native-base';

async function GetUserInfo() {
    try {
        var userId = await SecureStore.getItemAsync("userId");
        userId = JSON.parse(userId);

        let result = await fetch( "https://groupproject26.top/api/get-user-by-id/" + userId);
        let resultJson = await result.json();
        return resultJson;
    } catch (e) {
        console.log(e);
    }
}


function GivenNameText(){

    const [isLoading, setLoading] = useState(true);
    const [name, setName] = useState([]);

    useEffect(() => {

        GetUserInfo()
        .then((data) => {
            setName(data.given_name);
        })
        .then(setLoading(false));
        
    }, []);

    return (
        <Text color="#ffffff" fontSize="lg">
            Hello, {isLoading ? null : name}!
        </Text>
    );
}

export { GivenNameText }