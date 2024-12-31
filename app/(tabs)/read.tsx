import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ExerciseTitle } from '@/components/ExerciseTitle';
import { useNavigation } from '@react-navigation/native';

export default function ReadScreen() {
  const navigation = useNavigation();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Read</ThemedText>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
      <ExerciseTitle href="exercises/read" icon="flash-outline" name="Read Speed" description="Determine your WPM" />
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ExerciseTitle href="exercises/read-drill" icon="book-outline" name="Read drill" description="Read Drill exercise" />
      </ThemedView>
      <ThemedText>Let's talk</ThemedText>
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
