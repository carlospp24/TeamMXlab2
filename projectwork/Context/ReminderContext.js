import createContext from "./createContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as Notifications from "expo-notifications";

const settingReminder = (state, action) => {
  switch (action.type) {
    case "add_reminder":
      
      let data = [
        ...state,
        {
          text:"Tap here to add a task",
          key: `key-${1 + Math.random() }`,
          height: 75,
          Date: action.payload.time,
          notificationId: action.payload.value,
        },
      ];
      storeData(data);
      return data;
    
    case "delete_reminder":
   
      data = state.filter((d) => d !== action.payload);
      storeData(data);
      return data;
    
    case "edit":
      data = state.filter((rem) => {
        if (rem == action.payload.selecteditem) {
          let tep = action.payload.selecteditem;
          tep.Date = action.payload.time;
          tep.text = action.payload.text;
          tep.notificationId = action.payload.id;
          return tep;
        } else return rem;
      });
      storeData(data);
      return data;
    default:
      return state;
  }
};

const add_reminder = (dispatch) => {
  return () => {
    let time = new Date(Date.now() + 60 * 60 * 1000);
    let tep = new Date(Date.now());
    time.setSeconds(0, 0);
    let id = notif("Tap to edit", time.getTime() / 1000 - tep.getTime() / 1000);
    id.then((value) => {
      dispatch({ type: "add_reminder", payload: { time, value } });
    }).catch((e) => {
      console.error(e);
    });
  };
};
const delete_reminder = (dispatch) => {
  return (id) => {
   
    dispatch({ type: "delete_reminder", payload: id });
  };
};




const edit = (dispatch) => {
  return ({ selecteditem, text, time }) => {
    let tep = new Date(Date.now());
    let temp = new Date(time);
    temp.setSeconds(0, 0);
   
    let id = notif(text, temp.getTime() / 1000 - tep.getTime() / 1000);
    id.then((value) => {
      dispatch({
        type: "edit",
        payload: { selecteditem, text, time, id: value },
      });
    }).catch((e) => {
      console.error(e);
    });
  };
};

export const { Context, Provider } = createContext(
  settingReminder,
  { add_reminder, delete_reminder, edit },
  []
);

const notif = async (text, time) => {
  let alert = await Notifications.scheduleNotificationAsync({
    content: {
      title: "Reminder",
      body: text,
      categoryIdentifier: "reminder",
    },
    trigger: {
      seconds: time,
    },
  });
  let action = [
    {
      identifier: "Done",
      buttonTitle: "Done",
      options: {
        
        opensAppToForeground: false,
      },
    },
    
  ];


  return alert;
};



const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("Reminder-Data", jsonValue);
  } catch (e) {
    console.log(e);
  }
};


