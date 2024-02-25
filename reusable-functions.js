const reusableFunctionsConfig = {
  pillClasses: ["artdeco-button","artdeco-button--2","artdeco-button--primary","ember-view"],
  pillStyles: {
    marginLeft: "7px"
  }
}

const initConfig = runtimeConfig => {
  reusableFunctionsConfig = Object.assign({}, reusableFunctionsConfig, runtimeConfig);
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
  pill.classList.add(...getConfigValue(pillClasses));
  pill = executeStylesOnElement('pillStyles',pill);
  pill.addEventListener('click', () => funct())
  return pill
}
