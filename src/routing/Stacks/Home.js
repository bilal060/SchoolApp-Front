import * as React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import { Calender, Ebook, Home, QrCode } from "../../pages/Protected";

const Stack = createStackNavigator();

const StackScreenOptions = {
    headerShown: false
};

function HomeStack() {
    return (
        <Stack.Navigator initialRouteName="home" screenOptions={StackScreenOptions}>
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="QrCode" component={QrCode} />
            <Stack.Screen name="Calender" component={Calender} />
  <Stack.Screen name="EBook" component={Ebook} />

        </Stack.Navigator>
    );
}
export default HomeStack;
