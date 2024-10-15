document.addEventListener("beforeunload",(e)=>{

});
let currentPlan="Arcade";
let currentDuration="monthly";
let selectedAddOns=[];
const monthlyPlanesCost={
    "Arcade": 9,
    "Advanced":12,
    "Pro":15
};
const yearlyPlanesCost={
    "Arcade":90,
    "Advanced":120,
    "Pro":150
};
const monthlyAddonsCost={
    "Online Service":1,
    "Larger Storage":2,
    "Customizable Profile":2
};
const yearlyAddonsCost={
    "Online Service":10,
    "Larger Storage":20,
    "Customizable Profile":20
};
const monthlyPlanes={
    "Arcade": `Arcade<br>
    &dollar;${monthlyPlanesCost["Arcade"]}/mo`,
    "Advanced":`Advanced<br>
    &dollar;${monthlyPlanesCost["Advanced"]}/mo`,
    "Pro":`Pro<br>
    &dollar;${monthlyPlanesCost["Pro"]}/mo`
};
const yearlyPlanes={
    "Arcade":`Arcade<br>
    &dollar;${yearlyPlanesCost["Arcade"]}/yr<br>
    2 months free
    `,
    "Advanced":`Arcade<br>
    &dollar;${yearlyPlanesCost["Advanced"]}/yr<br>
    2 months free
    `,
    "Pro":`Arcade<br>
    &dollar;${yearlyPlanesCost["Pro"]}/yr<br>
    2 months free
    `
};
const monthlyAddons={
    "Online Service":` +&dollar;${monthlyAddonsCost["Online Service"]}/mo`,
    "Larger Storage":` +&dollar;${monthlyAddonsCost["Larger Storage"]}/mo`,
    "Customizable Profile":` +&dollar;${monthlyAddonsCost["Customizable Profile"]}/mo`
};
const yearlyAddons={
    "Online Service":` +&dollar;${yearlyAddonsCost["Online Service"]}/yr`,
    "Larger Storage":` +&dollar;${yearlyAddonsCost["Larger Storage"]}/yr`,
    "Customizable Profile":` +&dollar;${yearlyAddonsCost["Customizable Profile"]}/yr`
};
function updateForm4AddOns(){

}
function nextStep(e,n){
    e.stopPropagation();
    e.preventDefault();
  
    document.querySelectorAll("#formArea > *")
    .forEach((step)=>step.style.display="none");
    document.querySelectorAll("#formArea > *")[n].style.display="grid";
    if (n==3){createForm4();}
    if(n!=4){
    styleSelectedStep(n);
    }
    return false;
}
function prevStep(e,n){
    e.stopPropagation();
    e.preventDefault();
    document.querySelectorAll("#formArea > *")[n+1].style.display="none";
    document.querySelectorAll("#formArea > *")[n].style.display="grid";
    styleSelectedStep(n);
    return false;
}
function styleSelectedStep(n){
    const stepsNumbers=document.querySelectorAll(`.stepNumber`);
    stepsNumbers.forEach((step)=> step.classList.remove("currentStep"));
    stepsNumbers[n].classList.add("currentStep");
}
function selectPlan(e,plan){
    e.stopPropagation();
    styleSelectedPlan(plan);
    currentPlan=plan.dataset.planType;

}
function styleSelectedPlan(plan){
    document.querySelectorAll(".plan")
    .forEach((p)=> p.classList.remove("selectedPlan") );
    plan.classList.add("selectedPlan");

}
function changePlanesDuration(duration){
currentDuration=duration.dataset.duration;
const planesDuration= duration.dataset.
duration=="monthly"?monthlyPlanes:yearlyPlanes;
const planes=document.querySelectorAll(".plan");
planes.forEach((plan)=>{
    plan.querySelector(".planCost")
    .innerHTML=planesDuration[plan.dataset.planType];
});
}
function changeAddonsDuration(duration){
    const addOnsDuration=duration.dataset.
    duration=="monthly"?monthlyAddons:yearlyAddons;
    const addOns=document.querySelectorAll(".addOn");
    addOns.forEach((addOn)=>{
        addOn.querySelector(".cost")
        .innerHTML=addOnsDuration[addOn.dataset.addon];
    });

}
function selectDuration(e,duration){
    e.stopPropagation();
    styleSelectedDuration(duration);
    changePlanesDuration(duration);
    changeAddonsDuration(duration);
}
function styleSelectedDuration(duration){
    document.querySelectorAll("#durationChoise>*")
    .forEach((d)=>d.classList.remove("selectedDuration"));
    duration.classList.add("selectedDuration");
}
function handleAddons(e,addonCheck){
    e.stopPropagation();
    if(addonCheck.checked){
        addonCheck.parentElement.classList.add("checked");
        selectedAddOns.push(addonCheck.value);
        
    }
    else{
        addonCheck.parentElement.classList.remove("checked");
        selectedAddOns= selectedAddOns.filter(item=>item!==addonCheck.value);
         
    }
}
function createForm4(){
    let form4=document.querySelector("#form4");
    form4.innerHTML='';
    form4.append(form4Intro());
    form4.append(form4Plan());
    for(let addon of selectedAddOns){
        form4.append(form4AddON(addon));
    }
    form4.append(form4TotalCost());
    form4.append(form4ConfirmAndBack());
}
function form4Intro(){
    return document.createRange().
    createContextualFragment(`<div class="intro">
    <h1>
    Finishing up
    </h1>
    <h4>
    Double-check everything looks OK before confirming.
    </h4>
    </div>
    `);
}
function form4Plan(duration){
 const cost=currentDuration=="monthly"?
 `&dollar;${monthlyPlanesCost[currentPlan]}/mo`:`
 &dollar;${yearlyPlanesCost[currentPlan]}/yr
 `
 return document.createRange().createContextualFragment(`
 <div id="form4Plan">
 <div>
 ${currentPlan}(${currentDuration})<br>
 <button name="changePlan" onclick="nextStep(event,1)">Change</button>
 </div>
 <div>
 ${cost}
 </div>
 </div>
 `);
}
function form4AddON(addon){
    const cost=currentDuration=="monthly"?
    `+&dollar;${monthlyAddonsCost[addon]}/mo`:
    `+&dollar;${yearlyAddonsCost[addon]}/yr`;
  return document.createRange().createContextualFragment(`
  <div class="form4Addon">
  <div>${addon}</div>
  <div>${cost}</div>
  </div>
  `);
}
function form4TotalCost(){
    const cost=getTotalCost();
  const perDuration=currentDuration=="monthly"?
  "month":"year";
  const costDuration=currentDuration=="monthly"?
  "mo":"yr";
  return document.createRange().createContextualFragment(`
   <div class="totalCost">
   <div>
   Total(per ${perDuration})
   </div>
   <div>
   +&dollar;${cost}/${costDuration}
   </div>
   </div>
  `);
}
function getTotalCost(){
    let totalCost=0;
    const planCost=currentDuration=="monthly"?
    monthlyPlanesCost[currentPlan]:yearlyPlanesCost[currentPlan];
    totalCost+=planCost;
    const addOnsCost=currentDuration=="monthly"?
    monthlyAddonsCost:yearlyAddonsCost;
    for(let addOn of selectedAddOns){
         totalCost+=addOnsCost[addOn];
    }
    return totalCost;
    
}
function form4ConfirmAndBack(){
   return document.createRange().createContextualFragment(`
    <button class="stepButton prevStep" 
onclick="prevStep(event,2)">
   Go Back
  </button>
 <button class="stepButton nextStep" onclick="nextStep(event,4)">
    Confirm
 </button>
    `);
}