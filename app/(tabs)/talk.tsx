import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ExerciseTitle } from '@/components/ExerciseTitle';
import { useNavigation } from '@react-navigation/native';

export default function TalkScreen() {
  const navigation = useNavigation();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Talk</ThemedText>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ExerciseTitle href="exercises/repeat" icon="mic-outline" name="Repeat" description="Repeat words" />
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ExerciseTitle href="exercises/read" icon="book-outline" name="Read" description="Read" />
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ExerciseTitle href="exercises/chat-repeat" icon="chatbubble-outline" name="Chat Repeat" description="Chat Repeat words" />
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ExerciseTitle href="exercise-sing" icon="musical-notes-outline" name="Singing!" description="Sing exercise" />
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ExerciseTitle href="exercise-chat" icon="people-outline" name="Conversation" description="Real conversation exercise" />
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
