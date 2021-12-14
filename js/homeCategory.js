async function getCategory() {
  let url = window.location.href;
  let arr = url.split("/");
  user_id = arr[arr.length - 1];
  $.ajax({
    url: "https://still-garden-11823.herokuapp.com/users/" + user_id,
    type: "GET",
    success: function (data) {
      user_data = data;
      let category = data["categories"];
      for (let i = 0; i < category.length; i++) {
        let newOption = document.createElement("option");
        let newValue = document.createAttribute("value");
        let txtNode = document.createTextNode(category[i].name);
        newOption.appendChild(txtNode);
        newValue.value = category[i].name;
        newOption.setAttributeNode(newValue);
        document.getElementById("My_Category").appendChild(newOption);
      }
    },
    error: function (e) {
      console.log(e);
    },
  });
  document.getElementById("home_nav").href = "/home/" + user_id;
  document.getElementById("mukit_nav").href = "/mukitlist/" + user_id;
}
async function removeCategory() {
  let listEl = document.getElementById("My_Category");
  let eCount = listEl.childElementCount;
  for (eCount; eCount > 1; eCount--) {
    listEl.removeChild(listEl.lastChild);
  }
}
window.onload = getCategory;

document
  .getElementById("category_add_form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = e.target.category_name.value;
    if (!name) {
      return alert("추가할 카테고리를 입력하세요.");
    }
    try {
      await axios.post("https://still-garden-11823.herokuapp.com/categories", {
        name: name,
        users_permissions_user: user_data,
      });
      removeCategory();
      getCategory();
    } catch (err) {
      console.error(err);
    }
    e.target.category_name.value = "";
  });

document
  .getElementById("category_remove_form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = $("#My_Category option:selected").val();
    console.log(name);
    if (name == "Select Category") {
      return alert("삭제할 카테고리를 선택하세요.");
    }
    try {
      await axios.delete(
        "https://still-garden-11823.herokuapp.com/categories/" +
          encodeURIComponent(name)
      );
      removeCategory();
      getCategory();
    } catch (err) {
      console.error(err);
    }
  });
