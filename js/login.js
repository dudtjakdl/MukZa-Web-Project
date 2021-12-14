const login = () => {
  userId = document.getElementById("userId").value;
  userPassword = document.getElementById("userPassword").value;

  console.log(userId);
  // Request API.
  axios
    .post("https://still-garden-11823.herokuapp.com/auth/local", {
      identifier: userId,
      password: userPassword,
    })
    .then((response) => {
      // Handle success.
      console.log("Well done!");
      console.log("User profile", response.data.user);
      console.log("User token", response.data.jwt);
      //alert("로그인 완료!");

      user_id = response.data.user["id"];
      console.log(user_id);
      window.location.href = "/home/" + user_id;
    })
    .catch((error) => {
      // Handle error.
      console.log("An error occurred:", error.response);
      alert("아이디를 확인해주세요..");
    });
};
if ($('input:checkbox[id="remember_id"]').is(":checked") == true) {
  alert("remember");
}
