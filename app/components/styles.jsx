import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  option: {
    fontSize: 15,
    // color: "white",
    textAlign: "justify",
  },
  unselected: {
    margin: 5,
    // borderWidth: 1,
    backgroundColor: "beige",
    padding: 5,
    borderRadius: 10,
  },
  selected: {
    backgroundColor: "lightsalmon",
    margin: 5,
    padding: 5,
    borderRadius: 10,
  },
});
export default styles;
