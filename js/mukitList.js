async function getCheckbox() {
  $.ajax({
    url: "https://still-garden-11823.herokuapp.com/users/" + user_id,
    type: "GET",
    success: function (data) {
      let category = data["categories"];
      for (let i = 0; i < category.length; i++) {
        let elLi = document.createElement("li");
        let elDiv = document.createElement("div");
        let idName = "category" + String(i + 1);
        elLi.id = idName;
        elDiv.className = "form-check";

        let itemStr =
          '<input checked class="form-check-input" name="category" type="checkbox" value="' +
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

async function getCarousel() {
  try {
    let user_data = await axios.get(
      "https://still-garden-11823.herokuapp.com/users/" + user_id
    );
    let category = user_data["data"]["categories"];

    // 카테고리 수
    for (let i = 0; i < category.length; i++) {
      let mukit_data = await axios.get(
        "https://still-garden-11823.herokuapp.com/categories/" +
          encodeURIComponent(category[i].name)
      );
      let mukit = mukit_data["data"]["mukits"];

      let comment = mukit[0]['comment'];
      
      let card_num = mukit.length;
      let page_num = card_num / 8;
      let elSec = document.createElement("section");
      elSec.className = "my-5 bg-dark";
      elSec.id = category[i].name;

      let itemStr =
        '<div class="container">' +
        '  <div class="col-xl-12">' +
        '    <h2 class="text-center text-white">' +
        category[i].name +
        "</h2>" +
        "</div>" +
        '  <div id="carouselFourColumn' +
        (i + 1) +
        '" class="carousel slide" data-ride="carousel">' +
        '    <div class="carousel-inner">';

      // 카테고리 당 페이지 수
      for (let page = 0; page < page_num; page++) {
        if (page === 0) {
          itemStr +=
            '      <div class="carousel-item active">' +
            '        <div class="row">';
        } else {
          itemStr +=
            '      <div class="carousel-item">' + '        <div class="row">';
        }

        if (card_num <= 4) {
        }

        let count = 0;
        let temp = card_num;
        // 페이지 당 카드 수
        while (count < 8 && card_num !== 0) {
          let restaurant = JSON.parse(mukit[temp - card_num]["restaurant"]);
          let memo = document.getElementById(
            "message-text"
          );
          //console.log("message-text_" + restaurant["id"]);
          //console.log(memo);
         
          memo.innerText = mukit["0"]["comment"];

          //document.getElementById("modal_list").append='<div class="modal" id="myModal_'+restaurant["id"]+'" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true" > <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title" id="myModalLabel">New message</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button> </div> <div class="modal-body"> <form> <div class="mb-3"> <label for="message-text" class="col-form-label" >Memo:</label > <textarea class="form-control" id="message-text">'+mukit["0"]["comment"];+'</textarea> </div> </form> </div> <div class="modal-footer"> <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" > Close </button> <button type="button" class="btn btn-primary"> Send message </button> </div> </div> </div> </div>'
          itemStr +=
            '          <div class="col-xl-3 p-1">' +
            '            <div class="card">' +
            '              <img src="https://via.placeholder.com/300x250" class="w-100"/>' +
            '              <div class="card-body">' +
            '                <h5 style="height: 50px" class="card-title">' +
            restaurant["place_name"] +
            "</h5>" +
            '                <p style="height: 50px" class="card-text">' +
            restaurant["address_name"] +
            "</p>" +
            '                 <button type="button" class="btn btn-primary" data-toggle="modal" id="modal_btn" data-target="#exampleModal">My Memo</button>' +
            "</div></div></div>";
            
          if (count === 3) {
            itemStr += "</div>" + '        <div class="row">';
          }
          count++;
          card_num--;
        }
        itemStr += "</div></div>";
      }
      itemStr +=
        "</div>" +
        '    <a class="carousel-control-prev" href="#carouselFourColumn' +
        (i + 1) +
        '" role="button" data-slide="prev">' +
        '      <span class="carousel-control-prev-icon" aria-hidden="true"></span>' +
        '      <span class="sr-only">Previous</span>' +
        "</a>" +
        '    <a class="carousel-control-next" href="#carouselFourColumn' +
        (i + 1) +
        '" role="button" data-slide="next">' +
        '      <span class="carousel-control-next-icon" aria-hidden="true"></span>' +
        '      <span class="sr-only">Next</span>' +
        "</a>" +
        '    <ol class="carousel-indicators">' +
        '      <li data-target="#carouselFourColumn' +
        (i + 1) +
        '" data-slide-to="0" class="active"></li>';

      for (let j = 1; j <= page_num; j++) {
        itemStr +=
          '      <li data-target="#carouselFourColumn' +
          (i + 1) +
          '" data-slide-to="' +
          j +
          '"></li>';
      }

      itemStr += "</ol></div></div></section>";

      elSec.innerHTML = itemStr;
      document.getElementById("mukit_list").appendChild(elSec);
    }
  } catch (err) {
    console.error(err);
  }
}

async function getCheckboxValue() {
  // 선택된 목록 가져오기
  const query = 'input[name="category"]:checked';
  const selectedEls = document.querySelectorAll(query);

  // 선택된 목록에서 value 찾기
  let checked = [];
  selectedEls.forEach((el) => {
    checked.push(el.value);
  });
  checked = checked.filter((element) => element !== "selectall");

  for (let i = 0; i < category_data.length; i++) {
    if (checked.indexOf(category_data[i].name) > -1) {
      document.getElementById(category_data[i].name).style.display = "block";
    } else {
      document.getElementById(category_data[i].name).style.display = "none";
    }
  }

  //document.getElementById(result+'_card').style.display='none';
}

//전체보기 클릭시 모든 카테고리 클릭되도록 설정
const selectAll = (selectAll) => {
  const checkboxes = document.getElementsByName("category");

  checkboxes.forEach((checkbox) => {
    checkbox.checked = selectAll.checked;
  });

  getCheckboxValue();
};

async function init() {
  let url = window.location.href;
  let arr = url.split("/");
  user_id = arr[arr.length - 1];

  document.getElementById("home_nav").href = "/home/" + user_id;
  document.getElementById("mukit_nav").href = "/mukitlist/" + user_id;

  $.ajax({
    url: "https://still-garden-11823.herokuapp.com/users/" + user_id,
    type: "GET",
    success: function (data) {
      category_data = data["categories"];
    },
    error: function (e) {
      console.log(e);
    },
  });
  getCheckbox();
  getCarousel();
}

window.onload = init;
