import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

export const metrics = {
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  buttonRadius: 4,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 50,
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 200,
  },
}
