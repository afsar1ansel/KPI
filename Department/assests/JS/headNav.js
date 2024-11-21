const token = localStorage.getItem("authToken");
const name = localStorage.getItem("userEmail");

const headName = document.getElementById("nameHeader");
// headName.innerText = `Welcome, ${name}`

const profile = document.querySelector(".profile");
// const initials = getInitials(name);
// profile.innerText = initials;

function getInitials(name) {
  if (!name) return "";
  const nameParts = name.trim().split(" ");
  const firstInitial = nameParts[0]?.charAt(0).toUpperCase() || "";
  const lastInitial = nameParts[1]?.charAt(0).toUpperCase() || "";
  return firstInitial + lastInitial;
}

console.log("logout")

const logout = document.getElementById("logout");
logout.addEventListener("click", () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userEmail");
  console.log("Logout clicked");
  window.location.href = "./login.html";
});