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

export default function VisionSpanScreen() { // Change this to load different articles
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.languages[1];
  const {readData, writeData, setCurrentUser } = useAsyncStorage();

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMETOREAD);
  const [wordCount, setWordCount] = useState(0);
  const [showResult, setShowResult]= useState(false);
  const [showStats, setShowStats] = useState(false)
  const {text, loading, error} = useLoadText(currentLanguage)
  const articleText = text;

  useEffect(() => {
    let timer : any;
    if (isReading && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsReading(false);
      setShowResult(true)
      saveWPM();
    }
    return () => clearInterval(timer);
  }, [isReading, timeLeft]);

  const toggleShowStats = () => {
    setShowStats(prevShowStats => !prevShowStats);
  };

  const startReading = () => {
    setIsReading(true);
    setTimeLeft(TIMETOREAD);
    setCurrentLineIndex(0);
    setWordCount(0);
  };

  const showNextLine = () => {
    if (currentLineIndex < articleText.length - 1) {
      setCurrentLineIndex(currentLineIndex + 1);
      const wordsInLine = articleText[currentLineIndex].split(' ').length;
      setWordCount(prevCount => prevCount + wordsInLine);
    } else {
      setIsReading(false);
      setShowResult(true)
      saveWPM();
    }
  };

  const saveWPM = async () => {
    const wpm = await readData('wpm');
    wpm.push(wordCount);
    await writeData('wpm', JSON.stringify(wpm))
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
      <View style={styles.exercise}>
          <Text>{isReading ? articleText[currentLineIndex] : "Press Start to read the article"}</Text>

          {isReading && <Button title="Next Line" onPress={showNextLine} disabled={!isReading} />}
          {showStats && <Text>Time left: {timeLeft} seconds</Text>}
          {showStats || showResult &&
            <Text>Read words: {wordCount}</Text>
          }
        </View>
        {!isReading &&
          <View>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleShowStats}
              value={showStats}
            /><Text>Show stats</Text>
          </View>
        }
        {!isReading && <Button title="Start" onPress={startReading} disabled={isReading} />}
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
