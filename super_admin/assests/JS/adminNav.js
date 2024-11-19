const token = localStorage.getItem("authToken") || "";
let adminName = localStorage.getItem("adminName") || ""; 
let adminMail = localStorage.getItem("adminMail") || "";

// if (!token){
//   window.location.href = "./login.html";
// }

document.addEventListener("DOMContentLoaded", async function () {
  if (!adminName) {
    await fetchAdminData();
  }
  updateNavBar();
});

async function fetchAdminData() {
  try {
    const res = await fetch(`http://127.0.0.1:5000/superadmin/all/${token}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch admin data: ${res.status}`);
    }
    const data = await res.json();
    if (data.superAdmins && data.superAdmins.length > 0) {
      adminName = data.superAdmins[0].username;
      adminMail = data.superAdmins[0].emailid;

      localStorage.setItem("adminName", adminName);
      localStorage.setItem("adminMail", adminMail);

      console.log(adminName, adminMail);
    } else {
      console.warn("No superAdmins found in the response");
    }
  } catch (error) {
    console.error("Error fetching admin data:", error);
  }
}

function getInitials(name) {
  if (!name) return "";
  const nameParts = name.trim().split(" ");
  const firstInitial = nameParts[0]?.charAt(0).toUpperCase() || "";
  const lastInitial = nameParts[1]?.charAt(0).toUpperCase() || "";
  return firstInitial + lastInitial; 
}


function updateNavBar() {
   const initials = getInitials(adminName);
  document.getElementById("adminNav").innerHTML = `
    <nav class="navBar">
      <div class="logo">
        <img src="../Department/assests/img/green_logo.svg" alt="" />
        <div class="tagText">
          <h1>KSAPCC</h1>
          <h3>Monitoring</h3>
        </div>
      </div>
      <div class="navRight">
        <p>Welcome, ${adminName || "Admin"}</p>
        <div class="profile">${initials || "A"}</div>
        <div class="notification">
          <i class="bi bi-bell"></i>
        </div>
      </div>
    </nav>
  `;
}
