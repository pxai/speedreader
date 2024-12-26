import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';

import { useTranslation } from "react-i18next";
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import useSpeechRecognition from '@/hooks/useSpeechRecognition';
import useSpeechSynthesis from '@/hooks/useSpeechSynthesis';
import useAudioPlayer from '@/hooks/useAudioPlayer';
import { useState, useEffect } from 'react';

export default function ChatRepeatScreen() {
  const areEqual = (a: string, b: string) => a.toLowerCase().trim() === b.toLowerCase().trim();
  const { isPlaying, play, pause, stop } = useAudioPlayer('../assets/audio/ok.mp3');

  const { transcript, isListening, setIsListening } = useSpeechRecognition();
  const [currentPhrase, setCurrentPhrase] = useState<number>(0);

  const startListening = () => setIsListening(true);
  const stopListening = () => setIsListening(false);

  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;

  const { isSpeaking, speak } = useSpeechSynthesis();

  useEffect(() => {
    console.log('Listening ended: ',transcript, areEqual(transcript, phrases[currentPhrase]));
    if (areEqual(transcript, phrases[currentPhrase])) {
      stopListening();
      play();
      nextPhrase();
    }
  }, [transcript]);

  const handleSpeech = () => {
    if (!isSpeaking) {
      //speak('Tell me something I do not know.');
      speak("I'm a bad bitch on the beach.");
    }
  };

  const startExercise = () => {
    if (!isSpeaking) {
      //speak('Tell me something I do not know.');
      speak(phrases[currentPhrase], onSpeechEndCallback);
      console.log(phrases[currentPhrase])

    }
  };

  const nextPhrase = () => {
    if (currentPhrase < phrases.length - 1) {
        setCurrentPhrase(currentPhrase + 1)
    }
  }



  const onSpeechEndCallback = () => {
    startListening();
  }


  const phrases = [
    "My name is Peter",
    "I'm 30 years old",
    "I live in a little town close to Florida",
    "This is my first lesson",
    "Do you like my voice"
  ]

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
      <div>
          <button onClick={startListening} disabled={isListening}>
            Start Listening
          </button>
          <button onClick={stopListening} disabled={!isListening}>
            Stop Listening
          </button>
          <p>Transcript: {transcript}</p>
        </div>
        <button onClick={startExercise}>
        {isSpeaking ? 'Speaking...' : 'Speak now'}
      </button>
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
});
