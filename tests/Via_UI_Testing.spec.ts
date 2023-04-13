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
        page.waitForURL("https://qa-via.outamationlabs.com/via-ui/#/app/admin/user-management/users"),
        page.locator("button[label='Verify my account']").click()
    ]);
    if(page.url().includes("app/admin/user-management/users"))
    {
        console.log("User Login Successful");
    }
    else
    {   
        console.log("User Login Failed");
    }
});
let userdetails: string[] = ['tdavid321@gmail.com', 'Tim','David','M','011-772-8511',
'M.B.A', 'Management'];
let wuserdetails: string[] = ["tdavid@gmail-com","+1 572-790-1002","4391","(567) 890-5682"];
let entitydetails: string[] = ['Lecsus Technologies', 'tdavid@gmail.com', '011-772-8511', '313-661-9191',
'1', '772-123-4567','1', '3939 Jones Street', 'Texas', 'Dallas', '71707-7015'];
let wentitydetails: string[] = ["tdavid@gmail-com", "+1 571-789-1231", "(890) 027-5682", "9876"];
let clientdetails: string[] = ['Lecsus Technologies','LTPL', 'tdavid@gmail.com', '011-772-8511', 
'3939 Jones Street', 'Texas', 'Dallas', '71707-7015','313-661-9191','1','772-123-4567','1'];
let wclientdetails: string[] = ["tmdavid@gmail-com", "43901.0110", "+2 571-789-1111", "(890) 026-5681"];
test('@ViaFlowTesting @Regression Via Flow Testing: Login, User Management & Administration Module',async ({page})=>
{
    //-------------------------------User Management: Creating New User---------------------------------
    await page.locator("button[label='Add User']").click(); //clicking on Add User button
    await page.waitForTimeout(1500);
    expect.soft(page.url().includes("app/admin/user-management/user-info")).toBeTruthy();
    await page.locator("p-button[label='Save & Close']").click();
    const UserInfoSubmittoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (UserInfoSubmittoaster === true)
    {
        await expect(page.locator("p-toastitem")).toContainText("Please fill all the required values!");  
        await page.waitForTimeout(3000);
    } 
    else 
    {
        console.log("Error: Blank User Information toaster message missing!");
        await page.waitForTimeout(3000);
    }
    await page.locator("#email").type(wuserdetails[0],{delay:50});
    expect.soft(wuserdetails[0].match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)).toBeFalsy();
    await page.locator("#email").clear();
    await page.locator("#email").type(userdetails[0],{delay:50});
    expect.soft(userdetails[0]).toMatch(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    await page.locator("#firstName").type(userdetails[1],{delay:100});
    await page.locator("#lastName").type(userdetails[2],{delay:100});
    await page.locator("#middleInitial").type(userdetails[3]);
    await page.locator("#phoneNumber").fill(wuserdetails[1]);
    expect.soft(wuserdetails[1].match(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/)).toBeFalsy();
    await page.locator("#phoneNumber").clear();
    await page.locator("#phoneNumber").fill(userdetails[4]);
    expect.soft(userdetails[4]).toMatch(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/);
    await page.locator("#title").type(userdetails[5],{delay:100});
    await page.locator("#department").type(userdetails[6],{delay:100});
    await page.locator('#state').click();
    await page.locator("li[aria-label='Florida']").click();
    await page.locator('#county').click();
    await page.locator("li[aria-label='Miami-Dade']").click();
    await page.locator("button span.pi-calendar").click();
    await page.locator("td.p-datepicker-today.ng-star-inserted").click(); //selecting current date
    console.log(await page.locator("span.p-calendar .p-inputtext").textContent());
    await page.locator("text=Read Only").click();
    expect.soft(page.locator("text=Read Only").isChecked).toBeTruthy();
    await page.locator(".p-dropdown").last().click();
    await page.locator("li[aria-label='None']").click();
    await page.locator("text=Save & Close").click();
    const PrivilegeInfoSubmittoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (PrivilegeInfoSubmittoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Please fill all the required values!");  
        await page.waitForTimeout(3000);
    } 
    else 
    {
        console.log("Error: Adding new user (Success) toaster message missing!");
        await page.waitForTimeout(3000);
    }
    //-------------------------------Adminstration: Creating New Entity---------------------------------
    await page.locator("div[aria-label='Administration']").click(); //clicking on side menu bar of Administration
    await page.locator("div[aria-label='Entity Management']").click(); //selecting Entity Management from side menu bar
    await page.waitForTimeout(1500);
    if (page.url().includes("app/admin/entity-management/entities")) 
    {
        console.log("Privilege Set Up Successfull - User Creation - Completed");
    } 
    else 
    {
        console.log("Privilege Set Up Unsuccessfull - User Creation - Failed");
    }
    await page.locator("button[label='Add Entity']").click(); //clicking on Add Entity button
    expect.soft(page.url().includes("app/admin/entity-management/entity-info")).toBeTruthy();
    await page.locator("text=Save & Close").click();
    const blankEntityCreationtoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankEntityCreationtoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Please fill all the required values!");  
        await page.waitForTimeout(3000);
    } 
    else 
    {
        console.log("Error: Blank Entity Creation toaster message missing!");
        await page.waitForTimeout(3000);
    }
    await page.locator("p-dropdown div.p-dropdown").nth(1).click();
    await page.locator("li[aria-label='User']").click();
    //await page.locator('p-dropdown span.p-dropdown-label').nth(1).textContent();
    await page.locator("input[formcontrolname='companyName']").type(entitydetails[0],{delay:50});
    await page.locator("input[formcontrolname='email']").type(wentitydetails[0],{delay:50});
    expect.soft(wentitydetails[0].match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)).toBeFalsy();
    await page.locator("input[formcontrolname='email']").clear();
    await page.locator("input[formcontrolname='email']").type(entitydetails[1],{delay:50});
    expect.soft(entitydetails[1]).toMatch(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    await page.locator("#faxNumber").fill(entitydetails[2]);
    await page.locator("#phoneNumber").type(wentitydetails[1],{delay:50});
    expect.soft(wentitydetails[1].match(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/)).toBeFalsy();
    await page.locator("#phoneNumber").clear();
    await page.locator("#phoneNumber").type(entitydetails[3],{delay:50});
    expect.soft(entitydetails[3]).toMatch(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/);
    await page.locator("#phoneExt").fill(entitydetails[4]);
    await page.locator("#alternatePhoneNumber").type(wentitydetails[2],{delay:50});
    expect.soft(wentitydetails[2].match(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/)).toBeFalsy();
    await page.locator("#alternatePhoneNumber").clear();
    await page.locator("#alternatePhoneNumber").type(entitydetails[5],{delay:50});
    expect.soft(entitydetails[5]).toMatch(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/);
    await page.locator("#alternatePhoneExt").fill(entitydetails[6]);
    await page.locator("#address").type(entitydetails[7],{delay:50});
    await page.locator("#state").click();
    await page.locator("li[aria-label='Texas']").click();
    await page.locator("#city").fill(entitydetails[9]);
    //await page.locator('p-dropdown span.p-dropdown-label').last().textContent();
    await page.locator("#zip").type(wentitydetails[3],{delay:100});
    expect.soft(wentitydetails[3].match(/(^\d{5}$)|(^\d{5}-\d{4}$)/)).toBeFalsy();
    await page.locator("#zip").clear();
    await page.locator("#zip").type(entitydetails[10],{delay:100});
    expect.soft(entitydetails[10]).toMatch(/(^\d{5}$)|(^\d{5}-\d{4}$)/);
    await page.locator("text=Save & Close").click();
    await page.locator("button.p-button span.pi-check").click();
    const Entitycreationsuccessmsg : boolean = await page.locator(".p-toast-detail").isVisible();
    if (Entitycreationsuccessmsg === true) 
    {
        await expect(page.locator(".p-toast-detail")).toContainText("Entity has been created");  
        await page.waitForTimeout(1500);
        const Success1 = await page.locator(".p-toast-detail").textContent();
        if(Success1 === "Entity has been created")
        {
            console.log("Entity Creation Passed");
            await page.waitForTimeout(3000);
        }
        else
        {
            console.log("Entity Creation Failed");
            await page.waitForTimeout(3000);
        }
    } 
    else 
    {
        console.log("Error: Submitting Entity Details (Success) toaster message missing!");
        await page.waitForTimeout(3000);
    }
    //-------------------------------Adminstration: Creating New Client---------------------------------
    await page.locator("div[aria-label='Administration']").click(); //clicking on side menu bar of Administration
    await page.locator("div[aria-label='Client Management']").click(); //selecting Client Management from side menu bar
    await expect.soft(page).toHaveURL('https://qa-via.outamationlabs.com/via-ui/#/app/admin/client-management/clients');
    await page.locator("button[label='Add Client']").click(); //clicking on Add Client button
    await page.locator("text=Save & Close").click();
    const blankClientCreationtoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankClientCreationtoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Please fill all the required values!");  
        await page.waitForTimeout(3000);
    } 
    else 
    {
        console.log("Error: Blank Client Creation toaster message missing!");
        await page.waitForTimeout(3000);
    }
    await page.locator("#companyName").type(clientdetails[0],{delay:50});
    await page.locator("#companyCode").type(clientdetails[1],{delay:100});
    await page.locator("#email").type(wclientdetails[0],{delay:50});
    expect.soft(wclientdetails[0].match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)).toBeFalsy();
    await page.locator("#email").clear();
    await page.locator("#email").type(clientdetails[2],{delay:50});
    expect.soft(clientdetails[2]).toMatch(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    await page.locator("#faxNumber").fill(clientdetails[3]);
    await page.locator("#address").type(clientdetails[4],{delay:50});
    await page.locator("#state").click();
    await page.locator("li[aria-label='California']").click();
    //await page.locator('p-dropdown span.p-dropdown-label').last().textContent();
    await page.locator("#city").fill(clientdetails[6]);
    await page.locator("#zip").fill(wclientdetails[1]);
    expect.soft(wclientdetails[1].match(/(^\d{5}$)|(^\d{5}-\d{4}$)/)).toBeFalsy();
    await page.locator("#zip").clear();
    await page.locator("#zip").fill(clientdetails[7]);
    expect.soft(clientdetails[7]).toMatch(/(^\d{5}$)|(^\d{5}-\d{4}$)/);
    await page.locator("#phoneNumber").type(wclientdetails[2],{delay:50});
    expect.soft(wclientdetails[2].match(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/)).toBeFalsy();
    await page.locator("#phoneNumber").clear();
    await page.locator("#phoneNumber").type(clientdetails[8],{delay:50});
    expect.soft(clientdetails[8]).toMatch(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/);
    await page.locator("#phoneExt").fill(clientdetails[9]);
    await page.locator("#alternatePhoneNumber").type(wclientdetails[3],{delay:50});
    expect.soft(wclientdetails[3].match(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/)).toBeFalsy();
    await page.locator("#alternatePhoneNumber").clear();
    await page.locator("#alternatePhoneNumber").type(clientdetails[10],{delay:50});
    expect.soft(clientdetails[10]).toMatch(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/);
    await page.locator("#alternatePhoneExt").fill(clientdetails[11]);
    await page.locator("text=Save & Close").click();
    const Clientcreationsuccessmsg : boolean = await page.locator(".p-toast-detail").isVisible();
    if (Clientcreationsuccessmsg === true) 
    {
        await expect(page.locator(".p-toast-detail")).toContainText("Client has been created");  
        await page.waitForTimeout(1500);
        const Success2 = await page.locator(".p-toast-detail").textContent();
        if(Success2 === "Client has been created")
        {
            console.log("Client Creation Passed");
        }
        else
        {
            console.log("Client Creation Failed");
        }
    } 
    else 
    {
        console.log("Error: Submitting Client Details (Success) toaster message missing!");
    }
});