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
let casedetails: string[] = ['10105', '1005','005', 'Notes must be blank'];
let loaninfo: string[] = ['105', '500', '1000', '5000', '5'];
let wloaninfo: string[] = ['$500', ' 1000', '2500.00', '10%'];
let borrowerinfo: string[] = ['Gill', 'Richard', 'Gates', 'GillGates12@gmail.com', 'GillRGates1204@gmail.com', 'New Jersey', '56700', '1005', '25000'];
let wborrowerinfo: string[] = ['GillGates12$gmail.com', 'GillGates333@gmailcom', '4321'];
let propertyinfo: string[] = ['1133 Hartway Street', 'Shayona Apt', 'Miami', '45678', '100'];
let wpropertyinfo: string[] = ['9870', '$50'];
test('@ViaFlowTesting @CaseManagement @Regression Via Flow Testing: Creating new case and entering required details',async ({page})=>
{
    //---------------------------Case Management : Case/File Info Module--------------------------------
    await page.locator("div[aria-label='Case Management']").click(); //clicking on side menu button of Case Management
    await Promise.all([
        page.waitForURL("https://qa-via.outamationlabs.com/via-ui/#/app/case-management/case-form/case-info"),
        page.locator("div[aria-label='New Case']").click() //clicking on New Case button
    ]);
    if(page.url().includes("app/case-management/case-form/case-info"))
    {
        console.log("User landed on create case page");
    }
    else
    {   
        console.log("User failed to land on create case page");
    }
    await page.locator("p-button[label='Next']").click();
    const blankcreatecasetoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankcreatecasetoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Please fill all the required values!");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Blank Create case/file info toaster message missing!");
        await page.waitForTimeout(3000);
    }
    //let CaseNo = await page.getByRole('textbox').nth(1).inputValue();
    let CaseNo = await page.locator("via-case-header span.font-normal").textContent();
    console.log("New Case Number is : " + CaseNo);
    await page.locator("span.p-dropdown-label").nth(1).click(); //clicking on case type dropdown
    await page.locator("li[aria-label='Bankruptcy']").click();
    await page.locator("span.p-dropdown-label").nth(2).click(); //clicking on Investor dropdown
    await page.locator("li[aria-label='FNMA']").click();
    await page.locator("span.p-dropdown-label").nth(3).click(); //clicking on File Type dropdown
    await page.locator("li[aria-label='Default Servicing']").click();
    await page.locator("input[placeholder='Input File Number']").type(casedetails[0]);
    await page.locator("span.p-dropdown-label").nth(4).click(); //clicking on Client Name dropdown
    await page.locator("li[aria-label='ABC Bank']").click();
    await page.locator("#referralCode").type(casedetails[1]);
    await page.locator("span.p-dropdown-label").nth(5).click(); //clicking on Attorney dropdown
    await page.locator("li[aria-label='Brannan, Mindy']").click();
    await page.locator("span.p-dropdown-label").nth(6).click(); //clicking on User dropdown
    await page.locator("li[aria-label='Jason Fischer']").click();
    await page.locator("#barNumber").type(casedetails[2]);
    await page.locator("textarea[placeholder='Input Notes']").fill(casedetails[3]);
    await Promise.all([
        page.waitForURL("https://qa-via.outamationlabs.com/via-ui/#/app/case-management/case-form/"+ CaseNo +"/loan-info"),
        page.locator("p-button[label='Next']").click()
    ]);
    if(page.url().includes("app/case-management/case-form/"+ CaseNo +"/loan-info"))
    {
        console.log("Case Information Submitted");
        console.log("User redirected to loan info page");
    }
    else
    {   
        console.log("Case Information Not Submitted");
        console.log("User failed to land on loan info page");
    }
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
    await page.locator("input[formcontrolname='LoanNumber']").type(loaninfo[0]);
    await page.locator("span.p-dropdown-label").nth(1).click(); //clicking on Loan Type dropdown
    await page.locator("li[aria-label='FHA']").click();
    await page.locator("span.p-dropdown-label").nth(2).click(); //clicking on Lien Position dropdown
    await page.locator("li[aria-label='First Lien']").click();
    await page.locator("button span.pi-calendar").click();
    await page.locator("td.p-datepicker-today.ng-star-inserted").click(); //selecting current date
    await page.locator("input[formcontrolname='CurrentPrincipalBalance']").clear();
    await page.locator("input[formcontrolname='CurrentPrincipalBalance']").type(wloaninfo[0]);
    expect.soft(wloaninfo[0].match(/^[0-9]+$/)).toBeFalsy();
    await page.locator("input[formcontrolname='CurrentPrincipalBalance']").clear();
    await page.locator("input[formcontrolname='CurrentPrincipalBalance']").type(loaninfo[1]);
    expect.soft(loaninfo[1]).toMatch(/^[0-9]+$/);
    await page.locator("input[formcontrolname='OriginalPrincipalBalance']").clear();
    await page.locator("input[formcontrolname='OriginalPrincipalBalance']").type(wloaninfo[1]);
    expect.soft(wloaninfo[1].match(/^[0-9]+$/)).toBeFalsy();
    await page.locator("input[formcontrolname='OriginalPrincipalBalance']").clear();
    await page.locator("input[formcontrolname='OriginalPrincipalBalance']").type(loaninfo[2]);
    expect.soft(loaninfo[2]).toMatch(/^[0-9]+$/);
    await page.locator("input[formcontrolname='MonthlyPaymentAmount']").clear();
    await page.locator("input[formcontrolname='MonthlyPaymentAmount']").type(wloaninfo[2]);
    expect.soft(wloaninfo[2].match(/^[0-9]+$/)).toBeFalsy();
    await page.locator("input[formcontrolname='MonthlyPaymentAmount']").clear();
    await page.locator("input[formcontrolname='MonthlyPaymentAmount']").type(loaninfo[3]);
    expect.soft(loaninfo[3]).toMatch(/^[0-9]+$/);
    await page.locator("input[formcontrolname='InterestRate']").clear();
    await page.locator("input[formcontrolname='InterestRate']").type(wloaninfo[3]);
    expect.soft(wloaninfo[3].match(/^[0-9]+$/)).toBeFalsy();
    await page.locator("input[formcontrolname='InterestRate']").clear();
    await page.locator("input[formcontrolname='InterestRate']").type(loaninfo[4]);
    expect.soft(loaninfo[4]).toMatch(/^[0-9]+$/);
    await Promise.all([
        page.waitForURL("https://qa-via.outamationlabs.com/via-ui/#/app/case-management/case-form/"+ CaseNo +"/borrower-info"),
        page.locator("p-button[label='Next']").click()
    ]);
    if(page.url().includes("app/case-management/case-form/"+ CaseNo +"/borrower-info"))
    {
        console.log("Loan Information Submitted");
        console.log("User redirected to borrower info page");
    }
    else
    {   
        console.log("Loan Information Not Submitted");
        console.log("User failed to land on borrower info page");
    }
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
    await page.locator("input[formcontrolname='Borrower1_FirstName']").type(borrowerinfo[0]);
    await page.locator("input[formcontrolname='Borrower1_MiddleName']").type(borrowerinfo[1]);
    await page.locator("input[formcontrolname='Borrower1_LastName']").type(borrowerinfo[2]);
    await page.locator("input[formcontrolname='MailingAddress1']").type(wborrowerinfo[0]);
    expect.soft(wborrowerinfo[0].match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)).toBeFalsy();
    await page.locator("input[formcontrolname='MailingAddress1']").clear();
    await page.locator("input[formcontrolname='MailingAddress1']").type(borrowerinfo[3]);
    expect.soft(borrowerinfo[3]).toMatch(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    await page.locator("input[formcontrolname='MailingAddress2']").type(wborrowerinfo[1]);
    expect.soft(wborrowerinfo[1].match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)).toBeFalsy();
    await page.locator("input[formcontrolname='MailingAddress2']").clear();
    await page.locator("input[formcontrolname='MailingAddress2']").type(borrowerinfo[4]);
    expect.soft(borrowerinfo[4]).toMatch(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    await page.locator("input[formcontrolname='City']").type(borrowerinfo[5]);
    await page.locator("span.p-dropdown-label").nth(1).click(); //clicking on state dropdown
    await page.locator("li[aria-label='California']").click(); //selecting state from dropdown
    await page.locator("input[formcontrolname='Zip']").type(wborrowerinfo[2]);
    expect.soft(wborrowerinfo[2].match(/(^\d{5}$)|(^\d{5}-\d{4}$)/)).toBeFalsy();
    await page.locator("input[formcontrolname='Zip']").clear();
    await page.locator("input[formcontrolname='Zip']").type(borrowerinfo[6]);
    expect.soft(borrowerinfo[6]).toMatch(/(^\d{5}$)|(^\d{5}-\d{4}$)/);
    await page.locator("span.p-dropdown-label").last().click(); //clicking on county dropdown
    await page.locator("li[aria-label='Miami-Dade']").click(); //selecting county from dropdown
    await page.locator("input[placeholder='Input Loan Number']").type(borrowerinfo[7]);
    await page.locator("input[placeholder='Input Amount']").type(borrowerinfo[8]);
    await Promise.all([
        page.waitForURL("https://qa-via.outamationlabs.com/via-ui/#/app/case-management/case-form/"+ CaseNo +"/property-info"),
        page.locator("p-button[label='Next']").click()
    ]);
    if(page.url().includes("app/case-management/case-form/"+ CaseNo +"/property-info"))
    {
        console.log("Borrower Information Submitted");
        console.log("User redirected to property info page");
    }
    else
    {   
        console.log("Borrower Information Not Submitted");
        console.log("User failed to land on property info page");
    }
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
    await page.locator("input[formcontrolname='PropertyAddress1']").type(propertyinfo[0]);
    await page.locator("input[formcontrolname='PropertyAddress2']").type(propertyinfo[1]);
    await page.locator("input[placeholder='Input City']").type(propertyinfo[2]);
    await page.locator("span.p-dropdown-label").nth(1).click(); //clicking on state dropdown
    await page.locator("li[aria-label='Florida']").click(); //selecting state from dropdown
    await page.locator("input[formcontrolname='PropertyZip']").type(wpropertyinfo[0]);
    expect.soft(wpropertyinfo[0].match(/(^\d{5}$)|(^\d{5}-\d{4}$)/)).toBeFalsy();
    await page.locator("input[formcontrolname='PropertyZip']").clear();
    await page.locator("input[formcontrolname='PropertyZip']").type(propertyinfo[3]);
    expect.soft(propertyinfo[3]).toMatch(/(^\d{5}$)|(^\d{5}-\d{4}$)/);
    await page.locator("span.p-dropdown-label").nth(2).click(); //clicking on County dropdown
    await page.locator("li[aria-label='Miami-Dade']").click(); //selecting County from dropdown
    await page.locator("span.p-dropdown-label").nth(3).click(); //clicking on Country dropdown
    await page.locator("li[aria-label='United States']").click(); //selecting Country from dropdown
    await page.locator("span.p-dropdown-label").nth(4).click(); //clicking on Property type dropdown
    await page.locator("li[aria-label='Single Family']").click(); //selecting Property type from dropdown
    await page.locator("span.p-dropdown-label").nth(5).click(); //clicking on  Property Current Occupancy dropdown
    await page.locator("li[aria-label='Borrower Occupied']").click(); //selecting  Property Current Occupancy from dropdown
    await page.locator("span.p-dropdown-label").nth(6).click(); //clicking on  Property Inspection Type dropdown
    await page.locator("li[aria-label='Pre-purchase Inspection']").click(); //selecting  Property Inspection Type from dropdown
    await page.locator("input[formcontrolname='PropertyPreservationCosts']").clear();
    await page.locator("input[formcontrolname='PropertyPreservationCosts']").type(wpropertyinfo[1]);
    expect.soft(wpropertyinfo[1].match(/^[0-9]+$/)).toBeFalsy();
    await page.locator("input[formcontrolname='PropertyPreservationCosts']").clear();
    await page.locator("input[formcontrolname='PropertyPreservationCosts']").type(propertyinfo[4]);
    expect.soft(propertyinfo[4]).toMatch(/^[0-9]+$/);
    await page.waitForTimeout(3000);
    await Promise.all([
        page.waitForURL("https://qa-via.outamationlabs.com/via-ui/#/app/case-management/case-form/"+ CaseNo +"/document"),
        page.locator("text=Next").click()
    ]);
    if(page.url().includes("app/case-management/case-form/"+ CaseNo +"/document"))
    {
        console.log("Property Information Submitted");
        console.log("User redirected to document page");
    }
    else
    {   
        console.log("Property Information Not Submitted");
        console.log("User failed to land on document page");
    }
    //---------------------------Case Management : Choose Document Module-------------------------------
    await page.waitForTimeout(3000);
    await Promise.all([
        page.waitForURL("https://qa-via.outamationlabs.com/via-ui/#/app/case-management/case-form/"+ CaseNo +"/workflow"),
        page.locator("text=Next").click()
    ]);
    const blankdocumenttoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankdocumenttoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Please fill all the required values!");  
        await page.waitForTimeout(3000);
        await page.locator("span.p-dropdown-label").last().click(); //clicking on document type dropdown
        await page.locator("li[aria-label='Loan Application']").click(); //selecting document type from dropdown
        await page.setInputFiles('input[type="file"]', 'Documents/CPT Assignment 1.pdf');
        const fileName = await page.locator("span.p-button-label").first().textContent();
        console.log("Uploaded file name is : " + fileName);
        await Promise.all([
            page.waitForURL("https://qa-via.outamationlabs.com/via-ui/#/app/case-management/case-form/"+ CaseNo +"/workflow"),
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
    await page.locator("div[role='radio']").first().click();
    expect.soft(await page.locator("div[role='radio']").first().isChecked());
    await Promise.all([
        page.waitForURL("https://qa-via.outamationlabs.com/via-ui/#/app/case-management/cases"),
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
    
    // const workflowmsg: boolean = await page.locator("p-badge[severity='success']").isVisible();
    // await Promise.all([
    //     page.waitForURL("https://qa-via.outamationlabs.com/via-ui/#/app/case-management/cases"),
    //     page.locator("p-button[label='Submit']").click()
    // ]);
    // const blankworkflowtoaster: boolean = await page.locator("p-toastitem").isVisible();
    // if (blankworkflowtoaster === true) 
    // {
    //     await expect(page.locator("p-toastitem")).toContainText("Please fill all the required values!");  
    //     await page.waitForTimeout(3000);
    //     await page.locator("li[role='option']").click(); //Clicking on workflow instance dropdown
    //     await page.locator("li[role='option'] div").last().click(); //Selecting workflow instance from dropdown
    //     let workflowname =  await page.locator("li[role='option']").textContent();
    //     console.log("Selected Workflow Name is : " + workflowname);
    //     await Promise.all([
    //         page.waitForURL("https://qa-via.outamationlabs.com/via-ui/#/app/case-management/cases"),
    //         page.locator("p-button[label='Submit']").click()
    //     ]);
    //     if(page.url().includes("app/case-management/cases"))
    //     {
    //         console.log("Case Creation Successful");
    //         console.log("User redirected to cases page");
    //     }
    //     else
    //     {   
    //         console.log("Case Creation Unsuccessful");
    //         console.log("User failed to land on cases page");
    //     }
    // } 
    // else
    // {
    //     console.log("Error: Blank Workflow toaster message missing!");
    //     await page.waitForTimeout(3000);
    //     if(workflowmsg === true && page.url().includes("app/case-management/cases"))
    //     {  
    //         console.log("Workflow Information Submitted");
    //         console.log("Case Creation Successful");
    //         console.log("User redirected to cases page");
    //     }
    //     else
    //     {
    //         console.log("Workflow Information Not Submitted");
    //         console.log("Case Creation Unsuccessful");
    //         console.log("User failed to land on cases page");
    //     }
    // }
});