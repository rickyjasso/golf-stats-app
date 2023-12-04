import axios from 'axios'
axios.defaults.withCredentials = true

export async function onGetGolfBag(){
    return await axios.get(
        'http://localhost:3000/golfbag'
    )
}

export async function onCreateGolfBag(bagData){
    return await axios.post(
        'http://localhost:3000/golfbag/new', bagData
    )
}

export async function onGetGolfClubs(){
    return await axios.get(
        'http://localhost:3000/golfclubs'
    )
}

export async function onAddGolfClubs(clubData){
    return await axios.post(
        'http://localhost:3000/golfclubs/new', clubData
    )
}

export async function onDeleteGolfClubs(clubId){
    return await axios.delete(
        `http://localhost:3000/golfclubs/${clubId}`
    )
}

export async function onUpdateGolfClub(clubId, clubData){
    return await axios.put(
        `http://localhost:3000/golfclubs/edit/${clubId}`, clubData
    )
}