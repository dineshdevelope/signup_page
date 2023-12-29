import JustValidate from "just-validate";

const formEl = document.getElementById("signupForm");

const validateForm = new JustValidate(formEl, {
  validateBeforeSubmitting: true,
});

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
      value: 25,
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
      value: 12,
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

const localStorageKey = "signUpData";

validateForm.onSuccess(() => {
  const formData = new FormData(formEl);

  const entryId = Date.now().toString();

  console.log(entryId);

  const formValueObj = Object.fromEntries(formData.entries());

  formValueObj.id = entryId;

  const existingSignUpData = localStorage.getItem(localStorageKey);

  const existingSignUpArray = JSON.parse(existingSignUpData);

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
      const tdEl = document.createElement("td");
      const td2El = document.createElement("td");
      const td3El = document.createElement("td");
      const td4El = document.createElement("td");
      const td5El = document.createElement("td");
      const deleteBtnEl = document.createElement("button");

      tdEl.classList.add("registereddata");
      tdEl.textContent = signUpData.firstName;

      td2El.classList.add("registereddata");
      td2El.textContent = signUpData.surName;

      td3El.classList.add("registereddata");
      td3El.textContent = signUpData.email;

      td4El.classList.add("registereddata");
      td4El.textContent = signUpData.dob;

      td5El.classList.add("registereddata");
      td5El.textContent = signUpData.gender;

      deleteBtnEl.className =
        "px-2 py-1 rounded bg-red-500 hover:bg-red-700 text-white text-sm text-semibold";
      deleteBtnEl.textContent = "Delete";

      deleteBtnEl.addEventListener("click", (e) => {
        deleteSignUp(signUpData);
      });

      td5El.classList.add("registereddata");
      td5El.append(deleteBtnEl);

      trEl.append(tdEl, td2El, td3El, td4El, td5El, deleteBtnEl);

      newFinalValue.push(trEl);
    });

    newFinalValue.forEach((el) => tableEl.append(el));
  } else {
    signUpCardEl.classList.add("hidden");
  }
}

function deleteSignUp(request) {
  const conform = confirm(`Are you sure want to delete?`);

  if (conform) {
    const existingSignUpData = localStorage.getItem(localStorageKey);

    const signUpDataObj = JSON.parse(existingSignUpData);

    const otherRecords = signUpDataObj.filter(
      (signUpReg) => signUpReg.id != request["id"]
    );

    localStorage.setItem(localStorageKey, JSON.stringify(otherRecords));

    getAllSignUpDatas();
  }
}

getAllSignUpDatas();
