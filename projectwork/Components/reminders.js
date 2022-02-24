import React, { useState } from "react";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTheme, Snackbar } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import {TextInput,Text,View,StyleSheet,TouchableOpacity,} from "react-native";

export default function ({ selecteditem, hide_model, edit }) {
  const [text, settext] = useState(selecteditem.text);
  const [time, settime] = useState(new Date(selecteditem.Date));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const { colors } = useTheme();
  const [visible, setVisible] = useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);
  if (show) {
    return (
      <DateTimePicker
        minimumDate={new Date(Date.now())}
        value={time}
        mode={mode}
        display="default"
        onChange={(event, date) => {
          if (event.type == "dismissed") {
            setShow(false);
            return;
          }
          let tep = new Date(Date.now());

          if (tep.getTime() / 1000 - date.getTime() / 1000 > 1) {
            setShow(false);
            onToggleSnackBar();
            return;
          }
          settime(date);
          setShow(false);
        }}
        style={{ width: 320, backgroundColor: "gray" }} 
      />
    );
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >

      <View style={styles.header}>
      <TouchableOpacity
        onPress={() => {
          edit({ text, selecteditem, time: moment(time) });
          hide_model();
          
        }}
        
       
      >
        <Feather name={"save" }size={30}color={colors.backgroundColor}/>
      </TouchableOpacity>
<Text style={ { fontSize: 20}}> Please add a task to complete</Text>
      <TouchableOpacity
        onPress={() => hide_model()}
      
      >
        <Feather name="x" size={30} color={colors.backgroundColor}  />
      </TouchableOpacity>
      </View>
      
      <View style={[styles.model, { backgroundColor: colors.tab}]}>
        <View
      style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              
            }}
          >
            <View style={styles.time}>
              <TextInput
              placeholder="Remind me to: "
              maxLength={100}
              multiline
              numberOfLines={2}
              onChangeText={(text) => settext(text)}
              value={text}
              style={[styles.text, { color: colors.text }]}
            />
            </View>
            
            <View style={[styles.clock]}> 
            
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setMode("date");
                setShow(true);
              }}
            >
              <Feather name={"calendar" }size={30}color={colors.text}/>
            </TouchableOpacity> 
            <Text style={[styles.text,{ fontSize: 25, justifyContent:"flex-end", color: colors.text },]}> {`${
                moment(time).format("Do ") + moment(time).format("MMM YYYY")
              }`}</Text>


            </View>
          
            <View style={[styles.clock]}> 
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setMode("time");
                setShow(true);
              }}
            >
              <Feather name={"clock" }size={30}color={colors.text}/>
            </TouchableOpacity> 
            
            <View style={styles.time}>
 <Text style={[styles.text,{ fontSize: 25, justifyContent:"flex-end", color: colors.text },]}> {`${moment(time).format("hh:mm a")} `}</Text>
              </View>
            </View>








            
          </View>
          
          <View style={{ flexDirection: "column" }}>
           
          </View>
        </View>
      </View>
      
      
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "OK",
          onPress: () => {
            onToggleSnackBar();
          },
        }}
      >
        Invaild Date or Time
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    color: "gray",
    fontSize: 24,
  },
  sep: {
    borderWidth: 1,
    borderColor: "gray",
    marginHorizontal: 10,
    opacity: 0.5,
    alignSelf: "stretch",
    marginVertical: 20,
  },
  model: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "gray",
  },
  clock:{
    justifyContent:"space-between",
alignItems:"center"
    
  },
  time:{
alignItems:"center",


  },
  header:{
    
   
    flexDirection:"row",
    justifyContent:"space-between",
    padding: 10,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "#ffebcd",
    borderWidth: 2,
    borderColor: "gray",
  },
  button: {
   
    paddingVertical: 5,
    padding: 10,
    margin: 5,
    
  },
});
