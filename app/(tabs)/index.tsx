import { Image, StyleSheet, Platform, View, Text, Button } from 'react-native';
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useGoogleOneTapLogin, useGoogleLogin } from '@react-oauth/google';
import useAsyncStorage from '@/hooks/useStorage';


export default function HomeScreen() {
  const {readData, writeData, setCurrentUser } = useAsyncStorage();
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.languages[1];
  const [currentWPM, setCurrentWPM] = useState<number>(0);

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await readData('lang')// await AsyncStorage.getItem("language");
      if (savedLanguage) {
        i18n.changeLanguage(savedLanguage);
      }
      const wpm = await readData('wpm')
      const sum = wpm.reduce((acc: number, num: number) => acc + num, 0) || 0;
      setCurrentWPM(sum / wpm.length);
    };
    loadLanguage();
  }, [i18n]);

  const changeLanguage = async (lang: string) => {
    await writeData('lang', lang);
    i18n.changeLanguage(lang);
  };

  useGoogleOneTapLogin({
    onSuccess: credentialResponse => {
      console.log('Credential response: ', credentialResponse)
    },
    onError: () => {
      console.log('Login Failed');
    },
  });

  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      console.log(tokenResponse);
    },
    onError: error => {
      console.error('Login Failed:', error);
      if (error.error === 'popup_closed_by_user') {
        alert('Login was closed. Please try again.');
      }
    },
  });

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{t('welcome')}!</ThemedText>
        <HelloWave />
      </ThemedView>
      <View style={styles.languageButtons}>
          <Button title={t('login')} onPress={() => login()} />
      </View>
      <View style={styles.languageButtons}>
          <Button title="English" onPress={() => changeLanguage('en-US')} />
          <Button title="Spanish" onPress={() => changeLanguage('es-ES')} />
      </View>
      <View>
        <Text>{t('current_speed')}</Text>
        <Text>{currentWPM}/{t('wpm')}</Text>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 140,
    width: 111,
  },
  languageButtons : {
    flexDirection: 'column',
    gap: 10,
    marginTop: 20,
  }
});
