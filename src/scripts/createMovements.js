import fetch from 'node-fetch'
import {v4 as uuid} from 'uuid'
import {config} from '../helpers/sugarWodConfig'
import {queue} from '../helpers/queue'
import {client} from '../helpers/client'

const createMovements = async () => {
  const movements = await fetch('https://api.sugarwod.com/v2/movements', config)
    .then((response) => response.json())
    .then((json) => json.data)

  movements.forEach((movement) => {
    queue(movement).then(async () => {
      const doc = {
        _id: movement.id,
        _type: 'movement',
        name: movement.attributes.name,
        videos: [
          ...movement.attributes.videos.map((video) => ({
            _type: 'video',
            _key: uuid(),
            id: video.id,
            channelTitle: video.channelTitle,
            title: video.title,
            description: video.description,
            thumbnail: video.thumbnails.default.url,
          })),
        ],
      }

      client
        .createOrReplace(doc)
        .then((category) => console.log(`Document created: ${category._id}`))
        .catch((err) => console.log(err.msg))
    })
  })
}

createMovements()
