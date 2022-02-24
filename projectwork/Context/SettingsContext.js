import createContext from "./createContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const settingsconfig = (state, action) => {
  switch (action.type) {
    default:
      return state;
    case "init_data":
      return action.payload;
    case "dark":
      const data = {
        ...state,
        Theme: !state.Theme,
      };
      storeData(data);
      return data;
      case "blue":
      const bluedata = {
        ...state,
        Theme: !state.Theme,
      };
      storeData(bluedata);
      return bluedata;

      case "purple":
      const purpledata = {
        ...state,
        Theme3: !state.Theme3,
      };
      storeData(purpledata);
      return purpledata;

      case "green":
      const greendata = {
        ...state,
        Theme3: !state.Theme3,
      };
      storeData(greendata);
      return greendata;

      
      
  }
};

const dark = (dispatch) => {
  return () => {
    dispatch({ type: "dark" });
  };
};
const blue = (dispatch) => {
  return () => {
    dispatch({ type: "blue" });
  };
};
const purple = (dispatch) => {
  return () => {
    dispatch({ type: "purple" });
  };
};

const green = (dispatch) => {
  return () => {
    dispatch({ type: "blue" });
  };
};
const init_data_Settings = (dispatch) => {
  return () => {
    getData()
      .then((value) => {
        if (value == null) {
          value = {
            Theme: false,
            Theme3: false,
            
          };
        }
        dispatch({ type: "init_data", payload: value });
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("Settings-Data", jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("Settings-Data");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

export const { Context, Provider } = createContext(
  settingsconfig,
  { dark,purple,blue,green, init_data_Settings },
  {
    Theme: false,
    Theme3: false,
    
  }
);
