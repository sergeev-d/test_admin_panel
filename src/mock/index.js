import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import data from './data'

let mock = new MockAdapter(axios, { delayResponse: 80 })

mock.onPost('/login').reply(200, {
    user: data.users[0],
    token: 'DFJ091283U09AODFUP018923U4J123J'
})