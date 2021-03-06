const musicas = require("../model/musicas.json")

// console.log(musicas)

const novaListaMusicas = musicas.map(musica => {
    const novaMusica = {
        id: musica.id,
        nome: musica.name,
        amostra: musica.preview_url,
        nome_album: musica.album.name,
        imagem: musica.album.url,
        artista: musica.artists.name
    }
    return novaMusica
})


const getMusicas = (request, response) => {
    console.log(request.url)
    response.status(200).send(novaListaMusicas)
}

const getMusicasbyId = (request, response) => {
    const id = request.params.id
    const musica = novaListaMusicas.find(item => item.id == id)
    if (musica) {
        response.status(200).send(musica)
    } else {
        response.status(404).send("Música não encontrada!")
    }
}

const listaArtistas = musicas.map(item => {
    return  {
        id: item.artists.id,
        nome: item.artists.name
    }
})


const getArtistas = (request, response) => {
    let listaSemRepetir = []

    listaArtistas.forEach(artista => {
        const encontrei = listaSemRepetir.find(item => item.id === artista.id)
        if(!encontrei) {
            listaSemRepetir.push(artista)
        }
    })
    
    response.status(200).send(listaSemRepetir)
}

module.exports = {
    getMusicas,
    getMusicasbyId,
    getArtistas
}