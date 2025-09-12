import { Image, View, Text, StyleSheet } from 'react-native';
import { CarevigerAdultStyle } from '../../theme/styleCarevigerAdult';
import { NavBar } from '../NavBar';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../../../config/api';
import axios from 'axios';

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
  const [filtroMascotas, setFiltroMascotas] = useState<Users[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/careviger`);
        const data: Users[] = response.data;

        const filteredData = data.filter(
          user =>
            user.TipoCuidador &&
            user.TipoCuidador.trim().toLowerCase() === 'infantes',
        );
        setFiltroMascotas(filteredData);
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
  if (filtroMascotas.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No se encontraron cuidadores de mascotas.</Text>
      </View>
    );
  }

  return (
    <View style={CarevigerAdultStyle.body}>
      <NavBar />

      <View style={CarevigerAdultStyle.content}>
        {filtroMascotas.map(user => (
          <View style={CarevigerAdultStyle.inputContainer} key={user.id}>
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
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
