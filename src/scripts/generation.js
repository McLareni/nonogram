export function generationArray(width, heigth){
    const array = [];

    for(let i = 0; i < width; i++){
      array.push([])
    }

    array.map((row) => {
      for(let i = 0; i < heigth; i++){
        row.push("white");
      }
    })

    return array;
}