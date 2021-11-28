import * as React from "react";
import {
    Center,
    NativeBaseProvider,
    Text,
    Box,
    Image,
    ScrollView,
    Divider,
    HStack,
} from "native-base";
import { useState, useEffect } from "react";

const MedalIcon = (seq) => {
    switch (seq) {
        case 1:
            return (
                <Image
                    alt={toString(seq)}
                    source={require("../assets/images/gold.png")}
                />
            )
        case 2:
            return (
                <Image
                    alt={toString(seq)}
                    source={require("../assets/images/silver.png")}
                />
            )
        case 3:
            return (
                <Image
                    alt={toString(seq)}
                    source={require("../assets/images/copper.png")}
                />
            )
        default:
            return(<>
                <Text
                    italic
                    bold
                    mx='3'
                    fontSize={'4xl'}
                >{seq}</Text>
            </>);
            break;
    }
}

const HeaderCard = () => {
    return (
        <Box bgColor="#020202" w="90%" h="100" mx="4" rounded="lg">
            <Image
                h="100%"
                rounded="lg"
                source={require("../assets/images/Ranking_Banner_2.png")}
                alt="banner-fitness"
            ></Image>
        </Box>
    );
};

const RankingList = () => {

    const [isLoading, setLoading] = useState(true);
    const [rankingData, setRanking] = useState([]);
    const [date, setDate] = useState('1970-1-1');

    useEffect(() => {
        const bootstrapAsync = async () => {
            try{
                let response = await fetch("https://groupproject26.top/api/social/get-ranking-today");
                let responseJson = await response.json();
                console.log(responseJson);
                return responseJson;
            } catch (error) {
                console.error(error);
            }
        };
        bootstrapAsync().then((responseData) => {
            setRanking(responseData.ranking);
            setDate(responseData.date);
        }).then(setLoading(false));
    }, []);

    return (
        <>
            {isLoading ? null : (
                <>
                    <Text
                        fontSize='lg'
                        bold
                    >{date}</Text>
                    {
                        rankingData.map(function(item){
                            return(
                                //For icon ones
                                <Box
                                    rounded={'lg'}
                                    h="100"
                                    w="90%"
                                    my='2'
                                    bgColor={"#ffffff"}
                                >
                                    <HStack>
                                        <Center
                                            mx='4'
                                            mt='4'
                                        >
                                            {MedalIcon(item.seq)}
                                        </Center>
                                        <Center>
                                            <Text
                                                fontSize='xl'
                                            >{item.user_name}</Text>
                                        </Center>
                                        <Center
                                            position={'absolute'}
                                            right='5'
                                            top='3'
                                        >
                                            <Text
                                                fontSize='3xl'
                                                italic
                                                bold
                                            >{item.steps}</Text>
                                            <Text>steps</Text>
                                        </Center>
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

export function RankingScreen({navigation}) {
    return (
        <>
            <NativeBaseProvider>
                <ScrollView>
                    <Center mt='4'>
                        <HeaderCard/>
                        <Divider mt='3' w="90%"/>
                        <RankingList/>
                    </Center>
                </ScrollView>
            </NativeBaseProvider>
        </>
    )
}

export default RankingScreen; 