import { app } from './server.ts'
// import { env } from '../env.ts'

app.listen(3000, () => {
  console.log(`server runnign on port: ${3000}`)
})
