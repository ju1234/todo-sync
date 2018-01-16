var a = '/api/:d/:a'

const reg = /(\/:)|\//g

console.log(a.replace(reg,'.').replace(/^\./,''))