import { StyleSheet } from "react-native";

export const colors = {
  navigation: '#aca8f8',
  fondo: '#d8dafd',
  botton: '#5f51fe',
  text: '#000000',
  white: '#ffffff',
};

export const ProfileCarevigerStyles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.fondo
  },

  content: {
    width: 350,
    borderRadius: 30,
    backgroundColor: colors.white,
    padding: 20,
    justifyContent: 'space-around',
  },


  Logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    borderRadius: 100
  },

  upload: {
    width: 50,
    height: 100,
    position: 'absolute',
    top: -25,
    left: 125,
    zIndex: 2
  },

  inputContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  inputColumn: {
    width: '48%'
  },

  input: {
    height: 45,
    color: colors.text,
    backgroundColor: colors.navigation,
    borderRadius: 100,
    paddingHorizontal: 15,
    marginBottom: 15,
    justifyContent: 'center'
  },

  contentbutton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },

  button: {
    width: '60%',
    height: 45,
    backgroundColor: colors.botton,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },

  editText: {
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

  imageSelect: {
    width: 125, 
    height: 125,
    borderRadius: 100,
    position: 'absolute', 
    top: -450, 
    zIndex: 2,
    left: 90
  }
});

