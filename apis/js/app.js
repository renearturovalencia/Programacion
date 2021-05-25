let estructura=new Map()
const btnusers=document.getElementById("btnusers");
btnusers.addEventListener("click",()=>{
   fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(json => {
      //for(let i=0;i<json.length;i++) 
      let opciones=""
      json.forEach(user => {
          estructura.set(user.id,user);
          opciones+=`<option value="${user.id}">${user.username}</option>`
      });
      document.getElementById("mnuusers").innerHTML=opciones;
  })
}) 

const mnuusers=document.getElementById("mnuusers");
 mnuusers.addEventListener("change",()=>{
     let v1=document.getElementById("mnuusers").value ;
     v1=parseInt(v1);
     let usuario=estructura.get(v1);
     let res=`<h4>Nombre:${usuario.name}</h4>
     <p>Domicilio:${usuario.address.street} </p>
     <p>Telefono:${usuario.phone}</p>
     <h5>Empresa:${usuario.company.name}</h5>
     <p>Correo:${usuario.email}</p>
     <label for='txtEmpresa'>Empresa:<input type='text' id='txtEmpresa' value="${usuario.company.name}"></label>`;
     document.getElementById("userdetail").innerHTML=res;
     //console.log(v1); 
     /*
     fetch('https://jsonplaceholder.typicode.com/users/'+v1)
     .then(response=>response.json())
     .then(json=>{
         //console.log(json)
         let res=`<h4>Nombre:${json.name}</h4>
         <p>Domicilio:${json.address.street} </p>
         <p>Telefono:${json.phone}</p>
         <h5>Empresa:${json.company.name}</h5>
         <p>Correo:${json.email}</p>
         <label for='txtEmpresa'>Empresa:<input type='text' id='txtEmpresa' value="${json.company.name}"></label>`;
         document.getElementById("userdetail").innerHTML=res;
     })
    */
     
 })
 const btnpost=document.getElementById("btnpost");
 btnpost.addEventListener("click", ()=>{
    let v1=document.getElementById("mnuusers").value ;
    fetch('https://jsonplaceholder.typicode.com/posts?userId='+v1)
    .then(response=>response.json())
    .then (json=>{ 
        //console.log(json);
        let res=""
        json.forEach(pub=>{
            res+=`<h3>${pub.title}</h3> 
                  <p>${pub.body}</p>
                  <button style="background:blue" type="button" onClick="Cargacomments(${pub.id})" >Ver comentarios</button>
                  <div id="comen${pub.id}" style="background:burlywood"></div>`
        })
        document.getElementById("userpost").innerHTML=res;
    })  
 })     
 function Cargacomments(comen) {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=`+comen)
    .then(response=>response.json())
    .then (json=>{ 
        //console.log(json);
        let res1=""
        json.forEach(pub=>{
            estructura.set(pub.name,pub.email,pub.body);
            res1+=`<h3>${pub.name}</h3> 
                  <p>${pub.email}</p>
                  <p>${pub.body}</p>`
        })
        document.getElementById("comen"+comen).innerHTML="<h2>Comentarios</h2>"+res1;
    })   
 }