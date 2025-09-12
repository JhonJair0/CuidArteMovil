import { StyleSheet } from 'react-native';

export const colors = {
  navigation: '#aca8f8',
  fondo: '#d8dafd',
  botton: '#5f51fe',
  text: '#000000',
  white: '#ffffff',
};

export const RegisterCarevigerStyles = StyleSheet.create({
  bodyRegister: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.fondo,
  },

  contentRegister: {
    width: 350,
    height: 670,
    borderRadius: 30,
    backgroundColor: colors.white,
    padding: 20,
    justifyContent: 'space-around',
  },

  LogoRegister: {
    width: 170,
    height: 170,
    alignSelf: 'center',
  },

  upload: {
    width: 50,
    height: 100,
    position: 'absolute',
    top: -25,
    left: 125,
    zIndex: 2,
  },

  inputContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  inputColumn: {
    width: '48%',
  },

  fileInputColumn: {
    width: '100%',
    marginBottom: 15,
  },

  input: {
    height: 45,
    color: colors.text,
    backgroundColor: colors.navigation,
    borderRadius: 100,
    paddingHorizontal: 15,
    marginBottom: 5,
  },

  contentbuttonRegister: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  buttonRegister: {
    width: '60%',
    height: 45,
    backgroundColor: colors.botton,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },

  RegisterText: {
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
    top: 50,
    zIndex: 2,
    left: 113,
  },
});
