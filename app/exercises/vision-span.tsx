import {useEffect, useState} from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View, Button, Text, Switch } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import useLoadText from '@/hooks/useLoadText';
import characterGenerator from '../services/character-generator';
import useAsyncStorage from '@/hooks/useStorage';


const TIMETOREAD = 5;

export default function VisionSpanScreen() { // Change this to load different articles
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.languages[1];
  const {readData, writeData, setCurrentUser } = useAsyncStorage();

  const [currentText, setCurrentText] = useState('');

  const {text, loading, error} = useLoadText(currentLanguage)
  const articleText = text;


  const showNext = () => {
    console.log('showNext: ', characterGenerator(3).join(''));
    setCurrentText(characterGenerator(3).join(''));
  };



  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
      <View style={styles.exercise}>
          <Text>Focus on the center</Text>
          <Text>{currentText}</Text>
        <Button title="Start" onPress={showNext} />
       </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}
const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'column',
    gap: 8,
  },
  exercise: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  transcript: {
    display: 'none',
  },
  transcriptShow: {
    display: 'block',
  },
  currentPhrase: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    display: 'flex',
    flexDirection: 'row',
  },
  phraseWordContainer: {
    borderBottomWidth: 4, // Thickness of the underline
    borderBottomColor: 'gray', // Color of the underline
    paddingBottom: 5, // Distance of the underline from the text
    marginRight: 5,
  },
  phraseWord: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 5,
  },
});
