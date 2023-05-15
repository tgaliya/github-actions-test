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
let casedetails: string[] = ['10107', '1007','007', 'Notes is not complusory'];
let loaninfo: string[] = ['107', '500', '1000', '5000', '6', '100', '50', '5'];
//let wloaninfo: string[] = ['$500', ' 1000', '2500.00', '10-00%'];
let borrowerinfo: string[] = ['Alex', 'James', 'Hales', 'AlexHales12@gmail.com', 'AlexJHales1204@gmail.com', 'New Jersey', '56700', '170420231', '25000'];
let wborrowerinfo: string[] = ['AlexHales12$gmail.com', 'AlexJHales333@gmailcom', '4321'];
let propertyinfo: string[] = ['4843 Del Dew Drive', 'Peacebull Apt', 'Miami', '45678', '100', '10', '12345', 'Property is Legal'];
let wpropertyinfo: string[] = ['9870', '$50'];
let defaultinfo: string[] = ['1000', '500', '300', '250', '150', '50', '300', '200'];
let trusteeinfo: string[] = ['Andrew Tye', '2618 Caldwell Road', 'Simform Apt', '14428', 'Miami'];
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
    let CaseNo: any = await page.locator("via-case-header span.font-medium").textContent();
    console.log("New Case Number is : " + CaseNo);
    await page.locator("p-dropdown[formcontrolname='CaseType']").click(); //clicking on case type dropdown
    await page.locator("li[aria-label='Bankruptcy']").click();
    await page.locator("p-dropdown[formcontrolname='Investor']").click(); //clicking on Investor dropdown
    await page.locator("li[aria-label='FNMA']").click();
    await page.locator("p-dropdown[formcontrolname='FileType']").click(); //clicking on File Type dropdown
    await page.locator("li[aria-label='Default Servicing']").click();
    await page.locator("input[formcontrolname='FileNumber']").type(casedetails[0],{delay:50});
    await page.locator("p-dropdown[formcontrolname='ClientName']").click(); //clicking on Client Name dropdown
    await page.locator("li[aria-label='ABC Bank']").click();
    await page.locator("#referralCode").type(casedetails[1],{delay:50});
    await page.locator("p-dropdown[formcontrolname='Attorney']").click(); //clicking on Attorney dropdown
    await page.locator("li[aria-label='Brannan, Mindy']").click();
    await page.locator("p-dropdown[formcontrolname='User']").click(); //clicking on User dropdown
    await page.locator("li[aria-label='Jason Fischer']").click();
    await page.locator("#barNumber").type(casedetails[2],{delay:50});
    await page.locator("textarea[formcontrolname='Notes']").fill(casedetails[3]);
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
    //await page.locator("p-inputnumber[formcontrolname='LoanNumber']").fill(loaninfo[0]); //clicking on Loan Number dropdown
    await page.locator("input#integeronly").type(loaninfo[0],{delay:50});
    //await page.locator("li[aria-label='Conv']").click();
    await page.locator("p-dropdown[formcontrolname='LoanType']").click(); //clicking on Loan Type dropdown
    await page.locator("li[aria-label='FHA']").click();
    await page.locator("p-dropdown[formcontrolname='LienPosition']").click(); //clicking on Lien Position dropdown
    await page.locator("li[aria-label='First Lien']").click();
    await page.locator("button span.pi-calendar").click();
    await page.locator("td.p-datepicker-today.ng-star-inserted").click(); //selecting current date
    //await page.locator("p-inputnumber[formcontrolname='CurrentPrincipalBalance']").clear();
    //await page.locator("p-inputnumber[formcontrolname='CurrentPrincipalBalance']").type(wloaninfo[0]);
    //expect.soft(wloaninfo[0].match(/^[0-9]+$/)).toBeFalsy();
    //await page.locator("p-inputnumber[formcontrolname='CurrentPrincipalBalance']").clear();
    //await page.locator("p-inputnumber[formcontrolname='CurrentPrincipalBalance']").fill(loaninfo[1]);
    await page.locator("input#currency-us").first().type(loaninfo[1],{delay:50});
    //expect.soft(loaninfo[1]).toMatch(/^[0-9]+$/);
    // await page.locator("p-inputnumber[formcontrolname='OriginalPrincipalBalance']").clear();
    // await page.locator("p-inputnumber[formcontrolname='OriginalPrincipalBalance']").type(wloaninfo[1]);
    // expect.soft(wloaninfo[1].match(/^[0-9]+$/)).toBeFalsy();
    // await page.locator("p-inputnumber[formcontrolname='OriginalPrincipalBalance']").clear();
    //await page.locator("p-inputnumber[formcontrolname='OriginalPrincipalBalance']").fill(loaninfo[2]);
    await page.locator("input#currency-us").nth(1).type(loaninfo[2],{delay:50});
    //expect.soft(loaninfo[2]).toMatch(/^[0-9]+$/);
    // await page.locator("p-inputnumber[formcontrolname='MonthlyPaymentAmount']").clear();
    // await page.locator("p-inputnumber[formcontrolname='MonthlyPaymentAmount']").type(wloaninfo[2]);
    // expect.soft(wloaninfo[2].match(/^[0-9]+$/)).toBeFalsy();
    // await page.locator("p-inputnumber[formcontrolname='MonthlyPaymentAmount']").clear();
    //await page.locator("p-inputnumber[formcontrolname='MonthlyPaymentAmount']").fill(loaninfo[3]);
    await page.locator("input#currency-us").last().type(loaninfo[3],{delay:50});
    //expect.soft(loaninfo[3]).toMatch(/^[0-9]+$/);
    //await page.locator("p-inputnumber[formcontrolname='InterestRate']").clear();
    // await page.locator("input[formcontrolname='InterestRate']").type(wloaninfo[3]);
    // expect.soft(wloaninfo[3].match(/^[0-9]+$/)).toBeFalsy();
    // await page.locator("input[formcontrolname='InterestRate']").clear();
    //await page.locator("p-inputnumber[formcontrolname='InterestRate']").fill(loaninfo[4]);
    await page.locator("input#percent").type(loaninfo[4],{delay:50});
    //await page.pause();
    //expect.soft(loaninfo[4]).toMatch(/^[0-9]+$/);
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
    await page.locator("input[formcontrolname='City']").type(borrowerinfo[5],{delay:50});
    await page.locator("p-dropdown[formcontrolname='State']").click(); //clicking on state dropdown
    await page.locator("li[aria-label='California']").click(); //selecting state from dropdown
    await page.locator("input[formcontrolname='Zip']").type(wborrowerinfo[2],{delay:50});
    expect.soft(wborrowerinfo[2].match(/(^\d{5}$)|(^\d{5}-\d{4}$)/)).toBeFalsy();
    await page.locator("input[formcontrolname='Zip']").clear();
    await page.locator("input[formcontrolname='Zip']").type(borrowerinfo[6],{delay:50});
    expect.soft(borrowerinfo[6]).toMatch(/(^\d{5}$)|(^\d{5}-\d{4}$)/);
    await page.locator("p-dropdown[formcontrolname='County']").last().click(); //clicking on county dropdown
    await page.locator("li[aria-label='Miami-Dade']").click(); //selecting county from dropdown
    //await page.locator("p-inputmask[formcontrolname='SocialSecurityNumber']").type(borrowerinfo[7]);
    await page.locator("input[type='text']").last().type(borrowerinfo[7],{delay:50});
    //await page.pause();
    //await page.locator("input[placeholder='Input Amount']").type(borrowerinfo[8]);
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
    await page.locator("input[formcontrolname='PropertyAddress1']").type(propertyinfo[0],{delay:50});
    await page.locator("input[formcontrolname='PropertyAddress2']").type(propertyinfo[1],{delay:50});
    await page.locator("input[formcontrolname='PropertyCity']").type(propertyinfo[2],{delay:50});
    await page.locator("p-dropdown[formcontrolname='PropertyState']").click(); //clicking on state dropdown
    await page.locator("li[aria-label='Florida']").click(); //selecting state from dropdown
    await page.locator("input[formcontrolname='PropertyZip']").type(wpropertyinfo[0],{delay:50});
    expect.soft(wpropertyinfo[0].match(/(^\d{5}$)|(^\d{5}-\d{4}$)/)).toBeFalsy();
    await page.locator("input[formcontrolname='PropertyZip']").clear();
    await page.locator("input[formcontrolname='PropertyZip']").type(propertyinfo[3],{delay:50});
    expect.soft(propertyinfo[3]).toMatch(/(^\d{5}$)|(^\d{5}-\d{4}$)/);
    await page.locator("p-dropdown[formcontrolname='PropertyCounty']").click(); //clicking on County dropdown
    await page.locator("li[aria-label='Miami-Dade']").click(); //selecting County from dropdown
    // await page.locator("span.p-dropdown-label").nth(3).click(); //clicking on Country dropdown
    // await page.locator("li[aria-label='United States']").click(); //selecting Country from dropdown
    await page.locator("p-dropdown[formcontrolname='PropertyType']").click(); //clicking on Property type dropdown
    await page.locator("li[aria-label='Single Family']").click(); //selecting Property type from dropdown
    await page.locator("p-dropdown[formcontrolname='PropertyCurrentOccupancy']").click(); //clicking on  Property Current Occupancy dropdown
    await page.locator("li[aria-label='Borrower Occupied']").click(); //selecting  Property Current Occupancy from dropdown
    await page.locator("p-dropdown[formcontrolname='PropertyInspectionType']").click(); //clicking on  Property Inspection Type dropdown
    await page.locator("li[aria-label='Pre-purchase Inspection']").click(); //selecting  Property Inspection Type from dropdown
    // await page.locator("input#currency-us").clear();
    // await page.locator("input#currency-us").type(wpropertyinfo[1]);
    // expect.soft(wpropertyinfo[1].match(/^[0-9]+$/)).toBeFalsy();
    // await page.locator("input#currency-us").clear();
    await page.locator("input#currency-us").type(propertyinfo[4],{delay:50});
    //expect.soft(propertyinfo[4]).toMatch(/^[0-9]+$/);
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
        await page.locator("p-dropdown[formcontrolname='documentType']").click(); //clicking on document type dropdown
        await page.locator("li[aria-label='Loan Application']").click(); //selecting document type from dropdown
        await page.setInputFiles('input[type="file"]', 'Documents/CPT Assignment 1.pdf');
        const fileName = await page.locator("p-fileupload span.p-button-label").textContent();
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
    await page.locator("div[role='radio']").last().click();
    expect.soft(await page.locator("div[role='radio']").last().isChecked());
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
    //-------------------------------Order Creation Date & Time Verifying--------------------------------
    // var today = new Date();
    // var time = today.toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });
    // var date = today.getMonth()+1+'/'+today.getDate()+'/'+today.getFullYear();
    // var dateTime = date+' '+time;
    // console.log("Current Date and Time is : " + dateTime.toUpperCase());
    //---------------------------------------------Case Search-------------------------------------------
    var caseValues = new Array();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");
    for(let i = 0; i < await rows.count(); ++i)
    {
        const CaseSearchNos = await rows.nth(i).locator("td").first().textContent();
        //console.log(CaseSearchNos);
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
    const CaseNumberDetail: any = await page.locator("#p-panel-0-content > div > div > div:nth-child(1) > span:nth-child(2)").textContent();
    //console.log(CaseNumberDetail);
    //expect(CaseNo.trim().includes(CaseNumberDetail)).toBeTruthy();
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
    const File_No = await page.locator("#p-panel-0-content > div > div > div:nth-child(2) > span:nth-child(2)").textContent();
    const File_Type = await page.locator("#p-panel-0-content > div > div > div:nth-child(3) > span:nth-child(2)").textContent();
    const Investor_Name = await page.locator("#p-panel-0-content > div > div > div:nth-child(4) > span:nth-child(2)").textContent();
    const Loan_Number = await page.locator("#p-panel-0-content > div > div > div:nth-child(5) > span:nth-child(2)").textContent();
    const Loan_Type = await page.locator("#p-panel-0-content > div > div > div:nth-child(6) > span:nth-child(2)").textContent();
    const Case_Type = await page.locator("#p-panel-0-content > div > div > div:nth-child(7) > span:nth-child(2)").textContent();
    const Client_Name = await page.locator("#p-panel-0-content > div > div > div:nth-child(8) > span:nth-child(2)").textContent();
    const User_Name = await page.locator("#p-panel-0-content > div > div > div:nth-child(9) > span:nth-child(2)").textContent();
    const Attorney_Name = await page.locator("#p-panel-0-content > div > div > div:nth-child(10) > span:nth-child(2)").textContent();
    const Case_Creation_Date = await page.locator("#p-panel-0-content > div > div > div:nth-child(11) > span:nth-child(2)").textContent();
    const Borrower_Name = await page.locator("#p-panel-0-content > div > div > div:nth-child(12) > span:nth-child(2)").textContent();
    const Notes_Detail = await page.locator("#p-panel-0-content > div > div > div:nth-child(13) > span:nth-child(2)").textContent();
    if(File_No?.match(casedetails[0]) && File_Type?.match("Default Servicing") && 
    Investor_Name?.match("FNMA") && Loan_Number?.match(loaninfo[0]) && Loan_Type?.match("FHA") && 
    Case_Type?.match("Bankruptcy") && Client_Name?.match("ABC Bank") && User_Name?.match("Jason Fischer") 
    && Attorney_Name?.match("Brannan, Mindy") && Borrower_Name?.match(BorrowerName) && 
    Notes_Detail?.match(casedetails[3]))
    //Case_Creation_Date?.match(dateTime.toUpperCase()) && Notes_Detail?.match(casedetails[3]))
    {
        console.log("Case Details Verified Successfully");
    }
    else
    {
        console.log("Failed to Verify Case Details");
    }
});
test.only('@ViaNewFlowTesting', async ({page})=>
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
    //let CaseNo = await page.getByRole('textbox').nth(1).inputValue();
    let CaseNo: any = await page.locator("via-referral-header span.font-medium").textContent();
    console.log("New Case Number is : " + CaseNo);
    await page.locator("input[formcontrolname='FileNumber']").type(casedetails[0],{delay:50});
    await page.locator("p-dropdown[formcontrolname='CaseType']").click(); //clicking on case type dropdown
    await page.locator("li[aria-label='Bankruptcy']").click();
    await page.locator("p-dropdown[formcontrolname='ClientName']").click(); //clicking on Client Name dropdown
    await page.locator("li[aria-label='ABC Bank']").click();
    await page.locator("#referralCode").type(casedetails[1],{delay:50});
    // await page.locator("p-dropdown[formcontrolname='Investor']").click(); //clicking on Investor dropdown
    // await page.locator("li[aria-label='FNMA']").click();
    // await page.locator("p-dropdown[formcontrolname='FileType']").click(); //clicking on File Type dropdown
    // await page.locator("li[aria-label='Default Servicing']").click();
    // await page.locator("p-dropdown[formcontrolname='Attorney']").click(); //clicking on Attorney dropdown
    // await page.locator("li[aria-label='Brannan, Mindy']").click();
    // await page.locator("p-dropdown[formcontrolname='User']").click(); //clicking on User dropdown
    // await page.locator("li[aria-label='Jason Fischer']").click();
    // await page.locator("#barNumber").type(casedetails[2],{delay:50});
    // await page.locator("textarea[formcontrolname='Notes']").fill(casedetails[3]);
    // await Promise.all([
    //     page.waitForURL("https://qa-via.outamationlabs.com/via-new/#/app/case-management/case-form/"+ CaseNo +"/referral-info"),
    //     page.locator("p-button[label='Next']").click()
    // ]);
    // if(page.url().includes("app/case-management/case-form/"+ CaseNo +"/loan-info"))
    // {
    //     console.log("Case Information Submitted");
    //     console.log("User redirected to loan info page");
    // }
    // else
    // {   
    //     console.log("Case Information Not Submitted");
    //     console.log("User failed to land on loan info page");
    // }
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
    //await page.locator("p-inputnumber[formcontrolname='LoanNumber']").fill(loaninfo[0]); //clicking on Loan Number dropdown
    await page.locator("#integeronly").first().type(loaninfo[0],{delay:50});
    //await page.locator("li[aria-label='Conv']").click();
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
    //await page.locator("p-inputnumber[formcontrolname='CurrentPrincipalBalance']").clear();
    //await page.locator("p-inputnumber[formcontrolname='CurrentPrincipalBalance']").type(wloaninfo[0]);
    //expect.soft(wloaninfo[0].match(/^[0-9]+$/)).toBeFalsy();
    //await page.locator("p-inputnumber[formcontrolname='CurrentPrincipalBalance']").clear();
    //await page.locator("p-inputnumber[formcontrolname='CurrentPrincipalBalance']").fill(loaninfo[1]);
    await page.locator("input#currency-us").first().type(loaninfo[1],{delay:50});
    //expect.soft(loaninfo[1]).toMatch(/^[0-9]+$/);
    // await page.locator("p-inputnumber[formcontrolname='OriginalPrincipalBalance']").clear();
    // await page.locator("p-inputnumber[formcontrolname='OriginalPrincipalBalance']").type(wloaninfo[1]);
    // expect.soft(wloaninfo[1].match(/^[0-9]+$/)).toBeFalsy();
    // await page.locator("p-inputnumber[formcontrolname='OriginalPrincipalBalance']").clear();
    //await page.locator("p-inputnumber[formcontrolname='OriginalPrincipalBalance']").fill(loaninfo[2]);
    await page.locator("input#currency-us").nth(1).type(loaninfo[2],{delay:50});
    //expect.soft(loaninfo[2]).toMatch(/^[0-9]+$/);
    // await page.locator("p-inputnumber[formcontrolname='MonthlyPaymentAmount']").clear();
    // await page.locator("p-inputnumber[formcontrolname='MonthlyPaymentAmount']").type(wloaninfo[2]);
    // expect.soft(wloaninfo[2].match(/^[0-9]+$/)).toBeFalsy();
    // await page.locator("p-inputnumber[formcontrolname='MonthlyPaymentAmount']").clear();
    //await page.locator("p-inputnumber[formcontrolname='MonthlyPaymentAmount']").fill(loaninfo[3]);
    await page.locator("input#currency-us").nth(2).type(loaninfo[3],{delay:50});
    //expect.soft(loaninfo[3]).toMatch(/^[0-9]+$/);
    //await page.locator("p-inputnumber[formcontrolname='InterestRate']").clear();
    // await page.locator("input[formcontrolname='InterestRate']").type(wloaninfo[3]);
    // expect.soft(wloaninfo[3].match(/^[0-9]+$/)).toBeFalsy();
    // await page.locator("input[formcontrolname='InterestRate']").clear();
    //await page.locator("p-inputnumber[formcontrolname='InterestRate']").fill(loaninfo[4]);
    await page.locator("input#percent").type(loaninfo[4],{delay:50});
    await page.locator("input#currency-us").nth(3).type(loaninfo[5],{delay:50});
    await page.locator("input#currency-us").nth(4).type(loaninfo[6],{delay:50});
    await page.locator("input#currency-us").last().type(loaninfo[7],{delay:50});
    //await page.pause();
    //expect.soft(loaninfo[4]).toMatch(/^[0-9]+$/);
    // await Promise.all([
    //     page.waitForURL("https://qa-via.outamationlabs.com/via-ui/#/app/case-management/case-form/"+ CaseNo +"/borrower-info"),
    //     page.locator("p-button[label='Next']").click()
    // ]);
    // if(page.url().includes("app/case-management/case-form/"+ CaseNo +"/borrower-info"))
    // {
    //     console.log("Loan Information Submitted");
    //     console.log("User redirected to borrower info page");
    // }
    // else
    // {   
    //     console.log("Loan Information Not Submitted");
    //     console.log("User failed to land on borrower info page");
    // }
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
    //await page.locator("#p-accordiontab-10-content > div > div > div:nth-child(10) > span > p-inputmask > input").type(borrowerinfo[7], {delay:50});
    await page.getByRole('textbox', { name: '999-99-9999' }).type(borrowerinfo[7], {delay: 50});
    //await page.locator("input[type='text']").nth(20).type(borrowerinfo[7],{delay:50});
    //await page.pause();
    //await page.locator("input[placeholder='Input Amount']").type(borrowerinfo[8]);
    // await Promise.all([
    //     page.waitForURL("https://qa-via.outamationlabs.com/via-ui/#/app/case-management/case-form/"+ CaseNo +"/property-info"),
    //     page.locator("p-button[label='Next']").click()
    // ]);
    // if(page.url().includes("app/case-management/case-form/"+ CaseNo +"/property-info"))
    // {
    //     console.log("Borrower Information Submitted");
    //     console.log("User redirected to property info page");
    // }
    // else
    // {   
    //     console.log("Borrower Information Not Submitted");
    //     console.log("User failed to land on property info page");
    // }
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
    // await page.locator("span.p-dropdown-label").nth(3).click(); //clicking on Country dropdown
    // await page.locator("li[aria-label='United States']").click(); //selecting Country from dropdown
    // await page.locator("p-dropdown[formcontrolname='PropertyInspectionType']").click(); //clicking on  Property Inspection Type dropdown
    // await page.locator("li[aria-label='Pre-purchase Inspection']").click(); //selecting  Property Inspection Type from dropdown
    // await page.locator("input#currency-us").clear();
    // await page.locator("input#currency-us").type(wpropertyinfo[1]);
    // expect.soft(wpropertyinfo[1].match(/^[0-9]+$/)).toBeFalsy();
    // await page.locator("input#currency-us").clear();
    //await page.locator("input#currency-us").type(propertyinfo[4],{delay:50});
    //expect.soft(propertyinfo[4]).toMatch(/^[0-9]+$/);
    // await page.waitForTimeout(3000);
    // await Promise.all([
    //     page.waitForURL("https://qa-via.outamationlabs.com/via-ui/#/app/case-management/case-form/"+ CaseNo +"/document"),
    //     page.locator("text=Next").click()
    // ]);
    // if(page.url().includes("app/case-management/case-form/"+ CaseNo +"/document"))
    // {
    //     console.log("Property Information Submitted");
    //     console.log("User redirected to document page");
    // }
    // else
    // {   
    //     console.log("Property Information Not Submitted");
    //     console.log("User failed to land on document page");
    // }
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
    //-------------------------------Order Creation Date & Time Verifying--------------------------------
    // var today = new Date();
    // var time = today.toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });
    // var date = today.getMonth()+1+'/'+today.getDate()+'/'+today.getFullYear();
    // var dateTime = date+' '+time;
    // console.log("Current Date and Time is : " + dateTime.toUpperCase());
    //---------------------------------------------Case Search-------------------------------------------
    var caseValues = new Array();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");
    for(let i = 0; i < await rows.count(); ++i)
    {
        const CaseSearchNos = await rows.nth(i).locator("td").first().textContent();
        //console.log(CaseSearchNos);
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
    // await page.locator("div[id='p-panel-1-content']").waitFor();
    const CaseNumberDetail: any = await page.locator("#p-panel-0-content > div > div > div:nth-child(2) > span:nth-child(2)").textContent();
    console.log("Law Firm ID is : " + CaseNumberDetail);
    //expect(CaseNo.trim().includes(CaseNumberDetail)).toBeTruthy();
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
    //Case_Creation_Date?.match(dateTime.toUpperCase()) && Notes_Detail?.match(casedetails[3]))
    {
        console.log("Case Details Verified Successfully");
    }
    else
    {
        console.log("Failed to Verify Case Details");
    }
});