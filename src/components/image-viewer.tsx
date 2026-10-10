import { ImageSourcePropType, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import epnTheme from '@/constants/epn-theme.json';

type Props = {
  imgSource: ImageSourcePropType;
  selectedImage?: string;
};

export default function ImageViewer({ imgSource, selectedImage }: Props) {
  const imageSource = selectedImage ? { uri: selectedImage } : imgSource;

  return <Image source={imageSource} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    maxWidth: 320,
    aspectRatio: 320 / 440,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: epnTheme.colors.gold,
  },
});
