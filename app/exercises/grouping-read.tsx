import {useEffect, useState} from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View, Button, Text, Switch } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import useLoadText from '@/hooks/useLoadText';
import splitTextIntoLines from '../services/split-text-into-lines';
import useAsyncStorage from '@/hooks/useStorage';


const TIMETOREAD = 5;

export default function ReadScreen() { // Change this to load different articles
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.languages[1];
  const {readData, writeData, setCurrentUser } = useAsyncStorage();

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMETOREAD);
  const [showResult, setShowResult]= useState(false);
  const [showStats, setShowStats] = useState(false)
  const {text, loading, error} = useLoadText(currentLanguage)
  const articleText = text;

  const toggleShowStats = () => {
    setShowStats(prevShowStats => !prevShowStats);
  };

  const startReading = () => {
    setIsReading(true);
    setTimeLeft(TIMETOREAD);
    setCurrentLineIndex(0);
  };

  const showNextLine = () => {
    setIsReading(true);
    console.log("Here we go> ", currentLineIndex, articleText.length, (articleText.length - 1)/10, currentLineIndex < (articleText.length - 1)/10);
    if (currentLineIndex < (articleText.length - 1)/10) {
      setCurrentLineIndex(currentLineIndex + 10);
      console.log("Reading next> ", currentLineIndex, articleText.slice(currentLineIndex, currentLineIndex + 10));
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
      <View style={styles.exercise}>
          {isReading ? articleText.slice(currentLineIndex, currentLineIndex + 10).map((line, i) => <Text key={i}>{line}</Text>) : <Text>"Next"</Text>}
        </View>
        <Button title="Next Line" onPress={showNextLine}  />
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
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textAlign: 'left',
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
