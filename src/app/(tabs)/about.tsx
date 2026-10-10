import { Text, View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import epnTheme from '@/constants/epn-theme.json';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require('@/assets/images/logo-epn-vertical.png')}
          style={styles.logo}
          contentFit="contain"
          accessibilityLabel="Escudo de la Escuela Politécnica Nacional"
        />
        <View style={styles.divider} />
        <Text style={styles.title}>PoliTemu</Text>
        <Text style={styles.text}>
          Una experiencia creativa inspirada en la identidad visual de la EPN.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: epnTheme.colors.cream,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    backgroundColor: epnTheme.colors.white,
    borderRadius: 24,
    padding: 28,
    borderTopWidth: 5,
    borderTopColor: epnTheme.colors.red,
  },
  logo: {
    width: 150,
    height: 150,
  },
  divider: {
    width: 56,
    height: 4,
    borderRadius: 2,
    backgroundColor: epnTheme.colors.gold,
    marginVertical: 18,
  },
  title: {
    color: epnTheme.colors.navy,
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  text: {
    color: epnTheme.colors.muted,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
});
