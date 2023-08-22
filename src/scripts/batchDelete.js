import {queue} from '../helpers/queue'
import {client} from '../helpers/client'

const batchDelete = async () => {
  const docsToDelete = await client.fetch(`*[_type == 'movement']._id`)

  docsToDelete.forEach((_id) =>
    queue(_id).then(async () =>
      client
        .delete(_id)
        .then((doc) => console.log(`Docs deleted: ${doc}`))
        .catch((err) => console.log(err))
    )
  )
}

batchDelete()
