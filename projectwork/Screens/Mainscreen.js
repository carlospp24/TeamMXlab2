import React, { useContext, useEffect, useState } from "react";
import ReminderScreen from "./ReminderScreen";
import LocationScreen from "./LocationScreen";
import SettingScreen from "./SettingScreen";
import WeatherScreen from "./WeatherScreen"
import Checker from "./Checker"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import {DefaultTheme,Provider as PaperProvider} from "react-native-paper";
import { Context as SettingsContext } from "../Context/SettingsContext";


/*Setting up the drktheme */
const darktheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#aaafaf",
    accent: "#6096ba",
    background: "#212529",
    tab: "#343a40",

    tab2: "#000085",


    elemprim: "#777777",
    elemsec: "#777777",
    text: "#ffffff",
  },
};

/* setting up the blue background theme*/
const bluetheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#aaafaf",
    accent: "#6096ba",
    background: "#6495ed",
    tab: "#343a40",
    tab2: "#000080",
    elemprim: "#777777",
    elemsec: "#777777",
    text: "#ffffff",
  },
};
/* Purple background theme*/
const purpletheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#aaafaf",
    accent: "#6096ba",
    background: "#8a2be2",
    tab: "#343a40",
    elemprim: "#777777",
    elemsec: "#777777",
    text: "#ffffff",
  },
};

/* Green background theme*/
const greentheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#aaafaf",
    accent: "#6096ba",
    background: "#7fffd4",
    tab: "#343a40",
    elemprim: "#777777",
    elemsec: "#777777",
    text: "#ffffff",
  },
};

/* Tab Navigator f */
const Tab = createBottomTabNavigator();

function mainscreen() {
 /* getting the state and data settings for the themes from the SettingsContext component */
  const { state } = useContext(SettingsContext);
  
    /* Setting the active theme to be equal to the possible themes created*/
  var activeTheme = state.Theme ? darktheme:bluetheme;  
  /* More styling changes depending on the theme: eg. text color */
  const { colors } = activeTheme  ;
  

  
    return (
      /* PaperProvider to wrap the whole screen with the activeTheme selected */
      
      <PaperProvider theme={activeTheme  }>
        
        <NavigationContainer>
          
          <Tab.Navigator
            sceneContainerStyle={{ backgroundColor: colors.background }}
            tabBarOptions={{
              showLabel: false,
              activeBackgroundColor: colors.tab,
              inactiveBackgroundColor: colors.tab,
              activeTintColor: colors.accent,
              inactiveTintColor: colors.primary,
            }}
          >


             
            <Tab.Screen
            /* Reminder Tab linking the ReminderScreen*/
              name="Reminder"
              component={ReminderScreen}
              options={{
                /* Putting Icons */
                tabBarIcon: ({ size, color }) => (
                  <AntDesign name="clockcircleo" size={size} color={color} />
                ),
              }}
            />
            
            <Tab.Screen
            /* Location Tab*/
            /* Using feather package because antdesign didnt had a map-pin icon*/
              name="Weather"
              component={WeatherScreen}
              options={{
                tabBarIcon: ({ size, color }) => (
                  <Feather
              name={"thermometer"}
              size={size}
              color={color}
            />
                ),
              }}
            />




            <Tab.Screen
       
              name="Checker"
              component={Checker}
              options={{
                tabBarIcon: ({ size, color }) => (
                  <Feather
              name={"check-square"}
              size={size}
              color={color}
            />
                ),
              }}
            />
            
            
            <Tab.Screen
            /* Settings Tab*/
              name="Settings"
              component={SettingScreen}
              options={{
                tabBarIcon: ({ size, color }) => (
                  <AntDesign name="setting" size={size} color={color} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    );
}

export default mainscreen;
