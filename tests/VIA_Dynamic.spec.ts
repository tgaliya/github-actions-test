import { test, expect } from '@playwright/test';
test.beforeEach(async({page}) =>
{
    //-----------------------------------------Login Module---------------------------------------------
    // let username = "Via";
    // let password = "Via@12345";
    // let wpassword = "Via@123";
    await page.goto("https://qa-via.outamationlabs.com/via-ui");
    await page.waitForTimeout(1500);
    await page.locator("button[label='Login']").click();
    await page.waitForTimeout(1500);
    const blanklogininfotoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blanklogininfotoaster === true)
    {
        await expect.soft(page.locator("p-toastitem")).toContainText("Please fill all the required values!");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Blank Login toaster message missing!");
    }
    // await page.locator("input[placeholder='Username']").type(username,{delay:100});
    // await page.locator("input[placeholder='Password']").type(wpassword,{delay:100});
    // expect.soft(wpassword.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).toBeFalsy();
    // await page.locator("input[placeholder='Password']").clear();
    // await page.locator("input[placeholder='Password']").type(password,{delay:100});
    // expect.soft(wpassword.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/));
    // await page.locator("input[placeholder='Password']").press('Tab');
    // await page.locator("button[label='Login']").click();
    await page.locator("button[label='Verify my account']").click();
    await page.waitForTimeout(1500);
    const blankotptoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankotptoaster === true) 
    {
        await expect.soft(page.locator("p-toastitem")).toContainText("Please enter OTP!");  
        await page.waitForTimeout(3000);
    } 
    else 
    {
        console.log("Error: Blank OTP toaster message missing!");
        await page.waitForTimeout(3000);
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
        console.log("\nLogin:");
        console.log("User Login Successful");
    }
    else
    {   
        console.log("\nLogin:");
        console.log("User Login Failed");
    }
});
// let userdetails: string[] = ['jasonholder321@gmail.com', 'Jason','Holder','J','281-890-0036',
// 'Sales Executive', 'Sales'];
// let wuserdetails: string[] = ["jasonholder@gmail-com","+1 572-790-1002","4391","(567) 890-5682"];
// let entitydetails: string[] = ['Money Magnet', 'jasonholder@gmail.com', '011-772-8511', '313-661-9191',
// '1', '772-123-4567','1', '1073 Spring Avenue', 'Texas', 'Houston', '77070'];
// let wentitydetails: string[] = ["jasonholder@gmail-com", "+1 571-789-1231", "(890) 027-5682", "9876"];
// let clientdetails: string[] = ['Money Magnet','MMPL', 'jasonholder@gmail.com', '011-772-8511', 
// '1073 Spring Avenue', 'Texas', 'Houston', '71707-7015','313-661-9191','1','772-123-4567','1'];
// let wclientdetails: string[] = ["jasonholder@gmail-com", "43901.0110", "+2 571-789-1111", "(890) 026-5681"];
// let trusteeinfo: string[] = ['Andrew Tye', '2618 Caldwell Road', 'Simform Apt', '14428', 'Miami'];
test('DynamicCaseSearch', async({page})=>
{
    await page.locator("div[aria-label='Case Management']").click(); //clicking on Advance search button on side menu
    await Promise.all([
        page.waitForURL("https://qa-via.outamationlabs.com/via-ui/#/app/case-management/cases"),
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
    await page.waitForTimeout(5000);
    const CaseNumber = " 458243-9980 "; 
    var caseValues = new Array();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");
    for(let i = 0; i < await rows.count(); ++i)
    {
        const CaseSearchNos = await rows.nth(i).locator("td").first().textContent();
        caseValues.push(CaseSearchNos);
        //console.log(caseValues);
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
    const CaseNumberDetail: any = await page.locator("#p-panel-2-content > div > div > div:nth-child(2) > span:nth-child(2)").textContent();
    //console.log(CaseNumberDetail);
    await page.locator("tbody").waitFor();
    const stepsrows = page.locator("tbody tr");
    for(let k = 0; k < await stepsrows.count(); ++k)
    {
        const stepname = await stepsrows.nth(k).locator("td").allTextContents();
        //console.log(stepname);
        if(stepname.includes(" Step ") || stepname.includes(" Integration "))
        {
            await stepsrows.nth(k).click();
            //break; 
            const Step_Name: any = await page.locator(".p-dialog-title").textContent();
            //console.log(Step_Name);
            //await page.locator("p-dropdown[id='TitleSearchType']").click();
            //await page.waitForTimeout(1000);
            //await page.locator("li[aria-label='Full Search']").click();
            await page.locator("p-dropdown[id='StepStatus']").click();
            await page.waitForTimeout(1000);
            const Step_Status: any = await page.locator("div[trigger='true']").textContent();
            //console.log(Step_Status);
            await page.locator("div[trigger='true']").click();
            await page.waitForTimeout(1000);
            await page.locator("p-button[label='Submit']").click();
            let toaster: any = Step_Name + "toaster";
            toaster = await page.locator("p-toastitem").isVisible();
            if (toaster === true)
            {
                await expect.soft(page.locator("p-toastitem")).toContainText("Successfully updated data!");  
                await page.waitForTimeout(3000);
            } 
            else
            {
                console.log("Error: " + Step_Name + "(Success) toaster message missing!");
                await page.waitForTimeout(3000);
            }
            await page.locator("tbody").waitFor();
            await page.locator("p-badge").nth(k).hover();
            if(page.locator("p-badge").getByText(Step_Status))
            {
                console.log(Step_Name + " step completed");
                await page.waitForTimeout(3000);
            }
            else
            {
                console.log(Step_Name + " step failed");
                await page.waitForTimeout(3000);
            }
        }
        else
        {
            await stepsrows.nth(k).click();
            await stepsrows.nth(k+1).click();
            //break; 
            const Step_Name: any = await page.locator(".p-dialog-title").textContent();
            //console.log(Step_Name);
            await page.locator("p-dropdown[id='StepStatus']").click();
            await page.waitForTimeout(1000);
            const Step_Status: any = await page.locator("div[trigger='true']").textContent();
            //console.log(Step_Status);
            await page.locator("div[trigger='true']").click();
            await page.waitForTimeout(1000);
            await page.locator("p-button[label='Submit']").click();
            let toaster: any = Step_Name + "toaster";
            toaster = await page.locator("p-toastitem").isVisible();
            if (toaster === true)
            {
                await expect.soft(page.locator("p-toastitem")).toContainText("Successfully updated data!");  
                await page.waitForTimeout(3000);
            } 
            else
            {
                console.log("Error: " + Step_Name + "(Success) toaster message missing!");
                await page.waitForTimeout(3000);
            }
            await page.locator("tbody").waitFor();
        }
    }
    //const Status_InProgress = await page.locator("p-chip[status='In-Progress']").getAttribute("status");
    //console.log(Status_InProgress);
    //const Status_Label = await page.locator("p-chip[status='In-Progress'] div div").textContent();
    //console.log(Status_Label);
    // if(Status_InProgress?.includes("In-Progress") && Status_Label?.includes("Yet to start"))
    // {
    //     await page.locator("p-chip[status='In-Progress']").click();
    // }
    // else
    // {
    //     console.log("No Case Found with the Status In Progress");
    // }
    // const Step_Name: any = await page.locator(".p-dialog-title").textContent();
    //console.log(Step_Name);
    // await page.locator("p-dropdown[id='StepStatus']").click();
    // await page.waitForTimeout(1000);
   // const Step_Status: any = await page.locator("div[trigger='true']").textContent();
    //console.log(Step_Status);
    // await page.locator("div[trigger='true']").click();
    // await page.waitForTimeout(1000);
    // await page.locator("text=Submit").click();
    // const referrelreceivedtoaster: boolean = await page.locator("p-toastitem").isVisible();
    // if (referrelreceivedtoaster === true) 
    // {
    //     await expect.soft(page.locator("p-toastitem")).toContainText("Successfully updated data!");  
    //     await page.waitForTimeout(3000);
    // } 
    // else
    // {
    //     console.log("Error: " + Step_Name + "(Success) toaster message missing!");
    //     await page.waitForTimeout(3000);
    // }
    // await page.locator("tbody").waitFor();
    // await page.locator("p-chip[status='Completed'] div div").hover();
    // if(page.locator("p-chip[status='Completed'] div div").getByText(Step_Status))
    // {
    //     console.log(Step_Name + " step completed");
    // }
    // else
    // {
    //     console.log(Step_Name + " step failed");
    // }
    //------------------------------------------------------------------
    // const Status_Label1: any = await page.locator("p-chip[status='Completed'] div div").hover();
    // console.log(Status_Label1);
    // if(Step_Status.includes(Status_Label1) || Status_Label1?.includes("Completed"))
    // {
    //     console.log(Step_Name + " step completed");
    // }
    // else
    // {
    //     console.log(Step_Name + " step failed");
    // }
    // await page.locator("p-chip[status='Completed'] div div").hover();
    // expect.soft(page.locator("p-chip[status='Completed'] div div").getByText(Step_Status)).toBeTruthy();
    // console.log(Step_Name + " step completed");
    //await expect(page.locator("p-chip[status='Completed'] div div")).toHaveText(Step_Status);
});
test.only('DynamicCaseSearchTest', async({page})=>
{
    await page.locator("div[aria-label='Case Management']").click(); //clicking on Advance search button on side menu
    await Promise.all([
        page.waitForURL("https://qa-via.outamationlabs.com/via-ui/#/app/case-management/cases"),
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
    await page.waitForTimeout(5000);
    const CaseNumber = " 458243-9980 "; 
    var caseValues = new Array();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");
    for(let i = 0; i < await rows.count(); ++i)
    {
        const CaseSearchNos = await rows.nth(i).locator("td").first().textContent();
        caseValues.push(CaseSearchNos);
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
    const CaseNumberDetail: any = await page.locator("#p-panel-2-content > div > div > div:nth-child(2) > span:nth-child(2)").textContent();
    await page.locator("tbody").waitFor();
    const stepsrows = page.locator("tbody tr");
    async function stepsclick()
    {
            const Step_Name: any = await page.locator(".p-dialog-title").textContent();
            await page.locator("p-dropdown[id='StepStatus']").click();
            await page.waitForTimeout(1000);
            const Step_Status: any = await page.locator("div[trigger='true']").textContent();
            await page.locator("div[trigger='true']").click();
            await page.waitForTimeout(1000);
            await page.locator("p-button[label='Submit']").click();
            let toaster: any = Step_Name + "toaster";
            toaster = await page.locator("p-toastitem").isVisible();
            if (toaster === true)
            {
                await expect.soft(page.locator("p-toastitem")).toContainText("Successfully updated data!");  
                await page.waitForTimeout(3000);
            } 
            else
            {
                console.log("Error: " + Step_Name + "(Success) toaster message missing!");
                await page.waitForTimeout(3000);
            }
            await page.locator("tbody").waitFor(); 
    }
    for(let k = 0; k < await stepsrows.count(); ++k)
    {
        const stepname = await stepsrows.nth(k).locator("td").allTextContents();
        if(stepname.includes(" Step ") || stepname.includes(" Integration "))
        {
            await stepsrows.nth(k).click();
            const Step_Name: any = await page.locator(".p-dialog-title").textContent();
            await page.locator("p-dropdown[id='StepStatus']").click();
            await page.waitForTimeout(1000);
            const Step_Status: any = await page.locator("div[trigger='true']").textContent();
            await page.locator("div[trigger='true']").click();
            await page.waitForTimeout(1000);
            await page.locator("p-button[label='Submit']").click();
            let toaster: any = Step_Name + "toaster";
            toaster = await page.locator("p-toastitem").isVisible();
            if (toaster === true)
            {
                await expect.soft(page.locator("p-toastitem")).toContainText("Successfully updated data!");  
                await page.waitForTimeout(3000);
            } 
            else
            {
                console.log("Error: " + Step_Name + "(Success) toaster message missing!");
                await page.waitForTimeout(3000);
            }
            await page.locator("tbody").waitFor();
            await page.locator("p-badge").nth(k).hover();
            if(page.locator("p-badge").getByText(Step_Status))
            {
                console.log(Step_Name + " step completed");
                await page.waitForTimeout(3000);
            }
            else
            {
                console.log(Step_Name + " step failed");
                await page.waitForTimeout(3000);
            }
        }
        else
        {
            await stepsrows.nth(k).click();
            await stepsrows.nth(k+1).click();
            stepsclick();
            await stepsrows.nth(k).click();
            await stepsrows.nth(k+1).click();
        }
    }
});