import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';
import { useTranslation } from "react-i18next";

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ExerciseTitle } from '@/components/ExerciseTitle';
import { useNavigation } from '@react-navigation/native';

export default function ReadScreen() {
  const { i18n, t } = useTranslation();
  const navigation = useNavigation();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{t('read')}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
      <ExerciseTitle href="exercises/read" icon="flash-outline" name={t('read_speed')} description={t('determine_wpm')} />
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ExerciseTitle href="exercises/read-drill" icon="book-outline" name={t('read_drill')} description={t('read_drill_exercise')} />
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ExerciseTitle href="exercises/vision-span" icon="eye-outline" name={t('vision_span')} description={t('vision_span_exercise')} />
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
    fontFamily: 'Quicksand',
  },
});
