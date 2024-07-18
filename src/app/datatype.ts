interface SignUp{
    name:string;
    email:string;
    password:string;
}

interface SignIn{
    username:string;
    userpassword:string;
}

interface Product{
    id:number;
    name:string;
    price:number;
    category:string;
    color:string;
    description:string;
    imageUrl:string;
    quantity:undefined|number;
    productId:undefined|number;
}

interface Cart {
    id:number|undefined;
    name:string;
    price:number;
    category:string;
    color:string;
    description:string;
    imageUrl:string;
    quantity:undefined|number;
    userId:number;
    productId:number;
}

export{SignUp , SignIn , Product , Cart}