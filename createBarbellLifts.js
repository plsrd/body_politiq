import fetch from 'node-fetch'
import 'dotenv/config'
import cq from 'concurrent-queue'
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2021-08-21'})

const config = {
  method: 'GET', // *GET, POST, PUT, DELETE, etc.
  credentials: 'include', // include, *same-origin, omit
  headers: {
    'Content-Type': 'application/json',
    Authorization: process.env.SUGARWOD_API_KEY,
  },
}

// Create a queue to limit the rate at which you write changes to Sanity
let queue = cq()
  .limit({concurrency: 25})
  .process(function (task) {
    return new Promise(function (resolve, reject) {
      setTimeout(resolve.bind(undefined, task), 1000)
    })
  })

const getWorkouts = async () => {
  const lifts = await fetch('https://api.sugarwod.com/v2/barbelllifts', config)
    .then((response) => response.json())
    .then((json) => json.data)

  const categories = await client.fetch(`*[_type == 'category' && !(_id in path('drafts.**'))]`)

  console.log(categories)

  lifts.forEach((lift) => {
    queue(lift).then(async () => {
      const doc = {
        _id: lift.id,
        _type: 'barbellLift',
        name: lift.attributes.name,
        category: {
          _type: 'reference',
          _ref: categories.find((category) => category.name === lift.attributes.category)._id,
        },
      }

      client
        .createOrReplace(doc)
        .then((doc) => console.log(`Document Created: ${doc._id}`))
        .catch((err) => console.log(err))
    })
  })
}

getWorkouts()
