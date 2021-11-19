import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SecureStore from "expo-secure-store";
import LoginScreen from "./app/screen/LoginScreen";
import SplashScreen from "./app/screen/SplashScreen";
import Main from "./app/screen/Main";
import { XHttp } from 'react-native-easy-app';

const Stack = createStackNavigator();

export const AuthContext = React.createContext();

const App = () => {

    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case "RESTORE_TOKEN":
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case "SIGN_IN":
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case "SIGN_OUT":
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
        }
    );

    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken;
            try {
                // Restore token stored in `SecureStore` or any other encrypted storage
                userToken = await SecureStore.getItemAsync('userToken');
            } catch (e) {
                // Restoring token failed
                console.log(e);
            }
            dispatch({ type: "RESTORE_TOKEN", token: userToken });
        };
        bootstrapAsync();
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async (authentication) => {

                //Using SecureStore to store the token from Google
                await SecureStore.setItemAsync( "userToken", authentication.authentication.accessToken);

                //Send post to create profile in Laravel
                //Get id of Google as return
                let REQUEST_URL = "http://groupproject26.top/api/first-login";
                let parameters = new FormData();
                parameters.append("token", authentication.authentication.accessToken);
                
                try{
                    let response = await fetch(REQUEST_URL, { method: "POST", body: parameters});
                    let userId = await response.json();
                    //Store the userId
                    console.log("Set userId here: " + userId);
                    await SecureStore.setItemAsync( "userId", JSON.stringify(userId));
                }catch(error){
                    console.error(error);
                }

                dispatch({
                    type: "SIGN_IN",
                    token: authentication.authentication.accessToken,
                });
            },
            signOut: async() => {
                await SecureStore.deleteItemAsync("userToken");
                await SecureStore.deleteItemAsync('userId');
                console.log("Delete All");
                dispatch({ type: "SIGN_OUT" });
            },
        }),
        []
    );

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="HomeScreen">
                    {state.isLoading ? (
                        // We haven't finished checking for the token yet
                        <Stack.Screen name="Splash" component={SplashScreen} />
                    ) : state.userToken == null ? (
                        // No token found, user isn't signed in
                        <Stack.Screen
                            name="Login"
                            component={LoginScreen}
                            options={{
                                title: "Login",
                                // When logging out, a pop animation feels intuitive
                                animationTypeForReplace: state.isSignout
                                    ? "pop"
                                    : "push",
                            }}
                        />
                    ) : (
                        // User is signed in
                        <Stack.Screen
                            name="Main"
                            component={Main}
                            options={{ headerShown: false }}
                        />
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
}

export default App;