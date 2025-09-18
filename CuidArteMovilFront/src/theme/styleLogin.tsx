import { StyleSheet } from 'react-native';
import { colors } from './styleHome';

export const loginStyles = StyleSheet.create({
  contentLogin: {
    width: 350,
    height: 500,
    borderRadius: 30,
    backgroundColor: colors.white,
    padding: 20,
    justifyContent: 'space-around',
  },

  input: {
    height: 45,
    color: colors.text,
    backgroundColor: colors.navigation,
    borderRadius: 100,
    paddingHorizontal: 15,
  },

  buttonLogin: {
    width: '100%',
    height: 45,
    backgroundColor: colors.botton,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    alignItems: 'center',
    marginTop: 40,
  },

  loginText: {
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  linkText: {
    color: colors.text,
    fontSize: 19,
    textAlign: 'center',
    marginTop: 20,
  },

  LogoLogin: {
    width: 170,
    height: 170,
    alignSelf: 'center',
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

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.navigation,
    borderRadius: 100,
    height: 45,
    marginTop: 5,
  },

  passwordInput: {
    flex: 1,
    color: colors.text,
    paddingHorizontal: 15,
  },
});
