import {useEffect, useState} from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View, Button, Text, Switch } from 'react-native';

import { useTranslation } from "react-i18next";
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import useLoadText from '@/hooks/useLoadText';

const TIMETOREAD = 5;

export default function ReadDrill() { // Change this to load different articles
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;

  const [isReading, setIsReading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMETOREAD);
  const [wordCount, setWordCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const { text, loading, error } = useLoadText();
  const articleText = text.join(' ');

  useEffect(() => {
    let timer: any;
    if (isReading && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsReading(false);
      setShowResult(true);
    }
    return () => clearInterval(timer);
  }, [isReading, timeLeft]);

  const toggleShowStats = () => {
    setShowStats(prevShowStats => !prevShowStats);
  };

  const startReading = () => {
    setIsReading(true);
    setTimeLeft(TIMETOREAD);
    setWordCount(articleText.split(' ').length);
    setShowResult(false);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <View style={styles.exercise}>
          <Text>{isReading ? articleText : "Press Start to read the article"}</Text>
          <Button title="Start" onPress={startReading} disabled={isReading} />
          <Text>Time left: {timeLeft} seconds</Text>
          {showResult && <Text>Total words read: {wordCount}</Text>}
          <Button title="Toggle Stats" onPress={toggleShowStats} />
          {showStats && <Text>Stats: ...</Text>}
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
