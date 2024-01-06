function extraeLinks(arrLinks){
  return arrLinks.map((objLink) => Object.values(objLink).join())
}

async function checkStatus(listaURLs){
  const arrStatus = await Promise.all(
   listaURLs.map(async (url) => {
     try{
      const response = await fetch(url);
      return response.status 
     }catch(error){
      return manejaErrores(error)
      }
    })
  )
  return arrStatus
}

function manejaErrores(error){
  if(error.cause.code === 'ENOTFOUND'){
    return 'link no encontrado'
  }else{
    return 'algun error'
  }
}

export default async function listaValidada(listaDeLinks){
  const links =  extraeLinks( listaDeLinks );
  const status = await checkStatus(links);
  return listaDeLinks.map((link, indice) => ({
    ...link,
    status: status[indice]
  }));
}

// async function logMovies() {
  // const response = await fetch("http://example.com/movies.json");
  // const movies = await response.json();
  // console.log(movies);
// }
