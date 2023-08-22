import fetch from 'node-fetch'
import {queue} from '../helpers/queue'
import {client} from '../helpers/client'
import {config} from '../helpers/sugarWodConfig'

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
