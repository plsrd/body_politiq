export const barbellLift = {
  name: 'barbellLift',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
    },
    {
      name: 'category',
      type: 'reference',
      to: [{type: 'category'}],
    },
  ],
}
