function validateRegisterForm() {
  const form = document.getElementById("register-form");
  const password = document.getElementById("password");
  const rpassword = document.getElementById("rpassword");
  const formChildren = form.childNodes;
  let passed = true;

  if (password.value === rpassword.value) {
    rpassword.removeAttribute("name");
  } else {
    passed = false;
    alert("Password mismatch!");
    return;
  }

  if (password.value.length < 7) {
    passed = false;
    alert("Password must be at least 7 characters!");
    return;
  }

  if (hasBlankField(formChildren)) {
    passed = false;
    alert("There is at least one blank field!");
    return;
  }

  if (passed) {
    form.submit();
  }
}

function validateOrderForm() {
  const form = document.getElementById("order-form");
  const postcode = document.getElementById("postcode");
  const formChildren = form.childNodes;
  let passed = true;

  if (postcode.value.length != 4) {
    passed = false;
    alert("Postcode is 4-digit!");
    return;
  }

  if (hasBlankField(formChildren)) {
    passed = false;
    alert("There is at least one blank field!");
    return;
  }

  if (passed) {
    form.submit();
  }
}

function hasBlankField(list) {
  let result = false;
  list.forEach((element) => {
    if (element.value != undefined && element.disabled == false) {
      let trimmed = element.value.trim(); // removes whitespace from both sides of a string
      if (trimmed == "") {
        result = true;
        return;
      }
    }
  });
  return result;
}

function showDelivery() {
  const radioButton = document.getElementById("shipping-delivery");
  const delivery = document.getElementById("daddress");
  const deliveryLabel = document.getElementById("daddress-label");
  const checkBox = document.getElementById("same-delivery");
  const checkBoxLabel = document.getElementById("same-delivery-label");
  if (radioButton.checked == true) {
    // if Delivery is selected, show the Label and input of "Delivery address" and "Same as delivery address"
    delivery.disabled = false;
    delivery.style.display = "block";
    deliveryLabel.style.display = "block";
    checkBox.style.display = "inline-block";
    checkBoxLabel.style.display = "inline-block";
  } else {
    // if not, hide them and reset the billing address (in case "Same as delivery address" is checked)
    checkBox.checked = false;
    copyDelivery();
    delivery.disabled = true;
    delivery.style.display = "none";
    deliveryLabel.style.display = "none";
    checkBox.style.display = "none";
    checkBoxLabel.style.display = "none";
  }
}

function showCard() {
  // similar to showDelivery
  const radioButton = document.getElementById("payment-online");
  const cardType = document.getElementById("card-type");
  const cardTypeLabel = document.getElementById("card-type-label");
  const cardTypeOptions = document.getElementsByName("card-type");
  const cardNum = document.getElementById("card-num");
  const cardNumLabel = document.getElementById("card-num-label");
  if (radioButton.checked == true) {
    cardTypeOptions.forEach((element) => (element.disabled = false));
    cardNum.disabled = false;
    cardType.style.display = "block";
    cardTypeLabel.style.display = "block";
    cardNum.style.display = "block";
    cardNumLabel.style.display = "block";
  } else {
    cardTypeOptions.forEach((element) => (element.disabled = true));
    cardNum.disabled = true;
    cardType.style.display = "none";
    cardTypeLabel.style.display = "none";
    cardNum.style.display = "none";
    cardNumLabel.style.display = "none";
  }
}

function changeCardLength(maxLength) {
  const cardNum = document.getElementById("card-num");
  cardNum.disabled = false;
  cardNum.value = "";
  cardNum.setAttribute("maxlength", maxLength);
}

function copyDelivery() {
  const checkBox = document.getElementById("same-delivery");
  const delivery = document.getElementById("daddress");
  const billing = document.getElementById("baddress");
  if (checkBox.checked == true) {
    billing.value = delivery.value;
    billing.disabled = true;
  } else {
    billing.value = "";
    billing.disabled = false;
  }
}
