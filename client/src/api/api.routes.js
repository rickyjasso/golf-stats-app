import axios from 'axios'
axios.defaults.withCredentials = true

export async function onGolfBag(){
    return await axios.get(
        'http://localhost:3000/golfbag'
    )
}

export async function onCreateGolfBag(bagData){
    return await axios.post(
        'http://localhost:3000/golfbag/new', bagData
    )
}