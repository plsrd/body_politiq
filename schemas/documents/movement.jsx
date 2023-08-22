import React from 'react'

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
          preview: {
            select: {
              title: 'title',
              description: 'description',
              thumbnail: 'thumbnail',
            },
            prepare: ({title, description, thumbnail}) => ({
              title,
              subtitle: description,
              media: () => <img src={thumbnail} />,
            }),
          },
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
    {
      name: 'links',
      type: 'array',
      of: [
        {
          name: 'link',
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'string',
            },
            {
              name: 'url',
              type: 'url',
            },
          ],
        },
      ],
    },
  ],
}
