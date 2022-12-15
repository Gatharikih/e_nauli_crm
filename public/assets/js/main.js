(function() {
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
    on('click', '.toggle-sidebar-btn', function(e) {
      select('body').classList.toggle('toggle-sidebar')
    })
  }

  /**
   * Search bar toggle
   */
  if (select('.search-bar-toggle')) {
    on('click', '.search-bar-toggle', function(e) {
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
    .forEach(function(form) {
      form.addEventListener('submit', function(event) {
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
      new ResizeObserver(function() {
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

let baseURL = 'http://localhost:9000';

window.onload = () => {
  navClick(navDashboard);
}

loginBtn.addEventListener('click', () => {
  let phoneNum = phoneInput.value.trim();
  let pwd = pwdInput.value.trim();

  if (phoneNum != '' && pwd != '') {
    loginWithPhoneAndPwd(phoneNum, pwd);
  }
});

/* SIDE MENU */

navDashboard.addEventListener('click', () => {
  navClick(navDashboard);
  displaySection(sectionDashboard);

  breadcrumbItem2.classList.add('active');

  breadcrumbItem3.classList.add('d-none');
  breadcrumbItem3.classList.remove('active');
});

navSaccoMgt.addEventListener('click', () => {
  navClick(navSaccoMgt);
  displaySection(sectionSaccoMgt);

  menuSaccoMgt.classList.remove('d-none');
  contentSaccoMgt.classList.add('d-none');

  breadcrumbItem2.classList.add('active');

  breadcrumbItem3.classList.add('d-none');
  breadcrumbItem3.classList.remove('active');
});

navFleetMgt.addEventListener('click', () => {
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

// sign in with uname/pwd
function loginWithPhoneAndPwd(phone, pwd) {
  console.log( phone, pwd);

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

      loginPage.classList.add('d-none');
      adminDashboard.classList.remove('d-none');

    } else if (result.status === 403 || result.status === 401) {
      signOutFunc();
    } else {
      // displayAlert('Try and refresh your browser!');
    }
  }).catch(error => {
    console.log(error);
  }).finally(() => {
    // hideLoader();
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
