const {Builder, By, Key, until } = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');

const keys = require('./config/keys');


var chromeCapabilities = webdriver.Capabilities.chrome();


var chromeOptions = {
    'args': ['--test-type', '--window-size=1000,1300', '--window-position=1500,10']
};

chromeCapabilities.set('chromeOptions', chromeOptions);

const driver = new Builder()
                .forBrowser('chrome')
                .withCapabilities(chromeCapabilities)
                .build();



class Automator {


    async navigator () {
        await driver.get('http://www.google.com');
        console.log('google done');
                
        
    }

    async crmLogin () {
        driver.get('https://crm.irepair.gr/auth/login');
        await driver.findElement(By.xpath('//*[@id="identity"]')).sendKeys(keys.userName);
        await driver.findElement(By.xpath('//*[@id="password"]')).sendKeys(keys.password);
        await driver.findElement(By.xpath('//*[@id="login-box"]/form/div[2]/button')).click();

        // await driver.get('https://crm.irepair.gr/tickets/ticket/update/GL-295210');
        // callback();
        
        console.log('crmlogin done');
    }

    ticketNav (ticket) {
        driver.get(`https://crm.irepair.gr/tickets/ticket/update/GL-${ticket}`);

        driver.findElement(By.xpath('/html/body/div[2]/aside[2]/section[2]/div/div[2]/div[3]/form/div[1]/div[1]/span/span[1]/span')).sendKeys(Key.ENTER);

        // pre check form
        const pre = driver.wait(until.elementLocated(By.xpath('/html/body/span/span/span[1]/input')), 3000)

        pre.then(el => el.sendKeys("Tassos"));
        pre.sendKeys(Key.ENTER);


        // pre_input.send_keys(Keys.RETURN)
        console.log('ticket nav done')
    }
 }

autom = new Automator();


// with callback
// autom.crmLogin(() => {
//     driver.get('https://crm.irepair.gr/tickets/ticket/update/GL-295210')
// });
autom.crmLogin().then(() => autom.ticketNav("295210"))




