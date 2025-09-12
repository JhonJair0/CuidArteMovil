import { StyleSheet } from "react-native";

export const colors = {
  navigation: '#aca8f8',
  fondo: '#d8dafd',
  botton: '#5f51fe',
  text: '#000000',
  white: '#ffffff',
};

export const CarevigerAdultStyle = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.fondo
  },

  content: {
    width: 350,
    height: 450,
    borderRadius: 30,
    backgroundColor: colors.white,
    padding: 20,
    justifyContent: 'space-around',
  },

  inputContainer: {
    width: '100%',
    height: 120,
    borderRadius: 30,
    backgroundColor: '#e5e7eb',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10
  },

  containerImg: {
    borderRightWidth: 2,
    borderColor: '#99a1af', 
  },

  upload: {
    width: 85,
    height: 85,
    borderRadius: 100,
    marginRight: 15
  },

});