import {useEffect, useState} from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View, Button, Text, Switch, TextStyle } from 'react-native';

import { useTranslation } from "react-i18next";
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import useLoadText from '@/hooks/useLoadText';

const TIMETOREAD = 35;

export default function ReadDrill() { // Change this to load different articles
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;
  const drillSpeeds: number[] = [3000, 1500, 750];

  const [currentDrill, setCurrentDrill] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMETOREAD);
  const [wordCount, setWordCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [currentWords, setCurrentWords] = useState<number>();
  const { text, loading, error } = useLoadText();
  const [currentLines, setCurrentLines] = useState<string[]>([])
  const [isHovered, setIsHovered] = useState(false);

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

  const startReading = (speed: number = 0) => {
    setCurrentDrill(speed);
    setCurrentLines(text)
    setIsReading(true);
    setTimeLeft(TIMETOREAD);
    setWordCount(text.length);
    setShowResult(false);
  };

  useEffect(() => {
    let timer2: any;
    if (isReading && timeLeft > 0) {
      timer2 = setInterval(() => {
        showNextLine()
      }, drillSpeeds[currentDrill]);
    }
    return () => clearInterval(timer2);
  }, [isReading]);

  const showNextLine = () => {
    console.log(text.length, drillSpeeds[currentDrill], currentLineIndex)
    if (isReading && currentLineIndex < text.length - 1) {
      setCurrentLineIndex(prevIndex => prevIndex + 1)
    }
  };

  const getDynamicOpacity = (i: number): TextStyle => ({
    color: (i + 5) < currentLineIndex  ? 'gray' : 'black',
    display: i > currentLineIndex + 5 ? 'none' : 'flex'
  });

  const showCurrentWords = (i: number) => {
    const totalText = text.slice(0, i);

    console.log(totalText.join(' ').split(' ').length)
    setCurrentWords(totalText.join(' ').split(' ').length)
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <View style={styles.exercise}>
          {!isReading &&  <Text>{t('press_start_to')}</Text>}
          {isReading &&
            text.map((t,i)=> <Text
              key={i} onPress={()=>showCurrentWords(i)}
              onPressIn={() => setIsHovered(true)} // Simulates hover start
              onPressOut={() => setIsHovered(false)} // Simulates hover end
              style={[styles.textContainer, getDynamicOpacity(i)]}>{t}</Text>)
          }
          <Button title={t('press_start')} onPress={() => startReading(0)} disabled={isReading} />
          <Button title={t('press_start_x2')} onPress={() => startReading(1)} disabled={isReading} />
          <Button title={t('press_start_x3')} onPress={() => startReading(2)} disabled={isReading} />
          <Text>Time left: {timeLeft} seconds</Text>
          {showResult && <Text>Total words read: {wordCount}</Text>}
          <Button title="Toggle Stats" onPress={toggleShowStats} />
          {showStats && <Text>Stats: ...</Text>}
          {currentWords}
          {currentWords && t('wpm') }
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
  textContainer: {
    flexDirection: 'column',
    width: 500,
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
  hoveredBox: {
    backgroundColor: 'blue',
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
