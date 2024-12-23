const token = localStorage.getItem("authToken") || "";
let adminName = localStorage.getItem("adminName") || "";
let adminMail = localStorage.getItem("adminMail") || "";

if (!token) {
  window.location.href = "./login.html";
} else {
  document.addEventListener("DOMContentLoaded", async function () {
    if (!adminName) {
      await fetchAdminData();
    }
    updateNavBar();
  fetchNotifications();

  });

  async function fetchAdminData() {
    try {
      const res = await fetch(
        `https://staging.thirdeyegfx.in/kpi_app/superadmin/all/${token}`
      );
      if (!res.ok) {
        throw new Error(`Failed to fetch admin data: ${res.status}`);
      }
      const data = await res.json();
      if (data.superAdmins && data.superAdmins.length > 0) {
        adminName = data.superAdmins[0].username;
        adminMail = data.superAdmins[0].emailid;

        localStorage.setItem("adminName", adminName);
        localStorage.setItem("adminMail", adminMail);

        // console.log(adminName, adminMail);
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
        <img src="../Department/assests/img/greenLogo.svg" alt="" />
        <div class="tagText">
          <h1>KSAPCC</h1>
          <h3>Monitoring</h3>
        </div>
      </div>
      <div class="navRight">
        <p>Welcome, ${adminName || "Admin"}</p>
        <div class="profile">${initials || "A"}</div>
        <div class="notification dropdown">
          <i
            class="bi bi-bell"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          ></i>
         <ul class="dropdown-menu" id="notificationList">
      
          </ul>
        </div>
      </div>
    </nav>
  `;
}

}


async function fetchNotifications() {

  try {
    const res = await fetch(`https://staging.thirdeyegfx.in/kpi_app/get_superadmin_notifications/${token}`);

    const data = await res.json();
    // console.log(data);

    setNotifications(data);

  }catch (error) {
    console.error("Error fetching notifications:", error);
  }
}


function setNotifications(data) {
  // console.log(data.notifications);

  let icon;
  const notificationList = document.getElementById("notificationList");
  notificationList.innerHTML = "";

  data.notifications.forEach((notification) => {
    const div = document.createElement("div");

    if (notification.notif_type == 0) {
      div.classList.add("notificationColorRed");
      icon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97982 4.96451 3.73013 6.48726 2.99218 8.26884C2.25422 10.0504 2.06114 12.0108 2.43735 13.9021C2.81355 15.7934 3.74215 17.5307 5.10571 18.8943C6.46928 20.2579 8.20656 21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12C21.747 9.41506 20.7188 6.93684 18.891 5.10901C17.0632 3.28118 14.5849 2.25299 12 2.25ZM16.6436 10.2927L11.1431 15.5427C11.0032 15.6758 10.8176 15.75 10.6245 15.75C10.4315 15.75 10.2458 15.6758 10.106 15.5427L7.35645 12.9177C7.2128 12.7801 7.12965 12.5911 7.12525 12.3923C7.12084 12.1934 7.19555 12.0009 7.33297 11.8571C7.47038 11.7133 7.65927 11.6299 7.85813 11.6252C8.05699 11.6206 8.24957 11.695 8.39356 11.8323L10.6245 13.9629L15.6065 9.20728C15.7504 9.07004 15.943 8.99558 16.1419 9.00023C16.3407 9.00489 16.5296 9.08828 16.667 9.2321C16.8045 9.37592 16.8792 9.56841 16.8748 9.76727C16.8704 9.96614 16.7872 10.1551 16.6436 10.2927Z" fill="#0FAF62"/>
</svg>`;
    } else if (notification.notif_type == 1) {
      div.classList.add("notificationColorYellow");
      icon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M9 12.0006H15" stroke="#005CE8" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9 15.0006H15" stroke="#005CE8" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M5.25 3.75056H18.75C18.9489 3.75056 19.1397 3.82958 19.2803 3.97023C19.421 4.11089 19.5 4.30165 19.5 4.50056V18.7506C19.5 19.3473 19.2629 19.9196 18.841 20.3416C18.419 20.7635 17.8467 21.0006 17.25 21.0006H6.75C6.15326 21.0006 5.58097 20.7635 5.15901 20.3416C4.73705 19.9196 4.5 19.3473 4.5 18.7506V4.50056C4.5 4.30165 4.57902 4.11089 4.71967 3.97023C4.86032 3.82958 5.05109 3.75056 5.25 3.75056Z" stroke="#005CE8" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M7.5 2.25056V5.25056" stroke="#005CE8" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12 2.25056V5.25056" stroke="#005CE8" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M16.5 2.25056V5.25056" stroke="#005CE8" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
    }

    div.classList.add("notificationLIstBox");
    div.innerHTML = `<div><div class="notIcon" >${icon}</div><p>${notification.content}</p></div>
<div class="notificationTime"><p>${notification.created_at}</p></div>`;

    notificationList.appendChild(div);
  });
}

