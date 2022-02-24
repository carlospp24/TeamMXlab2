import { Provider as SettingsProvider } from "./Context/SettingsContext";
import { Provider as ReminderProvider } from "./Context/ReminderContext";


import React from "react";
import Mainscreen from "./Screens/Mainscreen";

export default function App() {
  return (
    <SettingsProvider>
      <ReminderProvider>
      
          <Mainscreen />
         
      </ReminderProvider>
    </SettingsProvider>
  );
}
