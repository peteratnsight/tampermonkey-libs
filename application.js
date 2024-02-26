class TMApplication {
  constructor(config,url) {
    this.name = 'TM Application';
    this.version = '1.0';
    this.url = url;
    this.defaultConfig = {
        configurationVars: {'myName': 'text','myNote': 'textarea'},
        appButtonContext: '.search-reusables__filters-bar-grouping',
        storagePrefix: "dataCollector__",
        listCollectorName: "dataStorage_listCollector",
        buttons: {},
        svgTags: {
            "download":'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',
            "clear": '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
            "config": '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a1.65 1.65 0 0 1 0 2.34l-2 2a1.65 1.65 0 0 1-2.34 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 .9 1.65 1.65 0 0 1-3 0 1.65 1.65 0 0 0-1-.9 1.65 1.65 0 0 0-1.82.33l-.06.06a1.65 1.65 0 0 1-2.34 0l-2-2a1.65 1.65 0 0 1 0-2.34l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-.9-1 1.65 1.65 0 0 1 0-3 1.65 1.65 0 0 0 .9-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a1.65 1.65 0 0 1 0-2.34l2-2a1.65 1.65 0 0 1 2.34 0l.06.06a1.65 1.65 0 0 0 1.82.33h.01a1.65 1.65 0 0 0 1-.9 1.65 1.65 0 0 1 3 0 1.65 1.65 0 0 0 1 .9 1.65 1.65 0 0 0 1.82-.33l.06-.06a1.65 1.65 0 0 1 2.34 0l2 2a1.65 1.65 0 0 1 0 2.34l-.06.06a1.65 1.65 0 0 0-.33 1.82v.01a1.65 1.65 0 0 0 .9 1z"></path></svg>',
            "add": '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',
            "edit": '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>',
            "multiadd":'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line><path d="M14 2H6a2 2 0 0 0-2 2v12"></path><polyline points="16 6 20 6 20 18"></polyline></svg>',
        },
        pillClasses: ["artdeco-button", "artdeco-button--primary"],
        pillStyles: { marginLeft: "7px" },
        wrapperStyles: {
            display: 'none',
            position: 'fixed',
            width: '100%',
            height: '100%',
            left: '0',
            top: '0',
            background: 'rgba(0,0,0,.8)',
            zIndex: '-1',
            justifyContent: 'center',
            alignItems: 'center'
        },
        dialogStyles: {
            width: '70vw',
            height: '90vh',
            position: 'relative',
            margin: 'auto',
            backgroundColor: 'white',
            padding: '20px',
        },
        modalAppendix: '-wrapper',
        ...config // Überschreiben/Erweitern der Standardkonfiguration mit dem übergebenen Konfigurationsobjekt
    };
  }
  getRequest(inUrl) {
    if(inUrl == undefined || inUrl === null) inUrl = this.url;
    let url = inUrl;
    let urlObject = new URL(inUrl);
    let queryParams = new URLSearchParams(urlObject.search);
    let query = Object.fromEntries(queryParams);
    let regex = /\/groups\/(\d+)/;
    let match = url.match(regex);
    let gid = false;
    if (match) { gid = match[1]; }
    return {
        url,
        path: urlObject.pathname,
        search: urlObject.search,
        queryParams: query,
        gid: gid
    }
  }
  getKeywords() {
      let request = this.getRequest();
      if(request.queryParams.keywords != undefined) return request.queryParams.keywords;
      return request.search;
  }
  sayHello() {
    console.log(`Hello World - This is the TM Application running and cheering.`);
    console.log(this.getRequest());
    console.log(window.location.href);
  }
  getConfig() {
    return this.defaultConfig;
  }
  clearConfigValue(key) {
    if(this.defaultConfig[key] == undefined || this.defaultConfig[key] === false || this.defaultConfig[key] == '') return false;
    if (typeof this.defaultConfig[key] === "object" && this.defaultConfig[key] !== null) return {};
    return false;
  }
  getConfigValue(key) {
    if(this.defaultConfig[key] == undefined || this.defaultConfig[key] === false) return '';
    return this.defaultConfig[key];
  }
  executeStylesOnElement(configStylesName, element) {
    let thisConfiguration = this.defaultConfig[configStylesName];
    if(thisConfiguration == undefined) return element;
    for (const [key, value] of Object.entries(thisConfiguration)) {
      element.style[key] = value;
    }
    return element;
  }
  initRuntimeConfig(runtimeConfig) {
    if(runtimeConfig == undefined) return false;
    let initializedConfig = Object.assign({}, this.defaultConfig, runtimeConfig);
    for (const [key, value] of Object.entries(initializedConfig)) {
      if (typeof value === "object" && value !== null) {
        if(this.defaultConfig[key] == undefined || this.defaultConfig[key] === null) this.defaultConfig[key] = {};
        for (const [subkey, subvalue] of Object.entries(value)) {
          this.defaultConfig[key][subkey] = subvalue;
        }
      } else {
        this.defaultConfig[key] = value;
      }
    }
    console.log(this.defaultConfig);
  }
  async init(runtimeConfig) {
    console.log('TMApplikcation::Init wurde aufgerufen');
    this.initRuntimeConfig(runtimeConfig);
    this.initSetup();
    this.initializeConfigButtton();
    if(this.defaultConfig.buttons != undefined && Object.keys(this.defaultConfig.buttons).length != 0) { await this.initilizeApplicationButtons(this.defaultConfig.buttons); }
  }
  initSetup() { console.log("initSetup Method to interfere in init/setup routine"); return true; }
  initializeConfigButtton() {
    let configPill = this.getButton(this.callConfiguration,"svg:config");
    let configContainer = document.createElement("div");
    configContainer.style.position = 'absolute';
    configContainer.style.right = '10px';
    configContainer.style.top = '10px';
    configContainer.style.zIndex = 1000;
    configContainer.appendChild(configPill);
    if (window === window.top) {
        document.body.appendChild(configContainer);
    }
    return true;
  }
  initilizeApplicationButtons(buttons) {
      let getAppButtonsContext = () => document.querySelector(this.getConfigValue('appButtonContext'));
      let container = document.createElement("div");
      container.classList.add("display-flex","align-items-center");
      for (const [key, value] of Object.entries(buttons)) {
          let pill = this.getButton(value,key);
          container.appendChild(pill);
      }
      let context = getAppButtonsContext();
      if (context) {
          context.appendChild(container);
          return Promise.resolve()
      }
      return new Promise(resolve => {
          const check = (changes, observer) => {
              const context = getAppButtonsContext();
              if (context) {
                  observer.disconnect();
                  context.appendChild(container);
                  resolve()
              }
          }
          new MutationObserver(check).observe(document, { childList: true, subtree: true })
      })
  }
  getSvgTag(lookupKey) {
      if(this.defaultConfig.svgTags != undefined && this.defaultConfig.svgTags[lookupKey] != undefined) return this.defaultConfig.svgTags[lookupKey];
      return false;
  }
  getButtonText(pill,btnStr) {
      if (btnStr.indexOf("svg:") === 0) {
          let parts = btnStr.split("svg:");
          let svg = this.getSvgTag(parts[1]);
          if(svg != undefined && svg !== false) {
              pill.innerHTML = svg;
              pill.title = parts[1];
          } else {
              pill.textContent = parts[1];
              pill.title = parts[1];
          }
      } else {
          pill.textContent = btnStr;
          pill.title = btnStr;
      }
      return pill;
  }
  getButton(funct, btnText, runtimeConfig) {
    if (runtimeConfig != undefined) {
      this.initRuntimeConfig(runtimeConfig);
    }
    let pill = document.createElement("button");
    pill = this.getButtonText(pill,btnText);
    pill.classList.add(...this.getConfigValue('pillClasses'));
    pill = this.executeStylesOnElement('pillStyles', pill);
    if (typeof funct === 'function') {
      pill.addEventListener('click', funct);
    }
    return pill;
  }
  delay(ms) { new Promise(res => setTimeout(res, ms)); }
  callConfiguration() {
      alert("Overwrite with spcific configuration method");
      let instance = new TMApplication({}, window.location.href);
      instance.createModal("configPanel", "Konfiguration", instance.getConfigValue('configurationVars'));
      instance.showModal("configPanel");
  }
  async nextPage() {
      window.scrollTo(0, document.body.scrollHeight)
      await this.delay(3000)
      document.querySelector('button.artdeco-pagination__button--next').click()
  }
  simpleHash(str) {
      let hash = 0;
      if (str.length === 0) return hash;
      for (let i = 0; i < str.length; i++) {
          const char = str.charCodeAt(i);
          hash = (hash << 5) - hash + char;
          hash = hash & hash; // Konvertiere zu einem 32bit Integer
      }
      return hash;
  }
  getStorageName(storageName) {
    if(storageName != undefined) return storageName;
    return this.getConfigValue('storagePrefix') + this.simpleHash(this.getKeywords());
  }
  clearStorage(storageName) {
    const emptyMap = new Map();
    localStorage.setItem(this.getStorageName(storageName), JSON.stringify(Array.from(emptyMap.entries())));
  }
  initStorage(storageName) {
      if (!localStorage.getItem(this.getStorageName(storageName))) {
          this.clear();
      }
  }
  addItemToStorage(key, value, storageName) {
      const dataMap = this.getStorage(storageName);
      dataMap.set(key, value);
      localStorage.setItem(this.getStorageName(storageName), JSON.stringify(Array.from(dataMap.entries())));
  }
  getStorage(storageName) {
      const storedData = JSON.parse(localStorage.getItem(this.getStorageName(storageName)));
      return new Map(storedData);
  }
  alertStorage() {
      let storageName = this.getStorageName();
      alert(storageName);
  }
  // Modal UI Functions ....
  createModal(name, header, fieldArray) {
      // Modal-Container erstellen
      let modal = document.createElement('div');
      modal.setAttribute('id', name + this.getConfigValue('modalAppendix'));
      modal = this.executeStylesOnElement('wrapperStyles',modal);
      // Modal-Inhalt erstellen
      let modalContent = document.createElement('div');
      modalContent = this.executeStylesOnElement('dialogStyles',modalContent);
      let mheader = document.createElement('h2');
      mheader.style.textAlign = "center";
      mheader.textContent = header;
      // Elemente zum Modal-Inhalt hinzufügen
      modalContent.appendChild(mheader);
      // Textfeld für die Variable
      let dataForm = document.createElement('form');
      dataForm.setAttribute('id', name + "Form");
      dataForm.setAttribute('method','post');
      dataForm.setAttribute('href', window.location.href);
      dataForm.style.position = "relative";
      dataForm.style.padding = '10px';
      for (const [key, value] of Object.entries(fieldArray)) {
          const field = document.createElement('div');
          const inputLabel = document.createElement('label');
          inputLabel.setAttribute('for', key);
          inputLabel.textContent = key.toUpperCase();
          let fieldtype = "input";
          if(value == "textarea") fieldtype = "textarea";
          if(value == "select") fieldtype = "select";
          const input = document.createElement(fieldtype);
          input.id = key;
          input.name = key;
          let options = {};
          switch (fieldtype) {
            case "select":
                  options = this.getKeyValue(key);
                  options.forEach(optionData => {
                      const option = document.createElement("option");
                      option.text = optionData.text;
                      option.value = optionData.value;
                      input.appendChild(option);
                  });
                  break;
            case "textarea":
                  input.rows = "5";
                  input.value = this.getKeyValue(key);
                  break;
            default:
                  input.type = value;
                  input.value = this.getKeyValue(key);
          }
          field.appendChild(inputLabel);
          field.appendChild(input);
          dataForm.appendChild(field);
      };
      // Speichern-Button
      let saveButton = document.createElement("input");
      saveButton.classList.add('artdeco-pill','artdeco-pill--slate','artdeco-pill--choice','artdeco-pill--2','search-reusables__filter-pill-button');
      saveButton.textContent = 'Speichern';
      saveButton.role = "button";
      saveButton.type = "submit";
      dataForm.addEventListener('submit', (e) => {
          e.preventDefault();
          this.saveInput(name,e.target);
      });
      let closeButton = document.createElement("button");
      closeButton.classList.add('artdeco-pill','artdeco-pill--slate','artdeco-pill--choice','artdeco-pill--2','search-reusables__filter-pill-button');
      closeButton.textContent = 'Schließen';
      closeButton.role = "button";
      closeButton.addEventListener('click', (e) => {
          e.preventDefault();
          this.closeModal(name);
      });
      dataForm.appendChild(saveButton);
      dataForm.appendChild(closeButton);
      modalContent.appendChild(dataForm);
      // Modal-Inhalt zum Modal-Container hinzufügen
      modal.appendChild(modalContent);
      // Modal-Container zum Dokument hinzufügen
      document.body.appendChild(modal);
  }
  getModal(name) {
      let modalName = name + this.getConfigValue('modalAppendix');
      //console.log(modalName);
      let foundElems = document.querySelectorAll('#' + modalName);
      //console.log(foundElems);
      if(foundElems.length == 0) return false;
      return foundElems[0];
  }
  showModal(name,styles) {
      let modalElement = this.getModal(name);
      if(modalElement == undefined) return false;
      modalElement.style.display = 'flex';
      modalElement.style.zIndex = '1000';
      if(styles != undefined) {
          for (const [key, value] of Object.entries(styles)) {
              modalElement.style[key] = value;
          }
      }
  }
  closeModal(name) {
      let modalElement = this.getModal(name);
      modalElement.remove();
  }
  saveInput(modalName,form) {
      alert("Diese Funktion saveInput muss lokal überschrieben werden!");
      let modalElement = this.getModal(modalName);
      modalElement.remove();
  }
  getKeyValue(key) {
      alert("Diese Funktion getKeyValue muss lokal überschrieben werden!");
      return false;
  }
}
