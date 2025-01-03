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

  const [currentText, setCurrentText] = useState<React.JSX.Element[]>([]);

  const {text, loading, error} = useLoadText(currentLanguage)
  const articleText = text;


  const showNext3 = () => {
    const characters =  characterGenerator(3)
    setCurrentText(characters.map((char, i) => <Text key={i} style={styles.phraseWord}>{char}</Text>));
  };

  const showNext5 = () => {
    let characters =  characterGenerator(5)
    characters = [characters[0], characters.slice(1,4).join(''), characters[4]]
    setCurrentText(characters.map((char, i) => <Text key={i} style={styles.spanText}>{char}</Text>));
  };

  const showNext7 = () => {
    let characters =  characterGenerator(7)
    characters = [characters[0], characters[1], characters.slice(2, 5).join(''), characters[5], characters[6]]
    setCurrentText(characters.map((char, i) => <Text key={i} style={styles.spanText}>{char}</Text>));
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
      <View style={styles.exercise}>
          <Text>Focus on the center</Text>
          <View style={styles.viewSpan}>{currentText}</View>
       </View>
       <Button title="Start 3" onPress={showNext3} />
       <Button title="Start 5" onPress={showNext5} />
       <Button title="Start 7" onPress={showNext7} />
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
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
  },
  transcript: {
    display: 'none',
  },
  transcriptShow: {
    display: 'block',
  },
  viewSpan: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 500,
  },
  spanText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 5,
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
