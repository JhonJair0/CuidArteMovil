import {
  Image,
  View,
  Text,
  StyleSheet,
  Alert,
  Pressable,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { CarevigerAdultStyle } from '../../theme/styleCarevigerAdult';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { NavBar } from '../NavBar';
import { useEffect, useState, useContext } from 'react';
import { BASE_URL } from '../../../config/api';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/NavigationStack';

type NavProps = StackNavigationProp<RootStackParams, 'CaregiverProfile'>;

interface Users {
  id: number;
  nombre: string;
  edad?: string;
  cedula: string;
  ciudad: string;
  descripcion?: string;
  anosExperiencia?: string;
  departamento: string;
  direccion: string;
  correo: string;
  TipoCuidador?: string | null;
  estudiosRealizados?: string;
  credenciales?: string;
  hojaVida?: string;
  telefono: string;
  fotoPerfil: string;
  idRol: number;
}

export const CarevigerPets = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const [filtroInfante, setFiltroInfante] = useState<Users[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation<NavProps>();

  const auth = useContext(AuthContext) as any;
  const currentUser = auth?.user ?? auth?.currentUser ?? auth;
  const canOpenProfile = Number(currentUser?.idRol) === 2;
  const handlePress = (user: Users) => {
    if (!canOpenProfile) {
      Alert.alert(
        'Acceso denegado',
        'Debes iniciar sesión para ver el perfil del cuidador.',
      );
      return;
    }

    navigation.navigate('CaregiverProfile', {
      caregiverId: user.id,
      caregiver: user,
    });
  };
  const getPressableStyle = ({ pressed }: { pressed: boolean }) => [
    CarevigerAdultStyle.inputContainer,
    !canOpenProfile && { opacity: 0.75 },
    pressed && canOpenProfile && { transform: [{ scale: 0.995 }] },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/careviger`);
        const data: Users[] = response.data;

        const filteredData = data.filter(
          user =>
            user.TipoCuidador &&
            user.TipoCuidador.trim().toLowerCase() === 'mascotas',
        );

        setFiltroInfante(filteredData);
        setUsers(data);
      } catch (e: any) {
        setError('Ocurrió un error al cargar los datos.');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text>Cargando cuidadores...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: 'red' }}>Error: {error}</Text>
      </View>
    );
  }
  if (filtroInfante.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No se encontraron cuidadores de adultos.</Text>
      </View>
    );
  }

  return (
    // Envuelve todo en un SafeAreaView para manejar los márgenes de la pantalla
    <SafeAreaView style={{ flex: 1 }}>
      {/* El NavBar debe ser un componente separado y fijo en la parte superior */}
      <NavBar />

      {/* Usa un ScrollView para manejar el contenido que excede el tamaño de la pantalla */}
      <ScrollView
        style={CarevigerAdultStyle.body}
        contentContainerStyle={CarevigerAdultStyle.contentContainer}
      >
        <View style={CarevigerAdultStyle.content}>
          {filtroInfante.map(user => (
            <Pressable
              key={user.id}
              onPress={() => handlePress(user)}
              android_ripple={{ color: '#ddd' }}
              accessibilityRole="button"
              style={getPressableStyle}
            >
              <View style={CarevigerAdultStyle.inputContainer}>
                <View style={CarevigerAdultStyle.containerImg}>
                  <Image
                    source={{ uri: user.fotoPerfil }}
                    style={CarevigerAdultStyle.upload}
                    resizeMode="cover"
                  />
                </View>

                <View style={{ flex: 1, left: 15 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                    {user.nombre}
                  </Text>
                  <Text style={{ fontSize: 14, color: '#555' }}>
                    {user.descripcion}
                  </Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
