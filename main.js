var Game=require("../models/games");
var dragItem=document.getElementById("drag");
var drag2Item=document.getElementById("drag2");
var droploc=document.getElementById("drop");
var count=0;


function dragstart(evt){
    evt.dataTransfer.setData("text",evt.target.id);
    console.log("hi");
}



droploc.ondragover=function(evt){
    evt.preventDefault();
    console.log("hry");
    
}

droploc.ondrop=function(evt){
    const dropItem=evt.dataTransfer.getData("text");
    evt.preventDefault();
    console.log(evt);
    console.log("drop");
    console.log(dropItem);
    const myElement=document.getElementById(dropItem);
    console.log(myElement);

    if(myElement.id=="drag11" && count==0){
       const myNewElement=document.createElement('img');
    myNewElement.src=myElement.src;
    droploc.appendChild(myNewElement);
   document.getElementById("next").disabled = false;
    document.getElementById("defn").onclick = "myFunction()";}

    if(myElement.id=="drag2" && count==1){
        const myNewElement=document.createElement('img');
        myNewElement.src=myElement.src;
        droploc.appendChild(myNewElement);
       document.getElementById("next").disabled = false;
       
    }

    if(myElement.id=="drag5" && count==2){
        const myNewElement=document.createElement('img');
        myNewElement.src=myElement.src;
        droploc.appendChild(myNewElement);
       document.getElementById("next").disabled = false;}

       if(myElement.id=="drag" && count==3){
        const myNewElement=document.createElement('img');
        myNewElement.src=myElement.src;
        droploc.appendChild(myNewElement);
       document.getElementById("next").disabled = false;}

       if(myElement.id=="drag9" && count==4){
        const myNewElement=document.createElement('img');
        myNewElement.src=myElement.src;
        droploc.appendChild(myNewElement);
       document.getElementById("next").disabled = false;}

       if(myElement.id=="drag6" && count==5){
        const myNewElement=document.createElement('img');
        myNewElement.src=myElement.src;
        droploc.appendChild(myNewElement);
       document.getElementById("next").disabled = false;}

       if(myElement.id=="drag10" && count==6){
        const myNewElement=document.createElement('img');
        myNewElement.src=myElement.src;
        droploc.appendChild(myNewElement);
       document.getElementById("next").disabled = false;}

       if(myElement.id=="drag4" && count==7){
        const myNewElement=document.createElement('img');
        myNewElement.src=myElement.src;
        droploc.appendChild(myNewElement);
       document.getElementById("next").disabled = false;}

       if(myElement.id=="drag7" && count==8){
        const myNewElement=document.createElement('img');
        myNewElement.src=myElement.src;
        droploc.appendChild(myNewElement);
       document.getElementById("next").disabled = false;}

       if(myElement.id=="drag8" && count==9){
        const myNewElement=document.createElement('img');
        myNewElement.src=myElement.src;
        droploc.appendChild(myNewElement);
       document.getElementById("next").disabled = false;}

       if(myElement.id=="drag3" && count==10){
        const myNewElement=document.createElement('img');
        myNewElement.src=myElement.src;
        droploc.appendChild(myNewElement);
       document.getElementById("next").disabled = false;}


}



function myFunction() {
    document.getElementById("next").disabled = true;
console.log("hi");
var remove=document.getElementById("drop");
   remove.removeChild(remove.childNodes[1]);
   
if(count==0){
    document.getElementById("defn").innerHTML = "Makes plant food ";
    
   count=count+1;}
   else if(count==1){
    document.getElementById("defn").innerHTML = "Storage areas of plant cell";
    count=count+1;
}
else if(count==2){
    document.getElementById("defn").innerHTML = "Controls everything the cell does";
    count=count+1;
}
else if(count==3){
    document.getElementById("defn").innerHTML = "Thick layer outside plant cells";
    count=count+1;
}
else if(count==4){
    document.getElementById("defn").innerHTML = "Responsible for sorting materials in the cell";
    count=count+1;
}
else if(count==5){
    document.getElementById("defn").innerHTML = "Makes proteins for the cell";
    count=count+1;
}
else if(count==6){
    document.getElementById("defn").innerHTML = "Provides energy for cell";
    count=count+1;
}
else if(count==7){
    document.getElementById("defn").innerHTML = "controls what goes in and out of cells";
        count=count+1;
}
else if(count==8){
    document.getElementById("defn").innerHTML = "Moves materials inside cell";
    count=count+1;
}
else if(count==9){
    document.getElementById("defn").innerHTML = "Recycles unneeded parts of cell";
    count=count+1;
}

   console.log(droploc);

   
  }

  





droploc.ondragenter=function(evt){
evt.target.classList.add("dropabble-hover");
}

droploc.ondragleave=function(evt){
    evt.target.classList.remove("dropabble-hover");
    }