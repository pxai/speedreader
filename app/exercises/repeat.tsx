import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View, Platform, Text } from 'react-native';

import { useTranslation } from "react-i18next";
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import useSpeechSynthesis from '@/hooks/useSpeechSynthesis';
import { useState, useEffect } from 'react';

export default function RepeatScreen() {
  const areEqual = (a: string, b: string) => a.toLowerCase().trim() === b.toLowerCase().trim();
  const [currentPhrase, setCurrentPhrase] = useState<number>(-1);
  const [answers, setAnswers] = useState<any[]>([]);

  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;

  const { isSpeaking, speak } = useSpeechSynthesis();


  const startExercise = () => {
    if (!isSpeaking) {
      nextPhrase();
      console.log(currentPhrase, phrases[currentPhrase])
      console.log(phrases[currentPhrase + 1])

    }
  };

  const nextPhrase = () => {
    if (currentPhrase < phrases.length - 1) {
        setCurrentPhrase(currentPhrase + 1)
    }
  }

  const phrases = [
    "My name is Peter",
    "I'm 30 years old",
    "I live in a little town close to Florida",
    "This is my first lesson",
    "Do you like my voice"
  ]

  const exerciseFinished = () => answers.length === phrases.length;

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <div style={styles.exercise}>

        </div>


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
    flexDirection: 'row',
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
