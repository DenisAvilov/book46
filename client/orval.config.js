module.exports = {
  main:{
    input: './src/shared/api/schema.yaml',
    output: {
      target:  './src/shared/api/generate.ts',
      prettier: true, //форматирование кода перед збереженням
      override: {
        mutator: {
          path: './src/shared/api/api-instance.ts', // файл де відбуваеться мутація
          name: 'createInstance' //функція яку повинен використовувати 
        }
      }
    }
  }
}