let mainbtn=document.getElementById("btn1");
let ip1=document.getElementById("ip1");
let ip2=document.getElementById("ip2");
let ip3=document.getElementById("ip3");
let div1=document.getElementById("div1");
let div2=document.getElementById("div2");
let div3=document.getElementById("div3");

const today=new Date();
const year = today.getFullYear(); 
const month = today.getMonth() + 1;
const day = today.getDate();
const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;


function renderitems()
{
    let itemarr=JSON.parse(localStorage.getItem("itemsarr"));
    let ccount=0;
    let tcount=0;
    let fcount=0;

    div1.innerHTML="";
    div2.innerHTML="";
    div3.innerHTML="";

    if(itemarr)
    {
    itemarr.forEach((todoitem)=>{

        let tdate=todoitem.date;
        let tday=tdate.slice(8);
        let tmonth=tdate.slice(5,7);
        let tyear=tdate.slice(0,4);

        

        let datetext=document.createTextNode(`${tday}/${tmonth}/${tyear}`);
        let ptext=document.createTextNode(`${todoitem.priority}`);

        let datediv=document.createElement('div');
        datediv.appendChild(datetext);

        let pdiv=document.createElement('div');
        pdiv.appendChild(ptext);

        let namediv=document.createElement("div");
        namediv.style.marginLeft="20px";
      
        if(todoitem.completed)
        {
           ccount++;

           let completeddiv=document.createElement('div');
           completeddiv.style.width="90vw";
           completeddiv.style.height="65px";
           completeddiv.style.margin="10px";
           completeddiv.style.display="flex";
           completeddiv.style.borderRadius="10px";
           completeddiv.style.justifyContent="space-between";
           completeddiv.style.alignItems="center";
           completeddiv.style.border="1px solid black";
           completeddiv.style.fontFamily="monospace";
           completeddiv.style.fontSize="25px";
           
           let nametext=document.createTextNode(`${ccount}.${todoitem.name}`);
           namediv.appendChild(nametext);
           let bin=document.createElement("i");
           bin.classList.add("fa-solid");
           bin.classList.add("fa-trash");
           bin.style.marginRight="20px";

           completeddiv.appendChild(namediv);
           completeddiv.appendChild(datediv);
           completeddiv.appendChild(pdiv);
           completeddiv.appendChild(bin);

           div3.appendChild(completeddiv);

        }
        else
        {
            let tododiv=document.createElement('div');
            tododiv.style.width="90vw";
            tododiv.style.height="65px";
            tododiv.style.margin="10px";
            tododiv.style.display="flex";
            tododiv.style.borderRadius="10px";
            tododiv.style.justifyContent="space-between";
            tododiv.style.alignItems="center";
            tododiv.style.backgroundColor="black";
            tododiv.style.color="white";
            tododiv.style.fontFamily="monospace";
            tododiv.style.fontSize="25px";
            let tick=document.createElement("i");
              tick.classList.add("fa-solid");
              tick.classList.add("fa-check");
              tick.style.color="white";
              tick.style.marginRight="15px";

              let bin=document.createElement("i");
              bin.classList.add("fa-solid");
              bin.classList.add("fa-trash");
              bin.classList.color="white";

              let icondiv=document.createElement('div');
              icondiv.style.marginRight="20px";
              icondiv.appendChild(tick);
              icondiv.appendChild(bin);

            if(todoitem.date===formattedDate)
            {
              tcount++;
              let nametext=document.createTextNode(`${tcount}.${todoitem.name}`);
              namediv.appendChild(nametext);

              tododiv.appendChild(namediv);
              tododiv.appendChild(datediv);
              tododiv.appendChild(pdiv);
              tododiv.appendChild(icondiv);

              div1.appendChild(tododiv);
            }
            else
            {
                fcount++;
                let nametext=document.createTextNode(`${fcount}.${todoitem.name}`);
                namediv.appendChild(nametext);
  
                tododiv.appendChild(namediv);
                tododiv.appendChild(datediv);
                tododiv.appendChild(pdiv);
                tododiv.appendChild(icondiv);

                div2.appendChild(tododiv);
            }
        }
    })
} 
}


document.addEventListener('DOMContentLoaded',()=>
{
    renderitems();
})


mainbtn.addEventListener('click',()=>
{
    let name=ip1.value;
    let date=ip2.value;
    let priority=ip3.value;

    console.log("hi");

    if(name==="" || date==="" || priority==="" || priority==="priority")
    {
        alert("Please enter all detail");
        return;
    }

    if(date<formattedDate)
    {
        alert("You Can not Enter past Date");
        return;
    }

    let newobj={"name":name,"date":date,"priority":priority,"completed":false};
    
    if(localStorage.getItem("itemsarr"))
    {
       let dataarr=JSON.parse(localStorage.getItem("itemsarr"));

       dataarr.push(newobj);

       localStorage.setItem("itemsarr",JSON.stringify(dataarr));

       renderitems();
    }
    else
    {
       let dataarr=[newobj];
        
       localStorage.setItem("itemsarr",JSON.stringify(dataarr));

       renderitems();
    }

})


div1.addEventListener('click',(e)=>{
  
    if(e.target.tagName==="I")
    {
        if(e.target.classList.contains("fa-trash"))
        {
            let tododiv=e.target.parentElement.parentElement;
            let namediv=tododiv.firstElementChild;

            let namecontent=namediv.textContent;

            let arr=namecontent.split(".");
            let ogname=arr[1];

            let itemsarr=JSON.parse(localStorage.getItem("itemsarr"));

            let newitemsarr=itemsarr.filter((item)=> item.name!==ogname);

            localStorage.setItem("itemsarr",JSON.stringify(newitemsarr));

            renderitems();
        }
        else if(e.target.classList.contains("fa-check"))
        {
            let tododiv=e.target.parentElement.parentElement;
            let namediv=tododiv.firstElementChild;

            let namecontent=namediv.textContent;

            let arr=namecontent.split(".");
            let ogname=arr[1];

            let itemsarr=JSON.parse(localStorage.getItem("itemsarr"));

            let mdfarr=itemsarr.filter((item)=> item.name===ogname);

            let mdfobj={"name":mdfarr[0].name,"date":mdfarr[0].date,"priority":mdfarr[0].priority,"completed":true};

            let newitemsarr=itemsarr.filter((item)=> item.name!==ogname);

            newitemsarr.push(mdfobj);

            localStorage.setItem("itemsarr",JSON.stringify(newitemsarr));

            renderitems();
        }
    }
})


div2.addEventListener('click',(e)=>{
  
    if(e.target.tagName==="I")
    {
        if(e.target.classList.contains("fa-trash"))
        {
            let tododiv=e.target.parentElement.parentElement;
            let namediv=tododiv.firstElementChild;

            let namecontent=namediv.textContent;

            let arr=namecontent.split(".");
            let ogname=arr[1];

            let itemsarr=JSON.parse(localStorage.getItem("itemsarr"));

            let newitemsarr=itemsarr.filter((item)=> item.name!==ogname);

            localStorage.setItem("itemsarr",JSON.stringify(newitemsarr));

            renderitems();
        }
        else if(e.target.classList.contains("fa-check"))
        {
            let tododiv=e.target.parentElement.parentElement;
            let namediv=tododiv.firstElementChild;

            let namecontent=namediv.textContent;

            let arr=namecontent.split(".");
            let ogname=arr[1];

            let itemsarr=JSON.parse(localStorage.getItem("itemsarr"));

            let mdfarr=itemsarr.filter((item)=> item.name===ogname);

            let mdfobj={"name":mdfarr[0].name,"date":mdfarr[0].date,"priority":mdfarr[0].priority,"completed":true};

            let newitemsarr=itemsarr.filter((item)=> item.name!==ogname);

            newitemsarr.push(mdfobj);

            localStorage.setItem("itemsarr",JSON.stringify(newitemsarr));

            renderitems();
        }
    }
})

div3.addEventListener('click',(e)=>{
  

    if(e.target.tagName==="I")
    {
        if(e.target.classList.contains("fa-trash"))
        {
            let tododiv=e.target.parentElement;
            let namediv=tododiv.firstElementChild;

            let namecontent=namediv.textContent;

            let arr=namecontent.split(".");
            let ogname=arr[1];

            let itemsarr=JSON.parse(localStorage.getItem("itemsarr"));

            let newitemsarr=itemsarr.filter((item)=> item.name!==ogname);

            localStorage.setItem("itemsarr",JSON.stringify(newitemsarr));

            renderitems();
        }
    }
})