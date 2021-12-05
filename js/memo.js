$(document).ready(function () {
  showArticles();
});
function openClose() {
  if ($("#post-box").css("display") == "block") {
    $("#post-box").hide();
    $("#btn-post-box").text("맛집 메모 열기");
  } else {
    $("#post-box").show();
    $("#btn-post-box").text("맛집 메모 닫기");
  }
}

function showArticles() {
  $.ajax({
    type: "GET",
    url: "/memo?sample_give=샘플데이터",
    data: {},
    success: function (response) {
      alert(response["msg"]);
    },
  });
}

Add_Category = () => {
  let My_Category = document.querySelector("#My_Category");
  var objOption = document.createElement("option");
  let cate = document.getElementById("selboxDirect").value;

  //버튼 클릭하면 비워줌
  document.getElementById("selboxDirect").value = "";

  if (cate == "") {
    alert("등록할 카테고리를 입력해주세요!!");
  } else {
    if (My_Category.length > 8) {
      alert("8개 카테고리 모두 선택 완료..");
    } else {
      alert(cate + " 카테고리 등록 완료!!");
      objOption.text = cate;
      //objOption.text = My_Category.length+1 + "번";
      objOption.value = cate;
      My_Category.options.add(objOption);
    }
  }
};

Remove_Category = () => {
  let my_select = $("#My_Category option:selected").val();
  alert(my_select + " 카테고리 제거 완료!!");
  console.log(my_select);
  $("#My_Category option[value='" + my_select + "']").remove();
};
