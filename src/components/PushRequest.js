import { Amqp } from 'react-native-amqp'

// ...
const PushRequest = () => {
  const amqp = new Amqp('amqp://guest:guest@localhost:5672/')

  amqp
    .connect()
    .then(() => {
      console.log('Connected to RabbitMQ')
      // Perform further actions, such as subscribing to queues or publishing messages
    })
    .catch((error) => {
      console.log('Error connecting to RabbitMQ:', error)
    })
}
export default PushRequest
