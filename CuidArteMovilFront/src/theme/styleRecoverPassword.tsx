import { StyleSheet } from "react-native";

export const colors = {
  navigation: '#aca8f8',
  fondo: '#d8dafd',
  botton: '#5f51fe',
  text: '#000000',
  white: '#ffffff',
};

export const RecoverPasswordStyles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.fondo
  },

  content: {
    width: 350,
    height: 350,
    borderRadius: 30,
    backgroundColor: colors.white,
    padding: 20,
    justifyContent: 'space-around',
  },

  Logo: {
    width: 170,
    height: 170,
    alignSelf: 'center',
  },

  input: {
    height: 45,
    color: colors.text,
    backgroundColor: colors.navigation,
    borderRadius: 100,
    paddingHorizontal: 15,
    marginBottom: 7,
  },

  contentbutton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  buttonSend: {
    width: '60%',
    height: 45,
    backgroundColor: colors.botton,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },

  sendText: {
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  leftArrowContainer: {
    position: 'absolute',
    top: 15,
    left: 15,
    zIndex: 1,
  },

  leftArrow: {
    width: 50,
    height: 50,
  },
});