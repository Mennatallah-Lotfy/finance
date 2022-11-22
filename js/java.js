{/* <option value="USD">USD</option>
<option value="EGP">EGP</option>
<option value="AED">AED</option> */}
let formHolder=document.querySelector('.form-holder');

let myForm=`
<form class="row col-5 justify-content-center m-5 border border-1 rounded shadow bg-success ">
<legend class="text-center fs-2 fw-bold mt-4 m-3">Exchange Currency <legend>
<input class="myinput col-10 m-3 rounded" type="text">
<select class="col-4 m-3 rounded myselect1">
</select>
<select class="col-4 m-3 rounded myselect2">
</select>
<label class="col-10 mt-3 myresult"> Your Balance</label>
<input type="submit" class="col-5 m-3 mb-5 rounded mysubmit border-white" value="Submit">
</form>
`
formHolder.innerHTML=myForm;

let myinput=document.querySelector('.myinput');
let mysubmit=document.querySelector('.mysubmit');
let myselect1=document.querySelector(".myselect1");
let myselect2=document.querySelector(".myselect2");
let myresult=document.querySelector('.myresult');

fetch(`https://v6.exchangerate-api.com/v6/cd16764d6fba4998e995948c/latest/USD`)
  .then(res=>res.json())
  .then((data)=>{
    let x= data.conversion_rates;
    let mykey=Object.keys(x); 
    mykey.map((k)=>{
      let myoptions=`<option value="${k}">${k}</option>`;
      myselect1.innerHTML+=myoptions;
      myselect2.innerHTML+=myoptions;
    })
  })
// console.log()
// https://v6.exchangerate-api.com/v6/cd16764d6fba4998e995948c/latest/USD //api-exchange-links

mysubmit.addEventListener('click',(e)=>{
  e.preventDefault();
  if(myinput.value==''||isNaN(myinput.value)){
    myresult.innerHTML='Please Enter Valid Number';
    myresult.style.color="brown";
    myinput.value=""
  }else{
  fetch(`https://v6.exchangerate-api.com/v6/cd16764d6fba4998e995948c/latest/${myselect1.value}`)
  .then(res=>res.json())
  .then((data)=>{
    let s1txt,s2txt,s1val,s2val
    let x= data.conversion_rates;
    let k=Object.keys(x);
    let v=Object.values(x);
    let chang
for(let i=0;i<k.length;i++){
      if(k[i]==myselect1.value){s1val=v[i],s1txt=k[i]}
      if(k[i]==myselect2.value){s2val=v[i],s2txt=k[i]}
    }
if(s1txt==myselect1.value){chang=s2val*myinput.value}
myresult.innerHTML=`${myinput.value} ${myselect1.value} = ${chang.toFixed(3)} ${myselect2.value}`
myresult.style.color="black";
myinput.value="";
  })
}
})