var productName = document.getElementById("pn");
var productPrice = document.getElementById("pp");
var productCategory = document.getElementById("pc");
var productDesc = document.getElementById("pd");

var allProducts;

if (localStorage.getItem("allProducts") == null) {
  allProducts = [];
} else {
  allProducts = JSON.parse(localStorage.getItem("allProducts"));
  displayProduct();
}

function getInputValues() {
  if (validation()) {
    if (document.getElementById("convertedBtn").innerHTML == "ADD") {
      var product = {
        productName: productName.value,
        productPrice: Number(productPrice.value),
        productCategory: productCategory.value,
        productDesc: productDesc.value,
      };
      allProducts.push(product);

      localStorage.setItem("allProducts", JSON.stringify(allProducts));

      displayProduct();
      clearForm();
    } else {
      document.getElementById("convertedBtn").innerHTML = "ADD";
    }
  } else {
    alert("You must start with capital letter");
  }
}

function displayProduct() {
  var html = "";
  for (var i = 0; i < allProducts.length; i++) {
    html += `<tr>
      <td>${i + 1}</td>
      <td>${allProducts[i].productName}</td>
      <td>${allProducts[i].productPrice}</td>
      <td>${allProducts[i].productCategory}</td>
      <td>${allProducts[i].productDesc}</td>
      <td>
        <button onclick="updateElement(${i})" class="btn btn-warning">Update</button>
      </td>
      <td>
        <button onclick="deletElement(${i})" class="btn btn-danger">Delete</button>
      </td>
    </tr>`;
  }

  document.getElementById("tableData").innerHTML = html;
}

function clearForm() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDesc.value = "";
}

function deletElement(index) {
  allProducts.splice(index, 1);

  localStorage.setItem("allProducts", JSON.stringify(allProducts));
  displayProduct();
}

function search(term) {
  cartona = "";
  for (var i = 0; i < allProducts.length; i++) {
    if (allProducts[i].productName.toLowerCase().includes(term.toLowerCase())) {
      cartona += `<tr>
      <td>${i + 1}</td>
      <td>${allProducts[i].productName}</td>
      <td>${allProducts[i].productPrice}</td>
      <td>${allProducts[i].productCategory}</td>
      <td>${allProducts[i].productDesc}</td>
      <td>
        <button onclick="updateElement(${i})" class="btn btn-warning">Update</button>
      </td>
      <td>
        <button onclick="deletElement(${i})" class="btn btn-danger">Delete</button>
      </td>
    </tr>`;
    }
  }
  document.getElementById("tableData").innerHTML = cartona;
}

function validation() {
  var regExp = /^[A-z][a-z]{3,8}$/;
  return regExp.test(productName.value);
}
function updateElement(index) {
  productName.value = allProducts[index].productName;
  productPrice.value = allProducts[index].productPrice;
  productCategory.value = allProducts[index].productCategory;
  productDesc.value = allProducts[index].productDesc;

  document.getElementById("convertedBtn").innerHTML = "Update";
}
