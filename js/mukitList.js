async function getCheckbox() {
  $.ajax({
    url: "http://localhost:1337/users/1",
    type: "GET",
    success: function (data) {
      user_data = data;
      let category = data["categories"];

      for (let i = 0; i < category.length; i++) {
        let elLi = document.createElement("li");
        let elDiv = document.createElement("div");
        let idName = "category" + String(i + 1);
        elLi.id = idName;
        elDiv.className = "form-check";

        itemStr =
          '<input class="form-check-input" name="category" type="checkbox" value="' +
          category[i].name +
          '" id="' +
          idName +
          '_check" onclick="getCheckboxValue()"/>' +
          '<label class="form-check-label" for="flexCheckIndeterminate">' +
          category[i].name +
          "</label>";

        elDiv.innerHTML = itemStr;
        elLi.appendChild(elDiv);
        document.getElementById("my_category").appendChild(elLi);
      }
    },
    error: function (e) {
      console.log(e);
    },
  });
}

window.onload = getCheckbox;
