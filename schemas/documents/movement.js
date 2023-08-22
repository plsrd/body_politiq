export const movement = {
  name: 'movement',
  decription:
    'A Movement is an element of a Workout or Benchmark such as "Box Jump", "Back Squat", or "Wall Ball".',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
    },
    {
      name: 'videos',
      type: 'array',
      of: [
        {
          name: 'video',
          type: 'object',
          fields: [
            {
              name: 'id',
              type: 'string',
            },
            {
              name: 'title',
              type: 'string',
            },
            {
              name: 'description',
              type: 'text',
            },
            {
              name: 'channelTitle',
              type: 'string',
            },
            {
              name: 'thumbnail',
              type: 'url',
            },
          ],
        },
      ],
    },
  ],
}
