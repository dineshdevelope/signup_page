import JustValidate from "just-validate";

//getting form elements
const formEl = document.getElementById("signupForm");

const validateForm = new JustValidate(formEl, {
  validateBeforeSubmitting: true,
});

//  --- javascript validations part start
validateForm.addField(
  "#firstName",
  [
    {
      rule: "required",
    },
    {
      rule: "minLength",
      value: 3,
    },
    {
      rule: "maxLength",
      value: 10,
    },
  ],
  {
    errorLabelCssClass: ["form-error-msg"],
  }
);

validateForm.addField(
  "#surName",
  [
    {
      rule: "required",
    },
    {
      rule: "maxLength",
      value: 10,
    },
    {
      rule: "minLength",
      value: 3,
    },
  ],
  {
    errorLabelCssClass: ["form-error-msg"],
  }
);

validateForm.addField(
  "#email",
  [
    {
      rule: "required",
    },
    {
      rule: "email",
    },
    {
      rule: "maxLength",
      value: 35,
    },
    {
      rule: "minLength",
      value: 10,
    },
  ],
  {
    errorLabelCssClass: ["form-error"],
  }
);

validateForm.addField(
  "#password",
  [
    {
      rule: "required",
    },

    {
      rule: "strongPassword",
    },
    {
      rule: "maxLength",
      value: 15,
    },
    {
      rule: "minLength",
      value: 6,
    },
  ],
  {
    errorLabelCssClass: ["form-error"],
  }
);

validateForm.addField(
  "#dob",
  [
    {
      rule: "required",
    },
  ],
  {
    errorLabelCssClass: ["form-error"],
  }
);
// javascript validations part end ---

const localStorageKey = "signUpData";

validateForm.onSuccess(() => {
  const formData = new FormData(formEl);

  //to specify the id
  const entryId = Date.now().toString();
  console.log(entryId);

  //convert formData into obj form
  const formValueObj = Object.fromEntries(formData.entries());

  //add a ["id"] in that obj
  formValueObj.id = entryId;

  //to get a localStorage Data
  const existingSignUpData = localStorage.getItem(localStorageKey);

  //to parrse that data
  const existingSignUpArray = JSON.parse(existingSignUpData);

  //creating empty array to push my values
  const newSignUpData = [];

  if (existingSignUpArray) {
    existingSignUpArray.push(formValueObj);

    localStorage.setItem(localStorageKey, JSON.stringify(existingSignUpArray));
  } else {
    newSignUpData.push(formValueObj);

    localStorage.setItem(localStorageKey, JSON.stringify(newSignUpData));
  }

  alert("Your successfully SignUp with our networks");
  getAllSignUpDatas();
  formEl.reset();
});

function getAllSignUpDatas() {
  const signUpData = localStorage.getItem(localStorageKey);

  const signUpDataArr = JSON.parse(signUpData);

  const signUpCardEl = document.querySelector("#signUpData");

  if (signUpDataArr && signUpDataArr.length > 0) {
    signUpCardEl.classList.remove("hidden");

    const tableEl = document.querySelector("#signUpDataTable");

    tableEl.innerHTML = "";

    const newFinalValue = [];
    console.log(signUpData);

    signUpDataArr.map((signUpData) => {
      const trEl = document.createElement("tr");
      const nameEl = document.createElement("td");
      const surNameEl = document.createElement("td");
      const mailEl = document.createElement("td");
      const dateEl = document.createElement("td");
      const genderEl = document.createElement("td");
      const delBtnEl = document.createElement("button");

      //adding style and text content in table
      nameEl.classList.add("registereddata");
      nameEl.textContent = signUpData.firstName;

      surNameEl.classList.add("registereddata");
      surNameEl.textContent = signUpData.surName;

      mailEl.classList.add("registereddata");
      mailEl.textContent = signUpData.email;

      dateEl.classList.add("registereddata");
      dateEl.textContent = signUpData.dob;

      genderEl.classList.add("registereddata");
      genderEl.textContent = signUpData.gender;

      delBtnEl.className =
        "px-2 py-1 rounded bg-red-500 hover:bg-red-700 text-white text-sm text-semibold";
      delBtnEl.textContent = "Delete";

      delBtnEl.addEventListener("click", (e) => {
        deleteSignUp(signUpData);
      });

      genderEl.classList.add("registereddata");
      genderEl.append(delBtnEl);

      // showing elements in UI

      trEl.append(nameEl, surNameEl, mailEl, dateEl, genderEl, delBtnEl);

      newFinalValue.push(trEl);
    });

    newFinalValue.forEach((el) => tableEl.append(el));
  } else {
    signUpCardEl.classList.add("hidden");
  }
}

// Delete Functionality
function deleteSignUp(request) {
  const conform = confirm(`Are you sure want to delete?`);

  if (conform) {
    const existingSignUpData = localStorage.getItem(localStorageKey);

    const signUpDataObj = JSON.parse(existingSignUpData);

    const otherRecords = signUpDataObj.filter(
      (signUpReg) => signUpReg.id != request["id"]
    );

    console.log(otherRecords);

    localStorage.setItem(localStorageKey, JSON.stringify(otherRecords));

    getAllSignUpDatas();
  }
}

getAllSignUpDatas();
