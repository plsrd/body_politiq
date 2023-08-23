import fetch from 'node-fetch'
import {queue} from '../helpers/queue'
import {config} from '../helpers/sugarWodConfig'
import {client} from '../helpers/client'

const createBarbellLifts = async () => {
  const lifts = await fetch('https://api.sugarwod.com/v2/barbelllifts', config)
    .then((response) => response.json())
    .then((json) => json.data)

  const categories = await client.fetch(`*[_type == 'category' && !(_id in path('drafts.**'))]`)

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

createBarbellLifts()
