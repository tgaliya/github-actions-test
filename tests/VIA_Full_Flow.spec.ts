import { test, expect } from '@playwright/test';
test.beforeEach(async({page}) =>
{
    //-----------------------------------------Login Module---------------------------------------------
    let username = "Via";
    let password = "Via@12345";
    let wpassword = "Via@123";
    await page.goto("https://qa-via.outamationlabs.com/via-new");
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
        page.waitForURL("https://qa-via.outamationlabs.com/via-new/#/app/dashboard"),
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
let userdetails: string[] = ['rickypointing321@gmail.com', 'Ricky','Pointing','J','281-890-0036',
'M.C.A', 'Technology'];
let wuserdetails: string[] = ["rickypointing@gmail-com","+1 572-790-1002","4391","(567) 890-5682"];
let entitydetails: string[] = ['Aster Technologies', 'rickyjpointing@gmail.com', '011-772-8511', '313-661-9191',
'1', '772-123-4567','1', '2343 Gambler Lane', 'Texas', 'Houston', '77070'];
let wentitydetails: string[] = ["rickypointing@gmail-com", "+1 571-789-1231", "(890) 027-5682", "9876"];
let clientdetails: string[] = ['Aster Technologies','ATPL', 'rickyjpointing@gmail.com', '011-772-8511', 
'2343 Gambler Lane', 'Texas', 'Houston', '71707-7015','313-661-9191','1','772-123-4567','1'];

let casedetails: string[] = ['10107', '1007','007', 'Notes is not complusory'];
let loaninfo: string[] = ['107', '500', '1000', '5000', '6', '100', '50', '5'];
let borrowerinfo: string[] = ['Alex', 'James', 'Hales', 'AlexHales12@gmail.com', 'AlexJHales1204@gmail.com', 'New Jersey', '56700', '170420231', '25000'];
let wborrowerinfo: string[] = ['AlexHales12$gmail.com', 'AlexJHales333@gmailcom', '4321'];
let propertyinfo: string[] = ['4843 Del Dew Drive', 'Peacebull Apt', 'Miami', '45678', '100', '10', '12345', 'Property is Legal'];
let wpropertyinfo: string[] = ['9870', '$50'];
let defaultinfo: string[] = ['1000', '500', '300', '250', '150', '50', '300', '200'];
let trusteeinfo: string[] = ['Andrew Tye', '2618 Caldwell Road', 'Simform Apt', '14428', 'Miami'];
let wclientdetails: string[] = ["rickypointing@gmail-com", "43901.0110", "+2 571-789-1111", "(890) 026-5681"];
test('@ViaFlowTesting @Regression Via Flow Testing: Login, User Management & Administration Module',async ({page})=>
{
    //-------------------------------User Management: Creating New User---------------------------------
    await page.locator("div[aria-label='Administration']").click(); //clicking on side nav bar of Administration
    await page.locator("div[aria-label='User Management']").click(); //selecting User Management from side menu bar
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
    await expect.soft(page).toHaveURL('https://qa-via.outamationlabs.com/via-new/#/app/admin/client-management/clients');
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
test.only('@ViaFlowTesting @CaseSearchs @Regression Via Flow Testing: Searching created case and filling the data required',async ({page})=>
{
    await page.locator("div[aria-label='Case Management']").click(); //clicking on Advance search button on side menu
    await Promise.all([
        page.waitForURL("https://qa-via.outamationlabs.com/via-new/#/app/case-management/cases"),
        page.locator("div[aria-label='Case Search']").click()
    ]);
    if(page.url().includes("app/case-management/cases"))
    {
        console.log("User landed on case search page");
    }
    else
    {   
        console.log("User failed to land on case search page");
    }
    const CaseNumber = " 458243-3171 "; 
    var caseValues = new Array();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");
    for(let i = 0; i < await rows.count(); ++i)
    {
        const CaseSearchNos = await rows.nth(i).locator("td").first().textContent();
        caseValues.push(CaseSearchNos);
        console.log(caseValues);
        for(var j in caseValues)
        {
            if(CaseNumber.includes(caseValues[j]))
            {
                await rows.nth(i).locator("a").click();
                break;
            }
        }
    }
    await page.waitForTimeout(5000);
    const CaseNumberDetail: any = await page.locator("#p-panel-0-content > div > div > div:nth-child(2) > span:nth-child(2)").textContent();
    console.log(CaseNumberDetail);
    expect(CaseNumber.trim().includes(CaseNumberDetail)).toBeTruthy();
    const Status = await page.locator("p-chip div div").first().textContent();
    const TSStatus: any = await page.locator("p-chip div div").nth(1).textContent();
    console.log("\nStep1: Referral Received");
    await page.locator("text= Referral Received ").click();
    const RRCaseNo: any = await page.locator("#p-panel-1-content > div > div > div:nth-child(2) > span:nth-child(2)").textContent();
    expect.soft(RRCaseNo.match(CaseNumberDetail)).toBeTruthy();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Referral received']").click();
    await page.locator("text=Submit").click();
    const blankreferrelreceivedtoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankreferrelreceivedtoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Referral Received (Success) toaster message missing!");
        await page.waitForTimeout(3000);
    }
    const RRStatus: any = await page.locator("p-chip div div").first().textContent();
    const TSStatus1: any = await page.locator("p-chip div div").nth(1).textContent();
    expect.soft(RRStatus.includes("Referral rec") && TSStatus.match(TSStatus1)).toBeTruthy();
    await page.locator("text= Referral Received ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Review completed']").click();
    await page.locator("text=Submit").click();
    if (blankreferrelreceivedtoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("1.1 Referral Received Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Referral Received (Success) toaster message missing!");
        console.log("1.1 Unable to Complete Referral Received Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("tbody").waitFor();
    console.log("\nStep2: Title Search");
    const RRStatus1: any = await page.locator("p-chip div div").first().textContent();
    const TSStatus2: any = await page.locator("p-chip div div").nth(1).textContent();
    expect.soft(RRStatus1.includes("Review compl")).toBeTruthy();
    expect.soft(TSStatus2.match("In-Progress")).toBeTruthy();
    await page.locator("p-treetabletoggler").nth(1).click();
    const TReqStatus: any = await page.locator("p-chip div div").nth(2).textContent();
    expect.soft(TReqStatus.match("Yet to start")).toBeTruthy();
    await page.locator("text= Title Requested ").click();
    await page.locator("p-dropdown[id='TitleSearchType']").click();
    await page.locator("li[aria-label='Full Search']").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Title requested']").click();
    await page.locator("text=Submit").click();
    const blanktitlerequestedtoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blanktitlerequestedtoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("2.1 Title Requested Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Title Requested (Success) toaster message missing!");
        console.log("2.2 Unable to Complete Title Requested Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(1).click();
    await page.locator("text= Title Requested ").waitFor();
    const TReqStatus1: any = await page.locator("p-chip div div").nth(2).textContent();
    expect.soft(TReqStatus1.includes("Title reques")).toBeTruthy();
    const TRecStatus: any = await page.locator("p-chip div div").nth(3).textContent();
    expect.soft(TRecStatus.includes("Yet to start")).toBeTruthy();
    await page.locator("text= Title Received ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Title received']").click();
    await page.locator("text=Submit").click();
    const blanktitlereceivedtoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blanktitlereceivedtoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("2.2 Title Received Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Title Received (Success) toaster message missing!");
        console.log("2.2 Unable to Complete Title Received Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(1).click();
    await page.locator("text= Title Received ").waitFor();
    const TRecStatus1: any = await page.locator("p-chip div div").nth(3).textContent();
    expect.soft(TRecStatus1.includes("Title receiv")).toBeTruthy();
    const TRevStatus: any = await page.locator("p-chip div div").nth(5).textContent();
    expect.soft(TRevStatus.includes("Yet to start")).toBeTruthy();
    await page.locator("text= Title Review ").first().click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Review complete']").click();
    await page.locator("text=Submit").click();
    const blanktitlereviewtoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blanktitlereviewtoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("2.3 Title Review Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Title Review (Success) toaster message missing!");
        console.log("2.3 Unable to Complete Title Review Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(1).click();
    await page.locator("text= Title Review ").first().waitFor();
    console.log("\nStep3: Complaint");
    const TRevStatus1: any = await page.locator("p-chip div div").nth(5).textContent();
    expect.soft(TRevStatus1.includes("Review compl")).toBeTruthy();
    const TSStatus3: any = await page.locator("p-chip div div").nth(1).textContent();
    expect.soft(TSStatus3.match("Completed")).toBeTruthy();
    await page.locator("p-treetabletoggler").nth(1).click();
    const Complaint: any = await page.locator("p-chip div div").nth(2).textContent();
    expect.soft(Complaint.match("In-Progress")).toBeTruthy();
    await page.locator("p-treetabletoggler").nth(2).click();
    await page.locator("text= Prepare Complaint ").waitFor();
    const PrepareComplaint: any = await page.locator("p-chip div div").nth(3).textContent();
    expect.soft(PrepareComplaint.match("Yet to start")).toBeTruthy();
    await page.locator("text= Prepare Complaint ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Complaint prepared']").click();
    await page.locator("text=Submit").last().click();
    const blankpreparecomplainttoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankpreparecomplainttoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("3.1 Prepare Complaint Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Prepare Complaint (Success) toaster message missing!");
        console.log("3.1 Unable to Complete Prepare Complaint Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(2).click();
    await page.locator("text= Prepare Complaint ").waitFor();
    const PrepareComplaint1: any = await page.locator("p-chip div div").nth(3).textContent();
    expect.soft(PrepareComplaint1.match("Complaint pr")).toBeTruthy();
    const AttorneyReview: any = await page.locator("p-chip div div").nth(4).textContent();
    expect.soft(AttorneyReview.match("Yet to start")).toBeTruthy();
    await page.locator("text= Attorney Review And Approve Complaint ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Approved']").click();
    await page.locator("text=Submit").last().click();
    const blankattorneyreviewtoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankattorneyreviewtoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("3.2 Attorney Review and Approve Complaint Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Attorney Review and Approve Complaint (Success) toaster message missing!");
        console.log("3.2 Unable to Complete Attorney Review and Approve Complaint Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(2).click();
    await page.locator("text= Attorney Review And Approve Complaint ").waitFor();
    const AttorneyReview1: any = await page.locator("p-chip div div").nth(4).textContent();
    expect.soft(AttorneyReview1.match("Approved")).toBeTruthy();
    const SendComplaint: any = await page.locator("p-chip div div").nth(6).textContent();
    expect.soft(SendComplaint.match("Yet to start")).toBeTruthy();
    await page.locator("text= Send Complaint For Client Approval ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Complaint Sent']").click();
    await page.locator("text=Submit").last().click();
    const blanksendcomplainttoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blanksendcomplainttoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("3.3 Send Complaint For Client Approval Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Send Complaint For Client Approval (Success) toaster message missing!");
        console.log("3.3 Unable to Complete Send Complaint For Client Approval Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(2).click();
    await page.locator("text= Send Complaint For Client Approval ").waitFor();
    const SendComplaint1: any = await page.locator("p-chip div div").nth(6).textContent();
    expect.soft(SendComplaint1.match("Complaint Se")).toBeTruthy();
    const ReceiveAppComplaint: any = await page.locator("p-chip div div").nth(7).textContent();
    expect.soft(ReceiveAppComplaint.match("Yet to start")).toBeTruthy();
    await page.locator("text= Received Approved Complaint From Client ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Approved']").click();
    await page.locator("text=Submit").last().click();
    const blankReceiveAppComplainttoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankReceiveAppComplainttoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("3.4 Received Approved Complaint From Client Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Received Approved Complaint From Client (Success) toaster message missing!");
        console.log("3.4 Unable to Complete Received Approved Complaint From Client Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(2).click();
    await page.locator("text= Received Approved Complaint From Client ").waitFor();
    const ReceiveAppComplaint1: any = await page.locator("p-chip div div").nth(7).textContent();
    expect.soft(ReceiveAppComplaint1.match("Approved")).toBeTruthy();
    const SubmitComplaint: any = await page.locator("p-chip div div").nth(8).textContent();
    expect.soft(SubmitComplaint.match("Yet to start")).toBeTruthy();
    await page.locator("text= Submit Complaint For Filling ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Submitted']").click();
    await page.locator("text=Submit").last().click();
    const blanksubmitcomplainttoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blanksubmitcomplainttoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("3.5 Submit Complaint For Filling Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Submit Complaint For Filling (Success) toaster message missing!");
        console.log("3.5 Unable to Complete Submit Complaint For Filling Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(2).click();
    await page.locator("text= Submit Complaint For Filling ").waitFor();
    const SubmitComplaint1: any = await page.locator("p-chip div div").nth(8).textContent();
    expect.soft(SubmitComplaint1.match("Submitted")).toBeTruthy();
    const LegalFiled: any = await page.locator("p-chip div div").nth(9).textContent();
    expect.soft(LegalFiled.match("Yet to start")).toBeTruthy();
    await page.locator("text= First Legal Filed ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Filed Successfully']").click();
    await page.locator("text=Submit").last().click();
    const blanklegalfiledtoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blanklegalfiledtoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("3.6 First Legal Filed Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: First Legal Filed (Success) toaster message missing!");
        console.log("3.6 Unable to Complete First Legal Filed Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(2).click();
    console.log("\nStep4: Service");
    await page.locator("text= First Legal Filed ").waitFor();
    const LegalFiled1: any = await page.locator("p-chip div div").nth(9).textContent();
    expect.soft(LegalFiled1.includes("Filed Succes")).toBeTruthy();
    await page.locator("p-treetabletoggler").nth(2).click();
    const Complaint1: any = await page.locator("p-chip div div").nth(2).textContent();
    expect.soft(Complaint1.match("Completed")).toBeTruthy();
    const Service: any = await page.locator("p-chip div div").nth(3).textContent();
    expect.soft(Service.match("In-Progress")).toBeTruthy();
    await page.locator("p-treetabletoggler").nth(3).click();
    await page.locator("text= Service Started ").waitFor();
    const ServiceStarted: any = await page.locator("p-chip div div").nth(4).textContent();
    expect.soft(ServiceStarted.match("Yet to start")).toBeTruthy();
    await page.locator("text= Service Started ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Service started']").click();
    await page.locator("text=Submit").last().click();
    const blankservicestartedtoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankservicestartedtoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("4.1 Service Started Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Service Started (Success) toaster message missing!");
        console.log("4.1 Unable to Complete Service Started Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(3).click();
    await page.locator("text= Service Started ").waitFor();
    const ServiceStarted1: any = await page.locator("p-chip div div").nth(4).textContent();
    expect.soft(ServiceStarted1.includes("Service star")).toBeTruthy();
    const ServiceCompleted: any = await page.locator("p-chip div div").nth(5).textContent();
    expect.soft(ServiceCompleted.match("Yet to start")).toBeTruthy();
    await page.locator("text= Service Completed ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Service completed']").click();
    await page.locator("text=Submit").last().click();
    const blankservicecompletedtoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankservicecompletedtoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("4.2 Service Completed Step Pass");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Service Completed (Success) toaster message missing!");
        console.log("4.2 Unable to Complete Service Completed Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(3).click();
    await page.locator("text= Service Completed ").waitFor();
    const ServiceCompleted1: any = await page.locator("p-chip div div").nth(5).textContent();
    expect.soft(ServiceCompleted1.includes("Service comp")).toBeTruthy();
    const PeriodExp: any = await page.locator("p-chip div div").nth(6).textContent();
    expect.soft(PeriodExp.match("Yet to start")).toBeTruthy();
    await page.locator("text= Answer Period Expiration ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Responded']").click();
    await page.locator("text=Submit").last().click();
    const blankperiodexpirytoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankperiodexpirytoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("4.3 Answer Period Expiration Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Answer Period Expiration (Success) toaster message missing!");
        console.log("4.3 Unable to Complete Answer Period Expiration Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(3).click();
    console.log("\nStep5: Judgement");
    await page.locator("text= Answer Period Expiration ").waitFor();
    const PeriodExp1: any = await page.locator("p-chip div div").nth(6).textContent();
    expect.soft(PeriodExp1.includes("Responded")).toBeTruthy();
    await page.locator("p-treetabletoggler").nth(3).click();
    const Service1: any = await page.locator("p-chip div div").nth(3).textContent();
    expect.soft(Service1.match("Completed")).toBeTruthy();
    const Judgement: any = await page.locator("p-chip div div").nth(4).textContent();
    expect.soft(Judgement.match("In-Progress")).toBeTruthy();
    await page.locator("p-treetabletoggler").nth(4).click();
    await page.locator("text= Request Judgement Figures ").waitFor();
    const RequestJudgement: any = await page.locator("p-chip div div").nth(5).textContent();
    expect.soft(RequestJudgement.match("Yet to start")).toBeTruthy();
    await page.locator("text= Request Judgement Figures ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Requested']").click();
    await page.locator("text=Submit").last().click();
    const blankrequestjudgementtoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankrequestjudgementtoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("5.1 Request Judgement Figures Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Request Judgement Figures (Success) toaster message missing!");
        console.log("5.1 Unable to Complete Request Judgement Figures Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(4).click();
    await page.locator("text= Request Judgement Figures ").waitFor();
    const RequestJudgement1: any = await page.locator("p-chip div div").nth(5).textContent();
    expect.soft(RequestJudgement1.includes("Requested")).toBeTruthy();
    const ReceiveJudgement: any = await page.locator("p-chip div div").nth(6).textContent();
    expect.soft(ReceiveJudgement.match("Yet to start")).toBeTruthy();
    await page.locator("text= Receive Judgement Figures ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Received']").click();
    await page.locator("text=Submit").last().click();
    const blankreceivejudgementtoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankreceivejudgementtoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("5.2 Receive Judgement Figures Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Receive Judgement Figures (Success) toaster message missing!");
        console.log("5.2 Unable to Complete Receive Judgement Figures Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(4).click();
    await page.locator("text= Receive Judgement Figures ").waitFor();
    const ReceiveJudgement1: any = await page.locator("p-chip div div").nth(6).textContent();
    expect.soft(ReceiveJudgement1.includes("Received")).toBeTruthy();
    const JudgementPrepare: any = await page.locator("p-chip div div").nth(7).textContent();
    expect.soft(JudgementPrepare.match("Yet to start")).toBeTruthy();
    await page.locator("text= Judgement Prepare ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Judgment prepared']").click();
    await page.locator("text=Submit").last().click();
    const blankjudgementpreparetoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankjudgementpreparetoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("5.3 Judgement Prepare Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Judgement Prepare (Success) toaster message missing!");
        console.log("5.3 Unable to Complete Judgement Prepare Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(4).click();
    await page.locator("text= Judgement Prepare ").waitFor();
    const JudgementPrepare1: any = await page.locator("p-chip div div").nth(7).textContent();
    expect.soft(JudgementPrepare1.includes("Judgment pre")).toBeTruthy();
    const ApproveJudgement: any = await page.locator("p-chip div div").nth(8).textContent();
    expect.soft(ApproveJudgement.match("Yet to start")).toBeTruthy();
    await page.locator("text= Attorney Review & Approve Judgement ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Approved']").click();
    await page.locator("text=Submit").last().click();
    const blankapprovejudgementtoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankapprovejudgementtoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("5.4 Attorney Review & Approve Judgement Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Attorney Review & Approve Judgement (Success) toaster message missing!");
        console.log("5.4 Unable to Complete Attorney Review & Approve Judgement Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(4).click();
    await page.locator("text= Attorney Review & Approve Judgement ").waitFor();
    const ApproveJudgement1: any = await page.locator("p-chip div div").nth(8).textContent();
    expect.soft(ApproveJudgement1.includes("Approved")).toBeTruthy();
    const SubmitJudgement: any = await page.locator("p-chip div div").nth(9).textContent();
    expect.soft(SubmitJudgement.match("Yet to start")).toBeTruthy();
    await page.locator("text=  Submit Judgement To Court  ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Submitted']").click();
    await page.locator("text=Submit").last().click();
    const blanksubmitjudgementtoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blanksubmitjudgementtoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("5.5 Submit Judgement To Court Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Submit Judgement To Court (Success) toaster message missing!");
        console.log("5.5 Unable to Complete Submit Judgement To Court Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(4).click();
    await page.locator("text= Submit Judgement To Court ").waitFor();
    const SubmitJudgement1: any = await page.locator("p-chip div div").nth(9).textContent();
    expect.soft(SubmitJudgement1.includes("Submitted")).toBeTruthy();
    const JudgementEntered: any = await page.locator("p-chip div div").nth(10).textContent();
    expect.soft(JudgementEntered.match("Yet to start")).toBeTruthy();
    await page.locator("text= Judgement Entered ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Judgment entered']").click();
    await page.locator("text=Submit").last().click();
    const blankjudgementeneteredtoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankjudgementeneteredtoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("5.6 Judgement Entered Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Judgement Entered (Success) toaster message missing!");
        console.log("5.6 Unable to Complete Judgement Entered Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(4).click();
    console.log("\nStep6: Sale");
    await page.locator("text= Judgement Entered ").waitFor();
    const JudgementEntered1: any = await page.locator("p-chip div div").nth(10).textContent();
    expect.soft(JudgementEntered1.includes("Judgment ent")).toBeTruthy();
    await page.locator("p-treetabletoggler").nth(4).click();
    const Judgement1: any = await page.locator("p-chip div div").nth(4).textContent();
    expect.soft(Judgement1.match("Completed")).toBeTruthy();
    const Sale: any = await page.locator("p-chip div div").nth(5).textContent();
    expect.soft(Sale.match("In-Progress")).toBeTruthy();
    await page.locator("p-treetabletoggler").nth(5).click();
    await page.locator("text=  Request Bidding Instruction  ").waitFor();
    const RequestBidding: any = await page.locator("p-chip div div").nth(6).textContent();
    expect.soft(RequestBidding.match("Yet to start")).toBeTruthy();
    await page.locator("text=  Request Bidding Instruction  ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Requested']").click();
    await page.locator("text=Submit").last().click();
    const blankrequestbiddingtoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankrequestbiddingtoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("6.1 Request Bidding Instruction Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Request Bidding Instruction (Success) toaster message missing!");
        console.log("6.1 Unable to Complete Request Bidding Instruction Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(5).click();
    await page.locator("text= Request Bidding Instruction ").waitFor();
    const RequestBidding1: any = await page.locator("p-chip div div").nth(6).textContent();
    expect.soft(RequestBidding1.includes("Requested")).toBeTruthy();
    const ReceiveBidding: any = await page.locator("p-chip div div").nth(7).textContent();
    expect.soft(ReceiveBidding.match("Yet to start")).toBeTruthy();
    await page.locator("text=  Receive Bidding Instruction  ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Received']").click();
    await page.locator("text=Submit").last().click();
    const blankreceivebiddingtoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankreceivebiddingtoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("6.2 Receive Bidding Instruction Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Receive Bidding Instruction (Success) toaster message missing!");
        console.log("6.2 Unable to Complete Receive Bidding Instruction Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(5).click();
    await page.locator("text= Receive Bidding Instruction ").waitFor();
    const ReceiveBidding1: any = await page.locator("p-chip div div").nth(7).textContent();
    expect.soft(ReceiveBidding1.includes("Received")).toBeTruthy();
    const SaleBid: any = await page.locator("p-chip div div").nth(8).textContent();
    expect.soft(SaleBid.match("Yet to start")).toBeTruthy();
    await page.locator("text= Sale Bid Confirmed ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Bid confirmed']").click();
    await page.locator("text=Submit").last().click();
    const blanksalebidtoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blanksalebidtoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("6.3 Sale Bid Confirmed Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Sale Bid Confirmed (Success) toaster message missing!");
        console.log("6.3 Unable to Complete Sale Bid Confirmed Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(5).click();
    await page.locator("text= Sale Bid Confirmed ").waitFor();
    const SaleBid1: any = await page.locator("p-chip div div").nth(8).textContent();
    expect.soft(SaleBid1.includes("Bid confirme")).toBeTruthy();
    const BankruptcySearch: any = await page.locator("p-chip div div").nth(9).textContent();
    expect.soft(BankruptcySearch.match("In-Progress")).toBeTruthy();
    await page.locator("p-treetabletoggler").nth(9).click();
    await page.locator("text= Request Bankruptcy Search ").waitFor();
    const ReqBankruptcySearch: any = await page.locator("p-chip div div").nth(10).textContent();
    expect.soft(ReqBankruptcySearch.match("Yet to start")).toBeTruthy();
    await page.locator("text= Request Bankruptcy Search ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Ordered']").click();
    await page.locator("text=Submit").last().click();
    const blankrequestbankruptcytoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankrequestbankruptcytoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("6.4 Request Bankruptcy Search Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Request Bankruptcy Search (Success) toaster message missing!");
        console.log("6.4 Unable to Complete Request Bankruptcy Search Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(5).click();
    await page.locator("text= Bankruptcy Search ").waitFor();
    await page.locator("p-treetabletoggler").nth(9).click();
    await page.locator("text= Request Bankruptcy Search ").waitFor();
    const ReqBankruptcySearch1: any = await page.locator("p-chip div div").nth(10).textContent();
    expect.soft(ReqBankruptcySearch1.match("Ordered")).toBeTruthy();
    const RecBankruptcySearch: any = await page.locator("p-chip div div").nth(11).textContent();
    expect.soft(RecBankruptcySearch.match("Yet to start")).toBeTruthy();
    await page.locator("text= Receive Bankruptcy Search ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Not Bankruptcy Found']").click();
    await page.locator("text=Submit").last().click();
    const blankreceivebankruptcytoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankreceivebankruptcytoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("6.5 Receive Bankruptcy Search Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Receive Bankruptcy Search (Success) toaster message missing!");
        console.log("6.5 Unable to Complete Receive Bankruptcy Search Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(5).click();
    await page.locator("text= Bankruptcy Search ").waitFor();
    const BankruptcySearch1: any = await page.locator("p-chip div div").nth(9).textContent();
    expect.soft(BankruptcySearch1.match("Completed")).toBeTruthy();
    await page.locator("p-treetabletoggler").nth(9).click();
    await page.locator("text= Receive Bankruptcy Search ").waitFor();
    const RecBankruptcySearch1: any = await page.locator("p-chip div div").nth(11).textContent();
    expect.soft(RecBankruptcySearch1.includes("Not Bankrupt")).toBeTruthy();
    await page.locator("p-treetabletoggler").nth(9).click();
    const MilitarySearch: any = await page.locator("p-chip div div").nth(12).textContent();
    expect.soft(MilitarySearch.match("In-Progress")).toBeTruthy();
    await page.locator("p-treetabletoggler").nth(12).click();
    await page.locator("text= Request Military Search ").waitFor();
    const ReqMilitarySearch: any = await page.locator("p-chip div div").nth(13).textContent();
    expect.soft(ReqMilitarySearch.match("Yet to start")).toBeTruthy();
    await page.locator("text= Request Military Search ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Ordered']").click();
    await page.locator("text=Submit").last().click();
    const blankrequestmilitarytoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankrequestmilitarytoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("6.6 Request Military Search Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Request Military Search (Success) toaster message missing!");
        console.log("6.6 Unable to Complete Request Military Search Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(5).click();
    await page.locator("text= Military Search ").waitFor();
    await page.locator("p-treetabletoggler").nth(12).click();
    await page.locator("text= Request Military Search ").waitFor();
    const ReqMilitarySearch1: any = await page.locator("p-chip div div").nth(13).textContent();
    expect.soft(ReqMilitarySearch1.match("Ordered")).toBeTruthy();
    const RecMilitarySearch: any = await page.locator("p-chip div div").nth(14).textContent();
    expect.soft(RecMilitarySearch.match("Yet to start")).toBeTruthy();
    await page.locator("text= Receive Military Search ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Not in Active Military Duty']").click();
    await page.locator("text=Submit").last().click();
    const blankreceivemilitarytoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankreceivemilitarytoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("6.7 Receive Military Search Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Receive Military Search (Success) toaster message missing!");
        console.log("6.7 Unable to Complete Receive Military Search Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(5).click();
    await page.locator("text= Bankruptcy Search ").waitFor();
    const SaleHeld: any = await page.locator("p-chip div div").nth(11).textContent();
    expect.soft(SaleHeld.includes("Yet to start")).toBeTruthy();
    await page.locator("text= Military Search ").waitFor();
    const MilitarySearch1: any = await page.locator("p-chip div div").nth(12).textContent();
    expect.soft(MilitarySearch1.match("Completed")).toBeTruthy();
    await page.locator("p-treetabletoggler").nth(12).click();
    await page.locator("text= Receive Military Search ").waitFor();
    const RecMilitarySearch1: any = await page.locator("p-chip div div").nth(14).textContent();
    expect.soft(RecMilitarySearch1.includes("Not in Activ")).toBeTruthy();
    await page.locator("text= Sale Held ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Held']").click();
    await page.locator("text=Submit").last().click();
    const blanksaleheldtoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blanksaleheldtoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("6.8 Sale Held Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Sale Held (Success) toaster message missing!");
        console.log("6.8 Unable to Complete Sale Held Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(5).click();
    console.log("\nStep7: FHA Letter");
    const Sale1: any = await page.locator("p-chip div div").nth(5).textContent();
    expect.soft(Sale1.match("Completed")).toBeTruthy();
    await page.locator("text= Bankruptcy Search ").waitFor();
    const SaleHeld1: any = await page.locator("p-chip div div").nth(11).textContent();
    expect.soft(SaleHeld1.includes("Held")).toBeTruthy();
    await page.locator("p-treetabletoggler").nth(5).click();
    await page.locator("text= FHA Letter ").waitFor();
    const FHALetter: any = await page.locator("p-chip div div").nth(6).textContent();
    expect.soft(FHALetter.includes("Yet to start")).toBeTruthy();
    await page.locator("text= FHA Letter ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Review completed']").click();
    await page.locator("text=Submit").last().click();
    const blankfhalettertoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankfhalettertoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("7.1 FHA Letter Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: FHA Letter (Success) toaster message missing!");
        console.log("7.1 Unable to Complete FHA Letter Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("text= FHA Letter ").waitFor();
    const FHALetter1: any = await page.locator("p-chip div div").nth(6).textContent();
    expect.soft(FHALetter1.includes("Review compl")).toBeTruthy();
    const Step_ReferralReceived = await page.locator("p-chip div div").nth(0).textContent();
    const Step_TitleSearch = await page.locator("p-chip div div").nth(1).textContent();
    const Step_Complaint = await page.locator("p-chip div div").nth(2).textContent();
    const Step_Service = await page.locator("p-chip div div").nth(3).textContent();
    const Step_Judgement = await page.locator("p-chip div div").nth(4).textContent();
    const Step_Sale = await page.locator("p-chip div div").nth(5).textContent();
    const Step_FHALetter = await page.locator("p-chip div div").nth(6).textContent();
    if (Step_ReferralReceived?.includes("Review compl") && Step_TitleSearch?.includes("Completed") && 
    Step_Complaint?.includes("Completed") && Step_Service?.includes("Completed") && 
    Step_Judgement?.includes("Completed") && Step_Sale?.includes("Completed") && 
    Step_FHALetter?.includes("Review compl")) 
    {
        console.log("\nFinal Output:- Success, Case Steps Pass");    
    } 
    else 
    {
        console.log("\nFinal Output:- Error, Case Steps Failed");
    }
});
test('@ViaFlowTesting @CaseManagement @Regression Via Flow Testing: Creating new case and entering required details',async ({page})=>
{
    //---------------------------Case Management : Case/File Info Module--------------------------------
    await page.locator("div[aria-label='Case Management']").click(); //clicking on side menu button of Case Management
    await Promise.all([
        page.waitForURL("https://qa-via.outamationlabs.com/via-new/#/app/case-management/case-form/referral-info"),
        page.locator("div[aria-label='New Case']").click() //clicking on New Case button
    ]);
    if(page.url().includes("app/case-management/case-form/referral-info"))
    {
        console.log("User landed on create case page");
    }
    else
    {   
        console.log("User failed to land on create case page");
    }
    await page.locator("p-button[label='Next']").click();
    const blankcreatereferralinfotoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankcreatereferralinfotoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Please fill all the required values!");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Blank Create Referral Info toaster message missing!");
        await page.waitForTimeout(3000);
    }
    let CaseNo: any = await page.locator("via-referral-header span.font-medium").textContent();
    console.log("New Case Number is : " + CaseNo);
    await page.locator("input[formcontrolname='FileNumber']").type(casedetails[0],{delay:50});
    await page.locator("p-dropdown[formcontrolname='CaseType']").click(); //clicking on case type dropdown
    await page.locator("li[aria-label='Bankruptcy']").click();
    await page.locator("p-dropdown[formcontrolname='ClientName']").click(); //clicking on Client Name dropdown
    await page.locator("li[aria-label='ABC Bank']").click();
    await page.locator("#referralCode").type(casedetails[1],{delay:50});
    //-----------------------------Case Management : Loan Info Module---------------------------------
    await page.locator("p-button[label='Next']").click();
    const blankloaninfotoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankloaninfotoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Please fill all the required values!");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Blank loan info toaster message missing!");
        await page.waitForTimeout(3000);
    }
    await page.locator("#integeronly").first().type(loaninfo[0],{delay:50});
    await page.locator("p-dropdown[formcontrolname='LoanType']").click(); //clicking on Loan Type dropdown
    await page.locator("li[aria-label='FHLMC']").click();
    await page.locator("p-dropdown[formcontrolname='Investor']").click(); //clicking on Investor dropdown
    await page.locator("li[aria-label='FHLMC']").click();
    await page.locator("p-dropdown[formcontrolname='LienPosition']").click(); //clicking on Lien Position dropdown
    await page.locator("li[aria-label='First Lien']").click();
    await page.locator("button span.pi-calendar").first().click(); //Due Date
    await page.locator("td.p-datepicker-today.ng-star-inserted").click(); //selecting current date
    await page.locator("button span.pi-calendar").nth(1).click(); //Loan Origination Date
    await page.locator("td.p-datepicker-today.ng-star-inserted").click(); //selecting current date
    await page.locator("input#currency-us").first().type(loaninfo[1],{delay:50});
    await page.locator("input#currency-us").nth(1).type(loaninfo[2],{delay:50});
    await page.locator("input#currency-us").nth(2).type(loaninfo[3],{delay:50});
    await page.locator("input#percent").type(loaninfo[4],{delay:50});
    await page.locator("input#currency-us").nth(3).type(loaninfo[5],{delay:50});
    await page.locator("input#currency-us").nth(4).type(loaninfo[6],{delay:50});
    await page.locator("input#currency-us").last().type(loaninfo[7],{delay:50});
    //---------------------------Case Management : Borrower Info Module--------------------------------
    await page.locator("p-button[label='Next']").click();
    const blankborrowerinfotoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankborrowerinfotoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Please fill all the required values!");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Blank Borrower info toaster message missing!");
        await page.waitForTimeout(3000);
    }
    await page.locator("input[formcontrolname='Borrower1_FirstName']").type(borrowerinfo[0],{delay:50});
    await page.locator("input[formcontrolname='Borrower1_MiddleName']").type(borrowerinfo[1],{delay:50});
    await page.locator("input[formcontrolname='Borrower1_LastName']").type(borrowerinfo[2],{delay:50});
    await page.locator("input[formcontrolname='MailingAddress1']").type(wborrowerinfo[0],{delay:50});
    expect.soft(wborrowerinfo[0].match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)).toBeFalsy();
    await page.locator("input[formcontrolname='MailingAddress1']").clear();
    await page.locator("input[formcontrolname='MailingAddress1']").type(borrowerinfo[3],{delay:50});
    expect.soft(borrowerinfo[3]).toMatch(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    await page.locator("input[formcontrolname='MailingAddress2']").type(wborrowerinfo[1],{delay:50});
    expect.soft(wborrowerinfo[1].match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)).toBeFalsy();
    await page.locator("input[formcontrolname='MailingAddress2']").clear();
    await page.locator("input[formcontrolname='MailingAddress2']").type(borrowerinfo[4],{delay:50});
    expect.soft(borrowerinfo[4]).toMatch(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    await page.locator("input[formcontrolname='Zip']").type(wborrowerinfo[2],{delay:50});
    expect.soft(wborrowerinfo[2].match(/(^\d{5}$)|(^\d{5}-\d{4}$)/)).toBeFalsy();
    await page.locator("input[formcontrolname='Zip']").clear();
    await page.locator("input[formcontrolname='Zip']").type(borrowerinfo[6],{delay:50});
    expect.soft(borrowerinfo[6]).toMatch(/(^\d{5}$)|(^\d{5}-\d{4}$)/);
    await page.locator("input[formcontrolname='City']").type(borrowerinfo[5],{delay:50});
    await page.locator("p-dropdown[formcontrolname='County']").last().click(); //clicking on county dropdown
    await page.locator("li[aria-label='Miami-Dade']").click(); //selecting county from dropdown
    await page.locator("p-dropdown[formcontrolname='State']").click(); //clicking on state dropdown
    await page.locator("li[aria-label='Arizona']").click(); //selecting state from dropdown
    await page.getByRole('textbox', { name: '999-99-9999' }).type(borrowerinfo[7], {delay: 50});
    //-----------------------------Case Management : Property Info Module-------------------------------
    await page.locator("p-button[label='Next']").click();
    const blankpropertyinfotoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankpropertyinfotoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Please fill all the required values!");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Blank Property info toaster message missing!");
        await page.waitForTimeout(3000);
    }
    await page.locator("input[formcontrolname='PropertyZip']").type(wpropertyinfo[0],{delay:50});
    expect.soft(wpropertyinfo[0].match(/(^\d{5}$)|(^\d{5}-\d{4}$)/)).toBeFalsy();
    await page.locator("input[formcontrolname='PropertyZip']").clear();
    await page.locator("input[formcontrolname='PropertyZip']").type(propertyinfo[3],{delay:50});
    expect.soft(propertyinfo[3]).toMatch(/(^\d{5}$)|(^\d{5}-\d{4}$)/);
    await page.locator("input[formcontrolname='PropertyCity']").type(propertyinfo[2],{delay:50});
    await page.locator("p-dropdown[formcontrolname='PropertyCounty']").click(); //clicking on County dropdown
    await page.locator("li[aria-label='Miami-Dade']").click(); //selecting County from dropdown
    await page.locator("p-dropdown[formcontrolname='PropertyState']").click(); //clicking on state dropdown
    await page.locator("li[aria-label='Arizona']").click(); //selecting state from dropdown
    await page.locator("input[formcontrolname='PropertyAddress1']").type(propertyinfo[0],{delay:50});
    await page.locator("input[formcontrolname='PropertyAddress2']").type(propertyinfo[1],{delay:50});
    await page.locator("p-dropdown[formcontrolname='PropertyType']").click(); //clicking on Property type dropdown
    await page.locator("li[aria-label='Single Family']").click(); //selecting Property type from dropdown
    await page.locator("p-dropdown[formcontrolname='PropertyCurrentOccupancy']").click(); //clicking on  Property Current Occupancy dropdown
    await page.locator("li[aria-label='Borrower Occupied']").click(); //selecting  Property Current Occupancy from dropdown
    await page.locator("#propertyVesting").type(propertyinfo[4], {delay:50});
    await page.locator("#propertyUnits").type(propertyinfo[5], {delay:50});
    await page.locator("#taxParcelNumber").type(propertyinfo[6], {delay:50});
    await page.locator("textarea[formcontrolname='LegalDescription']").fill(propertyinfo[7]);
    await page.locator("p-button[label='Next']").click();
    const blankdefaultinfotoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankdefaultinfotoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Please fill all the required values!");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Blank Default info toaster message missing!");
        await page.waitForTimeout(3000);
    }
    await page.locator("button span.pi-calendar").last().click(); //Current Last Paid Installment Date
    await page.locator("td.p-datepicker-today.ng-star-inserted").click(); //selecting current date
    await page.locator("#integeronly").nth(1).type(defaultinfo[0], {delay: 50});
    await page.locator("#integeronly").nth(2).type(defaultinfo[1], {delay: 50});
    await page.locator("#integeronly").nth(3).type(defaultinfo[2], {delay: 50});
    await page.locator("#integeronly").nth(4).type(defaultinfo[3], {delay: 50});
    await page.locator("#integeronly").nth(5).type(defaultinfo[4], {delay: 50});
    await page.locator("#integeronly").nth(6).type(defaultinfo[5], {delay: 50});
    await page.locator("#integeronly").nth(7).type(defaultinfo[6], {delay: 50});
    await page.locator("#integeronly").nth(8).type(defaultinfo[7], {delay: 50});
    await page.locator("p-button[label='Next']").click();
    const blanktrusteeinfotoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blanktrusteeinfotoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Please fill all the required values!");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Blank Trustee info toaster message missing!");
        await page.waitForTimeout(3000);
    }
    await page.locator("input[formcontrolname='TrusteeName']").type(trusteeinfo[0], {delay: 50});
    await page.locator("input[formcontrolname='TrusteeAddress1']").type(trusteeinfo[1], {delay: 50});
    await page.locator("input[formcontrolname='TrusteeAddress2']").type(trusteeinfo[2], {delay: 50});
    await page.locator("input[formcontrolname='TrusteeZip']").type(trusteeinfo[3], {delay: 50});
    await page.locator("input[formcontrolname='TrusteeCity']").type(trusteeinfo[4], {delay: 50});
    await page.locator("p-dropdown[formcontrolname='TrusteeState']").click(); //clicking on state dropdown
    await page.locator("li[aria-label='Arizona']").click(); //selecting state from dropdown
    //---------------------------Case Management : Choose Document Module-------------------------------
    await page.waitForTimeout(3000);
    await Promise.all([
        page.waitForURL("https://qa-via.outamationlabs.com/via-new/#/app/case-management/case-form/"+ CaseNo +"/document"),
        page.locator("text=Next").click()
    ]);
    await page.locator("p-button[label='Next']").click();
    const blankdocumenttoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankdocumenttoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Please fill all the required values!");  
        await page.waitForTimeout(3000);
        await page.locator("p-dropdown[formcontrolname='documentType']").click(); //clicking on document type dropdown
        await page.locator("li[aria-label='Loan Application']").click(); //selecting document type from dropdown
        await page.setInputFiles('input[type="file"]', 'Documents/CPT Assignment 1.pdf');
        const fileName = await page.locator("p-fileupload span.p-button-label").textContent();
        console.log("Uploaded file name is : " + fileName);
        await Promise.all([
            page.waitForURL("https://qa-via.outamationlabs.com/via-new/#/app/case-management/case-form/"+ CaseNo +"/workflow"),
            page.locator("text=Next").click()
        ]);
        if(fileName === "CPT Assignment 1.pdf" && page.url().includes("app/case-management/case-form/"+ CaseNo +"/workflow"))
        {
            console.log("Document Information Submitted");
            console.log("User redirected to workflow page");
        }
        else
        {   
            console.log("Document Information Not Submitted");
            console.log("User failed to land on workflow page");
        }
    } 
    else
    {
        console.log("Error: Blank document info toaster message missing!");
        await page.waitForTimeout(3000);
        if(page.url().includes("app/case-management/case-form/"+ CaseNo +"/workflow"))
        {
            console.log("Document Information Skipped");
            console.log("User redirected to workflow page");
        }
        else
        {   
            console.log("Document Information Skipped");
            console.log("User failed to land on workflow page");
        }
    }
    //----------------------------Case Management : Choose Workflow Module-----------------------------
    await page.locator("p-button[label='Submit']").click();
    const blankworkflowtoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankworkflowtoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Please select a workflow!");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: select workflow toaster message missing!");
        await page.waitForTimeout(3000);
    }
    await page.pause();
    await page.locator("div[role='radio']").first().click();
    expect.soft(await page.locator("div[role='radio']").first().isChecked());
    await Promise.all([
        page.waitForURL("https://qa-via.outamationlabs.com/via-new/#/app/case-management/cases"),
        page.locator("p-button[label='Submit']").click()
    ]);
    if(page.url().includes("app/case-management/cases"))
    {
        console.log("Workflow Information Submitted");
        console.log("Case Creation Successful");
        console.log("User redirected to cases page");
    }
    else
    {   
        console.log("Workflow Information Not Submitted");
        console.log("Case Creation Unsuccessful");
        console.log("User failed to land on cases page");
    }
    var caseValues = new Array();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");
    for(let i = 0; i < await rows.count(); ++i)
    {
        const CaseSearchNos = await rows.nth(i).locator("td").first().textContent();
        caseValues.push(CaseSearchNos);
        for(var j in caseValues)
        {
            if((" " + CaseNo + " ").includes(caseValues[j]))
            {
                await rows.nth(i).locator("a").click();
                break;
            }
        }
    }
    await page.waitForTimeout(5000);
    const CaseNumberDetail: any = await page.locator("#p-panel-0-content > div > div > div:nth-child(2) > span:nth-child(2)").textContent();
    console.log("Law Firm ID is : " + CaseNumberDetail);
    if(CaseNo.match(CaseNumberDetail))
    {
        console.log("Case found on case search page");
        console.log("Case Number is : " + CaseNumberDetail);
    }
    else
    {
        console.log("Failed to found case on case search page");
    }
    //-----------------------------------------Verify Case Details---------------------------------------
    const BorrowerName = borrowerinfo[0] + " " + borrowerinfo[2];
    const FullAddress = propertyinfo[0] + " " + propertyinfo[1];
    const Case_Number = await page.locator("#p-panel-0-content > div > div > div:nth-child(1) > span:nth-child(2)").textContent();
    const Law_FirmID = await page.locator("#p-panel-0-content > div > div > div:nth-child(2) > span:nth-child(2)").textContent();
    const Borrower_Name = await page.locator("#p-panel-0-content > div > div > div:nth-child(3) > span:nth-child(2)").textContent();
    const Loan_Number = await page.locator("#p-panel-0-content > div > div > div:nth-child(4) > span:nth-child(2)").textContent();
    const Investor_Type = await page.locator("#p-panel-0-content > div > div > div:nth-child(5) > span:nth-child(2)").textContent();
    const Case_Type = await page.locator("#p-panel-0-content > div > div > div:nth-child(6) > span:nth-child(2)").textContent();
    const Servicer_Name = await page.locator("#p-panel-0-content > div > div > div:nth-child(7) > span:nth-child(2)").textContent();
    const Property_Address = await page.locator("#p-panel-0-content > div > div > div:nth-child(8) > span:nth-child(2)").textContent();
    const Property_City = await page.locator("#p-panel-0-content > div > div > div:nth-child(9) > span:nth-child(2)").textContent();
    const Property_State = await page.locator("#p-panel-0-content > div > div > div:nth-child(10) > span:nth-child(2)").textContent();
    const Property_Zip = await page.locator("#p-panel-0-content > div > div > div:nth-child(11) > span:nth-child(2)").textContent();
    const Status = await page.locator("#p-panel-0-content > div > div > div:nth-child(12) > span:nth-child(2)").textContent();
    if(Case_Number?.match("23-4527") && Law_FirmID?.match(CaseNumberDetail) && 
    Borrower_Name?.match(BorrowerName) && Loan_Number?.match(loaninfo[0]) && Investor_Type?.match("FHLMC") && 
    Case_Type?.match("Bankruptcy") && Servicer_Name?.match("ABC Bank") && Property_Address?.match(FullAddress) 
    && Property_City?.match(propertyinfo[2]) && Property_State?.match("Arizona") && 
    Property_Zip?.match(propertyinfo[3]) && Status?.match("In-Progress"))
    {
        console.log("Case Details Verified Successfully");
    }
    else
    {
        console.log("Failed to Verify Case Details");
    }
});