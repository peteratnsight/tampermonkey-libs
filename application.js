class TMApplication {
  constructor(config) {
    this.name = 'TM Application';
    this.version = '1.0';
    this.defaultConfig = config;
  }

  sayHello() {
    console.log(`Hello World`);
  }

  getConfig() {
    return this.config;
  }

  initRuntimeConfig(runtimeConfig) {
    this.defaultConfig = Object.assign({}, this.defaultConfig, runtimeConfig);
  }
}
