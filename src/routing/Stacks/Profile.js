import * as React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import { AddNewProfile, Calender, EditProfile, Faq, Home, Privacy, Profile, QrCode } from "../../pages/Protected";

const Stack = createStackNavigator();

const StackScreenOptions = {
    headerShown: false
};

function ProfileStack() {
    return (
        <Stack.Navigator initialRouteName="Profile" screenOptions={StackScreenOptions}>
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Faq" component={Faq} />
            <Stack.Screen name="Privacy" component={Privacy} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="AddNewProfile" component={AddNewProfile} />



        </Stack.Navigator>
    );
}
export default ProfileStack;
