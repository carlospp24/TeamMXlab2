import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, FlatList } from 'react-native';
import {init, fetchAllSurvey,fetchLastSurvey, addSurvey} from '../sqlconnection/db';
import * as SQLite from 'expo-sqlite';
import { useTheme } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import AwesomeButton from "react-native-really-awesome-button";



init()
.then(()=>{
    console.log('Database creation succeeded!');
}).catch((err)=>{
  console.log('Database IS NOT initialized! '+err);
});

var index=1;
export default function Checker() {
  const [isInserted, setIsInserted]=useState(false);
  const [surveyList, setSurveyList]=useState([]);
  const [newSurveyDay, setNewSurveyDay]=useState('');
  const [newSurveyRating, setNewSurveyRating]=useState('');
  const [newSurveyAccomplished, setNewSurveyAccomplished]=useState('');
  const [newSurveyGoal, setNewSurveyGoal]=useState('');
  const { colors } = useTheme();

  const addSurveyHandler=()=>{
    setSurveyList(surveyList=>[...surveyList, {day:newSurveyDay, rating:newSurveyRating, accomplished:newSurveyAccomplished, goal:newSurveyGoal}]);
    saveSurvey();
  }
  const dayInputHandler=(enteredText)=>{
    setNewSurveyDay(enteredText);
  }
  const ratingInputHandler=(enteredText)=>{
    setNewSurveyRating(enteredText);
  }
  const accomplishedInputHandler=(enteredText)=>{
    setNewSurveyAccomplished(enteredText);
  }
  const goalInputHandler=(enteredText)=>{
    setNewSurveyGoal(enteredText);
  }


  
  

  async function saveSurvey(){
    try{
      const dbResult = await addSurvey(newSurveyDay, newSurveyRating, newSurveyAccomplished,newSurveyGoal);
      console.log(dbResult);
    }
    catch(err){
      console.log(err);
    }
    finally{
      setIsInserted(true);
    }
  }
  async function readLastSurvey(){
  

    
    try{
      const dbResult = await fetchLastSurvey(newSurveyDay, newSurveyRating, newSurveyAccomplished,newSurveyGoal);
      console.log("dbResult");

    
      console.log(dbResult);
   
      setSurveyList(dbResult.rows._array);
    }
    catch(err){
      console.log(err);
      
    }
  }
function questions() {
  return(
<View style={styles.container}>
  
      <Text style={[{  color: colors.text,fontSize:30}]}> How was your performance today?<Feather  name={"smile"}size={30}color={"white"}/> </Text>
      <View style={styles.icons}>
      
  </View>
      <View style={styles.inputcontainer}>
        <TextInput style={[{  color: colors.text,fontSize:15}]} placeholder="Your answer" 
                  
                  onChangeText={dayInputHandler}
                  value={newSurveyDay}/>  
        
        
      </View>    
      <Text style={[{  color: colors.text,fontSize:30 }]}> From a scale of 1-5, how would you rate your day? <Feather  name={"edit-2"}size={30}color={"white"}/></Text>
      <View style={styles.inputcontainer}>
        
        <TextInput style={[{  color: colors.text,fontSize:15}]} placeholder="Your answer" 
                  keyboardType='number-pad'
                  onChangeText={ratingInputHandler}
                  value={newSurveyRating}/>  
        
      </View>   
      <Text style={[{  color: colors.text,fontSize:30 }]}> Did you accomplished most of your goals today? <Feather  name={"award"}size={30}color={"white"}/></Text>
      <View style={[styles.inputcontainer, {  color: colors.text }]}>
        
        <TextInput style={[{  color: colors.text,fontSize:15}]}placeholder="Your answer" 
                  
                  onChangeText={accomplishedInputHandler}
                  value={newSurveyAccomplished}/>  
      </View>   
      <Text style={[{  color: colors.text,fontSize:30 }]}> What is your goal for tomorrow? <Feather  name={"star"}size={30}color={"white"}/></Text>
      <View style={styles.inputcontainer}>
        
        <TextInput style={[{  color: colors.text,fontSize:15}]}placeholder="Your answer" 
                  
                  onChangeText={goalInputHandler}
                  value={newSurveyGoal}/>  
      </View>     


      <View style={styles.buttoncontainer}>
      <AwesomeButton
      progress
      onPress={addSurveyHandler}
    >Add Answers
    </AwesomeButton>
    <AwesomeButton
      progress
      onPress={readLastSurvey}
    >View Your Answers
    </AwesomeButton>
        
        
      </View>
      
      </View>  
  );
}

  return (
    
      <View style={styles.flatliststyle}>
        
      <FlatList 
      ListHeaderComponent={questions}
      keyExtractor={item=>surveyList.indexOf(item).toString()}
        data={surveyList} 
        renderItem={itemData=>(
          <View style={styles.listItemStyle}>
            
            <Text style={[{  color: colors.background,fontSize:30 }]}>{itemData.item.id}. </Text>
            <Text style={[{  color: colors.text,fontSize:35, }]}>Your Day today was: </Text>
            <Text style={[{  color: colors.text,fontSize:30,paddingBottom:40, }]}> {itemData.item.day}</Text>
            <Text style={[{  color: colors.text,fontSize:35 }]}>You performance today was of: </Text>
            <Text style={[{  color: colors.text,fontSize:30,paddingBottom:40, }]}> {itemData.item.rating}. </Text>
            <Text style={[{  color: colors.text,fontSize:35 }]}>Today, you accomplished: </Text>
            <Text style={[{  color: colors.text,fontSize:30,paddingBottom:40, }]}>{itemData.item.accomplished}</Text>
            <Text style={[{  color: colors.text,fontSize:35 }]}>Your day for tomorrow is: </Text>
            <Text style={[{  color: colors.text,fontSize:30,paddingBottom:40, }]}>{itemData.item.goal}</Text>
          </View>
        )}
      />
      </View>

   
  );
  




}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft:10,
  
    marginTop:30,
  },
  inputcontainer: {
    flex: 1,
   
    alignItems: 'flex-start',
    
    flexDirection:'row',
    
  },
  icons:{
    justifyContent: "space-between",
    paddingLeft:100,
    
  },
  buttoncontainer: {
    flex: 1,
    alignItems:"center"
    
    
    
    
  },
  
  listItemStyle: {
  
  },
  
});