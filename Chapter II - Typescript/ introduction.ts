//Objetos
interface User {
    name: string;
    username: string;
    document: string;
}

const user: User  = {
    name: "Felipe",
    username: "felipe@",
    document: "33333"
}


//Funções
function soma(num1:number, num2:number) {
    return num1 + num2;
}

console.log(soma(1,2))