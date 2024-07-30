document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".page").forEach(function (page) {
    if (page.id !== "network") {
      page.style.display = "none";
    }
  });
  showPage("network");
  document.querySelector(`.sidebar a[href="#network"]`).classList.add('selected');  
});

document.querySelectorAll('.toggle-switch').forEach(function (toggleSwitch) {
  toggleSwitch.querySelector('label').addEventListener('click', function () {
    const toggleSwitchInput = toggleSwitch.querySelector('input[type="checkbox"]');
    toggleSwitchInput.checked = !toggleSwitchInput.checked; // toggle the switch
    console.log('Toggle switch clicked!');
    document.body.classList.toggle("dark-mode");
  });
});

document.querySelector(".sidebar").addEventListener("click", function (event) {
  if (event.target.tagName === 'A') {
    event.preventDefault();
    var pageId = event.target.getAttribute("href").substring(1);
    hideAllPages();
    showPage(pageId);
  }
});


document.querySelector(".connection-type").addEventListener("change", function (event) {
  var staticOption = event.target.querySelector('option[value="Static"]');
  if (staticOption.selected) {
    enableInputFields();
    connectionType = 'Static';
    alert('Static Network');
  } else {
    disableInputFields();
    connectionType = 'Dhcp';
    alert('DHCP Network');
  }
});

// Get the sidebar icon and sidebar elements
document.addEventListener('DOMContentLoaded', () => {
  const sidebarIcon = document.getElementById('sidebar-icon');
  const sidebar = document.getElementById('sidebar');

  if (sidebar === null) {
    console.error('Sidebar element not found!');
  } else {
    sidebarIcon.addEventListener('click', () => {
      sidebar.classList.toggle('active');
      sidebarIcon.classList.toggle('active-icon'); // Add this line
    });
  }
});

document.getElementById('logout-link').addEventListener('click', function (e) {
  e.preventDefault();
  // Clear the session storage or cookies used for authentication
  sessionStorage.clear();
  // Redirect to the login page or any other desired page
  window.location.href = '/';
});

const links = document.querySelectorAll('.link');

links.forEach((link) => {
  link.addEventListener('click', (e) => {
    links.forEach((l) => l.classList.remove('selected'));
    link.classList.add('selected');
  });
});



const wirelessModeSelect = document.body.querySelector('.wireless-mode');
const manualInputContainer = document.body.querySelector('.manual-input-container');
const wifiBoxContainer = document.body.querySelector('.wifi-box-container');
const refreshButton = document.body.querySelector('.scan-button');

wirelessModeSelect.addEventListener('change', () => {
  console.log('Wireless mode select changed!');
  if (wirelessModeSelect.value === 'scan') {
    if (wifiBoxContainer) {
      wifiBoxContainer.style.display = 'block';
    }
    if (refreshButton) {
      refreshButton.style.display = 'inline-block';
    }
    if (manualInputContainer) {
      manualInputContainer.style.display = 'none';
    }

    wifiBoxes.forEach((wifiBox) => {
      wifiBox.style.display = 'block';
    });
  } else if (wirelessModeSelect.value === 'manual') {
    if (wifiBoxContainer) {
      wifiBoxContainer.style.display = 'none';
    }
    if (refreshButton) {
      refreshButton.style.display = 'none';
    }
    if (manualInputContainer) {
      manualInputContainer.style.display = 'block';
    }
    // Hide each wifiBox element individually
    wifiBoxes.forEach((wifiBox) => {
      wifiBox.style.display = 'none';
    });
  }
});


var socket = new WebSocket('ws://' + window.location.hostname + ':' + window.location.port + '/ws');

socket.onmessage = function (event) {
  if (event.data.startsWith('{') && event.data.endsWith('}')) { // Check if the data is a JSON string
    const data = JSON.parse(event.data);
    // Update the HTML elements with the received data
    if (document.getElementById('wifiname')) {
      document.getElementById('wifiname').innerHTML = data.wifiname;
    }
    if (document.getElementById('wifi-mac')) {
      document.getElementById('wifi-mac').innerHTML = data.wifiMac;
    }
    if (document.getElementById('device-mac')) {
      document.getElementById('device-mac').innerHTML = data.deviceMac;
    }
    if (document.getElementById('ip-status')) {
      document.getElementById('ip-status').innerHTML = data.ipStatus;
    }
    if (document.getElementById('wifi-connection-status')) {
      document.getElementById('wifi-connection-status').innerHTML = data.wifiConnectionStatus;
    }
    if (document.getElementById('wifi-internet-status')) {
      document.getElementById('wifi-internet-status').innerHTML = data.wifiInternetStatus;
    }
    if (document.getElementById('firmware-version')) {
      document.getElementById('firmware-version').innerHTML = data.firmwareVersion;
    }
    if (document.getElementById('file-system-version')) {
      document.getElementById('file-system-version').innerHTML = data.fileSystemVersion;
    }
    if (document.getElementById('connection-type')) {
      document.getElementById('wifi-internet-type').innerHTML = data.connectionType;

    } if (document.getElementById('device')) {
      document.getElementById('device').innerHTML = data.device;
    }
    if (data.UPLOAD_RESPONSE) {
      document.getElementById("message-container").style.display = "block";
      document.getElementById("message").textContent = data.UPLOAD_RESPONSE;
    } if (data.wifi) {
      createWifiBoxes(data.wifi);
    }
  } else {
    // document.getElementById('webody').innerHTML += event.data;
  }
};


document.querySelector('.save-button').addEventListener('click', () => {
  // Get the IP input values
  const ipAddressInput = document.querySelector('.ip-address');
  const subnetMaskInput = document.querySelector('.subnet-mask');
  const gatewayInput = document.querySelector('.gateway');
  const primaryDnsInput = document.querySelector('.primary-dns');
  const secondaryDnsInput = document.querySelector('.secondary-dns');
  const connectionTypeSelect = document.querySelector('.connection-type');

  const ipAddress = ipAddressInput.value.trim() || ipAddressInput.placeholder;
  const subnetMask = subnetMaskInput.value.trim() || subnetMaskInput.placeholder;
  const gateway = gatewayInput.value.trim() || gatewayInput.placeholder;
  const primaryDns = primaryDnsInput.value.trim() || primaryDnsInput.placeholder;
  const secondaryDns = secondaryDnsInput.value.trim() || secondaryDnsInput.placeholder;
  const connectionType = connectionTypeSelect.value;

  // Create a JSON object to send to the server
  const data = {
    command: "ip_settings",
    connectionType,
    ipAddress,
    subnetMask,
    gateway,
    primaryDns,
    secondaryDns
  };
  alert('IP Settings Saved');
  socket.send(JSON.stringify(data));
});


let wifiBoxes = []; // Define the wifiBoxes array

function createWifiBoxes(ssidJson) {
  const wifiBoxContainer = document.getElementById('wifi-box-container');
  let ssidList;

  if (typeof ssidJson === 'string') {
    // If ssidJson is a single string, wrap it in an array
    ssidList = [ssidJson];
  } else if (Array.isArray(ssidJson)) {
    // If ssidJson is already an array, use it as is
    ssidList = ssidJson;
  } else {
    console.error('Invalid ssidJson parameter');
    return;
  }


  ssidList.forEach((ssid) => {
    const wifiBoxHtml = `
      <div class="wifi-box">
        <div class="wifi-name">${ssid}</div>
        <div class="connect-options">
          <div class="input_pass">
            <input type="password" id="password-${ssid}" class="passinp" placeholder="Enter Password" required/>
            <button class="reveal-password" id="reveal-${ssid}" onclick="togglePasswordVisibility('password-${ssid}')"><img src="eyeopen.png" alt="Eye icon" width="18" height="14"></button>
          </div>
          <button class="save-scan" onClick="connectWifi('${ssid}',document.getElementById('password-${ssid}').value)">Save</button>
        </div>
      </div>
    `;

    const parser = new DOMParser();
    const doc = parser.parseFromString(wifiBoxHtml, 'text/html');
    const wifiBoxElement = doc.body.firstElementChild;
    wifiBoxContainer.appendChild(wifiBoxElement);

    const wifiBox = wifiBoxElement;
    wifiBoxes.push(wifiBox); // Add wifiBox to the wifiBoxes array

    wifiBox.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent event from bubbling up
      if (event.target === wifiBox) { // Check if click was on.wifi-box element itself
        console.log('Clicked on wifi box:', wifiBox);
        wifiBoxes.forEach(box => box.classList.remove('active')); // Remove active class from all wifiBoxes
        wifiBox.classList.add('active');
        // Show the password input box and button
        const connectOptions = wifiBox.querySelector('.connect-options');
        if (connectOptions) {
          connectOptions.style.display = 'block';
        } else {
          console.error('Could not find.connect-options element');
        }
      }
    });

    // Add event listener to document to detect clicks outside of wifiBox
    document.addEventListener('click', (event) => {
      if (!wifiBox.contains(event.target)) { // Check if click was outside of wifiBox
        console.log('Clicked outside of wifi box:', wifiBox);
        const connectOptions = wifiBox.querySelector('.connect-options');
        if (connectOptions) {
          connectOptions.style.display = 'none';
        }
        wifiBox.classList.remove('active');
      }
    });
  });
}



const componentRadios = document.querySelectorAll('input[name="component"]');
const firmwareForm = document.getElementById('firmware-form');
const filesystemForm = document.getElementById('filesystem-form');
const componentValueInput = document.querySelector('input[name="componentValue"]');
const fileInput = document.querySelector('input[name="file"]');

componentRadios.forEach((radio) => {
  radio.addEventListener('change', () => {
    if (radio.value === 'firmware') {
        gettype('firmware');
      firmwareForm.style.display = 'block';
      filesystemForm.style.display = 'none';
      componentValueInput.value = 'firmware';
    } else if (radio.value === 'filesystem') {
        gettype('filesystem');
      firmwareForm.style.display = 'none';
      filesystemForm.style.display = 'block';
      componentValueInput.value = 'filesystem';
    }
  });
});

document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const componentValue = formData.get('componentValue');
  const file = fileInput.files[0];

  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/upload', true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      console.log('File uploaded successfully');
    } else {
      console.log('File upload failed');
    }
  };
  xhr.send(formData);
});

function scanWiFi() {
  const wifiBoxContainer = document.getElementById('wifi-box-container');
  wifiBoxContainer.innerHTML = '';
  const data = {
    command: 'scan',
  };

  socket.send(JSON.stringify(data));
}

function gettype(type) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/type?type=' + encodeURIComponent(type), true);
  xhr.onload = function () {
      if (xhr.status === 200) {
          console.log(xhr.responseText);
          alert(encodeURIComponent(type));
      } else {
          console.error('Error: ' + xhr.statusText);
      }
  };
  xhr.onerror = function () {
      console.error('Error: Network error');
  };
  xhr.send();
}


function togglePasswordVisibility(passwordId) {
  var passwordInput = document.getElementById(passwordId);
  const revealButton = document.querySelector('.rev-password');
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    document.getElementById("reveal-" + passwordId).textContent = "Hide Password";
    // revealButton.innerHTML = '<img src="eyeclosed.png" alt="Hide Password" width="20" height="20">';
  } else {
    passwordInput.type = "password";
    document.getElementById("reveal-" + passwordId).textContent = "Show Password";
  }
}

function enableInputFields() {
  document.querySelector(".ip-address").disabled = false;
  document.querySelector(".subnet-mask").disabled = false;
  document.querySelector(".gateway").disabled = false;
  document.querySelector(".primary-dns").disabled = false;
  document.querySelector(".secondary-dns").disabled = false;
  // document.querySelector(".save-button").disabled = false;
}


function disableInputFields() {
  document.querySelector(".ip-address").disabled = true;
  document.querySelector(".subnet-mask").disabled = true;
  document.querySelector(".gateway").disabled = true;
  document.querySelector(".primary-dns").disabled = true;
  document.querySelector(".secondary-dns").disabled = true;
  // document.querySelector(".save-button").disabled = false;
}

disableInputFields();

function hideAllPages() {
  var pages = document.getElementsByClassName("page");
  for (var i = 0; i < pages.length; i++) {
    pages[i].style.display = "none";
  }
}


function showPage(pageId) {
  document.querySelector("." + pageId).style.display = "block";
  // document.querySelector("." + pageId + "-link").classList.add("selected");
  for (var i = 0; i < document.links.length; i++) {
    if (document.links[i].getAttribute("href") != "#" + pageId) {
      document.links[i].classList.remove("selected");
    }
  }
}

function connectWifi(ssid, password) {
  const data = {
    command: 'connect',
    ssid: ssid,
    password: password
  };
  alert('Wifi Details Saved');
  socket.send(JSON.stringify(data));
}

function rebootDevice() {
  const data = {
    command: 'reboot',
  };
  alert('Device going to Reboot ..');

  socket.send(JSON.stringify(data));
}


function resetDevice() {
  const data = {
    command: 'reset',
  };
  alert('Reseting....');
  socket.send(JSON.stringify(data));
}










// Load the default page