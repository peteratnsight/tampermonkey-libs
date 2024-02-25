class TMApplication {
  const defaultConfig = {
    buttons: {},
    pillClasses: ["artdeco-button","artdeco-button--primary"],
    pillStyles: {}
  }
  constructor(config) {
    this.name = 'TM Application';
    this.version = '1.0';
    this.defaultConfig = config;
  }

  sayHello() {
    console.log(`Hello World - This is the TM Application running and cheering.`);
  }

  getConfig() {
    return this.config;
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
    this.defaultConfig = Object.assign({}, this.defaultConfig, runtimeConfig);
  }

  init(document, runtimeConfig) {
    this.set("document",document);
    this.initRuntimeConfig(runtimeConfig);
    this.initSetup();
    this.initializeConfigButtton();
    if(this.defaultConfig.buttons != undefined && this.defaultConfig.buttons.length != 0) this.initilizeApplicationButtons(this.defaultConfig.buttons);
    this.sayHello();
  }

  initSetup() { return true; }
  
  initializeConfigButtton() { 
    let configPill = this.getButton(this.callConfiguration,"Configuration");
    this.document.body.appendChild(configPill);
    return true; 
  }
  initilizeApplicationButtons(buttons) { return true; }

  getButton(funct,btnText,runtimeConfig) {
    if(runtimeConfig != undefined) initRuntimeConfig(runtimeConfig);
    let pill = document.createElement("button");
    pill.textContent = btnText;
    pill.classList.add(...getConfigValue('pillClasses'));
    pill = executeStylesOnElement('pillStyles',pill);
    pill.addEventListener('click', () => funct());
    return pill;
  }
}
