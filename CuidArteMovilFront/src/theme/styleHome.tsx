import { StyleSheet } from "react-native";

export const colors = {
  navigation: '#aca8f8',
  fondo: '#d8dafd',
  botton: '#5f51fe',
  text: '#000000',
  white: '#ffffff',
};

export const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: colors.fondo,
    paddingTop: 110,
    paddingBottom: 20
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },

  contentCard: {
    gap: 20,
    top: 20
  },

  card: {
    backgroundColor: colors.botton,
    width: 350,
    height: 330,
    borderRadius: 30,
    overflow: 'hidden',
    position: 'relative'
  },

  cardContent: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    right: 15,
  },


  cardTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  cardText: {
    color: colors.white,
    fontSize: 15,
  },

  imgCard: {
    width: '100%',
    height: '100%',
    borderRadius: 25
  },


});
