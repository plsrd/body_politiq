import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'effectively-hidden-thunder',

  projectId: 'k8p6uw8a',
  dataset: 'body-politic-dev',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
