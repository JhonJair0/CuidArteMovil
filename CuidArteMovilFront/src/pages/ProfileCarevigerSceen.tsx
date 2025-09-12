import React, { useState } from 'react';
import { View, Text, Image, Pressable, TextInput, ScrollView } from 'react-native';
import { ProfileCarevigerStyles } from '../theme/styleProfileCareviger';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/NavigationStack';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { RouteProp } from '@react-navigation/native';

type NavProps = StackNavigationProp<RootStackParams, 'ProfilePatientScreen'>;

type ProfilePatientScreenRouteProp = RouteProp<RootStackParams, 'ProfileCarevigerScreen'>;
type Props = {
  route: ProfilePatientScreenRouteProp;
};

export const ProfileCarevigerScreen = ({ route }: Props) => {
  const navigation = useNavigation<NavProps>();

  const { caregiverData } = route.params;

  const [fullName, setFullName] = useState(caregiverData.fullName);
  const [phone, setPhone] = useState(caregiverData.phone);
  const [email, setEmail] = useState(caregiverData.email);
  const [address, setAddress] = useState(caregiverData.address);
  const [idCard, setIdCard] = useState(caregiverData.idCard);
  const [department, setDepartment] = useState(caregiverData.department);
  const [city, setCity] = useState(caregiverData.city);
  const [password, setPassword] = useState(caregiverData.password);
  const [age, setAge] = useState(caregiverData.age);
  const [sheetLife, setSheetLife] = useState(caregiverData.sheetLife || '');
  const [studies, setStudies] = useState(caregiverData.studies);
  const [description, setDescription] = useState(caregiverData.description || '');
  const [experience, setExperience] = useState(caregiverData.experience);
  const [certificate, setCertificate] = useState(caregiverData.certificate || '');
  const [imageUri, setImageUri] = useState(caregiverData.imageUri);
  const [isEditing, setIsEditing] = useState(false);

  const HomePress = () => {
    navigation.navigate('Home');
  };

  const handleSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 800,
        maxHeight: 800,
        quality: 0.8,
      },
      response => {
        if (response.didCancel) {
          console.log('El usuario canceló la selección');
        } else if (response.errorCode) {
          console.log('Error: ', response.errorMessage);
        } else {
          const uri = response.assets?.[0]?.uri ?? null;
          setImageUri(uri);
        }
      }
    );
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <View style={ProfileCarevigerStyles.body}>
        <ScrollView 
        contentContainerStyle={{ flexGrow: 1, alignItems: 'center', paddingVertical: 20 }}
        showsVerticalScrollIndicator={false}
      >
      <View style={ProfileCarevigerStyles.content}>
        <Pressable onPress={HomePress} style={ProfileCarevigerStyles.leftArrowContainer}>
          <Image
            source={require('../icon/flecha-izquierda.png')}
            style={ProfileCarevigerStyles.leftArrow}
            resizeMode="contain"
          />
        </Pressable>

        <Pressable onPress={handleSelectImage}>
          <Image
            source={imageUri ? { uri: imageUri } : require('../img/Logo-cuidarte.png')}
            style={ProfileCarevigerStyles.Logo}
            resizeMode="cover"
          />
        </Pressable>

        <View style={ProfileCarevigerStyles.inputContainer}>
          <View style={ProfileCarevigerStyles.inputColumn}>
            <Text>Nombre:</Text>
            <TextInput
              style={ProfileCarevigerStyles.input}
              value={fullName}
              onChangeText={setFullName}
              editable={isEditing}
            />

            <Text>Teléfono:</Text>
            <TextInput
              style={ProfileCarevigerStyles.input}
              value={phone}
              onChangeText={setPhone}
              editable={isEditing}
            />

            <Text>Correo electrónico:</Text>
            <TextInput
              style={ProfileCarevigerStyles.input}
              value={email}
              onChangeText={setEmail}
              editable={isEditing}
            />

            <Text>Dirección:</Text>
            <TextInput
              style={ProfileCarevigerStyles.input}
              value={address}
              onChangeText={setAddress}
              editable={isEditing}
            />

            <View style={[{ borderBottomWidth: 1, borderBottomColor: '#5f51fe', width: 305 }]}></View>

            <View style={[{ top: 10 }]}>
                <Text>Edad:</Text>
                <TextInput
                style={ProfileCarevigerStyles.input}
                value={age}
                onChangeText={setAge}
                editable={isEditing}
                />
            </View>

            <Text>Estudios realizados:</Text>
            <TextInput
              style={ProfileCarevigerStyles.input}
              value={studies}
              onChangeText={setStudies}
              editable={isEditing}
            />
          </View>

          <View style={ProfileCarevigerStyles.inputColumn}>
            <Text>Cédula:</Text>
            <TextInput
              style={ProfileCarevigerStyles.input}
              value={idCard}
              onChangeText={setIdCard}
              editable={isEditing}
            />

            <Text>Departamento:</Text>
            <TextInput
              style={ProfileCarevigerStyles.input}
              value={department}
              onChangeText={setDepartment}
              editable={isEditing}
            />

            <Text>Ciudad:</Text>
            <TextInput
              style={ProfileCarevigerStyles.input}
              value={city}
              onChangeText={setCity}
              editable={isEditing}
            />

            <Text>Contraseña:</Text>
            <TextInput
              style={ProfileCarevigerStyles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={isEditing}
            />

            <View style={[{ top: 10 }]}>
                <Text>Años de experiencia:</Text>
                <TextInput
                style={ProfileCarevigerStyles.input}
                value={experience}
                onChangeText={setExperience}
                editable={isEditing}
                />
            </View>
          </View>

          <View style={{ width: '100%', marginTop: 10 }}>
            <Text>Descripción:</Text>
            <TextInput
                style={[ProfileCarevigerStyles.input, { width: '100%' }]}
                value={description}
                onChangeText={setDescription}
                editable={isEditing}
            />

            <Text>Hoja de vida:</Text>
            <TextInput
                style={[ProfileCarevigerStyles.input, { width: '100%' }]}
                value={sheetLife}
                onChangeText={setSheetLife}
                editable={isEditing}
            />

            <Text>Diplomas o certificados:</Text>
            <TextInput
                style={[ProfileCarevigerStyles.input, { width: '100%' }]}
                value={certificate}
                onChangeText={setCertificate}
                editable={isEditing}
            />
          </View>

          <View style={ProfileCarevigerStyles.contentbutton}>
            <Pressable style={ProfileCarevigerStyles.button} onPress={toggleEditing}>
              <Text style={ProfileCarevigerStyles.editText}>
                {isEditing ? 'Guardar cambios' : 'Editar perfil'}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      </ScrollView>
    </View>
  );
};
