import axios from 'axios'

export default axios.create({
    baseURL: 'https://maxnhub-quiz-new-default-rtdb.europe-west1.firebasedatabase.app/quizes.json/'
})