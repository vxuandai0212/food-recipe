
const WELCOME_CONTENTS = [
  {
    image: 'DISCOVER',
    title: 'Discover places near you',
    content: 'We make it simple to find your favorite food. Enter your address and let us do the rest.'
  },
  {
    image: 'FAVORITE',
    title: 'Order your favorite',
    content: 'We will store your favorite foods based on your search and orders.'
  },
  {
    image: 'DELIVER',
    title: 'Fastest Delivery',
    content: 'We make food ordering fast, easy and free. No matter you paid online or cash.'
  }
]

const IMAGES: any = {
  PLATE: require('app/assets/images/food-delivery-app/plate.png'),
  DISCOVER: require('app/assets/images/food-delivery-app/discover.png'),
  DELIVER: require('app/assets/images/food-delivery-app/deliver.png'),
  FAVORITE: require('app/assets/images/food-delivery-app/favorite.png'),
  FACEBOOK: require('app/assets/images/food-delivery-app/facebook.png'),
  GOOGLE: require('app/assets/images/food-delivery-app/google.png'),
  LOADING: require('app/assets/images/food-delivery-app/loading.json'),
  LOADING_RECIPE: require('app/assets/images/food-delivery-app/cooking.gif'),
  DEFAULT_RECIPE_IMAGE_THUMBNAIL: require('app/assets/images/food-delivery-app/default-recipe-thumbnail.webp'),
  CHEF_PUSHEEN: require('app/assets/images/food-delivery-app/chef-pusheen.gif'),
  PUSHEEN_BAKING: require('app/assets/images/food-delivery-app/pusheen-baking.gif'),
  PUSHEEN_SAD: require('app/assets/images/food-delivery-app/pusheen-sad.png'),
  PUSHEEN_DETECTIVE: require('app/assets/images/food-delivery-app/pusheen-detective.png'),
  USAGYUUUN_HAPPY: require('app/assets/images/food-delivery-app/usagyuuun-happy.gif'),
  SLEEP_CAT: require('app/assets/images/food-delivery-app/sleep-cat.gif')
}

const VIDEOS: any = {
  LOADING_RECIPE: require('app/assets/videos/cooking.mp4')
}

const RECOMMEND_NUTRITION_DAILY = {
  'VITAMIN': {
    'BIOTIN': '0.3 mg',
    'FOLATE': '0.4 mg',
    'A': '0.6 mg',
    'B1': '0.14 mg',
    'B2': '0.16 mg',
    'B3': '0.18 mg',
    'B5': '0.6 mg',
    'B6': '0.2 mg',
    'B12': '0.6 mg',
    'C': '0.75 mg',
    'D': '0.5 mg',
    'E': '0.1 mg',
    'K': '0.8 mg'
  },
  'MINERAL': {
    'CALCIUM': '1000 mg',
    'IRON': '15 mg',
    'MAGNESIUM': '350 mg',
    'CHROMIUM': '0.12 mg',
    'COPPER': '2 mg',
    'CHLORINE': '3400 mg',
    'FLUORINE': '3.5 mg',
    'IODINE': '0.15 mg',
    'NICKEL': '1 mg',
    'MANGANESE': '5 mg',
    'MOLYBDENUM': '75 mg',
    'POTASSIUM': '3500 mg'
  },
  'PROTEIN': '800 mg',
  'FIBRE': '30000 mg',
  'CARBOHYDRATE': '325000 mg',
  'FATS': '77000 mg',
  'WATER': '1.5l - 2l for adult'
}

export { WELCOME_CONTENTS, IMAGES, VIDEOS }
