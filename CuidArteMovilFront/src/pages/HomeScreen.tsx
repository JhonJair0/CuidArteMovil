import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { styles } from '../theme/styleHome';
import { NavBar } from '../component/NavBar';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/NavigationStack';

type NavProps = StackNavigationProp<RootStackParams, 'CarevigerAdult'>;

export const HomeScreen = () => {
  const navigation = useNavigation<NavProps>();

  const CarevigerAdult = () => {
    navigation.navigate('CarevigerAdult');
  };
  const CarevigerKids = () => {
    navigation.navigate('CarevigerKids');
  };
  const CarevigerPets = () => {
    navigation.navigate('CarevigerPets');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavBar />

      <ScrollView
        style={styles.fondo}
        contentContainerStyle={{ alignItems: 'center', paddingBottom: 160 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentCard}>
          <Pressable onPress={CarevigerAdult}>
            <View style={styles.card}>
              <Image
                source={require('../img/adulto-mayor-discapacidad.jpg')}
                style={styles.imgCard}
                resizeMode="cover"
              />
              <View style={styles.overlay} />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>
                  Adultos mayores o con problemas de discapacidad
                </Text>
                <Text style={styles.cardText}>
                  Si deseas un cuidador para tu familiar de edad avanzada o con
                  problemas de discapacidad, este es el lugar perfecto para ti.
                </Text>
              </View>
            </View>
          </Pressable>

          <Pressable onPress={CarevigerKids}>
            <View style={styles.card}>
              <Image
                source={require('../img/niños-menores-edad.jpg')}
                style={styles.imgCard}
                resizeMode="cover"
              />
              <View style={styles.overlay} />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>Niños o menores de edad</Text>
                <Text style={styles.cardText}>
                  Los cuidadores perfectos de niños o menores de edad.
                </Text>
              </View>
            </View>
          </Pressable>
          <Pressable onPress={CarevigerPets}>
            <View style={styles.card}>
              <Image
                source={require('../img/mascotas.jpg')}
                style={styles.imgCard}
                resizeMode="cover"
              />
              <View style={styles.overlay} />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>Mascotas</Text>
                <Text style={styles.cardText}>
                  Si tu mascota necesita cuidados o la atención que necesitas,
                  este es el lugar perfecto para ti.
                </Text>
              </View>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
