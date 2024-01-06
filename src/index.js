import fs from 'fs';
import chalk from 'chalk';
// const chalk = require('chalk')

function trataError(error){
  console.log(error)
  throw new Error(chalk.red(error.code, 'archivo no encontrado'));
}
//promises
// function takeFile(caminoArchivo){
  // const encoding = 'utf-8'
  // fs.promises
    // .readFile(caminoArchivo, encoding)
    // .then((texto) => { console.log(chalk.green(texto)) })
    // .catch(trataError )
// }
//async/await
function takeLinks (texto) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const capturas =[...texto.matchAll(regex)] 
  const res = capturas.map(item => ({[item[1]]: item[2]}))
  return res.length !== 0 ? res : 'no se encontro niun link'
  // console.log(res)
}
async function takeFile(caminoArchivo){
  try{
     const encoding = 'utf-8'
     const res = await fs.promises.readFile(caminoArchivo, encoding )
     return takeLinks(res)
  }
  catch(error){
    trataError(error)
  } 
  finally{
    console.log(chalk.blue('terminado'))
  }
}
// takeFile(caminoArchivo)


// takeLinks(textoTest)


// \[[^[\]]*?\]
// links \(https?:\/\/[^\s?#.].[^\s]*\)
// links y entre[] : \[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)
//
// function takeFile(caminoArchivo){
  // const encoding = 'utf-8'
  // fs.readFile(caminoArchivo, encoding, (error, retorno) => {
    // if(error){
      // trataError(error)
    // }
    // console.log(chalk.green(retorno))
  // })
// }
// takeFile('./arquivos/te.md')
// takeFile('./arquivos/texto.md');
export default takeFile;
