let userID;
let todoArray;
firebase.auth().onAuthStateChanged((user) =>{
    const resturantName = document.getElementById('resturantName')
    if(user){
        userID =user.uid;
        firebase.firestore().collection('Resturant').doc(user.uid).get()
        .then((snapshot)=>{
            console.log('snapshot', snapshot)
            console.log('snapshot data', snapshot.data())
            console.log('snapshot data username', snapshot.data().resturantName)
            resturantName.innerHTML = snapshot.data().resturantName
            getTodo(userID)
        })
        .catch((error)=>{
            console.error('error', error)
        })
    }
    else{
        location.href("../resturantSignup/resturantSignin.html")
    }
})
let addTask= ()=>{
    let title = document.getElementById('title').value
    let price = document.getElementById("price").value
    // console.log('title=>', title)
    // console.log('price=>', price)
    firebase.firestore().collection('FoodItem').add({
        Item:title,
        Price:price,
        uid: userID
    })
    .then(()=>{
        console.log(userID)
        // console.log('dataAddes')
        swal({
            title: "Good job!",
            text: "Item Added",
            icon: "success",
            button: "OK",
          });
        getTodo(userID)
    })
    .catch(error=>{
        console.error('error', error)
    })
}
let getTodo = (userID)=>{
    // console.log('getWorking')
    todoArray=[]
    firebase.firestore().collection('FoodItem').where('uid', '==', userID).get()
    .then((querySnapShot)=>{
        querySnapShot.forEach((doc) => {
            todoArray.push(doc.data());
             html=''
             cardD=document.getElementById('card')
        });
        todoArray.forEach(function(item , index)
    {

        html += `<div class="card col-6 mx-auto mb-2"  id=card${index+1} style="width: 18rem; ">
                    <div class="card-body" id="cardBody">
                    <h5 class="card-title">${item.Item}</h5> <hr>
                    <p class="card-text text-success" style="font-weight: 500; margin: -1%;">Price : ${item.Price}</p> <hr>   
                    </div>
                </div>`;
                cardD.innerHTML=html;

    });
        // todoArray.forEach((item,index)=>{
        //     console.log(index, item.Item, item.Price);
        //     let card = document.createElement('div')
        //     let heading = document.createElement('h3')
        //     let priceLabel = document.createElement('label') 
        //     card.setAttribute('class','card')
        //     let priceText = document.createTextNode(item.Item)
        //     let headingText = document.createTextNode(item.Price)
        //     priceLabel.appendChild(priceText)
        //     heading.appendChild(headingText)
        //     document.getElementById('card').appendChild(card,headingText,priceText)
        //     document.getElementById('card').appendChild(headingText)
        //     document.getElementById('card').appendChild(priceText)
            
        // })  
        // document.getElementById()
    })
    .catch((error)=>{
        console.error('error', error)
    })
}


// var todoArray = []
// var obj = {
//     Title:'' ,
//     Description:'description' ,
//     Date :'',
//     IsDone:''
// }
// function addTask(){

//     var title = document.getElementById('title').value
//     var description = document.getElementById('description').value
//     var dat = new Date().toLocaleDateString(localStorage)
//     var i = false
//     var obj = {
//         Title:title ,
//         Description:description ,
//         Price :price,
//         Resturant: resturantName
//     }
//     todoArray.push(obj)
//     todoList()
//     // alert(dat)
// }
// function todoList(){
//     document.getElementById('card').innerHTML='';
//     todoArray.forEach(function(item, index){
//         var  = document.createElement('li')
//         var titlelab = document.createElement('label')
//         var todoTitle = document.createTextNode(item.Title)
//         titlelab.appendChild(todoTitle)
//         list.appendChild(titlelab)
//         // document.getElementById('ulList').appendChild(list)
//         // desc
//         var desclab = document.createElement('label')
//         var todoDesc = document.createTextNode(item.Description)
//         desclab.appendChild(todoDesc)
//         list.appendChild(desclab)
let signOut =()=>{
    firebase.auth().signOut()
    .then(()=>{
        location.href='../resturantSignup/resturantSignin.html'
    })
    .catch((error)=>{
        console.error('error', error)
    })
}
// var newobj;
