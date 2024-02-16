
//import {Builder, By, Key} from 'selenium-webdriver';
//import { should,assert } from 'chai';
const { assert } = require("chai");
const {Builder, By, Key, WebElement, util,Select} = require ("selenium-webdriver");
var should = require("chai").should();
const chrome = require('selenium-webdriver/chrome');
const path = require('chromedriver').path;




describe("TEST KELOWNA TRAILS APP",function(){

    let service = new chrome.ServiceBuilder(path).build();
    chrome.setDefaultService(service);
    
    var driver =  new Builder().forBrowser("chrome").build();
    driver.get("https://devops-proj-testing-4ee4d.web.app/");
    let selectElement = driver.findElement(By.id("members"));
    const select = new Select(selectElement);
    let groupRate;

    it("Add 3 users & Review Rate", async function(){
    

    await driver.findElement(By.name("lastname")).sendKeys("SecondLastName",Key.RETURN);
    await driver.findElement(By.name("firstname")).sendKeys("SecondName",Key.RETURN);
    await driver.findElement(By.id("GroupSize")).clear();
    await driver.findElement(By.id("GroupSize")).sendKeys(6,Key.RETURN);
    await driver.findElement(By.id("addMemberBtn")).click();
    groupRate = await driver.findElement(By.id("discRate")).getAttribute('value');
    groupRate.should.equal('45.00');


    await driver.findElement(By.name("lastname")).sendKeys("FirstLastName",Key.RETURN);
    await driver.findElement(By.name("firstname")).sendKeys("FirstName",Key.RETURN);
    await driver.findElement(By.id("GroupSize")).clear();
    await driver.findElement(By.id("GroupSize")).sendKeys(1,Key.RETURN);
    await driver.findElement(By.id("addMemberBtn")).click();
    groupRate = await driver.findElement(By.id("discRate")).getAttribute('value');
    groupRate.should.equal('50.00');

    await driver.findElement(By.name("lastname")).sendKeys("ThirdLastName",Key.RETURN);
    await driver.findElement(By.name("firstname")).sendKeys("ThirdName",Key.RETURN);
    await driver.findElement(By.id("GroupSize")).clear();
    await driver.findElement(By.id("GroupSize")).sendKeys(20,Key.RETURN);
    await driver.findElement(By.id("addMemberBtn")).click();
    groupRate = await driver.findElement(By.id("discRate")).getAttribute('value');
    groupRate.should.equal('40.00');


    let sizeList = await select.getOptions();
    //console.log(sizeList);
    sizeList.length.should.equal(3);
        
    });

    it("Check for student name  and email ", async function() {
        let name = await driver.findElement(By.xpath("/html/body/h3")).getText().then(function(value){
            return value;
        });
        name.should.equal("Student name / email");
          //assert.strictEqual(name,"Student2 name / email"););
        
    });

    it("Sort memeber list", async function(){
        await driver.findElement(By.id("sortMemberListBtn")).click();
        let firstOptionText = await driver.findElement(By.css("#members option:nth-child(1)")).getText();
        firstOptionText.should.equal("FirstLastName, FirstName"); 

    });

    it("Select middle user", async function(){

       let secondOption = await driver.findElement(By.css("#members option:nth-child(2)")).click();
       let secondOptionText = await driver.findElement(By.css("#members option:nth-child(2)")).getText();
       secondOptionText.should.equal("SecondLastName, SecondName"); 

    });

    it("Delete first user", async function(){

        let firstUser = await driver.findElement(By.css("#members option:nth-child(1)")).click();
        await driver.findElement(By.id("deleteMemberBtn")).click();

        let sizeList = await select.getOptions();
        sizeList.length.should.equal(2);

    });









});

