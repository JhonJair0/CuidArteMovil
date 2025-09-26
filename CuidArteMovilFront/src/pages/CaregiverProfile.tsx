import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../../config/api';
import { styleCareviger } from '../theme/styleCareviger';
import { NavBar } from '../component/NavBar';

export const CaregiverProfile = ({ route }: any) => {
  const { caregiver, caregiverId } = route.params ?? {};
  const [dataCareviger, setDataCareviger] = useState<any>(caregiver ?? null);
  const [loading, setLoading] = useState<Boolean>(!caregiver);

  useEffect(() => {
    if (!dataCareviger && caregiverId) {
      setLoading(true);
      axios
        .get(`${BASE_URL}/api/careviger/${caregiverId}`)
        .then(response => setDataCareviger(response.data))
        .catch(err => {
          console.error(err);
        })
        .finally(() => setLoading(false));
    }
    console.log(dataCareviger);
  }, [caregiverId]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }
  if (!dataCareviger) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Perfil no disponible</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <NavBar></NavBar>
      <View style={styleCareviger.body}>
        <View style={styleCareviger.content}>
          <Image source={{ uri: dataCareviger.fotoPerfil }}></Image>
          <Text style={styleCareviger.text}>
            Nombre: {dataCareviger.nombre}
          </Text>
          <Text style={styleCareviger.text}>
            Descripción: {dataCareviger.descripcion}
          </Text>
          <Text style={styleCareviger.text}>
            Ubicado En: {dataCareviger.ciudad}
          </Text>
          <Text style={styleCareviger.text}>Edad: {dataCareviger.edad}</Text>
        </View>
      </View>
    </ScrollView>
  );
};
