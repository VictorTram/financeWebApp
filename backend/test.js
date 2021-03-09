var isEmpty = (variable) => new Promise ((resolve,reject)=>{
    var bool = true;

    if(bool){
        resolve(variable);
    } else{
        reject(variable);
    }
});

var somefunctionB = ()=> new Promise ((resolve,reject)=>{
    var bool = true;

    if(bool){
        resolve('Resolve DATA!');
    } else{
        reject('Reject DATA!');
    }
});

var somefunctionC = (variable)=> new Promise ((resolve,reject)=>{
   console.log(variable);
});

var createMetric = (result) =>{
    console.log('Creating Metric! Because ', result);
}

var collectTransaction = () =>{
    var bool = true;
    console.log(`Collecting Transactions (State: ${bool})`);
    return bool;
}

var collectTransactionB = ()=> new Promise ((resolve,reject)=>{
    var bool = true;

    if(bool){
        resolve('Enough');
    } else{
        reject('Reject DATA!');
    }
});

var deleteMetric = () => {
    console.log('Deleting Metric');
}

var updateMetric =(result) =>{
    console.log('Updating Metric', result);
}
isEmpty("something")
.then( ( result ) => {
    createMetric(result);
} )
.then( () => {
    var calc = collectTransaction();
    return collectTransactionB();
} )
.then( ( stuff ) => {
    console.log(stuff);
    updateMetric(stuff);
} )
.catch( ( error ) => {
    console.log(error);
    deleteMetric();
} )

