import React, { useState, useContext, useEffect } from "react";
import { useTheme } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import List from "../Components/Swipeable";
import Model from "../Components/reminders";
import { Context } from "../Context/ReminderContext";
import {Text,View,StyleSheet,FlatList,LayoutAnimation,TouchableOpacity,} from "react-native";




function ReminderS() {
  /* Functions from the ReminderContext component*/
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
    
  } , [state]);

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
            " Tap the icon to add a task! "
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
/* */

  function header() {
    return (
<View style={styles.TitleContainer}>
    <Text style={[styles.text, { fontSize: 35, color: colors.text,paddingTop:10, }]}>
 Tasks to be Done
    </Text>
    <TouchableOpacity
          onPress={() => {
            add_reminder();
          }}
        >
          <Feather style={{
          
          paddingTop:15,
        }}
            
          
              name={"plus-circle" }
               size={34}
                color={colors.text}
              />
              
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
        renderItem={({ item}) => (
          <List
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



export default ReminderS;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  TitleContainer: {
    flex: 0.4,
   paddingLeft:15,
   paddingRight:40,
   flexDirection:"row",
   justifyContent: "space-between",
  },
  
  text: {
    fontWeight: "bold",
    color: "gray",
    fontSize: 24,
  },
});
