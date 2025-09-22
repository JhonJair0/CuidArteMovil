import { StyleSheet } from 'react-native';

export const colors = {
  navigation: '#aca8f8',
  fondo: '#d8dafd',
  botton: '#5f51fe',
  text: '#000000',
  white: '#ffffff',
};

export const navBarStyles = StyleSheet.create({
  navBar: {
    backgroundColor: colors.navigation,
    height: 102,
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: colors.botton,
    paddingHorizontal: 20,
    gap: 5,
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },

  imgLogo: {
    width: 100,
    height: 100,
    position: 'absolute',
    left: -20,
  },

  imgMenu: {
    width: 70,
    left: 275,
    top: -83,
    height: 80,
    position: 'absolute',
  },

  button: {
    width: 150,
    backgroundColor: colors.botton,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    left: 100,
    top: 0,
  },

  text: {
    width: 150,
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    left: 100,
    textAlign: 'center',
    top: 0,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  dropdownMenu: {
    position: 'absolute',
    top: 100,
    left: 120,
    width: '44%',
    backgroundColor: colors.white,
    borderRadius: 10,
    zIndex: 10,
  },

  dropdownButton: {
    padding: 10,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.botton,
    alignItems: 'center',
    borderRadius: 10,
  },

  dropdownText: {
    color: colors.botton,
    fontSize: 16,
  },

  iconMenu: {
    color: colors.white,
    fontSize: 50,
    left: 310,
    top: -75,
  },

  sidebar: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 250,
    height: 800,
    backgroundColor: colors.white,
    paddingTop: 50,
    paddingHorizontal: 20,
    zIndex: 999,
    elevation: 999,
    display: 'flex',
    justifyContent: 'flex-start',
  },

  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  sidebarItemIcon: {
    width: 50,
    height: 50,
    marginRight: 20,
    top: -10,
  },

  sidebarText: {
    color: colors.text,
    fontSize: 18,
    marginBottom: 20,
  },

  cerrarSidebar: {
    width: 60,
    height: 60,
    top: -25,
  },
});
