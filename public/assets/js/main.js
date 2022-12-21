(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach(e => e.addEventListener(type, listener))
    } else {
      select(el, all).addEventListener(type, listener)
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Sidebar toggle
   */
  if (select('.toggle-sidebar-btn')) {
    on('click', '.toggle-sidebar-btn', function (e) {
      select('body').classList.toggle('toggle-sidebar')
    })
  }

  /**
   * Search bar toggle
   */
  if (select('.search-bar-toggle')) {
    on('click', '.search-bar-toggle', function (e) {
      select('.search-bar').classList.toggle('search-bar-show')
    })
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Initiate tooltips
   */
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  });

  /**
   * Initiate Bootstrap validation check
   */
  var needsValidation = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(needsValidation)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })

  /**
   * Initiate Datatables
   */
  const datatables = select('.datatable', true)
  datatables.forEach(datatable => {
    new simpleDatatables.DataTable(datatable);
  })

  /**
   * Autoresize echart charts
   */
  const mainContainer = select('#main');
  if (mainContainer) {
    setTimeout(() => {
      new ResizeObserver(function () {
        select('.echart', true).forEach(getEchart => {
          echarts.getInstanceByDom(getEchart).resize();
        })
      }).observe(mainContainer);
    }, 200);
  }

})();

let pagetTitle = document.getElementById('page-title');

let sectionDashboard = document.getElementById('section-dashboard');
let sectionSaccoMgt = document.getElementById('section-sacco');
let sectionFleetMgt = document.getElementById('section-fleet');
let sectionProfile = document.getElementById('section-profile');

let navDashboard = document.getElementById('nav-dashboard');
let navSaccoMgt = document.getElementById('nav-sacco-mgt');
let navFleetMgt = document.getElementById('nav-fleet-mgt');

let allNavLinks = document.querySelectorAll('.nav-link');
let allSections = document.querySelectorAll('.section');
let allBreadcrumbItems = document.querySelectorAll('.breadcrumb-item');
let allModals = document.querySelectorAll('.modal');

let breadcrumbItem1 = document.getElementById('breadcrumb-item-1');
let breadcrumbItem2 = document.getElementById('breadcrumb-item-2');
let breadcrumbItem3 = document.getElementById('breadcrumb-item-3');

let cardSacco = document.getElementById('card-sacco');
let cardOfficial = document.getElementById('card-sacco-official');
let cardStation = document.getElementById('card-sacco-station');
let cardVehiclesInSacco = document.getElementById('card-vehicles-in-sacco');
let cardAddVehicleToSacco = document.getElementById('card-add-vehicles-to-sacco');
let cardOperator = document.getElementById('card-add-operator');

let menuSaccoMgt = document.getElementById('menu-sacco-mgt');
let contentSaccoMgt = document.getElementById('content-sacco-mgt');
let menuFleetMgt = document.getElementById('menu-fleet-mgt');
let contentFleetMgt = document.getElementById('content-fleet-mgt');

let dropdownProfile = document.getElementById('dropdown-profile');
let dropdownAccountSettings = document.getElementById('dropdown-account-settings');
let dropdownHelp = document.getElementById('dropdown-help');
let dropdownSignout = document.getElementById('dropdown-signout');

let contentSaccoDiv = document.getElementById('sacco-content-div');
let saccoDiv = document.getElementById('sacco-div');
let contentOfficialDiv = document.getElementById('official-content-div');
let officialDiv = document.getElementById('official-div');
let contentStationDiv = document.getElementById('station-content-div');
let stationDiv = document.getElementById('station-div');

let loginBtn = document.getElementById('login-btn');
let phoneInput = document.getElementById('phone-input');
let pwdInput = document.getElementById('pwd-input');

let loginPage = document.getElementById('login-page');
let adminDashboard = document.getElementById('admin-dashboard');

let saccoNameInput = document.getElementById('sacco-name-input');
let saccoAddressInput = document.getElementById('sacco-address-input');
let saccoPinInput = document.getElementById('sacco-pin-input');
let saccoContactPersonInput = document.getElementById('sacco-contact-person-input');
let saccoContactPersonNumberInput = document.getElementById('sacco-contact-number-input');
let saccoPostalAddressInput = document.getElementById('sacco-postal-address-input');
let saccoTaglineInput = document.getElementById('sacco-tagline-input');
let saccoCodeInput = document.getElementById('sacco-code-input');
let saccoRegionInput = document.getElementById('sacco-region-input');
let saccoPrimaryTerminusInput = document.getElementById('sacco-pri-terminus-input');
let saccoSecondaryTerminusInput = document.getElementById('sacco-sec-terminus-input');
let saccoMaxFareInput = document.getElementById('sacco-max-fare-input');
let saccoPlatformFeeInput = document.getElementById('sacco-platform-fee-input');

let createSaccoBtn = document.getElementById('create-sacco-btn');
let formAddSacco = document.getElementById('form-add-sacco');
let formAddOfficial = document.getElementById('form-add-official');

let preloader = document.querySelector('.main-loading');
let loadingSpan = document.getElementById('loading-span');
let toastBody = document.getElementById('toast-body');
let alertDiv = document.getElementById('alert-div');

let officialSaccoIdInput = document.getElementById('official-sacco-id-input');
let officialSaccoMsidnInput = document.getElementById('official-sacco-msidn-input');
let officialSaccoDesignationInput = document.getElementById('official-sacco-designation-input');
let officialSaccoStationIdInput = document.getElementById('official-sacco-station-id-input');
let createOfficialBtn = document.getElementById('create-official-btn');

let modalAddOfficial = document.getElementById('modal-add-official');
let mainSearchInput = document.getElementById('main-search-input');
let mainSearchBtn = document.getElementById('main-search-btn');

let saccoTbody = document.getElementById('sacco-tbody');

let baseURL = 'http://localhost:9000';

let contextFlag = 'dashboard';

window.onload = () => {
  setTimeout(() => {
    hideLoader();
    preloader.classList.remove('opacity-1');
  }, 1000);

  navClick(navDashboard);
}

mainSearchBtn.addEventListener('click', () => {
  let searchTerm = mainSearchInput.value.trim();

  if (searchTerm != '') {
    switch (contextFlag) {
      case 'dashboard':
        break;
      case 'sacco':
        searchSacco(searchTerm, 0);
        break;
      case 'fleet':
        break;
      default:
        break;
    }
  }
});

createOfficialBtn.addEventListener('click', () => {
  let officialSaccoId = officialSaccoIdInput.value.trim();
  let officialSaccoMsidn = officialSaccoMsidnInput.value.trim();
  let officialSaccoDesignation = officialSaccoDesignationInput.value.trim();
  let officialSaccoStationId = officialSaccoStationIdInput.value.trim();

  if (officialSaccoId != '' && officialSaccoMsidn != '' && officialSaccoDesignation != '') {
    createOfficial(officialSaccoId, officialSaccoMsidn, officialSaccoDesignation, officialSaccoStationId);
  }
});

loginBtn.addEventListener('click', () => {
  let phoneNum = phoneInput.value.trim();
  let pwd = pwdInput.value.trim();

  if (phoneNum != '' && pwd != '') {
    loginWithPhoneAndPwd(phoneNum, pwd);
  }
});

createSaccoBtn.addEventListener('click', () => {
  let saccoName = saccoNameInput.value.trim();
  let saccoAddress = saccoAddressInput.value.trim();
  let saccoPin = saccoPinInput.value.trim();
  let saccoContactPerson = saccoContactPersonInput.value.trim();
  let saccoContactPersonNumber = saccoContactPersonNumberInput.value.trim();
  let saccoPostalAddress = saccoPostalAddressInput.value.trim();
  let saccoTagline = saccoTaglineInput.value.trim();
  let saccoCode = saccoCodeInput.value.trim();
  let saccoRegion = saccoRegionInput.value.trim();
  let saccoPrimaryTerminus = saccoPrimaryTerminusInput.value.trim();
  let saccoSecondaryTerminus = saccoSecondaryTerminusInput.value.trim();
  let saccoMaxFare = saccoMaxFareInput.value.trim();
  let saccoPlatformFee = saccoPlatformFeeInput.value.trim();

  if (saccoName != '' && saccoAddress != '' && saccoPin != '' && saccoContactPerson != '' &&
    saccoContactPersonNumber != '' && saccoPostalAddress != '' && saccoTagline != '' && saccoCode != '' &&
    saccoRegion != '' && saccoPrimaryTerminus != '' && saccoSecondaryTerminus != '' && saccoMaxFare != '' && saccoPlatformFee != '') {
    createNewSacco(saccoName, saccoAddress, saccoPin, saccoContactPerson, saccoContactPersonNumber, saccoPostalAddress,
      saccoTagline, saccoCode, saccoRegion, saccoPrimaryTerminus, saccoSecondaryTerminus, saccoMaxFare, saccoPlatformFee);
  }
});

/* SIDE MENU */

navDashboard.addEventListener('click', () => {
  contextFlag = 'dashboard';

  navClick(navDashboard);
  displaySection(sectionDashboard);

  breadcrumbItem2.classList.add('active');

  breadcrumbItem3.classList.add('d-none');
  breadcrumbItem3.classList.remove('active');
});

navSaccoMgt.addEventListener('click', () => {
  contextFlag = 'sacco';

  navClick(navSaccoMgt);
  displaySection(sectionSaccoMgt);

  menuSaccoMgt.classList.remove('d-none');
  contentSaccoMgt.classList.add('d-none');

  breadcrumbItem2.classList.add('active');

  breadcrumbItem3.classList.add('d-none');
  breadcrumbItem3.classList.remove('active');
});

navFleetMgt.addEventListener('click', () => {
  contextFlag = 'fleet';

  navClick(navFleetMgt);
  displaySection(sectionFleetMgt);

  menuFleetMgt.classList.remove('d-none');
  contentFleetMgt.classList.add('d-none');

  breadcrumbItem2.classList.add('active');

  breadcrumbItem3.classList.add('d-none');
  breadcrumbItem3.classList.remove('active');
});

/* END SIDE MENU */


/* SACCO MENU */

cardSacco.addEventListener('click', () => {
  saccoMenuClick('Sacco');

  contentSaccoDiv.classList.remove('d-none');
  contentOfficialDiv.classList.add('d-none');
  contentStationDiv.classList.add('d-none');
});

cardOfficial.addEventListener('click', () => {
  saccoMenuClick('Official');

  contentSaccoDiv.classList.add('d-none');
  contentOfficialDiv.classList.remove('d-none');
  contentStationDiv.classList.add('d-none');
});

cardStation.addEventListener('click', () => {
  saccoMenuClick('Station');

  contentSaccoDiv.classList.add('d-none');
  contentOfficialDiv.classList.add('d-none');
  contentStationDiv.classList.remove('d-none');
});

/* END SACCO MENU */

/* FLEET MENU */

// cardVehiclesInSacco.addEventListener('click', () => {
//   fleetMenuClick('Get vehicles');
// });

// cardAddVehicleToSacco.addEventListener('click', () => {
//   fleetMenuClick('Add vehicle');
// });

// cardOperator.addEventListener('click', () => {
//   fleetMenuClick('Add operator');
// });

/* END FLEET MENU */


/* PROFILE DROPDOWN */
dropdownProfile.addEventListener('click', () => {
  displaySection(sectionProfile);
});

dropdownAccountSettings.addEventListener('click', () => {
  displaySection(sectionProfile);
});

dropdownHelp.addEventListener('click', () => {
  displaySection(sectionProfile);
});

dropdownSignout.addEventListener('click', () => {
  signOutFunc();
});

/* END PROFILE DROPDOWN */

function displayAlert(msg) {
  toastBody.innerHTML = msg;

  let toast = new bootstrap.Toast(alertDiv)

  toast.show()
}

function displayLoader(text = null) {
  if (text) {
    loadingSpan.innerHTML = text;
  }

  preloader.classList.add('active');
}

function hideLoader() {
  preloader.classList.remove('active');
}

function refreshFunc() {
  let controller = new AbortController();
  let storedLocalToken = localStorage.getItem('tkn');

  if (storedLocalToken != null) {
    // token not null, undefined or empty
    let verifyLocalTokenPromise = fetch(baseURL + '/check_session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + storedLocalToken
      },
      signal: controller.signal,
      body: JSON.stringify({
        token: storedLocalToken.trim()
      })
    });

    let timeOutPr = timeOut(controller);

    //  race(verifyTokenPromise, timeOutPr)
    race(verifyLocalTokenPromise, timeOutPr).then(async result => {
      if (result.status == 200 || result.status == 304) {
        // user's local session valid
        let response = await result.text();
        console.log(response);

        if (response == 'Valid') {
          loginPage.classList.add('d-none');
          adminDashboard.classList.remove('d-none');
        } else {
          // session invalid
          signOutFunc();
        }

      } else {
        signOutFunc();
      }
    }).catch(error => {
      // DOMException: The user aborted a request
      console.log(error);
    });
  } else {
    signOutFunc();
  }
}

function timeOut(contr) {
  // 15s timeout
  let timeoutPromise = new Promise((resolve, reject) => {
    let timeout = setTimeout(() => {
      clearTimeout(timeout);
      contr.abort();
      resolve(555);
    }, 15000);
  });

  return timeoutPromise;
}

function race(fetchPromise, timeoutPromise) {
  let racePromise = Promise.race([fetchPromise, timeoutPromise]);

  return racePromise;
}

function createSaccoTableRowEl(saccoData, index = 0) {
  while (saccoTbody.firstChild) {
    saccoTbody.removeChild(saccoTbody.firstChild);
  }

  let saccoTableRow = document.createElement('tr');
  saccoTableRow.setAttribute('id', saccoData.saccoId);
  saccoTableRow.setAttribute('class', 'pointer');

  let deactivateTxt = saccoData.isActive == true ? 'Deactivate' : 'Activate';
  let status = saccoData.isActive == true ? false : true;

  let saccoEl = `<th>${index + 1}</th>
                            <td>${saccoData.name}</td>
                            <td>${saccoData.address.toLowerCase()}</td>
                            <td>${saccoData.contactPerson}</td>
                            <td>${saccoData.saccoId}</td>
                            <td>
                              <div class="filter position-relative top-0">
                                <a class="icon p-0" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                  <li id="edit-${saccoData.saccoId}" class="events-none"><span class="dropdown-item"><i class="bi bi-pencil-square me-1 align-middle"></i> Edit</span></li>
                                  <li id="deactivate-${saccoData.saccoId}" data-status="${status}" class="events-none"><span class="dropdown-item"><i class="bi bi-lightbulb-off me-1 align-middle"></i> <span id="sacco-status-span">${deactivateTxt}</span></span></li>
                                  <li id="view-${saccoData.saccoId}" class="events-none"><span class="dropdown-item"><i class="bi bi-eye-fill me-1 align-middle"></i> View</span></li>
                                </ul>
                              </div>
                            </td>`;

  saccoTableRow.innerHTML = saccoEl;
  saccoTbody.appendChild(saccoTableRow);

  document.querySelector(`#edit-${saccoData.saccoId}`).addEventListener('click', ev => {
    let saccoId = (ev.target.id).split('-')[1];

    searchSacco(saccoId, 1);
  });

  document.querySelector(`#deactivate-${saccoData.saccoId}`).addEventListener('click', ev => {
    let saccoId = (ev.target.id).split('-')[1];
    let saccoStatus = ev.target.dataset.status;

    updateSaccoStatus(saccoId, saccoStatus);
  });

  document.querySelector(`#view-${saccoData.saccoId}`).addEventListener('click', ev => {
    let saccoId = (ev.target.id).split('-')[1];

    searchSacco(saccoId, 1);
  });
}

// search sacco
function searchSacco(sacco_id, flag = 0) {
  displayLoader('Searching...');

  let controller = new AbortController();

  let saccoPromise = fetch(baseURL + '/sacco/' + sacco_id, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('tkn'),
      'Content-Type': 'application/json',
      'X-Data-Flag': flag.toString()
    },
    signal: controller.signal
  });

  let timeOutPr = timeOut(controller);

  race(saccoPromise, timeOutPr).then(async result => {
    console.log(result.status);

    let saccoData = await result.json();

    if (result.status == 200 || result.status == 201 || result.status == 304) {
      console.log(saccoData);

      if (flag == 0) {
        createSaccoTableRowEl(saccoData);
      } else {
        // TODO:
      }

    } else if (result.status == 403 || result.status == 401) {
      signOutFunc();

      displayAlert('Please login.');
    } else {
      displayAlert('Try and refresh your browser!');
    }
  }).catch(error => {
    console.log(error);
    displayAlert(error);
  }).finally(() => {
    hideLoader();
  });
}

// update sacco status
function updateSaccoStatus(sacco_id, status) {
  displayLoader('Updating...');

  let controller = new AbortController();

  let saccoPromise = fetch(baseURL + '/sacco/status', {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('tkn'),
      'Content-Type': 'application/json'
    },
    signal: controller.signal,
    body: JSON.stringify({
      id: sacco_id,
      activate: status
    })
  });

  let timeOutPr = timeOut(controller);

  race(saccoPromise, timeOutPr).then(async result => {
    console.log(result.status);

    let saccoData = await result.json();
    console.log(saccoData);

    if (result.status == 200 || result.status == 201 || result.status == 304) {
      displayAlert((status == 'true' ? 'Sacco activated' : 'Sacco deactivated'));

      document.querySelector(`#deactivate-${sacco_id}`).setAttribute('data-status', (status == 'true' ? false : true));
      document.querySelector(`#sacco-status-span`).innerHTML = (status == 'true' ? 'Deactivate' : 'Activate');
    } else if (result.status == 403 || result.status == 401) {
      signOutFunc();

      displayAlert('Please login.');
    } else {
      displayAlert('Try and refresh your browser!');
    }
  }).catch(error => {
    console.log(error);
    displayAlert(error);
  }).finally(() => {
    hideLoader();
  });
}

// update sacco details
function updateSaccoDetails(data) {
  displayLoader('Updating...');

  let controller = new AbortController();

  let saccoPromise = fetch(baseURL + '/sacco', {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('tkn'),
      'Content-Type': 'application/json'
    },
    signal: controller.signal,
    body: JSON.stringify({
      saccoId: data.saccoId,
      pin: data.pin,
      senderId: data.senderId,
      name: data.name,
      address: data.address,
      contactPerson: data.contactPerson,
      contactNumber: data.contactNumber,
      postalAddress: data.postalAddress,
      tagline: data.tagline
    })
  });

  let timeOutPr = timeOut(controller);

  race(saccoPromise, timeOutPr).then(async result => {
    console.log(result.status);

    let saccoData = await result.json();

    if (result.status == 200 || result.status == 201 || result.status == 304) {
      console.log(saccoData);
    } else if (result.status == 403 || result.status == 401) {
      signOutFunc();

      displayAlert('Please login.');
    } else {
      displayAlert('Try and refresh your browser!');
    }
  }).catch(error => {
    console.log(error);
    displayAlert(error);
  }).finally(() => {
    hideLoader();
  });
}

// add vehicle to sacco
function addVehicleToSacco(data) {
  displayLoader('Updating...');

  let controller = new AbortController();

  let vehiclePromise = fetch(baseURL + '/vehicle', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('tkn'),
      'Content-Type': 'application/json'
    },
    signal: controller.signal,
    body: JSON.stringify({
      plateNumber: data.plateNumber,
      saccoId: data.saccoId,
      seatingCapacity: data.seatingCapacity,
      fleetNumber: data.fleetNumber
    })
  });

  let timeOutPr = timeOut(controller);

  race(vehiclePromise, timeOutPr).then(async result => {
    console.log(result.status);

    let vehicleData = await result.json();

    if (result.status == 200 || result.status == 201 || result.status == 304) {
      console.log(vehicleData);
    } else if (result.status == 403 || result.status == 401) {
      signOutFunc();

      displayAlert('Please login.');
    } else {
      displayAlert('Try and refresh your browser!');
    }
  }).catch(error => {
    console.log(error);
    displayAlert(error);
  }).finally(() => {
    hideLoader();
  });
}

// update vehicle to sacco
function updateVehicleToSacco(data) {
  displayLoader('Updating...');

  let controller = new AbortController();

  let updateVehiclePromise = fetch(baseURL + '/vehicle', {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('tkn'),
      'Content-Type': 'application/json'
    },
    signal: controller.signal,
    body: JSON.stringify({
      vehicleId: data.vehicleId,
      plateNumber: data.plateNumber,
      fleetNumber: data.fleetNumber,
      saccoId: data.saccoId,
      routeId: data.routeId,
      seatingCapacity: data.seatingCapacity
    })
  });

  let timeOutPr = timeOut(controller);

  race(updateVehiclePromise, timeOutPr).then(async result => {
    console.log(result.status);

    let vehicleData = await result.json();

    if (result.status == 200 || result.status == 201 || result.status == 304) {
      console.log(vehicleData);
    } else if (result.status == 403 || result.status == 401) {
      signOutFunc();

      displayAlert('Please login.');
    } else {
      displayAlert('Try and refresh your browser!');
    }
  }).catch(error => {
    console.log(error);
    displayAlert(error);
  }).finally(() => {
    hideLoader();
  });
}

// get all vehicles in a sacco
function getVehiclesInSacco(data) {
  displayLoader('Retrieving...');

  let controller = new AbortController();

  let saccoVehiclesPromise = fetch(baseURL + '/vehicle', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('tkn'),
      'Content-Type': 'application/json'
    },
    signal: controller.signal
  });

  let timeOutPr = timeOut(controller);

  race(saccoVehiclesPromise, timeOutPr).then(async result => {
    console.log(result.status);

    let vehiclesData = await result.json();

    if (result.status == 200 || result.status == 201 || result.status == 304) {
      console.log(vehiclesData);
    } else if (result.status == 403 || result.status == 401) {
      signOutFunc();

      displayAlert('Please login.');
    } else {
      displayAlert('Try and refresh your browser!');
    }
  }).catch(error => {
    console.log(error);
    displayAlert(error);
  }).finally(() => {
    hideLoader();
  });
}

// sign in with uname/pwd
function createNewSacco(saccoName, saccoAddress, saccoPin, saccoContactPerson, saccoContactPersonNumber, saccoPostalAddress,
  saccoTagline, saccoCode, saccoRegion, saccoPrimaryTerminus, saccoSecondaryTerminus, saccoMaxFare, saccoPlatformFee) {
  displayLoader('Processing...');

  let controller = new AbortController();

  let data = {
    pin: saccoPin,
    name: saccoName,
    senderId: "123",
    address: saccoAddress,
    contactPerson: saccoContactPerson,
    contactNumber: saccoContactPersonNumber,
    postalAddress: saccoPostalAddress,
    tagline: saccoTagline,
    code: saccoCode,
    region: saccoRegion,
    primaryTerminus: saccoPrimaryTerminus,
    secondaryTerminus: saccoSecondaryTerminus,
    maximumFare: saccoMaxFare,
    platformFee: saccoPlatformFee
  }

  let newSaccoPromise = fetch(baseURL + '/sacco', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('tkn'),
      'Content-Type': 'application/json'
    },
    signal: controller.signal,
    body: JSON.stringify(data)
  });

  console.log(data)

  let timeOutPr = timeOut(controller);

  race(newSaccoPromise, timeOutPr).then(async result => {
    console.log(result.status);

    if (result.status == 200 || result.status == 201 || result.status == 304) {
      // user accepted, save session
      let sacco = await result.json();

      console.log(sacco);
      formAddSacco.reset();

      displayAlert('Sacco added successfully');
    } else if (result.status == 403 || result.status == 401) {
      signOutFunc();

      displayAlert('Please login.');
    } else {
      displayAlert('Try and refresh your browser!');
    }
  }).catch(error => {
    console.log(error);
    displayAlert(error);
  }).finally(() => {
    hideLoader();
  });
}

// sign in with phone/pin
function loginWithPhoneAndPwd(phone, pwd) {
  displayLoader('Signing in...');

  let controller = new AbortController();

  let loginPromise = fetch(baseURL + '/user/login', {
    method: 'POST',
    headers: {
      // 'Authorization': 'Bearer ' + localStorage.getItem('finder_Tkn'),
      'Content-Type': 'application/json'
    },
    signal: controller.signal,
    body: JSON.stringify({
      phone: '254' + phone,
      pwd: pwd
    })
  });

  let timeOutPr = timeOut(controller);

  race(loginPromise, timeOutPr).then(async result => {
    console.log(result.status);

    if (result.status == 200 || result.status == 304) {
      // user accepted, save session
      let userDetails = await result.json();

      console.log(userDetails);

      localStorage.setItem('tkn', userDetails.accessToken);

      loginPage.classList.add('d-none');
      adminDashboard.classList.remove('d-none');
    } else if (result.status == 403 || result.status == 401) {
      signOutFunc();
      displayAlert('Please login.');
    } else if (result.status == 500) {
      signOutFunc();
      displayAlert("We encountered a problem on our end. We're working to resolve it.");
    } else {
      displayAlert('Try and refresh your browser!');
    }
  }).catch(error => {
    console.log(error);

    displayAlert(error);
  }).finally(() => {
    hideLoader();
  });
}

function createOfficial(officialSaccoId, officialSaccoMsidn, officialSaccoDesignation, officialSaccoStationId = null) {
  displayLoader('Processing...');

  let controller = new AbortController();

  let data = {
    saccoId: officialSaccoId,
    msisdn: officialSaccoMsidn || '254721146559',
    designation: officialSaccoDesignation || 'Official',
    saccoStationId: officialSaccoStationId || ''
  }

  let newOfficialPromise = fetch(baseURL + '/sacco/official', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('tkn'),
      'Content-Type': 'application/json'
    },
    signal: controller.signal,
    body: JSON.stringify(data)
  });

  console.log(data)

  let timeOutPr = timeOut(controller);

  race(newOfficialPromise, timeOutPr).then(async result => {
    let response = await result.text();

    console.log(response);

    if (result.status == 200 || result.status == 201 || result.status == 304) {
      formAddOfficial.reset();

      displayAlert('Sacco official added successfully');
      bootstrap.Modal.getOrCreateInstance(modalAddOfficial).hide();
    } else if (result.status == 403 || result.status == 401) {
      // signOutFunc();

      bootstrap.Modal.getOrCreateInstance(modalAddOfficial).hide();

      displayAlert('Please login.');
    } else {
      displayAlert(response || 'Try and refresh your browser!');
    }
  }).catch(error => {
    console.log(error);
    displayAlert(error);
  }).finally(() => {
    hideLoader();
  });
}

function signOutFunc() {
  loginPage.classList.remove('d-none');
  adminDashboard.classList.add('d-none');
}

function fleetMenuClick(crumb) {
  allBreadcrumbItems.forEach(eachBreadcrumb => {
    eachBreadcrumb.classList.remove('active');
  });

  menuFleetMgt.classList.add('d-none');
  contentFleetMgt.classList.remove('d-none');

  breadcrumbItem3.classList.add('active');
  breadcrumbItem3.classList.remove('d-none');
  breadcrumbItem3.innerHTML = crumb;
}

function saccoMenuClick(crumb) {
  allBreadcrumbItems.forEach(eachBreadcrumb => {
    eachBreadcrumb.classList.remove('active');
  });

  menuSaccoMgt.classList.add('d-none');
  contentSaccoMgt.classList.remove('d-none');

  breadcrumbItem3.classList.add('active');
  breadcrumbItem3.classList.remove('d-none');
  breadcrumbItem3.innerHTML = crumb;
}

function navClick(el) {
  allNavLinks.forEach(eachNavLink => {
    eachNavLink.classList.remove('nav-clicked');
  });

  el.classList.add('nav-clicked');

  pagetTitle.innerHTML = el.dataset.value || '';
  breadcrumbItem2.innerHTML = el.dataset.value || '';
}

function displaySection(section) {
  allSections.forEach(eachSection => {
    eachSection.classList.add('d-none');
  });

  section.classList.remove('d-none');
}
