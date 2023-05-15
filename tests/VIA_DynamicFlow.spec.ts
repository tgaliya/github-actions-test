import { test, expect } from '@playwright/test';
import { ECDH } from 'crypto';
test('DynamicCaseSearchTest', async({page})=>
{
    await page.goto("https://qa-via.outamationlabs.com/via-ui/#/app/case-management/cases");
    if(page.url().includes("app/case-management/cases"))
    {
        console.log("User landed on case search page");
    }
    else
    {   
        console.log("User failed to land on case search page");
    }
    await page.waitForTimeout(5000);
    const CaseNumber = " 458243-4981 "; 
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
    const CaseNumberDetail: any = await page.locator("#p-panel-0-content > div > div > div:nth-child(2) > span:nth-child(2)").textContent();
    await page.locator("tbody").waitFor();
    const stepsrows = page.locator("tbody tr");
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
            await stepsrows.nth(++k).click();
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
            //await stepsrows.nth(k).click();
            //await stepsrows.nth(k+1).click();
        }
    }
});
test('DynamicCaseSearchTestExample', async({page})=>
{
    await page.goto("https://qa-via.outamationlabs.com/via-ui/#/app/case-management/cases");
    if(page.url().includes("app/case-management/cases"))
    {
        console.log("User landed on case search page");
    }
    else
    {   
        console.log("User failed to land on case search page");
    }
    await page.waitForTimeout(5000);
    const CaseNumber = " 458243-4981 "; 
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
    const CaseNumberDetail: any = await page.locator("#p-panel-0-content > div > div > div:nth-child(2) > span:nth-child(2)").textContent();
    async function CaseSteps() 
    {
        const Step_Name: any = await page.locator(".p-dialog-title").textContent();
        await page.locator("p-dropdown[id='StepStatus']").click();
        await page.waitForTimeout(2000);
        const Step_Status: any = await page.locator("div[trigger='true']").textContent();
        await page.locator("div[trigger='true']").click();
        await page.waitForTimeout(2000);
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
    await page.locator("tbody").waitFor();
    const stepsrows = page.locator("tbody tr");
    {
        for(let k = 0; k < await stepsrows.count(); ++k)
        {
            const stepname = await stepsrows.nth(k).locator("td").allTextContents();
            // const stepstatus: any = await stepsrows.nth(k).locator("td").nth(8).hover();
            // console.log(stepstatus);
            if(stepname.includes(" Sub Process"))
            {
                await stepsrows.nth(k).click();
                await stepsrows.nth(k+1).click();
                const Step_Name: any = await page.locator(".p-dialog-title").textContent();
                await page.locator("p-dropdown[id='StepStatus']").click();
                await page.waitForTimeout(2000);
                const Step_Status: any = await page.locator("div[trigger='true']").textContent();
                await page.locator("div[trigger='true']").click();
                await page.waitForTimeout(2000);
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
                await stepsrows.nth(k).click();
                await stepsrows.nth(k+1).click();
                const ActualEnd = await stepsrows.nth(k+1).locator("td").nth(7).textContent();
                console.log(ActualEnd);
                await page.locator("p-badge").nth(k+1).hover();
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
                // await stepsrows.nth(k++).click();
                // CaseSteps();
            }
            else
            {
                await stepsrows.nth(k).click();
                const Step_Name: any = await page.locator(".p-dialog-title").textContent();
                await page.locator("p-dropdown[id='StepStatus']").click();
                await page.waitForTimeout(2000);
                const Step_Status: any = await page.locator("div[trigger='true']").textContent();
                await page.locator("div[trigger='true']").click();
                await page.waitForTimeout(2000);
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
                const ActualEnd = await stepsrows.nth(k).locator("td").nth(7).textContent();
                console.log(ActualEnd);
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
        }   
    }   
}); 
test('DynamicCaseSearchTestByChatgpt', async({page})=>
{
    await page.goto("https://qa-via.outamationlabs.com/via-ui/#/app/case-management/cases");
    if(page.url().includes("app/case-management/cases"))
    {
        console.log("User landed on case search page");
    }
    else
    {   
        console.log("User failed to land on case search page");
    }
    await page.waitForTimeout(5000);
    const CaseNumber = " 458243-4981 "; 
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
    const CaseNumberDetail: any = await page.locator("#p-panel-0-content > div > div > div:nth-child(2) > span:nth-child(2)").textContent();
    await page.locator("tbody").waitFor();
    let stepsrows = page.locator("tbody tr");
    let stepIndex = 0;
    async function processSteps(stepIndex, stepsrows, page) 
    {
        if (stepIndex >= await stepsrows.count()) 
        {
            return; // exit the function when all steps have been processed
        }
        const stepname = await stepsrows.nth(stepIndex).locator("td").allTextContents();
        if (stepname.includes(" Step ") || stepname.includes(" Integration ")) 
        {
            await stepsrows.nth(stepIndex).click();
            const Step_Name = await page.locator(".p-dialog-title").textContent();
            await page.locator("p-dropdown[id='StepStatus']").click();
            await page.waitForTimeout(1000);
            const Step_Status = await page.locator("div[trigger='true']").textContent();
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
            await page.locator("p-badge").nth(stepIndex).hover();
            if (page.locator("p-badge").getByText(Step_Status)) 
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
            await stepsrows.nth(stepIndex).click();
            await stepsrows.nth(++stepIndex).click();
            const Step_Name = await page.locator(".p-dialog-title").textContent();
            await page.locator("p-dropdown[id='StepStatus']").click();
            await page.waitForTimeout(1000);
            const Step_Status = await page.locator("div[trigger='true']").textContent();
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
    await processSteps(0, stepsrows, page);
    await processSteps(stepIndex + 1, stepsrows, page);
    //await processSteps(stepIndex + 1, stepsrows, page);
});
test.only('Case Steps Status', async({page})=>
{
    await page.goto("https://qa-via.outamationlabs.com/via-ui/#/app/case-management/cases");
    await page.locator("div[aria-label='Advance Search']").click() //clicking on Advance search button on side menu
    if(page.url().includes("app/case-management/cases"))
    {
        console.log("User landed on case search page");
    }
    else
    {   
        console.log("User failed to land on case search page");
    }
    const CaseNumber = " 458243-4552 ";
    await page.waitForTimeout(5000);
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
    console.log("\nCase Processing Final Result : ");
    const Step_ReferralReceived_Status = page.locator("p-badge").nth(0);
    const Step_ReferralReceived_StatusText = page.locator(".p-tooltip-text");
    await Step_ReferralReceived_Status.hover();
    await expect(Step_ReferralReceived_StatusText).toBeVisible();
    await expect.soft(Step_ReferralReceived_StatusText).toHaveText("Refferral received");
    const Step_TitleOrder_Status = page.locator("p-badge").nth(1);
    const Step_TitleOrder_StatusText = page.locator(".p-tooltip-text");
    await Step_TitleOrder_Status.hover();
    await expect(Step_TitleOrder_StatusText).toBeVisible();
    await expect.soft(Step_TitleOrder_StatusText).toHaveText("Completed");
    const Step_FHALetter_Status = page.locator("p-badge").nth(2);
    const Step_FHALetter_StatusText = page.locator(".p-tooltip-text");
    await Step_FHALetter_Status.hover();
    await expect(Step_FHALetter_StatusText).toBeVisible();
    await expect.soft(Step_FHALetter_StatusText).toHaveText("Review completed");
    const Step_Complaint_Status = page.locator("p-badge").nth(4);
    const Step_Complaint_StatusText = page.locator(".p-tooltip-text");
    await Step_Complaint_Status.hover();
    await expect(Step_Complaint_StatusText).toBeVisible();
    await expect.soft(Step_Complaint_StatusText).toHaveText("Completed");
    const Step_Service_Status = page.locator("p-badge").nth(5);
    const Step_Service_StatusText = page.locator(".p-tooltip-text");
    await Step_Service_Status.hover();
    await expect(Step_Service_StatusText).toBeVisible();
    await expect.soft(Step_Service_StatusText).toHaveText("Completed");
    const Step_Judgement_Status = page.locator("p-badge").nth(6);
    const Step_Judgement_StatusText = page.locator(".p-tooltip-text");
    await Step_Judgement_Status.hover();
    await expect(Step_Judgement_StatusText).toBeVisible();
    await expect.soft(Step_Judgement_StatusText).toHaveText("Completed");
    const Step_Sale_Status = page.locator("p-badge").nth(7);
    const Step_Sale_StatusText = page.locator(".p-tooltip-text");
    await Step_Sale_Status.hover();
    await expect(Step_Sale_StatusText).toBeVisible();
    await expect.soft(Step_Sale_StatusText).toHaveText("Completed"); 
    expect.soft(test.info().errors).toHaveLength(0);
    //console.log("Success, Case Steps Pass");
    if(test.info().status == test.info().expectedStatus)
    {
        console.log("Success, Case Steps Pass");
    }
    else
    {
        console.log("Error, Case Steps Failed ");
    }
});