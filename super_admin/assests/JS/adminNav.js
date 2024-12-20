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
        <img src="../Department/assests/img/green_logo.svg" alt="" />
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
    console.log(data);

    setNotifications(data);

  }catch (error) {
    console.error("Error fetching notifications:", error);
  }
}


function setNotifications(data) {
  console.log(data.notifications);

  const notificationList = document.getElementById("notificationList");
  notificationList.innerHTML = "";

  data.notifications.forEach((notification) => {
    let icon;
    if(notification.notif_type == 0){
     icon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M12 24C14.3734 24 16.6935 23.2962 18.6668 21.9776C20.6402 20.6591 22.1783 18.7849 23.0865 16.5922C23.9948 14.3995 24.2324 11.9867 23.7694 9.65892C23.3064 7.33115 22.1635 5.19295 20.4853 3.51472C18.807 1.83649 16.6689 0.693605 14.3411 0.230582C12.0133 -0.232441 9.60051 0.00519943 7.4078 0.913451C5.21508 1.8217 3.34094 3.35977 2.02236 5.33316C0.703788 7.30655 0 9.62663 0 12C0.00344108 15.1815 1.26883 18.2318 3.51852 20.4815C5.76821 22.7312 8.81846 23.9966 12 24ZM12 5C12.2967 5 12.5867 5.08798 12.8334 5.2528C13.08 5.41762 13.2723 5.65189 13.3858 5.92598C13.4993 6.20007 13.5291 6.50167 13.4712 6.79264C13.4133 7.08361 13.2704 7.35088 13.0607 7.56066C12.8509 7.77044 12.5836 7.9133 12.2926 7.97118C12.0017 8.02906 11.7001 7.99935 11.426 7.88582C11.1519 7.77229 10.9176 7.58003 10.7528 7.33336C10.588 7.08669 10.5 6.79668 10.5 6.5C10.5 6.10218 10.658 5.72065 10.9393 5.43934C11.2206 5.15804 11.6022 5 12 5ZM11 10H12C12.5304 10 13.0391 10.2107 13.4142 10.5858C13.7893 10.9609 14 11.4696 14 12V18C14 18.2652 13.8946 18.5196 13.7071 18.7071C13.5196 18.8946 13.2652 19 13 19C12.7348 19 12.4804 18.8946 12.2929 18.7071C12.1054 18.5196 12 18.2652 12 18V12H11C10.7348 12 10.4804 11.8946 10.2929 11.7071C10.1054 11.5196 10 11.2652 10 11C10 10.7348 10.1054 10.4804 10.2929 10.2929C10.4804 10.1054 10.7348 10 11 10Z" fill="#898300"/>
</svg>`;
    }else if(notification.notif_type == 1){
      icon = `<p>new</p>`
       
    }
    const div = document.createElement("div");
    div.classList.add("notificationLIstBox");
    div.innerHTML = `<div><div class="notIcon" >${icon}</div><p>${notification.content}</p></div>
<div class="notificationTime"><p>${notification.created_at}</p></div>`;

    notificationList.appendChild(div);
  });
}

