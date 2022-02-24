import React, { useState, useContext, useEffect } from "react";
import { useTheme } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import Element from "../Components/Swipeable";
import Model from "../Components/Destinations";
import { Context } from "../Context/DestinationsC";
import {Text, View,StyleSheet,FlatList,LayoutAnimation,TouchableOpacity, } from "react-native";
import { State } from "react-native-gesture-handler";
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';



function Destinations() {
  const { state, add_reminder, delete_reminder, edit, } = useContext(Context);

  const { colors } = useTheme();
  const [showmodel, setmodel] = useState(false);
  const [selecteditem, setselecteditem] = useState(null);

  let itemRefs = new Map();

  useEffect(() => {
    state.map((item) => {
      let ti = new Date(item.Date);
      if (ti.getTime() <= Date.now()) {
        delete_reminder(item);
      }
    });
    state.sort(function (a, b) {
      var keyA = new Date(a.Date).getTime(),
        keyB = new Date(b.Date).getTime();
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
  }, [state]);

  const change_model = (item) => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        200,
        LayoutAnimation.Types.linear,
        LayoutAnimation.Properties.opacity
      )
    );
    setselecteditem(item);
    setmodel(!showmodel);
  };
  const hide_model = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        200,
        LayoutAnimation.Types.linear,
        LayoutAnimation.Properties.opacity
      )
    );
    setmodel(false);
    setselecteditem(null);
  };
  

  function emptylist() {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingTop:8,
        }}
      >
        <Text
          style={[
            styles.text,
            { fontSize: 25, textAlign: "center", color: colors.text },
          ]}
        >
          {
            " Press on the + to set up a new destination!"
          }
        </Text>
      </View>
    );
  }

  
  if (showmodel) {
    return (
      <Model edit={edit} hide_model={hide_model} selecteditem={selecteditem} />
    );
  }
/* T*/

  function header() {
    return (
<View style={styles.TitleContainer}>
    <Text style={[styles.text, { fontSize: 45, color: colors.text }]}>
          Destinations
    </Text>
    <TouchableOpacity
          onPress={() => {
            add_reminder();
          }}
        >
          <AntDesign name="plus" size={34} color={colors.text} />
    </TouchableOpacity>
      
</View>

      
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={header}
        ListEmptyComponent={emptylist}
        style={{ flex: 0.8 }}
        keyExtractor={(item) => item.key}
        data={state}
        renderItem={({ item, index }) => (
          <Element
            index={index}
            item={item}
            itemRefs={itemRefs}
            deleteItem={(item) => {
              delete_reminder(item);
            }}
            showmodel={change_model}
          />
        )}
        
       
      />
    </View>
  );
}



export default Destinations;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  TitleContainer: {
    flex: 0.4,
   paddingLeft:15,
   paddingRight:80,
   flexDirection:"row",
   justifyContent: "space-between",
  },
  
  text: {
    fontWeight: "bold",
    color: "gray",
    fontSize: 24,
  },
});
