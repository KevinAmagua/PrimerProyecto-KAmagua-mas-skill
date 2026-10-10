import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import epnTheme from '@/constants/epn-theme.json';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: epnTheme.colors.gold,
        tabBarInactiveTintColor: epnTheme.colors.cream,
        headerStyle: {
          backgroundColor: epnTheme.colors.navy,
        },
        headerShadowVisible: false,
        headerTintColor: epnTheme.colors.cream,
        headerTitleStyle: {
          color: epnTheme.colors.gold,
          fontWeight: '700',
        },
        tabBarStyle: {
          backgroundColor: epnTheme.colors.navy,
          borderTopColor: epnTheme.colors.gold,
        },
        tabBarLabelStyle: {
          fontWeight: '600',
        },
        headerTitleAlign: 'center',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'home-sharp' : 'home-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'Acerca de',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'information-circle' : 'information-circle-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
