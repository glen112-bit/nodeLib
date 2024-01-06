import chalk from "chalk";
import fs from 'fs';
import takeFile from "./index.js";
import listaValidada from "./http.validacion.js";

const camino = process.argv;

function imprimeLista(valida, resultado, identificador = ''){
if (valida){
  console.log(
    chalk.yellow('lista validada'),
    chalk.black.bgGreen(identificador),
    listaValidada(resultado)
  )
}else{
  console.log(
      chalk.yellow('lista de links: '),
      chalk.black.bgGreen(identificador),
      resultado);
  }
}

async function textProcess(argumentos){
  const camino = argumentos[2];
  const valida = argumentos[3] === '--valida'
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
    imprimeLista(valida, resultado)

  }else if(fs.lstatSync(camino).isDirectory()){

    const archivos = await fs.promises.readdir(camino)
    archivos.forEach(async(archivo) => {
      const lista = await takeFile(`${camino}/${archivo}`)
      imprimeLista(valida, lista, archivo)
    })
  }
}
textProcess(camino)
