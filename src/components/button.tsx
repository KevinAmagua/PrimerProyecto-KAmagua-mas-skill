import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import epnTheme from '@/constants/epn-theme.json';

type Props = {
  label: string;
  theme?: 'primary';
  onPress?: () => void;
};

export default function Button({ label, theme, onPress }: Props) {
  // La variante primaria resalta la acción de elegir foto; la otra es secundaria.
  if (theme === 'primary') {
    return (
      <View
        style={[
          styles.buttonContainer,
          styles.primaryContainer,
        ]}>
        <Pressable
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.button,
            styles.primaryButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={onPress}
        >
          <FontAwesome
            name="picture-o"
            size={18}
            color={epnTheme.colors.navy}
            style={styles.buttonIcon}
          />
          <Text style={[styles.buttonLabel, styles.primaryLabel]}>{label}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.buttonContainer}>
      <Pressable
        accessibilityRole="button"
        style={({ pressed }) => [
          styles.button,
          styles.secondaryButton,
          pressed && styles.buttonPressed,
        ]}
        onPress={onPress}
      >
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    maxWidth: 360,
    minHeight: 58,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryContainer: {
    borderWidth: 2,
    borderColor: epnTheme.colors.red,
    borderRadius: 18,
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primaryButton: {
    backgroundColor: epnTheme.colors.gold,
  },
  secondaryButton: {
    backgroundColor: epnTheme.colors.navy,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: epnTheme.colors.cream,
    fontSize: 16,
    fontWeight: '600',
  },
  primaryLabel: {
    color: epnTheme.colors.navy,
  },
});
