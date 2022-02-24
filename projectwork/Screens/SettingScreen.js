import React, { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Context } from "../Context/SettingsContext";
import { useTheme } from "react-native-paper";
import { set } from "react-native-reanimated";


function Settings() {
  const { state,dark,purple,blue,green} = useContext(Context);
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.TitleContainer}>
        <Text style={[styles.text, { fontSize: 45, color: colors.text }]}>
          Settings
        </Text>
      </View>
      <View
        style={{
          marginHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 15,
          }}
        >
          <Text style={[styles.text, { color: colors.text }]}> Background Color</Text>
          
          <TouchableOpacity onPress={purple}>
              <Feather
              name={state.Theme = "circle" }
               size={40}
                color={"gray"}
              />
          </TouchableOpacity>
          <TouchableOpacity onPress={green}>
           
              <Feather
              name={state.Theme = "circle" }
              
                size={40}
                color={"blue"}
                
              /> 
          </TouchableOpacity>
          
          
          
        </View>
      </View>
      <View style={styles.TitleContainer}>
        <Text style={[styles.text, { fontSize: 45, color: colors.text }]}>
          About the app
        </Text>
      </View>
      <Text
        style={[
          styles.text,
          { color: colors.text, fontSize: 16, marginHorizontal: 20 },
        ]}
      >
     Plan yor day with this daily helper app!
      </Text>
    </View>
  );
}

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  TitleContainer: {
    justifyContent: "center",
    marginHorizontal: 15,
    marginVertical: 20,
  },
  text: {
    fontWeight: "bold",
    color: "gray",
    fontSize: 24,
  },
});
