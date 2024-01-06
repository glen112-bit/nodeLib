import chalk from "chalk";
import fs from 'fs';
import takeFile from "./index.js";

const camino = process.argv;

function imprimeLista(resultado, identificador = ''){
  console.log(
    chalk.yellow('lista de:'),
    chalk.black.bgGreen(identificador),
    resultado
  )
}

async function textProcess(argumentos){
   const camino = argumentos[2];
  try{
    fs.lstatSync(camino)
  } catch(error){
    if(error.code === 'ENOENT'){
      console.log(chalk.red('archivo o direcctorio no existe'))
      return
    }

  }
  if(fs.lstatSync(camino).isFile()){

    const resultado = await takeFile(argumentos[2]);
    imprimeLista(resultado)

  }else if(fs.lstatSync(camino).isDirectory()){

    const archivos = await fs.promises.readdir(camino)
    archivos.forEach(async(archivo) => {
      const lista = await takeFile(`${camino}/${archivo}`)
      imprimeLista(lista, archivo)
    })
  }
}
textProcess(camino)
