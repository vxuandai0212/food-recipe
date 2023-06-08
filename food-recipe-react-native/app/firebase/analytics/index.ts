import analytics from '@react-native-firebase/analytics'

export async function readRecipe() {
  await analytics().logEvent('read_recipe', {
    id: 3745092,
    item: 'mens grey t-shirt',
    description: ['round neck', 'long sleeved'],
    size: 'L'
  })
}
