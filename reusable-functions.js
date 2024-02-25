const reusableFunctionsConfig = {
  pillClasses: ["artdeco-button","artdeco-button--2","artdeco-button--primary","ember-view"],
  pillStyles: {
    marginLeft: "7px"
  },
  storagePrefix: "dataCollector__"
}

const initConfig = runtimeConfig => {
  let initializedConfig = Object.assign({}, reusableFunctionsConfig, runtimeConfig);
  for (const [key, value] of Object.entries(initializedConfig)) {
        reusableFunctionsConfig[key] = value;
  }
}

const getConfigValue = key => {
  if(reusableFunctionsConfig[key] == undefined || reusableFunctionsConfig[key] === false) return '';
  return reusableFunctionsConfig[key];
}

const executeStylesOnElement = (configStylesName, element) => {
  let thisConfiguration = reusableFunctionsConfig[configStylesName];
  if(thisConfiguration == undefined) return element;
  for (const [key, value] of Object.entries(thisConfiguration)) {
    element.style[key] = value;
  }
  return element;
}
  
const addPill = (funct,btnText,runtimeConfig) => {
  if(runtimeConfig != undefined) initConfig(runtimeConfig);
  let pill = document.createElement("button");
  pill.textContent = btnText;
  pill.classList.add(...getConfigValue('pillClasses'));
  pill = executeStylesOnElement('pillStyles',pill);
  pill.addEventListener('click', () => funct())
  return pill
}

// Local Storage Management
function simpleHash(str) {
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Konvertiere zu einem 32bit Integer
  }
  return hash;
}

const getStorageName = (storageName) => {
    if(storageName != undefined) return storageName;
    return reusableFunctionsConfig.storagePrefix + simpleHash(keywords);
}

const clear = (storageName) => {
    const emptyMap = new Map();
    localStorage.setItem(getStorageName(storageName), JSON.stringify(Array.from(emptyMap.entries())));
}

const initStorage = (storageName) => {
  if (!localStorage.getItem(getStorageName(storageName))) {
    clear();
  }
};

const addItemToStorage = (key, value, storageName) => {
  const dataMap = getStorage(storageName);
  dataMap.set(key, value);
  localStorage.setItem(getStorageName(storageName), JSON.stringify(Array.from(dataMap.entries())));
};

const getStorage = (storageName) => {
  const storedData = JSON.parse(localStorage.getItem(getStorageName(storageName)));
  return new Map(storedData);
};
