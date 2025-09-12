import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../pages/HomeScreen';
import { LoginScreen } from '../pages/LoginScreen';
import { RegisterCarevigerScreen } from '../pages/RegisterCarevigerScreen';
import { RegisterPatientScreen } from '../pages/RegisterPatientScreen';
import { RecoverPassword } from '../component/RecoverPassword';
import { ProfilePatientScreen } from '../pages/ProfilePatientScreen';
import { ProfileCarevigerScreen } from '../pages/ProfileCarevigerSceen';
import { CarevigerAdult } from '../component/users/CarevigerAdult';
import { CarevigerKids } from '../component/users/CarevigerKids';
import { CarevigerPets } from '../component/users/CarevigerPets';

export type RootStackParams = {
  Home: undefined;
  Login: undefined;
  RegisterCaregiver: undefined;
  RegisterPatient: undefined;
  RecoverPassword: undefined;
  ProfilePatientScreen: {
    patientData: {
      fullName: string;
      phone: string;
      email: string;
      address: string;
      idCard: string;
      department: string;
      city: string;
      password: string;
      imageUri: string | null;
    };
  };
  ProfileCarevigerScreen: {
    caregiverData: {
      fullName: string;
      phone: string;
      email: string;
      address: string;
      idCard: string;
      department: string;
      city: string;
      password: string;
      imageUri: string | null;
      age: string;
      studies: string;
      experience: string;
      description: string;
      sheetLife: string | null;
      certificate: string | null;
    };
  };
  CarevigerAdult: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const NavigationStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="RegisterCaregiver"
        component={RegisterCarevigerScreen}
      />
      <Stack.Screen name="RegisterPatient" component={RegisterPatientScreen} />
      <Stack.Screen name="RecoverPassword" component={RecoverPassword} />
      <Stack.Screen
        name="ProfilePatientScreen"
        component={ProfilePatientScreen}
      />
      <Stack.Screen
        name="ProfileCarevigerScreen"
        component={ProfileCarevigerScreen}
      />
      <Stack.Screen name="CarevigerAdult" component={CarevigerAdult} />
      <Stack.Screen name="CarevigerKids" component={CarevigerKids} />
      <Stack.Screen name="CarevigerPets" component={CarevigerPets} />
    </Stack.Navigator>
  );
};
