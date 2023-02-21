// import { AttentionDataGridRow, InstanceDataGridRow } from '../../types';
import { PredictionOutcome, SyntacticRelation } from './constants';

export const instanceData = [
  {
    id: 1,
    phrase: 'I have bought several of the Vitality canned dog food products and have found them all to be of good quality. The product looks more like a stew than a processed meat and it smells better. My Labrador is finicky and she appreciates this product better than  most.',
    model1: 85,
    result: PredictionOutcome.PASS,
    groupId: 1,
    isAdversarial: false,
  },
  {
    id: 2,
    phrase: 'This is a confection that has been around a few centuries.  It is a light, pillowy citrus gelatin with nuts - in this case Filberts. And it is cut into tiny squares and then liberally coated with powdered sugar.  And it is a tiny mouthful of heaven.  Not too chewy, and very flavorful.  I highly recommend this yummy treat.  If you are familiar with the story of C.S. Lewis\' "The Lion, The Witch, and The Wardrobe" - this is the treat that seduces Edmund into selling out his Brother and Sisters to the Witch.',
    model1: 75,
    result: PredictionOutcome.PASS,
    groupId: 2,
    isAdversarial: false,
  },
  {
    id: 3,
    phrase: 'Product arrived labeled as Jumbo Salted Peanuts...the peanuts were actually small sized unsalted. Not sure if this was an error or if the vendor intended to represent the product as "Jumbo".',
    model1: 87,
    result: PredictionOutcome.FAIL,
    groupId: 3,
    isAdversarial: true,
  },
  {
    id: 4,
    phrase: 'If you are looking for the secret ingredient in Robitussin I believe I have found it.  I got this in addition to the Root Beer Extract I ordered (which was good) and made some cherry soda.  The flavor is very medicinal.',
    model1: 95,
    result: PredictionOutcome.PASS,
    groupId: 4,
    isAdversarial: false,
  },
  {
    id: 5,
    phrase: 'Great taffy at a great price.  There was a wide assortment of yummy taffy.  Delivery was very quick.  If your a taffy lover, this is a deal.',
    model1: 60,
    result: PredictionOutcome.PASS,
    groupId: 1,
    isAdversarial: true,
  },
  {
    id: 6,
    phrase: 'I got a wild hair for taffy and ordered this five pound bag. The taffy was all very enjoyable with many flavors: watermelon, root beer, melon, peppermint, grape, etc. My only complaint is there was a bit too much red/black licorice-flavored pieces (just not my particular favorites). Between me, my kids, and my husband, this lasted only two weeks! I would recommend this brand of taffy -- it was a delightful treat.',
    model1: 40,
    result: PredictionOutcome.PASS,
    groupId: 3,
    isAdversarial: false,
  },
  {
    id: 7,
    phrase: 'This saltwater taffy had great flavors and was very soft and chewy.  Each candy was individually wrapped well.  None of the candies were stuck together, which did happen in the expensive version, Fralinger\'s.  Would highly recommend this candy!  I served it at a beach-themed party and everyone loved it!',
    model1: 50,
    result: PredictionOutcome.FAIL,
    groupId: 5,
    isAdversarial: false,
  },
  {
    id: 8,
    phrase: 'This taffy is so good.  It is very soft and chewy.  The flavors are amazing.  I would definitely recommend you buying it.  Very satisfying!!',
    model1: 90,
    result: PredictionOutcome.FAIL,
    groupId: 5,
    isAdversarial: true,
  },
  {
    id: 9,
    phrase: 'Right now I\'m mostly just sprouting this so my cats can eat the grass. They love it. I rotate it around with Wheatgrass and Rye too',
    model1: 95,
    result: PredictionOutcome.PASS,
    groupId: 4,
    isAdversarial: true,
  },
  {
    id: 10,
    phrase: 'This is a very healthy dog food. Good for their digestion. Also good for small puppies. My dog eats her required amount at every feeding.',
    model1: 60,
    result: PredictionOutcome.FAIL,
    groupId: 6,
    isAdversarial: true,
  },
  {
    id: 11,
    phrase: 'One of my boys needed to lose some weight and the other didn\'t.  I put this food on the floor for the chubby guy, and the protein-rich, no by-product food up higher where only my skinny boy can jump.  The higher food sits going stale.  They both really go for this food.  And my chubby boy has been losing about an ounce a week.',
    model1: 34,
    result: PredictionOutcome.PASS,
    groupId: 6,
    isAdversarial: false,
  },
  {
    id: 12,
    phrase: 'My cats have been happily eating Felidae Platinum for more than two years. I just got a new bag and the shape of the food is different. They tried the new food when I first put it in their bowls and now the bowls sit full and the kitties will not touch the food. I\'ve noticed similar reviews related to formula changes in the past. Unfortunately, I now need to find a new food that my cats will eat.',
    model1: 69,
    result: PredictionOutcome.PASS,
    groupId: 2,
    isAdversarial: true,
  },
];

export const attentionData = [
  {
    id: 0,
    layer: 1,
    model1: [
      {
        id: 0,
        accuracy: 79,
        syntacticRelation: SyntacticRelation.AUXILIARY_VERB,
      },
      {
        id: 1,
        accuracy: 90,
        syntacticRelation: SyntacticRelation.AUXILIARY_VERB,
      },
      {
        id: 2,
        accuracy: 50,
        syntacticRelation: SyntacticRelation.AUXILIARY_VERB,
      },
      {
        id: 3,
        accuracy: 60,
        syntacticRelation: SyntacticRelation.AUXILIARY_VERB,
      },
      {
        id: 4,
        accuracy: 95,
        syntacticRelation: SyntacticRelation.AUXILIARY_VERB,
      },
      {
        id: 5,
        accuracy: 40,
        syntacticRelation: SyntacticRelation.AUXILIARY_VERB,
      },
      {
        id: 6,
        accuracy: 65,
        syntacticRelation: SyntacticRelation.AUXILIARY_VERB,
      },
      {
        id: 7,
        accuracy: 76,
        syntacticRelation: SyntacticRelation.AUXILIARY_VERB,
      },
      {
        id: 8,
        accuracy: 97,
        syntacticRelation: SyntacticRelation.AUXILIARY_VERB,
      },
      {
        id: 9,
        accuracy: 43,
        syntacticRelation: SyntacticRelation.AUXILIARY_VERB,
      },
      {
        id: 10,
        accuracy: 69,
        syntacticRelation: SyntacticRelation.AUXILIARY_VERB,
      },
      {
        id: 11,
        accuracy: 30,
        syntacticRelation: SyntacticRelation.AUXILIARY_VERB,
      },
      {
        id: 12,
        accuracy: 33,
        syntacticRelation: SyntacticRelation.AUXILIARY_VERB,
      },
    ],
    model2: [
      {
        id: 0,
        accuracy: 68,
        syntacticRelation: SyntacticRelation.POSESSIVE_PRONOUNS,
      },
      {
        id: 1,
        accuracy: 90,
        syntacticRelation: SyntacticRelation.POSESSIVE_PRONOUNS,
      },
      {
        id: 2,
        accuracy: 50,
        syntacticRelation: SyntacticRelation.POSESSIVE_PRONOUNS,
      },
      {
        id: 3,
        accuracy: 60,
        syntacticRelation: SyntacticRelation.POSESSIVE_PRONOUNS,
      },
      {
        id: 4,
        accuracy: 95,
        syntacticRelation: SyntacticRelation.POSESSIVE_PRONOUNS,
      },
      {
        id: 5,
        accuracy: 40,
        syntacticRelation: SyntacticRelation.POSESSIVE_PRONOUNS,
      },
      {
        id: 6,
        accuracy: 65,
        syntacticRelation: SyntacticRelation.POSESSIVE_PRONOUNS,
      },
      {
        id: 7,
        accuracy: 76,
        syntacticRelation: SyntacticRelation.POSESSIVE_PRONOUNS,
      },
      {
        id: 8,
        accuracy: 97,
        syntacticRelation: SyntacticRelation.POSESSIVE_PRONOUNS,
      },
      {
        id: 9,
        accuracy: 43,
        syntacticRelation: SyntacticRelation.POSESSIVE_PRONOUNS,
      },
      {
        id: 10,
        accuracy: 69,
        syntacticRelation: SyntacticRelation.POSESSIVE_PRONOUNS,
      },
      {
        id: 11,
        accuracy: 30,
        syntacticRelation: SyntacticRelation.POSESSIVE_PRONOUNS,
      },
      {
        id: 12,
        accuracy: 33,
        syntacticRelation: SyntacticRelation.POSESSIVE_PRONOUNS,
      },
    ],
  },
  {
    id: 1,
    layer: 2,
    model1: [
      {
        id: 0,
        accuracy: 31,
        syntacticRelation: SyntacticRelation.PREPOSITIONS,
      },
      {
        id: 1,
        accuracy: 90,
        syntacticRelation: SyntacticRelation.PREPOSITIONS,
      },
      {
        id: 2,
        accuracy: 50,
        syntacticRelation: SyntacticRelation.PREPOSITIONS,
      },
      {
        id: 3,
        accuracy: 60,
        syntacticRelation: SyntacticRelation.PREPOSITIONS,
      },
      {
        id: 4,
        accuracy: 95,
        syntacticRelation: SyntacticRelation.PREPOSITIONS,
      },
      {
        id: 5,
        accuracy: 40,
        syntacticRelation: SyntacticRelation.PREPOSITIONS,
      },
      {
        id: 6,
        accuracy: 65,
        syntacticRelation: SyntacticRelation.PREPOSITIONS,
      },
      {
        id: 7,
        accuracy: 76,
        syntacticRelation: SyntacticRelation.PREPOSITIONS,
      },
      {
        id: 8,
        accuracy: 97,
        syntacticRelation: SyntacticRelation.PREPOSITIONS,
      },
      {
        id: 9,
        accuracy: 43,
        syntacticRelation: SyntacticRelation.PREPOSITIONS,
      },
      {
        id: 10,
        accuracy: 69,
        syntacticRelation: SyntacticRelation.PREPOSITIONS,
      },
      {
        id: 11,
        accuracy: 30,
        syntacticRelation: SyntacticRelation.PREPOSITIONS,
      },
      {
        id: 12,
        accuracy: 33,
        syntacticRelation: SyntacticRelation.PREPOSITIONS,
      },
    ],
    model2: [
      {
        id: 0,
        accuracy: 77,
        syntacticRelation: SyntacticRelation.COREFERENT,
      },
      {
        id: 1,
        accuracy: 90,
        syntacticRelation: SyntacticRelation.COREFERENT,
      },
      {
        id: 2,
        accuracy: 50,
        syntacticRelation: SyntacticRelation.COREFERENT,
      },
      {
        id: 3,
        accuracy: 60,
        syntacticRelation: SyntacticRelation.COREFERENT,
      },
      {
        id: 4,
        accuracy: 95,
        syntacticRelation: SyntacticRelation.COREFERENT,
      },
      {
        id: 5,
        accuracy: 40,
        syntacticRelation: SyntacticRelation.COREFERENT,
      },
      {
        id: 6,
        accuracy: 65,
        syntacticRelation: SyntacticRelation.COREFERENT,
      },
      {
        id: 7,
        accuracy: 76,
        syntacticRelation: SyntacticRelation.COREFERENT,
      },
      {
        id: 8,
        accuracy: 97,
        syntacticRelation: SyntacticRelation.COREFERENT,
      },
      {
        id: 9,
        accuracy: 43,
        syntacticRelation: SyntacticRelation.COREFERENT,
      },
      {
        id: 10,
        accuracy: 69,
        syntacticRelation: SyntacticRelation.COREFERENT,
      },
      {
        id: 11,
        accuracy: 30,
        syntacticRelation: SyntacticRelation.COREFERENT,
      },
      {
        id: 12,
        accuracy: 33,
        syntacticRelation: SyntacticRelation.COREFERENT,
      },
    ],
  },
  {
    id: 2,
    layer: 3,
    model1: [
      {
        id: 0,
        accuracy: 21,
        syntacticRelation: SyntacticRelation.NOUN_MODIFIERS,
      },
      {
        id: 1,
        accuracy: 90,
        syntacticRelation: SyntacticRelation.NOUN_MODIFIERS,
      },
      {
        id: 2,
        accuracy: 50,
        syntacticRelation: SyntacticRelation.NOUN_MODIFIERS,
      },
      {
        id: 3,
        accuracy: 60,
        syntacticRelation: SyntacticRelation.NOUN_MODIFIERS,
      },
      {
        id: 4,
        accuracy: 95,
        syntacticRelation: SyntacticRelation.NOUN_MODIFIERS,
      },
      {
        id: 5,
        accuracy: 40,
        syntacticRelation: SyntacticRelation.NOUN_MODIFIERS,
      },
      {
        id: 6,
        accuracy: 65,
        syntacticRelation: SyntacticRelation.NOUN_MODIFIERS,
      },
      {
        id: 7,
        accuracy: 76,
        syntacticRelation: SyntacticRelation.NOUN_MODIFIERS,
      },
      {
        id: 8,
        accuracy: 97,
        syntacticRelation: SyntacticRelation.NOUN_MODIFIERS,
      },
      {
        id: 9,
        accuracy: 43,
        syntacticRelation: SyntacticRelation.NOUN_MODIFIERS,
      },
      {
        id: 10,
        accuracy: 69,
        syntacticRelation: SyntacticRelation.NOUN_MODIFIERS,
      },
      {
        id: 11,
        accuracy: 30,
        syntacticRelation: SyntacticRelation.NOUN_MODIFIERS,
      },
      {
        id: 12,
        accuracy: 33,
        syntacticRelation: SyntacticRelation.NOUN_MODIFIERS,
      },
    ],
    model2: [
      {
        id: 0,
        accuracy: 36,
        syntacticRelation: SyntacticRelation.DIRECT_OBJECTS,
      },
      {
        id: 1,
        accuracy: 90,
        syntacticRelation: SyntacticRelation.DIRECT_OBJECTS,
      },
      {
        id: 2,
        accuracy: 50,
        syntacticRelation: SyntacticRelation.DIRECT_OBJECTS,
      },
      {
        id: 3,
        accuracy: 60,
        syntacticRelation: SyntacticRelation.DIRECT_OBJECTS,
      },
      {
        id: 4,
        accuracy: 95,
        syntacticRelation: SyntacticRelation.DIRECT_OBJECTS,
      },
      {
        id: 5,
        accuracy: 40,
        syntacticRelation: SyntacticRelation.DIRECT_OBJECTS,
      },
      {
        id: 6,
        accuracy: 65,
        syntacticRelation: SyntacticRelation.DIRECT_OBJECTS,
      },
      {
        id: 7,
        accuracy: 76,
        syntacticRelation: SyntacticRelation.DIRECT_OBJECTS,
      },
      {
        id: 8,
        accuracy: 97,
        syntacticRelation: SyntacticRelation.DIRECT_OBJECTS,
      },
      {
        id: 9,
        accuracy: 43,
        syntacticRelation: SyntacticRelation.DIRECT_OBJECTS,
      },
      {
        id: 10,
        accuracy: 69,
        syntacticRelation: SyntacticRelation.DIRECT_OBJECTS,
      },
      {
        id: 11,
        accuracy: 30,
        syntacticRelation: SyntacticRelation.DIRECT_OBJECTS,
      },
      {
        id: 12,
        accuracy: 33,
        syntacticRelation: SyntacticRelation.DIRECT_OBJECTS,
      },
    ],
  },
];

export default {
  instanceData,
  attentionData,
};
