import * as React from "react";
import { NativeBaseProvider, Text, Box, StyleSheet} from "native-base";
// import { ButtonGroup } from 'react-native-elements'

export default function Routine({ navigation }) {

    const buttons = ['INSERT', 'UPDATE', 'DELETE']

    return (
        <>
            <NativeBaseProvider>
                <Box bg="primary.600" mt='4' mx="2" p="12" rounded="lg">
                    <Text>Routine Page</Text>
                </Box>
                {/* <ButtonGroup/> */}
            </NativeBaseProvider>
            {/* <View style={styles.container}>
                <ButtonGroup
                buttons={buttons}
                containerStyle={{height: 40}}
                buttonContainerStyle={{backgroundColor: 'cadetblue'}}
                textStyle={{color: '#fff'}}
                />
            </View> */}
        </>
    );
}



// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//     },
//     });