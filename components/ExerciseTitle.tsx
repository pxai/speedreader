import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { type ComponentProps } from 'react';
import { Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export type ExerciseTitleProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string;
  icon: string;
  name?: string;
  description?: string;
};

export function ExerciseTitle({ href, icon, name, description, ...rest }: ExerciseTitleProps) {
  return (
    <Link
      {...rest}
      href={href}
    >
      <Ionicons name={icon} color="gray" size={28} />
      <h2><ThemedText>{name}</ThemedText></h2>
      <p><ThemedText>{description}</ThemedText></p>
    </Link>
  );
}