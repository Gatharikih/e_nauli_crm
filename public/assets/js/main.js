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
  var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })

  /**
   * Initiate quill editors
   */
  if (select('.quill-editor-default')) {
    new Quill('.quill-editor-default', {
      theme: 'snow'
    });
  }

  if (select('.quill-editor-bubble')) {
    new Quill('.quill-editor-bubble', {
      theme: 'bubble'
    });
  }

  if (select('.quill-editor-full')) {
    new Quill(".quill-editor-full", {
      modules: {
        toolbar: [
          [{
            font: []
          }, {
            size: []
          }],
          ["bold", "italic", "underline", "strike"],
          [{
              color: []
            },
            {
              background: []
            }
          ],
          [{
              script: "super"
            },
            {
              script: "sub"
            }
          ],
          [{
              list: "ordered"
            },
            {
              list: "bullet"
            },
            {
              indent: "-1"
            },
            {
              indent: "+1"
            }
          ],
          ["direction", {
            align: []
          }],
          ["link", "image", "video"],
          ["clean"]
        ]
      },
      theme: "snow"
    });
  }

  /**
   * Initiate TinyMCE Editor
   */
  const useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isSmallScreen = window.matchMedia('(max-width: 1023.5px)').matches;

  tinymce.init({
    selector: 'textarea.tinymce-editor',
    plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons',
    editimage_cors_hosts: ['picsum.photos'],
    menubar: 'file edit view insert format tools table help',
    toolbar: 'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
    toolbar_sticky: true,
    toolbar_sticky_offset: isSmallScreen ? 102 : 108,
    autosave_ask_before_unload: true,
    autosave_interval: '30s',
    autosave_prefix: '{path}{query}-{id}-',
    autosave_restore_when_empty: false,
    autosave_retention: '2m',
    image_advtab: true,
    link_list: [{
        title: 'My page 1',
        value: 'https://www.tiny.cloud'
      },
      {
        title: 'My page 2',
        value: 'http://www.moxiecode.com'
      }
    ],
    image_list: [{
        title: 'My page 1',
        value: 'https://www.tiny.cloud'
      },
      {
        title: 'My page 2',
        value: 'http://www.moxiecode.com'
      }
    ],
    image_class_list: [{
        title: 'None',
        value: ''
      },
      {
        title: 'Some class',
        value: 'class-name'
      }
    ],
    importcss_append: true,
    file_picker_callback: (callback, value, meta) => {
      /* Provide file and text for the link dialog */
      if (meta.filetype === 'file') {
        callback('https://www.google.com/logos/google.jpg', {
          text: 'My text'
        });
      }

      /* Provide image and alt text for the image dialog */
      if (meta.filetype === 'image') {
        callback('https://www.google.com/logos/google.jpg', {
          alt: 'My alt text'
        });
      }

      /* Provide alternative source and posted for the media dialog */
      if (meta.filetype === 'media') {
        callback('movie.mp4', {
          source2: 'alt.ogg',
          poster: 'https://www.google.com/logos/google.jpg'
        });
      }
    },
    templates: [{
        title: 'New Table',
        description: 'creates a new table',
        content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>'
      },
      {
        title: 'Starting my story',
        description: 'A cure for writers block',
        content: 'Once upon a time...'
      },
      {
        title: 'New list with dates',
        description: 'New List with dates',
        content: '<div class="mceTmpl"><span class="cdate">cdate</span><br><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>'
      }
    ],
    template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
    template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
    height: 600,
    image_caption: true,
    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    noneditable_class: 'mceNonEditable',
    toolbar_mode: 'sliding',
    contextmenu: 'link image table',
    skin: useDarkMode ? 'oxide-dark' : 'oxide',
    content_css: useDarkMode ? 'dark' : 'default',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
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
let dropdownSignout= document.getElementById('dropdown-signout');

window.onload = () => {
  navClick(navDashboard);
}

/* SIDE MENU */

navDashboard.addEventListener('click', () => {
  navClick(navDashboard);
  displaySection(sectionDashboard);
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
});

cardOfficial.addEventListener('click', () => {
  saccoMenuClick('Official');
});

cardStation.addEventListener('click', () => {
  saccoMenuClick('Station');
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
  displaySection(sectionProfile);
});

/* END PROFILE DROPDOWN */

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

