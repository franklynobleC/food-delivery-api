/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

//TODO: DATABASE STARTS  DECLARATION  STARTS HERE
// const database = 'newRestaurantDb';
// const collection = 'testRecipe';

// Create a new database.
// use(database);

// Create a new collection.
// db.createCollection(collection);
//this would get all  the  title from  the document,  the   '1' means  'true' while "0" means  'false'

//TODO: USING FIND METHOD
//db.testRecipe.find({},{'title':1,'_id':0})

//USING SORT METHOD  1 (USING ONE CRITERIA)
//sort data  in  from A-Z(if  you want to sort from Z-A, use  -1) (0 at the _id means, exclude  the id field)
//db.testRecipe.find({}, {'title': 1, '_id':0}).sort({'title':1})

//USING SORT METHOD  2 (USING 2 FIELDS CRITERIA)
//db.testRecipe.find({}, {'title':1, 'type':1,  '_id':0}).sort({'title':1,'type':1})

//TODO: USING SORT METHOD  3 (USING VARIABLES IN QUERIES)

// var output = { title: 1, type: 1, _id: 0 }
// var sortBy = { type: 1, title: 1 }

// db.testRecipe.find({}, output).sort(sortBy)

//

//TODO: COUNT   DATA  IN  THE COLLECTION

//db.testRecipe.find({ "type": "Dinner" }).count()

//TODO:  limit IN  THE COLLECTION

//db.testRecipe.find({'type':'Dinner'}, {'title':1, '_id':0}).limit(2)

//TODO:   skip(), limit(), sort() Method IN  THE COLLECTION4
//db.testRecipe.find({}, {'title':1,'_id':0}).sort({'title':-1}).skip(2).limit(1)

//db.testRecipe.find({'cook_time':30})

//TODO: Find  using in Operator less than Or Equal to  (using  $ sign to compare values THE COLLECTION)

//db.testRecipe.find({ 'cook_time': { $lte: 30 } }, { 'title': 1 })

//if cook_time  is  less than  or  equal to  30, count  the document that  meets  tis condition
// db.testRecipe.find({ cook_time: { $lte: 30 } }).count()

//TODO: (IN) Find  using in or nin, this would check  if  this condition is  met. this would  return  all   the  value that  has "Dinner" OR Dessert
//db.testRecipe.find({'type':{$in:["Dinner", "Dessert"]}})

//TODO: (NIN) Find  using in or nin, this would check and  return  if  this condition is  met. this would  return  all the values that does NOT have   "Dinner" OR Dessert
//db.testRecipe.find({ type: { $nin: ['Dinner', 'Dessert'] } }).count()

//TODO: updateMany({}), also setting  a  value,  in it
//would  match any document where  type of "second Breakfast" oR "Elevenses"
//db.testRecipe.updateMany({"type":{$in:['Second Breakfast', "Elevenses"]}}, {$set:{hobbit_meal:true}})

//TODO: filed update Operators

//db.testRecipe.updateOne({"_id":100},{$rename:{'title':"name"}})
//db.testRecipe.find({})
db.testRecipe.findOne({ _id: '651f413c198d185b84ccb80d' })
//db.testRecipe.findOneById({_id:"651f413c198d185b84ccb80d"})

//TODO: filed update Operators,  To increment and Decrement Value,this value is an  atomic Operation.
/*
db.movies.updateOne(
  { title: 'The Hudsucker Proxy' },
  {
    $inc: { views: 1 },
    $currentDate: { last_viewed: true }
  }
)

*/

//TODO: filed update Operators,  To multiply Value,  this value is an  atomic Operation.
//Now we have doubled the player’s life, by multiplying it by 2.

/*

db.game.updateOne({ user: 'PlayerOne' }, { $mul: { life: 2 } })
*/

//
//TODO:    OR oPERATOR, would match any of  the variable that meets  this criteria.(do  not show  the  id  and  the   type)
//db.testRecipe.find({ $or: [{ type: 'Dinner' }, { cook_time: { $lte: 30 } }] },{"_id":0},{'type':0})
//TODO:    NOR oPERATOR, would match any of  the variable that meets  this criteria.
// Not Operator in   programming
// db.testRecipe.find(
//   { $nor: [{ type: 'Breakfast' }, { cook_time: { $gt: 30 } }] },
//   { _id: 0, title: 1, cook_time: 1 }
// )
/*
db.getCollection('testRecipe').insertMany(

[
  {
  
    title: 'Split Pea Soup',
    calories_per_serving: 158,
    prep_time: 10,
    cook_time: 300,
    ingredients: [
      {
        name: 'peas',
        quantity: {
          amount: 1,
          unit: 'cup'
        },
        vegetarian: true
      },
      {
        name: 'water',
        quantity: {
          amount: 8,
          unit: 'cup'
        },
        vegetarian: true
      },
      {
        name: 'milk',
        quantity: {
          amount: 2,
          unit: 'cup'
        },
        vegetarian: true
      },
      {
        name: 'flour',
        quantity: {
          amount: 3,
          unit: 'tablespoon'
        },
        vegetarian: true
      },
      {
        name: 'butter',
        quantity: {
          amount: 2,
          unit: 'cup'
        },
        vegetarian: true
      },
      {
        name: 'salt',
        quantity: {
          amount: 1,
          unit: 'teaspoon'
        },
        vegetarian: true
      },
      {
        name: 'pepper',
        quantity: {
          amount: {
            $numberDecimal: '0.25'
          },
          unit: 'teaspoon'
        }
      },
      {
        name: 'onion',
        quantity: {
          amount: 1
        },
        vegetarian: true
      },
      {
        name: 'ham hock',
        quantity: 1,
        vegetarian: false,
        optional: true
      }
    ],
    directions: [
      'Pick over and wash the vegetable and soak several hours or overnight.',
      'Drain and add measured water and small onion, with ham hock if desired.',
      'Cook gently 5 or 6 hours until liquid is reduced one half.',
      'Remove ham hock and rub vegetable through a strainer to remove skins.',
      'Melt butter, add flour and enough stock to make mixture thin enough to pour.',
      'Add to rest of stock, stir until it boils, season, and serve.',
      'Milk may be added or not.',
      'If used, it may be mixed with butter and flour as for white sauce.',
      'If too thick, soup may be thinned with milk or water, and water must be added if it boils away.'
    ],
    rating: [4, 4, 4, 4, 2, 5, 3],
    rating_avg: 3.71,
    servings: 6,
    tags: ['soup', 'easy', 'peas', 'vegetarian'],
    type: 'Dinner',
    vegetarian_option: true
  },
  {
    
    title: 'Tomato Bisque',
    ingredients: [
      {
        name: 'tomato',
        quantity: {
          amount: 2,
          unit: 'cup'
        },
        vegetarian: true
      },
      {
        name: 'water',
        quantity: {
          amount: 2,
          unit: 'cup'
        },
        vegetarian: true
      },
      {
        name: 'milk',
        quantity: {
          amount: 2,
          unit: 'cup'
        },
        vegetarian: true
      },
      {
        name: 'flour',
        quantity: {
          amount: 6,
          unit: 'tablespoon'
        },
        vegetarian: true
      },
      {
        name: 'butter',
        quantity: {
          amount: 3,
          unit: 'tablespoon'
        },
        vegetarian: false
      },
      {
        name: 'salt',
        quantity: {
          amount: 1,
          unit: 'teaspoon'
        },
        vegetarian: true
      },
      {
        name: 'onion',
        quantity: {
          amount: 1,
          unit: 'tablespoon'
        },
        vegetarian: true
      },
      {
        name: 'pepper',
        quantity: {
          amount: {
            $numberDecimal: '0.25'
          },
          unit: 'teaspoon'
        },
        vegetarian: true
      },
      {
        name: 'baking soda',
        quantity: {
          amount: {
            $numberDecimal: '0.5'
          },
          unit: 'teaspoon'
        },
        vegetarian: true
      },
      {
        name: 'chopped parsley',
        quantity: {
          amount: 1,
          unit: 'tablespoon'
        },
        vegetarian: true,
        optional: true
      }
    ],
    directions: [
      'Cook vegetable in water until soft (15 to 30 minutes) and rub thoroughly through a strainer.',
      'Add more water if it boils away much.',
      'After cooking and straining tomatoes, add 1/2 teaspoon baking soda and stir until effervescence stops before pouring into the thickened milk.',
      'Do not combine the two mixtures till ready to serve, as the soup is likely to curdle if allowed to stand.',
      'There should be about 4 cups of the vegetable stock.',
      'Scald onion in milk, or chop it and cook 5 minutes in the butter, being careful not to brown it.',
      'Add flour to butter and stir into this mixture the hot milk.',
      'Combine with the stock, reheat, season, and serve.',
      'Top with chopped parsley if desired.'
    ],
    rating: [3, 3, 4, 4, 5, 5, 3, 4, 4],
    rating_avg: 3.88,
    servings: 8,
    tags: ['soup', 'tomatoes', 'vegetarian'],
    type: 'Dinner',
    vegetarian_option: true
  },
  {

    title: 'Zucchini Fudge Cake',
    calories_per_serving: 200,
    prep_time: 10,
    cook_time: 25,
    ingredients: [
      {
        name: 'butter',
        quantity: {
          amount: {
            $numberDecimal: '0.33'
          },
          unit: 'cup'
        },
        vegetarian: true
      },
      {
        name: 'hot water',
        quantity: {
          amount: {
            $numberDecimal: '0.5'
          },
          unit: 'cup'
        },
        vegetarian: true
      },
      {
        name: 'sugar',
        quantity: {
          amount: 1,
          unit: 'cup'
        },
        vegetarian: true
      },
      {
        name: 'flour',
        quantity: {
          amount: 2,
          unit: 'cup'
        },
        vegetarian: true
      },
      {
        name: 'egg yokes',
        quantity: {
          amount: 1
        },
        vegetarian: true
      },
      {
        name: 'cinnamon',
        quantity: {
          amount: 1,
          unit: 'teaspoon'
        },
        vegetarian: true
      },
      {
        name: 'chocolate',
        quantity: {
          amount: 2,
          unit: 'oz'
        },
        vegetarian: true
      },
      {
        name: 'baking soda',
        quantity: {
          amount: 1,
          unit: 'teaspoon'
        },
        vegetarian: true
      },
      {
        name: 'baking powder',
        quantity: {
          amount: 1,
          unit: 'teaspoon'
        },
        vegetarian: true
      },
      {
        name: 'molasses',
        quantity: {
          amount: {
            $numberDecimal: '0.5'
          },
          unit: 'cup'
        },
        vegetarian: true
      },
      {
        name: 'salt',
        quantity: {
          amount: {
            $numberDecimal: '0.25'
          },
          unit: 'teaspoon'
        },
        vegetarian: true
      },
      {
        name: 'sour milk',
        quantity: {
          amount: {
            $numberDecimal: '0.5'
          },
          unit: 'cup'
        }
      },
      {
        name: 'vanilla',
        quantity: {
          amount: 1,
          unit: 'teaspoon'
        },
        vegetarian: true
      },
      {
        name: 'egg whites',
        quantity: {
          amount: 2
        },
        vegetarian: true
      }
    ],
    directions: [
      'Cream the butter, add the sugar and continue creaming.',
      'Add the egg yolks, melted chocolate, molasses, sour milk, hot water, flour, cinnamon, soda, baking powder, salt and vanilla.',
      "Add zucchini, because you probably have too much from your garden and don't have anything else to do with it.",
      'Beat two minutes, and add the stiffly beaten egg whites.',
      'Fill well-buttered muffin pans one-half full, and bake in a moderate oven for twenty-five minutes.',
      'Serve hot as a dessert, with whipped cream.'
    ],
    rating: [5, 3, 5, 5, 5, 5, 5, 5, 5],
    rating_avg: 4.77,
    servings: 10,
    tags: ['fudge', 'zucchini', 'vegetarian'],
    type: 'Dessert',
    vegetarian_option: true
  },
  
  {
  
    title: 'Stuffed Peppers',
    calories_per_serving: 180,
    prep_time: 15,
    cook_time: 30,
    ingredients: [
      {
        name: 'red peppers',
        quantity: {
          amount: 4
        },
        vegetarian: true
      },
      {
        name: 'butter',
        quantity: {
          amount: 4,
          unit: 'tablespoon'
        },
        vegetarian: true
      },
      {
        name: 'salt',
        quantity: {
          amount: 1,
          unit: 'teaspoon'
        },
        vegetarian: true
      },
      {
        name: 'pepper',
        quantity: {
          amount: {
            $numberDecimal: '0.25'
          },
          unit: 'teaspoon'
        },
        vegetarian: true
      },
      {
        name: 'bread crumbs',
        quantity: {
          amount: {
            $numberDecimal: '1.5'
          },
          unit: 'cup'
        },
        vegetarian: true
      },
      {
        name: 'ground meat',
        quantity: {
          amount: 4,
          unit: 'tablespoon'
        },
        vegetarian: false
      },
      {
        name: 'grated cheese',
        quantity: {
          amount: 6,
          unit: 'teaspoon'
        },
        vegetarian: true
      }
    ],
    directions: [
      'Peppers should be thoroughly washed and cooked till tender in freshly boiling, salted water.',
      'Remove stem end and seeds from the peppers and parboil 10 min.',
      'Drain thoroughly, turning upside down to dry, and fill with a stuffing made from the stale bread crumbs and the seasonings, adding enough boiling water to moisten well.',
      'Bake 25 to 30 minutes in a moderate oven and serve with or without toast and brown sauce.'
    ],
    rating: [3, 3, 4, 4, 5, 5, 3, 4, 4],
    rating_avg: 3.88,
    servings: 4,
    tags: ['peppers', 'quick', 'vegetarian'],
    type: 'Dinner',
    vegetarian_option: true
  },
  {
    
    title: 'Toast',
    calories_per_serving: 75,
    prep_time: 1,
    cook_time: 4,
    ingredients: [
      {
        name: 'bread',
        quantity: {
          amount: 4,
          unit: 'slice'
        },
        vegetarian: true
      },
      {
        name: 'butter',
        quantity: {
          amount: 2,
          unit: 'tablespoon'
        },
        vegetarian: true
      }
    ],
    directions: [
      'Toast bread.',
      'When both sides are an even golden brown, butter one side, care being taken to butter the edges.',
      'Melt butter.',
      'Serve hot.'
    ],
    rating: [5],
    rating_avg: 5,
    servings: 4,
    tags: ['bread', 'quick', 'vegetarian'],
    type: 'Breakfast',
    vegetarian_option: true
  },
  {

    title: 'Eggs Benedict',
    calories_per_serving: 400,
    prep_time: 4,
    cook_time: 6,
    ingredients: [
      {
        name: 'eggs',
        quantity: {
          amount: 6
        },
        vegetarian: true
      },
      {
        name: 'Virginia ham',
        quantity: {
          amount: 6,
          unit: 'rounds'
        },
        vegetarian: false
      },
      {
        name: 'English muffins',
        quantity: {
          amount: 3
        },
        vegetarian: true
      },
      {
        name: 'Hollandaise sauce',
        quantity: {
          amount: 3,
          unit: 'oz'
        },
        vegetarian: true
      }
    ],
    directions: [
      'Cut the ham in rounds, split, toast and butter the english muffins, to fit the muffins.',
      'Poach the eggs and place them on the ham and pour over the hollandaise sauce.'
    ],
    rating: [5, 3, 5, 5, 5, 4, 5, 4, 5, 4, 5, 3, 4, 4],
    rating_avg: 4.35,
    servings: 3,
    tags: ['ham'],
    type: 'Breakfast',
    vegetarian_option: false
  },
   {
  
    title: 'Blue Cheese Burgers',
    type: 'Dinner'
  }
]

)

// The prototype form to create a collection:
/* db.createCollection( <name>,
  {
    capped: <boolean>,
    autoIndexId: <boolean>,
    size: <number>,
    max: <number>,
    storageEngine: <document>,
    validator: <document>,
    validationLevel: <string>,
    validationAction: <string>,
    indexOptionDefaults: <document>,
    viewOn: <string>,
    pipeline: <pipeline>,
    collation: <document>,
    writeConcern: <document>,
    timeseries: { // Added in MongoDB 5.0
      timeField: <string>, // required for time series collections
      metaField: <string>,
      granularity: <string>,
      bucketMaxSpanSeconds: <number>, // Added in MongoDB 6.3
      bucketRoundingSeconds: <number>, // Added in MongoDB 6.3
    },
    expireAfterSeconds: <number>,
    clusteredIndex: <document>, // Added in MongoDB 5.3
  }
)*/

// More information on the `createCollection` command can be found at:
// https://www.mongodb.com/docs/manual/reference/method/db.createCollection/
