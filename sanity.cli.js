import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'k8p6uw8a',
    dataset: 'body-politic-dev',
  },
  server: {
    port: 3000,
  },
})
