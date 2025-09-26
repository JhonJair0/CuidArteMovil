import { StyleSheet } from 'react-native';

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
    backgroundColor: colors.fondo,
  },

  content: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 30,
    backgroundColor: colors.white,
    alignItems: 'center',
    padding: 20,
  },

  contentContainer: {
    flexGrow: 1, // Permite que el contenido se expanda
    justifyContent: 'center', // Centra verticalmente el contenido
    alignItems: 'center', // Centra horizontalmente el contenido
  },

  inputContainer: {
    width: '100%',
    height: 120,
    borderRadius: 30,
    backgroundColor: '#e5e7eb',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin: 5,
  },

  containerImg: {
    borderRightWidth: 2,
    borderColor: '#99a1af',
  },

  upload: {
    width: 85,
    height: 85,
    borderRadius: 100,
    marginRight: 15,
  },
});
