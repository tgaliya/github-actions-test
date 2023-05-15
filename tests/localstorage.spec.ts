import { test, expect } from '@playwright/test';
test.beforeEach(async({page}) =>
{
    //-----------------------------------------Login Module---------------------------------------------
    let username = "Via";
    let password = "Via@12345";
    let wpassword = "Via@123";
    await page.goto("https://qa-via.outamationlabs.com/via-ui");
    await page.locator("button[label='Login']").click();
    const blanklogininfotoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blanklogininfotoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Please fill all the required values!");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Blank Login toaster message missing!");
    }
    await page.locator("input[placeholder='Username']").type(username,{delay:100});
    await page.locator("input[placeholder='Password']").type(wpassword,{delay:100});
    expect.soft(wpassword.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).toBeFalsy();
    await page.locator("input[placeholder='Password']").clear();
    await page.locator("input[placeholder='Password']").type(password,{delay:100});
    expect.soft(wpassword.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/));
    await page.locator("input[placeholder='Password']").press('Tab');
    await page.locator("button[label='Login']").click();
    await page.locator("button[label='Verify my account']").click();
    await page.waitForTimeout(1500);
    const blankotptoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankotptoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Please enter OTP!");  
        await page.waitForTimeout(3000);
    } 
    else 
    {
        console.log("Error: Blank OTP toaster message missing!");
    }
    await page.locator("input[type='tel']").first().type("1",{delay:50});
    await page.locator("input[type='tel']").nth(1).type("2",{delay:50});
    await page.locator("input[type='tel']").nth(2).type("3",{delay:50});
    await page.locator("input[type='tel']").nth(3).type("4",{delay:50});
    await page.locator("input[type='tel']").nth(4).type("5",{delay:50});
    await page.locator("input[type='tel']").last().type("6",{delay:50});
    await Promise.all([
        page.waitForURL("https://qa-via.outamationlabs.com/via-ui/#/app/dashboard"),
        page.locator("button[label='Verify my account']").click()
    ]);
    if(page.url().includes("app/dashboard"))
    {
        console.log("User Login Successful");
    }
    else
    {   
        console.log("User Login Failed");
    }
});
test('Local Storage Date Time Demo',async({page}) =>
{  
    await page.goto("https://qa-via.outamationlabs.com/via-ui/#/app/case-management/cases");
    var today = new Date();
    var time = today.toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });
    //console.log("Current Time is : " + time);
    var date = today.getMonth()+1+'/'+today.getDate()+'/'+today.getFullYear();
    var dateTime = date+' '+time;
    const KeeplocalStorage = await page.evaluate(()=>{
        window.localStorage.setItem('DateTime', dateTime)
    });
    console.log(KeeplocalStorage);
    await page.waitForTimeout(60000);
    const GetlocalStorage = await page.evaluate(()=>{
        window.localStorage.getItem('DateTime')
    });
    console.log(GetlocalStorage);
    // console.log("Current Date and Time is : " + dateTime.toUpperCase());
    // page.addInitScript(value => {
    //     window.localStorage.setItem('DateTime', value);
    // }, dateTime);
    //await page.waitForTimeout(30000);
    //function createItem() {
      //  localStorage.mydateNtime = dateTime;
        //return createItem;
        //return createItem().mydateNtime;
    //   }
    // await page.waitForTimeout(30000);
    //   function myFunction() {
    //     var DateNTime = localStorage.getItem("mydateNtime");
    //     console.log(DateNTime);
    //   }
    //console.log("Response Date and Time is : " + window.localStorage.getItem('DateTime'));
    //console.log(dateTime);
    // page.addInitScript(value =>
    // {
    //     console.log(window.localStorage.getItem('DateTime'));
    // });
    // localStorage.setItem('DateTime', dateTime);
    // const DateNTime = localStorage.getItem('DateTime');
    // console.log(DateNTime);
});