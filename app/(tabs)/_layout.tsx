import { Tabs } from 'expo-router';
import React from 'react';
import { useTranslation } from "react-i18next";

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const { i18n, t } = useTranslation();
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t('home'),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="read"
        options={{
          title: t('read'),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'book' : 'book-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="help"
        options={{
          title: t('help'),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'help' : 'help-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
