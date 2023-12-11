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
        `http://localhost:3000/golfclubs/${clubId}`, clubData
    )
}

export async function onGetGolfCourses(){
    return await axios.get(
        `http://localhost:3000/golfcourses/`
    )
}

export async function onGetGolfCourse(courseId){
    return await axios.get(
        `http://localhost:3000/golfcourses/${courseId}`
    )
}

export async function onNewGolfRound(roundData){
    return await axios.post(
        `http://localhost:3000/golfround`, roundData
    )
}

export async function onGetGolfRounds(){
    return await axios.get(
        `http://localhost:3000/golfrounds/`
    )
}

export async function onGetGolfRound(roundId){
    return await axios.get(
        `http://localhost:3000/golfround/${roundId}`
    )
}

export async function onGetRoundHoles(roundId){
    return await axios.get(
        `http://localhost:3000/golfround/holes/${roundId}`
    )
}
