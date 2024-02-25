class TMApplication {
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

  initRuntimeConfig(runtimeConfig) {
    this.defaultConfig = Object.assign({}, this.defaultConfig, runtimeConfig);
  }
}
