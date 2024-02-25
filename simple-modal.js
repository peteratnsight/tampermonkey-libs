// Modal UI Functions ....
const createModal = (name, header, fieldArray) => {
  // Modal-Container erstellen
  const modal = document.createElement('div');
  modal.setAttribute('id', name + "-wrapper");
  modal.style.display = 'none';
  modal.style.position = 'fixed';
  modal.style.width = '100%';
  modal.style.height = '100%';
  modal.style.left = '0';
  modal.style.top = '0';
  modal.style.background = 'rgba(0,0,0,.8)';
  modal.style.zIndex = '-1';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';
  // Modal-Inhalt erstellen
  const modalContent = document.createElement('div');
  modalContent.style.width = '70vw';
  modalContent.style.height = '90vh';
  modalContent.style.position = "relative";
  modalContent.style.margin = 'auto';
  modalContent.style.backgroundColor = 'white';
  modalContent.style.padding = '20px';
  const mheader = document.createElement('h2');
  mheader.style.textAlign = "center";
  mheader.textContent = header;
  // Elemente zum Modal-Inhalt hinzufügen
  modalContent.appendChild(mheader);
  // Textfeld für die Variable
  const dataForm = document.createElement('form');
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
      input.value = getDefaultValueFromConstant(key);
      field.appendChild(inputLabel);
      field.appendChild(input);
      dataForm.appendChild(field);
  };
  // Speichern-Button
  const saveButton = document.createElement("input");
  saveButton.classList.add('artdeco-pill','artdeco-pill--slate','artdeco-pill--choice','artdeco-pill--2','search-reusables__filter-pill-button');
  saveButton.textContent = 'Speichern';
  saveButton.role = "button";
  saveButton.type = "submit";
  dataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    saveInput(name,e.target);
  });
  const closeButton = document.createElement("button");
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

const getKeyValue = key => {
  if(hasStorage != undefined && getFromStorage(key) !== false) return getFromStorage(key);
  if(config != undefined && config[key] != undefined && getConfigKey(key) !== false) return getConfigKey(key);
  return "";
}

const getModal = (name) => {
  let modalName = name + '-wrapper';
  return document.getElementById(modalName);
}

const showModal = (name) => {
  let modalElement = getModal(name);
  modalElement.style.display = 'flex';
  modalElement.style.zIndex = '1000';
}

const closeModal = (name) => {
   let modalElement = getModal(name);
   modalElement.remove();
}
