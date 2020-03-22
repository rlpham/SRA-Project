const webdriver = require("selenium-webdriver");
const text = "This is our final project for decryption";

const DECRYPT_XPATH = "/html/body/table/tbody/tr[1]/td/table/tbody/tr/td[1]/div/form/p[1]/select/option[2]";
const SLEEP_TIME = 250;
let driver;

(async function init() {

    driver = await new webdriver
        .Builder()
        .forBrowser('chrome')
        .build();
    try {
      await driver.get('http://rumkin.com/tools/cipher/');
      await driver.wait(webdriver.until.titleIs('Cipher Tools'), 5000);
      await Affine();
      await Atbash();
      await Base64();
      await CaesarianShift();
      await Gronsfeld();
      await LetterNumbers();
      await ROT13();
    } finally {
      console.log("Done");
    }
  })();

async function Affine() {
    try {
        console.log("AFFINE w/ constant 'a' = 1 & variable 'b'")
        console.log("-------------------------------------------------------------------------");
        await driver.get("http://rumkin.com/tools/cipher/affine.php");
        await driver.wait(webdriver.until.titleIs('Affine Cipher'), 5000);
        await driver.findElement(webdriver.By.xpath(DECRYPT_XPATH)).click();
        await driver.findElement(webdriver.By.name("text")).sendKeys(text);

        for(let i = 1; i <= 26; i++) {
            await driver.findElement(webdriver.By.xpath("/html/body/table/tbody/tr[1]/td/table/tbody/tr/td[1]/div/form/p[3]/select/option[" + i + "]")).click();
            await driver.sleep(SLEEP_TIME);
            var b = i - 1;
            console.log("b = " + b.toString() + ": " + await driver.findElement(webdriver.By.id("affine")).getText());
        }
        console.log("-------------------------------------------------------------------------");
        console.log();
    } catch (e) {
        console.log(e);
    }
}

async function Atbash() {
  try {
      console.log("ATBASH")
      console.log("-------------------------------------------------------------------------");
      await driver.get("http://rumkin.com/tools/cipher/atbash.php");
      await driver.wait(webdriver.until.titleIs('Atbash Cipher'), 5000);
      //await driver.findElement(webdriver.By.xpath(DECRYPT_XPATH)).click();
      await driver.findElement(webdriver.By.name("text")).sendKeys(text);
      await driver.sleep(SLEEP_TIME);
      console.log(await driver.findElement(webdriver.By.id("affine")).getText());
      console.log("-------------------------------------------------------------------------");
      console.log();
  } catch (e) {
      console.log(e);
  }
}

async function Base64() {
  try {
      console.log("BASE64")
      console.log("-------------------------------------------------------------------------");
      await driver.get("http://rumkin.com/tools/cipher/base64.php");
      await driver.wait(webdriver.until.titleIs('Base64'), 5000);
      await driver.findElement(webdriver.By.name("text")).sendKeys(text);
      await driver.sleep(SLEEP_TIME);
      console.log(await driver.findElement(webdriver.By.id("output")).getText());
      console.log("-------------------------------------------------------------------------");
      console.log();
  } catch (e) {
      console.log(e);
  }
}

async function CaesarianShift() {
  try {
      console.log("CAESARIAN SHIFT w/ variable 'n")
      console.log("-------------------------------------------------------------------------");
      await driver.get("http://rumkin.com/tools/cipher/caesar.php");
      await driver.wait(webdriver.until.titleIs('Caesarian Shift'), 5000);
      await driver.findElement(webdriver.By.name("text")).sendKeys(text);
      await driver.sleep(SLEEP_TIME);

      for(var i = 1; i <= 26; i++) {
            await driver.findElement(webdriver.By.xpath("/html/body/table/tbody/tr[1]/td/table/tbody/tr/td[1]/div/form/p[1]/select/option["+ i + "]")).click();
            await driver.sleep(SLEEP_TIME);
            var n = i-1;
            console.log("n = " + n.toString() + ": " + await driver.findElement(webdriver.By.id("caesar")).getText());
      }
      console.log("-------------------------------------------------------------------------");
      console.log();
  } catch (e) {
    console.log(e);
  }
}

async function Gronsfeld() {
  try {
      console.log("GRONSFELD w/ 2 different alphabet keys and cipher keys (1-26)");
      console.log("-------------------------------------------------------------------------");
      await driver.get("http://rumkin.com/tools/cipher/gronsfeld.php");
      await driver.wait(webdriver.until.titleIs('Gronsfeld Cipher'), 5000);
      await driver.findElement(webdriver.By.xpath(DECRYPT_XPATH)).click();
      await driver.findElement(webdriver.By.name("key")).sendKeys("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
      await driver.findElement(webdriver.By.name("text")).sendKeys(text);
      console.log("Alphabet Key: ABCDEFGHIJKLMNOPQRSTUVWXYZ");
      for(var i = 1; i <= 26; i++) {
        await driver.findElement(webdriver.By.name("pass")).sendKeys(i);
        await driver.sleep(SLEEP_TIME);
        var ck = i;
        console.log("Cipher Key = " + i.toString() + ": " + await driver.findElement(webdriver.By.id("output")).getText());
        await driver.findElement(webdriver.By.name("pass")).clear();
      }
      await driver.findElement(webdriver.By.name("key")).clear();
      await driver.findElement(webdriver.By.name("key")).sendKeys("ZYXWVUTSRQPONMLKJIHGFEDCBA");
      console.log("Alphabet Key: ZYXWVUTSRQPONMLKJIHGFEDCBA");
      for(var i = 1; i <= 26; i++) {
        await driver.findElement(webdriver.By.name("pass")).sendKeys(i);
        await driver.sleep(SLEEP_TIME);
        console.log("Cipher Key = " + i.toString() + ": " + await driver.findElement(webdriver.By.id("output")).getText());
        await driver.findElement(webdriver.By.name("pass")).clear();
      }
      console.log("-------------------------------------------------------------------------");
      console.log();
  } catch (e) {
    console.log(e);
  }
}

async function LetterNumbers() {
  try {
    console.log("LETTER NUMBERS");
    console.log("-------------------------------------------------------------------------");
    await driver.get("http://rumkin.com/tools/cipher/numbers.php");
    await driver.wait(webdriver.until.titleIs('Letter Numbers'), 5000);
    await driver.findElement(webdriver.By.xpath(DECRYPT_XPATH)).click();
    await driver.findElement(webdriver.By.name("text")).sendKeys(text);

    for(var i = 1; i <= 3; i++) {
      await driver.findElement(webdriver.By.xpath("/html/body/table/tbody/tr[1]/td/table/tbody/tr/td[1]/div/form/p[2]/select/option[" + i + "]")).click();
      await driver.sleep(SLEEP_TIME);
      switch(i) {
        case 1:
          console.log("Method 1-2-3 24-25-26: " + await driver.findElement(webdriver.By.id("output")).getText());
          break;
        case 2:
          console.log("Method 01-02-03 24-25-26: " + await driver.findElement(webdriver.By.id("output")).getText());
          break;
        case 3:
          console.log("Method 010203 242526: " + await driver.findElement(webdriver.By.id("output")).getText());
          break;                    
      }
    }

  } catch (e) {
    console.log(e);
  }
}

async function ROT13() {
  try {
    console.log("ROT13");
    console.log("-------------------------------------------------------------------------");
    await driver.get("http://rumkin.com/tools/cipher/rot13.php");
    await driver.wait(webdriver.until.titleIs('ROT13'), 5000);
    await driver.findElement(webdriver.By.name("text")).sendKeys(text);
    await driver.sleep(SLEEP_TIME);
    console.log(await driver.findElement(webdriver.By.id("output")).getText());
    console.log("-------------------------------------------------------------------------");
  } catch (e) {
    console.log(e);
  }
}
