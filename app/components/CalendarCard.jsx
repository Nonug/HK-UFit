import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import React from "react";
import {
  View,
  Image,
  Center,
  Box,
  Text,
  HStack,
  VStack,
  Pressable,
} from "native-base";

export default function CalendarCard({ props }) {
  return (
    <Calendar
      max
      // Handler which gets executed on day press. Default = undefined
      onDayPress={(day) => {
        console.log("selected day", day);
      }}
      // Handler which gets executed on day long press. Default = undefined
      onDayLongPress={(day) => {
        console.log("selected day", day);
      }}
      // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
      monthFormat={"yyyy MMM"}
      // Handler which gets executed when visible month changes in calendar. Default = undefined
      onMonthChange={(month) => {
        console.log("month changed", month);
      }}
      // Handler which gets executed when press arrow icon left. It receive a callback can go back month
      onPressArrowLeft={(subtractMonth) => subtractMonth()}
      // Handler which gets executed when press arrow icon right. It receive a callback can go next month
      onPressArrowRight={(addMonth) => addMonth()}
      // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
      disableAllTouchEventsForDisabledDays={true}
      // Replace default month and year title with custom one. the function receive a date as parameter
      // renderHeader={(date) => {
      //   /*Return JSX*/
      // }}
      // Enable the option to swipe between months. Default = false
      enableSwipeMonths={true}
    />
  );
}
