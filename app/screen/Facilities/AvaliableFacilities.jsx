import * as React from "react";
import {
  NativeBaseProvider,
  Text,
  Button,
  Box,
  VStack,
  HStack,
  Image,
  Center,
  Divider,
  Icon,
  ScrollView,
} from "native-base";
import { useState, useEffect } from "react";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";

async function PostFacilities(usersArray, facilityPrimaryId) {
  var googleUserId;
  var userId;
  try {
    googleUserId = await SecureStore.getItemAsync("userId");
    googleUserId = JSON.parse(googleUserId);

    for (var user in usersArray) {
      if (usersArray[user].id == googleUserId) {
        userId = usersArray[user].user_id;
      }
    }

    try {
      const url =
        "https://groupproject26.top/api/facilities/post-reservation/" +
        userId +
        "/" +
        facilityPrimaryId;

      let response = await fetch(url, { method: "POST" });
      let responseJson = await response.json();
      return responseJson;
    } catch (e) {
      console.error(e);
    }
  } catch (error) {
    console.error(error);
  }

  return null;
}

function GetUserNameById(usersArray, userId) {
  for (var user in usersArray) {
    if (usersArray[user].user_id == userId) {
      return usersArray[user].name;
    }
  }
  return "";
}

function FacilitiesIcon(props) {
  const type = props.facilityName;

  if (type == "Boxing") {
    return (
      <>
        <Icon
          as={MaterialCommunityIcons}
          name="boxing-glove"
          color="primary.500"
        />
      </>
    );
  } else if (type == "Treadmill") {
    return (
      <>
        <Icon as={FontAwesome5} name="running" color="primary.500" />
      </>
    );
  } else {
    return <></>;
  }
}

function Occupy(props) {
  const [isLoading, setLoading] = useState(true);
  const [occupyData, setOccupyData] = useState([]);

  const [isUsersLoading, setUsersLoading] = useState(true);
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const GetData = async () => {
      const url =
        "https://groupproject26.top/api/facilities/get-occupy-by-ids/" +
        props.centerId +
        "/" +
        props.facilityId;
      try {
        let response = await fetch(url, {
          method: "GET",
        });
        let occupyObj = await response.json();
        setOccupyData(occupyObj.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    const GetUsers = async () => {
      const url = "https://groupproject26.top/api/get-users";
      try {
        let response = await fetch(url, {
          method: "GET",
        });
        let usersObj = await response.json();
        setUsersData(usersObj.data);
        setUsersLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    GetData();
    GetUsers();
  }, []);

  return (
    <>
      {isLoading ? null : (
        <>
          {occupyData.map(function (item) {
            return (
              <>
                <HStack alignItems="center">
                  <Text textAlign="center" fontSize="xs" w="30%">
                    {item.date}
                  </Text>
                  <Text textAlign="center" fontSize="xs" w="20%">
                    {item.timeslot == "am" ? "9:00-12:00" : "14:00-17:30"}
                  </Text>
                  <Text textAlign="center" fontSize="xs" w="30%">
                    {isUsersLoading
                      ? ""
                      : GetUserNameById(usersData, item.occupy_user_id)}
                  </Text>
                  <Button
                    isDisabled={item.occupy_user_id == null ? false : true}
                    textAlign="center"
                    size="xs"
                    h="6"
                    mt="1"
                    ml="3"
                    variant="subtle"
                    onPress={() => {
                      PostFacilities(usersData, item.id).then(
                        (postResponse) => {
                          if (postResponse != null) {
                            props.navigation.navigate({
                              name: "FindFacilities",
                              params: {
                                showInfo: true,
                                toastStatus: postResponse.status,
                                toastContent: postResponse.explaination,
                              },
                            });
                          } else {
                          }
                        }
                      );
                    }}
                  >
                    Select
                  </Button>
                </HStack>
                <Divider mt="2" />
              </>
            );
          })}
        </>
      )}
    </>
  );
}

function HeaderCard(props) {
  const [isLoading, setLoading] = useState(true);
  const [gymData, setGymData] = useState([]);

  useEffect(() => {
    const GetData = async () => {
      const url =
        "https://groupproject26.top/api/facilities/get-gym-by-id/" + props.id;
      try {
        let response = await fetch(url, {
          method: "GET",
        });
        let gymObj = await response.json();
        setGymData(gymObj);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    GetData();
  }, []);

  return (
    <>
      {isLoading ? null : (
        <>
          <Box bgColor="#ffffff" w="95%" h="110" rounded="lg" shadow="3">
            <HStack>
              <Image
                h="110"
                w="100"
                position="absolute"
                left="0"
                borderRadius="lg"
                source={{
                  uri: gymData.picture_url,
                }}
                alt="image"
              />
              <VStack space={2} position="absolute" left="110" top="3">
                <Text bold>{gymData.name}</Text>
                <Text fontSize="10">{gymData.location}</Text>
              </VStack>
            </HStack>
          </Box>
        </>
      )}
    </>
  );
}

function FacilitiesCard(props) {
  const [isLoading, setLoading] = useState(true);
  const [FacilitiesData, setFacilitiesData] = useState([]);

  useEffect(() => {
    const GetData = async () => {
      const url =
        "https://groupproject26.top/api/facilities/get-facilities-by-center-id/" +
        props.id;
      try {
        let response = await fetch(url, {
          method: "GET",
        });
        let FacilitiesObj = await response.json();
        setFacilitiesData(FacilitiesObj.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    GetData();
  }, []);

  return (
    <>
      {isLoading ? null : (
        <>
          {FacilitiesData.map(function (item) {
            return (
              <Box
                h="200"
                w="90%"
                bgColor="#ffffff"
                rounded="lg"
                shadow="3"
                mb="4"
                key={item.id}
              >
                <VStack>
                  <HStack mt="3" ml="3" alignItems="center">
                    <FacilitiesIcon facilityName={item.facility_name} />
                    <Text> {item.facility_name} </Text>
                  </HStack>
                  <Divider mt="2" />
                  <Occupy
                    centerId={item.center_id}
                    facilityId={item.facility_id}
                    navigation={props.navigation}
                  />
                </VStack>
              </Box>
            );
          })}
        </>
      )}
    </>
  );
}

export function AvaliableScreen({ route, navigation }) {
  const { gymId, gymName } = route.params;

  return (
    <>
      <NativeBaseProvider>
        <ScrollView>
          <Center mt="4">
            <HeaderCard id={gymId} />
            <Divider w="90%" my="4" />
            <FacilitiesCard id={gymId} navigation={navigation} />
          </Center>
        </ScrollView>
      </NativeBaseProvider>
    </>
  );
}

export default AvaliableScreen;
