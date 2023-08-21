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

const createCategories = async () => {
  const categories = await fetch('https://api.sugarwod.com/v2/barbelllifts', config)
    .then((response) => response.json())
    .then((json) => [...new Set(json.data.map((lift) => lift.attributes.category))])

  categories.forEach((category) => {
    queue(category).then(async () => {
      const doc = {
        _type: 'category',
        name: category,
      }

      client
        .create(doc)
        .then((category) => console.log(`Document created: ${category._id}`))
        .catch((err) => console.log(err.msg))
    })
  })
}

createCategories()
