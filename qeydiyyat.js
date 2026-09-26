/* =========================================
   INTELIA ACADEMY
   REGISTRATION - STEP 1
========================================= */


const registrationForm =
  document.getElementById("registrationStep1Form");

const clearBtn =
  document.getElementById("clearBtn");

const formError =
  document.getElementById("formError");


const STORAGE_KEY =
  "inteliaRegistrationStep1";


/* =========================================
   ELEMENTS
========================================= */

const fullNameInput =
  document.getElementById("fullName");

const phoneInput =
  document.getElementById("phone");

const educationInput =
  document.getElementById("education");

const universityInput =
  document.getElementById("university");

const specialtyInput =
  document.getElementById("specialty");


/* =========================================
   LOAD SAVED DATA
========================================= */

function loadSavedData() {

  try {

    const saved =
      localStorage.getItem(STORAGE_KEY);


    if (!saved) return;


    const data =
      JSON.parse(saved);


    fullNameInput.value =
      data.fullName || "";

    phoneInput.value =
      data.phone || "";

    educationInput.value =
      data.education || "";

    universityInput.value =
      data.university || "";

    specialtyInput.value =
      data.specialty || "";


  } catch(error){

    console.error(
      "Məlumat oxuna bilmədi:",
      error
    );

  }

}



/* =========================================
   VALIDATE PHONE
========================================= */

function validatePhone(phone){

  const cleanPhone =
    phone.replace(/\s+/g,"");


  const phoneRegex =
    /^(\+994|0)(50|51|55|70|77|99|10)[0-9]{7}$/;


  return phoneRegex.test(cleanPhone);

}



/* =========================================
   FORM SUBMIT
========================================= */

registrationForm.addEventListener(
"submit",
function(event){


event.preventDefault();


formError.textContent="";


const fullName =
fullNameInput.value.trim();


const phone =
phoneInput.value.trim();


const education =
educationInput.value;


const university =
universityInput.value.trim();


const specialty =
specialtyInput.value.trim();



/* EMPTY CHECK */

if(
!fullName ||
!phone ||
!education ||
!university ||
!specialty
){

formError.textContent =
"Zəhmət olmasa bütün vacib sahələri doldurun.";

return;

}



/* NAME CHECK */

if(
fullName.length < 5 ||
!fullName.includes(" ")
){

formError.textContent =
"Ad və soyadınızı tam daxil edin.";

fullNameInput.focus();

return;

}



/* PHONE CHECK */

if(
!validatePhone(phone)
){

formError.textContent =
"Telefon nömrəsini düzgün daxil edin.";

phoneInput.focus();

return;

}



/* DATA */

const registrationData = {


fullName: fullName,

phone: phone,

education: education,

university: university,

specialty: specialty,

createdAt:
new Date().toISOString()

};



/* SAVE */

localStorage.setItem(
STORAGE_KEY,
JSON.stringify(registrationData)
);



/* NEXT STEP */

alert(
"Məlumatlar yadda saxlanıldı. Növbəti mərhələ kurs və qrup seçimidir."
);



/* BURASI YENİ ƏLAVƏ OLUNDU */

window.location.href =
"./kurs-secimi.html";


});




/* =========================================
   CLEAR FORM
========================================= */

clearBtn.addEventListener(
"click",
function(){


const confirmClear =
confirm(
"Formdakı məlumatları silmək istəyirsiniz?"
);


if(!confirmClear) return;


registrationForm.reset();


localStorage.removeItem(
STORAGE_KEY
);


formError.textContent="";


});




/* =========================================
   CLEAR ERROR WHILE TYPING
========================================= */


[
fullNameInput,
phoneInput,
educationInput,
universityInput,
specialtyInput

].forEach(
function(input){

input.addEventListener(
"input",
function(){

formError.textContent="";

});

});




/* =========================================
   START
========================================= */

loadSavedData();
