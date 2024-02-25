const modalConfig = {
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
  wrapperAppendix: '-wrapper'
}

const delayRun = ms => new Promise(res => setTimeout(res, ms))

const initModal = runtimeConfig => {
  let initializedConfig = Object.assign({}, modalConfig, runtimeConfig);
  for (const [key, value] of Object.entries(initializedConfig)) {
    if (typeof value === "object" && value !== null) {
      for (const [subkey, subvalue] of Object.entries(value)) {
        modalConfig[key][subkey] = subvalue;
      }
    } else {
      modalConfig[key] = value;
    }
  }
}

const styleElementByConfig = (configStylesName, element) => {
  let thisConfiguration = modalConfig[configStylesName];
  if(thisConfiguration == undefined) return element;
  for (const [key, value] of Object.entries(thisConfiguration)) {
    element.style[key] = value;
  }
  return element;
}

// Modal UI Functions ....
const createModal = (name, header, fieldArray) => {
  // Modal-Container erstellen
  let modal = document.createElement('div');
  modal.setAttribute('id', name + modalConfig.wrapperAppendix);
  modal = styleElementByConfig('wrapperStyles',modal);
  // Modal-Inhalt erstellen
  let modalContent = document.createElement('div');
  modalContent = styleElementByConfig('dialogStyles',modalContent);
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
      const input = document.createElement(fieldtype);
      input.type = value;
      if(value == "textarea") input.rows = "5";
      input.id = key;
      input.name = key;
      input.value = getKeyValue(key);
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
    saveInput(name,e.target);
  });
  let closeButton = document.createElement("button");
  closeButton.classList.add('artdeco-pill','artdeco-pill--slate','artdeco-pill--choice','artdeco-pill--2','search-reusables__filter-pill-button');
  closeButton.textContent = 'Schließen';
  closeButton.role = "button";
  closeButton.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(name);
  });
  dataForm.appendChild(saveButton);
  dataForm.appendChild(closeButton);
  modalContent.appendChild(dataForm);

  // Modal-Inhalt zum Modal-Container hinzufügen
  modal.appendChild(modalContent);

  // Modal-Container zum Dokument hinzufügen
  document.body.appendChild(modal);
}

const __getKeyValue = (key,funct) => {
  let keyFunction = key + "ConfigFunct";
  if(typeof modalConfig[keyFunction] === 'function') return modalConfig[keyFunction](key);
  if(funct != undefined && typeof funct === 'function') return funct(key);
  if(hasStorage != undefined && getFromStorage(key) !== false) return getFromStorage(key);
  if(config != undefined && config[key] != undefined && getConfigKey(key) !== false) return getConfigKey(key);
  return "";
}

const getModal = (name) => {
  let modalName = name + modalConfig.wrapperAppendix;
  console.log(modalName);
  let foundElems = document.querySelectorAll('#' + modalName);
  console.log(foundElems);
  if(foundElems.length == 0) return false;
  return foundElems[0];
}

const showModal = (name,styles) => {
  let modalElement = getModal(name);
  if(modalElement == undefined) return false;
  modalElement.style.display = 'flex';
  modalElement.style.zIndex = '1000';
  if(styles != undefined) {
    for (const [key, value] of Object.entries(styles)) {
      modalElement.style[key] = value;
    }
  }
}

const closeModal = (name) => {
   let modalElement = getModal(name);
   modalElement.remove();
}
