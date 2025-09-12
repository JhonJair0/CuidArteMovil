// URL para el emulador de Android.
// El 10.0.2.2 es la dirección localhost dentro del emulador.
const ANDROID_LOCAL_IP = 'http://192.168.1.48:8000';

// URL para el emulador de iOS.
// 'localhost' se resuelve correctamente para iOS.
const IOS_LOCAL_IP = 'http://localhost:8000';

// Si usas un dispositivo físico en tu red local
// const LOCAL_NETWORK_IP = 'http://192.168.1.XX:8000';

const BASE_URL =
  // Si estamos en desarrollo y la plataforma es Android...
  __DEV__ && Platform.OS === 'android'
    ? ANDROID_LOCAL_IP
    : // Si estamos en desarrollo y la plataforma es iOS...
    __DEV__ && Platform.OS === 'ios'
    ? IOS_LOCAL_IP
    : // Si estamos en producción (aquí iría tu URL de producción)
      'https://api.tudominio.com';

export { BASE_URL };
