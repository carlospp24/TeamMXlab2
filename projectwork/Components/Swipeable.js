import React from "react";
import SwipeableItem from "react-native-swipeable-item";

import { Feather } from "@expo/vector-icons";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import moment from "moment";

import Animated from "react-native-reanimated";
import { useTheme } from "react-native-paper";

export default function Reminder({
  item,
  itemRefs,
  deleteItem,
  showmodel,
}) {
  const { colors } = useTheme();

  const renderUnderlayLeft = ({ item, percentOpen }) => (
    <Animated.View
      style={[
        styles.row,
        styles.underlayLeft,
        { opacity: percentOpen, backgroundColor: colors.elemprim },
      ]} 
    >
      <TouchableOpacity onPressOut={() => deleteItem(item)}>
        <Feather name={"trash" }size={35}color={colors.text}
              />
      </TouchableOpacity>
    </Animated.View>
  );

  

  return (
    <SwipeableItem
      key={item.key}
      item={item}
      ref={(ref) => {
        if (ref && !itemRefs.get(item.key)) {
          itemRefs.set(item.key, ref);
        }
      }}
      onChange={({ open }) => {
        if (open) {
        
          [...itemRefs.entries()].forEach(([key, ref]) => {
            if (key !== item.key && ref) ref.close();
          });
        }
      }}
      overSwipe={30}
      renderUnderlayLeft={renderUnderlayLeft}
      snapPointsLeft={[150]}
      snapPointsRight={[0]}
    >
      <View style={[styles.row, { flex: 1, backgroundColor: colors.tab2 }]}>
        <View
          style={{
           
            flex: 1,
          }}
        >
          <View style={{ flex: 1, alignItems:"center", marginVertical: 10, marginHorizontal: 5 }}>
            <TouchableOpacity onPress={() => showmodel(item)}>
              <Text style={[styles.text, { color: colors.text, flex: 1 }]}>
                {item.text}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sep} />
          <View style={{ flex: 0.3 }}>
            <Text
              style={[
                styles.text,
                {
                  color: colors.text,
                  fontSize: 17,
                  
                  
                  textAlign: "center",
                  lineHeight: 22,
                  
                  
                },
              ]}
            >
              <View style={styles.clock}>
              <Feather name={"clock" }size={30}color={colors.text}/>
              </View>
              
              {`${moment(item.Date).format("hh:mm a")} \n \n ${
                
                moment(item.Date).format("Do ") +
                "," + 
                
                moment(item.Date).format("MMM")
              }`}
              <View style={styles.calendar}>
              <Feather name={"calendar" }size={30}color={colors.text}/>
              </View>
            </Text>
            
          </View>
        </View>
      </View>
    </SwipeableItem>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  TitleContainer: {
    flex: 0.2,
    justifyContent: "center",
    marginHorizontal: 7,
  },
  clock:{
paddingRight:10,



  },
  calendar:{
    paddingLeft:10,
    
    
    
      },
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "gray",
  },
  text: {
    fontWeight: "bold",
    fontSize: 24,
  },
  underlayRight: {
    flex: 1,
    justifyContent: "flex-start",
    borderWidth: 0,
  },
  underlayLeft: {
    flex: 1,
    justifyContent: "flex-end",
    borderWidth: 0,
  },
  sep: {
    borderWidth: 1,
    borderColor: "gray",
    marginHorizontal: 10,
    opacity: 0.5,
    alignSelf: "stretch",
    marginVertical: 10,
  },
});

