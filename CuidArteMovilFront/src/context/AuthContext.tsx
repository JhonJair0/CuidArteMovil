import React, { createContext, useState, useEffect, ReactNode } from 'react';
import * as Keychain from 'react-native-keychain';
import axios from 'axios';
import { BASE_URL } from '../../config/api';

interface IAuthUser {
  nombre: string;
  edad?: string;
  cedula: string;
  ciudad: string;
  descripcion?: string;
  anosExperiencia?: string;
  departamento: string;
  direccion: string;
  correo: string;
  estudiosRealizados?: string;
  credenciales?: string;
  hojaVida?: string;
  telefono: string;
  fotoPerfil: string;
  idRol: number;
}

// Crear el contexto
interface IAuthContext {
  isLoggedIn: boolean;
  loading: boolean;
  user: IAuthUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<IAuthContext | null>(null);

interface AuthProviderProps {
  children: ReactNode; // <-- Aquí definimos el tipo de 'children'
}

// Crear el proveedor (Provider) del contexto
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // Almacena los datos del usuario aquí

  // Función para iniciar sesión (usada por el LoginScreen)
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/login`, {
        correo: email,
        contrasena: password,
      });

      // Guardar el token de forma segura
      await Keychain.setGenericPassword('token', response.data.token);

      // Actualizar el estado global
      setIsLoggedIn(true);
      setUser(response.data.user);

      return true; // Retorna true si el login fue exitoso
    } catch (err) {
      console.log('Error de login:', err);
      return false; // Retorna false si hubo un error
    }
  };

  // Función para cerrar sesión (la usarás más adelante)
  const logout = async () => {
    await Keychain.resetGenericPassword();
    setIsLoggedIn(false);
    setUser(null);
  };

  // Efecto que verifica la sesión al iniciar la app
  useEffect(() => {
    const checkSession = async () => {
      try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          // Si el token existe, asume que está logueado

          const response = await axios.get(`${BASE_URL}/api/user`, {
            headers: {
              Authorization: `Bearer ${credentials.password}`,
            },
          });

          if (response.data) {
            setUser(response.data);
            setIsLoggedIn(true);
          } else {
            await logout();
          }
        }
      } catch (error) {
        console.log('Error al obtener credenciales:', error);
        await logout();
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, loading, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
