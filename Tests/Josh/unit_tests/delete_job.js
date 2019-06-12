function deleteJob(id){
    const Http = new XMLHttpRequest();
    const url = '/'
    Http.open("GET", url)
    Http.send()
    Http.onreadystatechange=(e)=> {
        return (Http.responseText)
    }
}

module.exports = deleteJob