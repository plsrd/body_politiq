export const article = {
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      description: `A descriptive and enticing title will help your reader connect to the ideas you're sharing.`,
      type: 'string',
      validation: (Rule) => [
        Rule.required(),
        Rule.max(120).warning('Try to keep your Title under 120 characters.'),
      ],
    },
    {
      title: 'Hide this Article?',
      name: 'hidden',
      type: 'boolean',
      description: 'Turn this on to stop your article from being seen while you work on it.',
    },
    {
      name: 'summary',
      title: 'Summary',
      description: `Give your reader a hint of what they can learn. Summaries appear in small places like preview cards.`,
      type: 'string',
      validation: (Rule) => [
        Rule.required(),
        Rule.max(300).warning('Try to keep your Summary under 300 characters.'),
        Rule.min(30).warning('Try to provide enough information in your summary.'),
      ],
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'person'},
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'figure',
    },
  ],
}
