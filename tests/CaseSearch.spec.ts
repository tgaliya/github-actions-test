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
test('@ViaFlowTesting @CaseSearch @Regression Via Flow Testing: Searching created case and filling the data required',async ({page})=>
{
    await Promise.all([
        page.waitForURL("https://qa-via.outamationlabs.com/via-ui/#/app/case-management/cases"),
        page.locator("div[aria-label='Advance Search']").click() //clicking on Advance search button on side menu
    ]);
    if(page.url().includes("app/case-management/cases"))
    {
        console.log("User landed on case search page");
    }
    else
    {   
        console.log("User failed to land on case search page");
    }
    const CaseNumber = "558243-0671"; 
    var casevalues;
    //const CaseNumber = "56789-012"; 
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");
    for(let i = 0; i < await rows.count(); i++)
    {
        const CaseSearchNos = await rows.nth(i).locator("td").first().allTextContents();
        //const CaseSearchNo = await rows.nth(i).locator("td").first().textContent();
        console.log("Case Numbers are: " + CaseSearchNos);
        casevalues.push(CaseSearchNos);
        // CaseSearchNos.forEach(function (item, index) {
        //     console.log(item, index);
        // });
        //const CaseSearchNos = ["12345-789", "56789-012", "01234-567"];
        // for(var j in CaseSearchNos)
        // {
        //     console.log("j: " + CaseSearchNos[j]);
        //     if(CaseNumber.match(CaseSearchNos))
        //     {
        //         console.log("Pass");
        //     }
        //     else
        //     {
        //         console.log("Fail");
        //     }
        // }
    }
    for(let j = 0; j < casevalues.count(); j++)
    {
        console.log("j: " + casevalues[j]);
        if(CaseNumber.match(casevalues[j]))
        {
            console.log("Pass");
        }
        else
        {
            console.log("Fail");
        }
    }
});
test.only('@ViaFlowTesting @CaseSearchs @Regression Via Flow Testing: Searching created case and filling the data required',async ({page})=>
{
    await Promise.all([
        page.waitForURL("https://qa-via.outamationlabs.com/via-ui/#/app/case-management/cases"),
        page.locator("div[aria-label='Advance Search']").click() //clicking on Advance search button on side menu
    ]);
    if(page.url().includes("app/case-management/cases"))
    {
        console.log("User landed on case search page");
    }
    else
    {   
        console.log("User failed to land on case search page");
    }
    //---var today = new Date();
    //---var time = today.toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });
    //console.log("Current Time is : " + time);
    //---var date = today.getMonth()+1+'/'+today.getDate()+'/'+today.getFullYear();
    //---var dateTime = date+' '+time;
    //---console.log("Current Date and Time is : " + dateTime.toUpperCase());
    //---window.localStorage.setItem('DateTime', dateTime);
    //---const UID = window.localStorage.getItem('DateTime');
    //---console.log(UID);
    const CaseNumber = " 458243-1340 "; 
    //const CaseNumber1 = "558243-0671"; 
    await page.waitForTimeout(5000);
    var caseValues = new Array();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");
    for(let i = 0; i < await rows.count(); ++i)
    {
        const CaseSearchNos = await rows.nth(i).locator("td").first().textContent();
        //console.log(CaseSearchNos);
        caseValues.push(CaseSearchNos);
        console.log(caseValues);
        for(var j in caseValues)
        {
            if(CaseNumber.includes(caseValues[j]))
            {
                //console.log("Pass");
                await rows.nth(i).locator("a").click();
                break;
                //await rows.nth(i).locator("td").first().locator("a").click();
            }
        }
        // if(CaseNumber.includes(CaseSearchNos))
        // {
        //     console.log("Pass");
        //     break;
        // }
    }
    await page.waitForTimeout(5000);
    const CaseNumberDetail: any = await page.locator("#p-panel-2-content > div > div > div:nth-child(2) > span:nth-child(2)").textContent();
    console.log(CaseNumberDetail);
    expect(CaseNumber.trim().includes(CaseNumberDetail)).toBeTruthy();
    const Status = await page.locator("p-chip div div").first().textContent();
    const TSStatus: any = await page.locator("p-chip div div").nth(1).textContent();
    //console.log(Status);
    console.log("\nStep 1: Referral Received");
    await page.locator("text= Referral Received ").click();
    const RRCaseNo = await page.locator("#CaseNumber").inputValue();
    //console.log(RRCaseNo);
    expect.soft(RRCaseNo.match(CaseNumberDetail)).toBeTruthy();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Referral received']").click();
    await page.locator("text=Submit").click();
    const blankreferrelreceivedtoaster: boolean = await page.locator("p-toastitem").isVisible();
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
    // const RRStatus: any = await page.locator("p-chip div div").first().textContent();
    // const TSStatus1: any = await page.locator("p-chip div div").nth(1).textContent();
    // expect.soft(RRStatus.includes("Referral rec") && TSStatus.match(TSStatus1)).toBeTruthy();
    // await page.locator("text= Referral Received ").click();
    // await page.locator("p-dropdown[id='StepStatus']").click();
    // await page.locator("li[aria-label='Review completed']").click();
    // await page.locator("text=Submit").click();
    // //const blankreferrelreceivedtoaster: boolean = await page.locator("p-toastitem").isVisible();
    // if (blankreferrelreceivedtoaster === true) 
    // {
    //     await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
    //     console.log("1.1 Referral Received Step Completed");  
    //     await page.waitForTimeout(3000);
    // } 
    // else
    // {
    //     console.log("Error: Referral Received (Success) toaster message missing!");
    //     console.log("1.1 Unable to Complete Referral Received Step");  
    //     await page.waitForTimeout(3000);
    // }
    await page.locator("tbody").waitFor();
    console.log("\nStep 2: Title Search");
    const RRStatus1: any = await page.locator("p-chip div div").first().textContent();
    const TSStatus2: any = await page.locator("p-chip div div").nth(1).textContent();
    expect.soft(RRStatus1.includes("Referral rec")).toBeTruthy();
    expect.soft(TSStatus2.match("In-Progress")).toBeTruthy();
    await page.locator("p-treetabletoggler").nth(1).click();
    const TReqStatus: any = await page.locator("p-chip div div").nth(2).textContent();
    expect.soft(TReqStatus.match("Yet to start")).toBeTruthy();
    await page.locator("text= Title Requested ").click();
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
    //console.log(TRStatus1);
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
    await page.locator("li[aria-label='Review completed']").click();
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
    console.log("\nStep 3: FHA Letter");
    const TRevStatus1: any = await page.locator("p-chip div div").nth(4).textContent();
    expect.soft(TRevStatus1.includes("Review compl")).toBeTruthy();
    const TSStatus3: any = await page.locator("p-chip div div").nth(1).textContent();
    expect.soft(TSStatus3.match("Completed")).toBeTruthy();
    await page.locator("p-treetabletoggler").nth(1).click();
    await page.locator("text= FHA Letter ").waitFor();
    const FHALetter: any = await page.locator("p-chip div div").nth(2).textContent();
    expect.soft(FHALetter.includes("Yet to start")).toBeTruthy();
    await page.locator("text= FHA Letter ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Review completed']").click();
    await page.locator("text=Submit").last().click();
    const blankfhalettertoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankfhalettertoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("3.1 FHA Letter Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: FHA Letter (Success) toaster message missing!");
        console.log("3.1 Unable to Complete FHA Letter Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("text= FHA Letter ").waitFor();
    const FHALetter1: any = await page.locator("p-chip div div").nth(2).textContent();
    expect.soft(FHALetter1.includes("Review compl")).toBeTruthy();
    const Complaint: any = await page.locator("p-chip div div").nth(3).textContent();
    expect.soft(Complaint.match("In-Progress")).toBeTruthy();
    await page.locator("p-treetabletoggler").nth(3).click();
    await page.locator("text= Prepare Complaint ").waitFor();
    console.log("\nStep 4: Complaint");
    const PrepareComplaint: any = await page.locator("p-chip div div").nth(4).textContent();
    expect.soft(PrepareComplaint.match("Yet to start")).toBeTruthy();
    await page.locator("text= Prepare Complaint ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Complaint prepared']").click();
    await page.locator("text=Submit").last().click();
    const blankpreparecomplainttoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankpreparecomplainttoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("4.1 Prepare Complaint Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Prepare Complaint (Success) toaster message missing!");
        console.log("4.1 Unable to Complete Prepare Complaint Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(3).click();
    await page.locator("text= Prepare Complaint ").waitFor();
    const PrepareComplaint1: any = await page.locator("p-chip div div").nth(4).textContent();
    expect.soft(PrepareComplaint1.match("Complaint pr")).toBeTruthy();
    const AttorneyReview: any = await page.locator("p-chip div div").nth(5).textContent();
    expect.soft(AttorneyReview.match("Yet to start")).toBeTruthy();
    await page.locator("text= Attorney Review And Approve Complaint ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Approved']").click();
    await page.locator("text=Submit").last().click();
    const blankattorneyreviewtoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankattorneyreviewtoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("4.2 Attorney Review and Approve Complaint Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Attorney Review and Approve Complaint (Success) toaster message missing!");
        console.log("4.2 Unable to Complete Attorney Review and Approve Complaint Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(3).click();
    await page.locator("text= Attorney Review And Approve Complaint ").waitFor();
    const AttorneyReview1: any = await page.locator("p-chip div div").nth(5).textContent();
    expect.soft(AttorneyReview1.match("Approved")).toBeTruthy();
    const SendComplaint: any = await page.locator("p-chip div div").nth(7).textContent();
    expect.soft(SendComplaint.match("Yet to start")).toBeTruthy();
    await page.locator("text= Send Complaint For Client Approval ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Complaint Sent']").click();
    await page.locator("text=Submit").last().click();
    const blanksendcomplainttoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blanksendcomplainttoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("4.3 Send Complaint For Client Approval Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Send Complaint For Client Approval (Success) toaster message missing!");
        console.log("4.3 Unable to Complete Send Complaint For Client Approval Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(3).click();
    await page.locator("text= Send Complaint For Client Approval ").waitFor();
    const SendComplaint1: any = await page.locator("p-chip div div").nth(7).textContent();
    expect.soft(SendComplaint1.match("Complaint Se")).toBeTruthy();
    const ReceiveAppComplaint: any = await page.locator("p-chip div div").nth(8).textContent();
    expect.soft(ReceiveAppComplaint.match("Yet to start")).toBeTruthy();
    await page.locator("text= Received Approved Complaint From Client ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Approved']").click();
    await page.locator("text=Submit").last().click();
    const blankReceiveAppComplainttoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankReceiveAppComplainttoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("4.4 Received Approved Complaint From Client Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Received Approved Complaint From Client (Success) toaster message missing!");
        console.log("4.4 Unable to Complete Received Approved Complaint From Client Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(3).click();
    await page.locator("text= Received Approved Complaint From Client ").waitFor();
    const ReceiveAppComplaint1: any = await page.locator("p-chip div div").nth(8).textContent();
    expect.soft(ReceiveAppComplaint1.match("Approved")).toBeTruthy();
    const SubmitComplaint: any = await page.locator("p-chip div div").nth(9).textContent();
    expect.soft(SubmitComplaint.match("Yet to start")).toBeTruthy();
    await page.locator("text= Submit Complaint For Filling ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Submitted']").click();
    await page.locator("text=Submit").last().click();
    const blanksubmitcomplainttoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blanksubmitcomplainttoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("4.5 Submit Complaint For Filling Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Submit Complaint For Filling (Success) toaster message missing!");
        console.log("4.5 Unable to Complete Submit Complaint For Filling Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(3).click();
    await page.locator("text= Submit Complaint For Filling ").waitFor();
    const SubmitComplaint1: any = await page.locator("p-chip div div").nth(9).textContent();
    expect.soft(SubmitComplaint1.match("Submitted")).toBeTruthy();
    const LegalFiled: any = await page.locator("p-chip div div").nth(10).textContent();
    expect.soft(LegalFiled.match("Yet to start")).toBeTruthy();
    await page.locator("text= First Legal Filed ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Filed Successfully']").click();
    await page.locator("text=Submit").last().click();
    const blanklegalfiledtoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blanklegalfiledtoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("4.6 First Legal Filed Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: First Legal Filed (Success) toaster message missing!");
        console.log("4.6 Unable to Complete First Legal Filed Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(3).click();
    console.log("\nStep 5: Service");
    await page.locator("text= First Legal Filed ").waitFor();
    const LegalFiled1: any = await page.locator("p-chip div div").nth(10).textContent();
    expect.soft(LegalFiled1.includes("Filed Succes")).toBeTruthy();
    await page.locator("p-treetabletoggler").nth(3).click();
    const Complaint1: any = await page.locator("p-chip div div").nth(3).textContent();
    expect.soft(Complaint1.match("Completed")).toBeTruthy();
    const Service: any = await page.locator("p-chip div div").nth(4).textContent();
    expect.soft(Service.match("In-Progress")).toBeTruthy();
    await page.locator("p-treetabletoggler").nth(4).click();
    await page.locator("text= Service Started ").waitFor();
    const ServiceStarted: any = await page.locator("p-chip div div").nth(5).textContent();
    expect.soft(ServiceStarted.match("Yet to start")).toBeTruthy();
    await page.locator("text= Service Started ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Service started']").click();
    await page.locator("text=Submit").last().click();
    const blankservicestartedtoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankservicestartedtoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("5.1 Service Started Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Service Started (Success) toaster message missing!");
        console.log("5.1 Unable to Complete Service Started Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(4).click();
    await page.locator("text= Service Started ").waitFor();
    const ServiceStarted1: any = await page.locator("p-chip div div").nth(5).textContent();
    expect.soft(ServiceStarted1.includes("Service star")).toBeTruthy();
    //await page.locator("p-treetabletoggler").nth(2).click();
    const ServiceCompleted: any = await page.locator("p-chip div div").nth(6).textContent();
    expect.soft(ServiceCompleted.match("Yet to start")).toBeTruthy();
    await page.locator("text= Service Completed ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Service completed']").click();
    await page.locator("text=Submit").last().click();
    const blankservicecompletedtoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankservicecompletedtoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("5.2 Service Completed Step Pass");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Service Completed (Success) toaster message missing!");
        console.log("5.2 Unable to Complete Service Completed Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(4).click();
    await page.locator("text= Service Completed ").waitFor();
    const ServiceCompleted1: any = await page.locator("p-chip div div").nth(6).textContent();
    expect.soft(ServiceCompleted1.includes("Service comp")).toBeTruthy();
    //await page.locator("p-treetabletoggler").nth(2).click();
    const PeriodExp: any = await page.locator("p-chip div div").nth(7).textContent();
    expect.soft(PeriodExp.match("Yet to start")).toBeTruthy();
    await page.locator("text= Answer Period Expiration ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Responded']").click();
    await page.locator("text=Submit").last().click();
    const blankperiodexpirytoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankperiodexpirytoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("5.3 Answer Period Expiration Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Answer Period Expiration (Success) toaster message missing!");
        console.log("5.3 Unable to Complete Answer Period Expiration Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(4).click();
    console.log("\nStep 6: Judgement");
    await page.locator("text= Answer Period Expiration ").waitFor();
    const PeriodExp1: any = await page.locator("p-chip div div").nth(7).textContent();
    expect.soft(PeriodExp1.includes("Responded")).toBeTruthy();
    await page.locator("p-treetabletoggler").nth(4).click();
    const Service1: any = await page.locator("p-chip div div").nth(4).textContent();
    expect.soft(Service1.match("Completed")).toBeTruthy();
    const Judgement: any = await page.locator("p-chip div div").nth(5).textContent();
    expect.soft(Judgement.match("In-Progress")).toBeTruthy();
    await page.locator("p-treetabletoggler").nth(5).click();
    await page.locator("text= Request Judgement Figures ").waitFor();
    const RequestJudgement: any = await page.locator("p-chip div div").nth(6).textContent();
    expect.soft(RequestJudgement.match("Yet to start")).toBeTruthy();
    await page.locator("text= Request Judgement Figures ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Requested']").click();
    await page.locator("text=Submit").last().click();
    const blankrequestjudgementtoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankrequestjudgementtoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("6.1 Request Judgement Figures Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Request Judgement Figures (Success) toaster message missing!");
        console.log("6.1 Unable to Complete Request Judgement Figures Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(5).click();
    await page.locator("text= Request Judgement Figures ").waitFor();
    const RequestJudgement1: any = await page.locator("p-chip div div").nth(6).textContent();
    expect.soft(RequestJudgement1.includes("Requested")).toBeTruthy();
    const ReceiveJudgement: any = await page.locator("p-chip div div").nth(7).textContent();
    expect.soft(ReceiveJudgement.match("Yet to start")).toBeTruthy();
    await page.locator("text= Receive Judgement Figures ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Received']").click();
    await page.locator("text=Submit").last().click();
    const blankreceivejudgementtoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankreceivejudgementtoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("6.2 Receive Judgement Figures Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Receive Judgement Figures (Success) toaster message missing!");
        console.log("6.2 Unable to Complete Receive Judgement Figures Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(5).click();
    await page.locator("text= Receive Judgement Figures ").waitFor();
    const ReceiveJudgement1: any = await page.locator("p-chip div div").nth(7).textContent();
    expect.soft(ReceiveJudgement1.includes("Received")).toBeTruthy();
    const JudgementPrepare: any = await page.locator("p-chip div div").nth(8).textContent();
    expect.soft(JudgementPrepare.match("Yet to start")).toBeTruthy();
    await page.locator("text= Judgement Prepare ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Judgment prepared']").click();
    await page.locator("text=Submit").last().click();
    const blankjudgementpreparetoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankjudgementpreparetoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("6.3 Judgement Prepare Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Judgement Prepare (Success) toaster message missing!");
        console.log("6.3 Unable to Complete Judgement Prepare Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(5).click();
    await page.locator("text= Judgement Prepare ").waitFor();
    const JudgementPrepare1: any = await page.locator("p-chip div div").nth(8).textContent();
    expect.soft(JudgementPrepare1.includes("Judgment pre")).toBeTruthy();
    const ApproveJudgement: any = await page.locator("p-chip div div").nth(9).textContent();
    expect.soft(ApproveJudgement.match("Yet to start")).toBeTruthy();
    await page.locator("text= Attorney Review & Approve Judgement ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Approved']").click();
    await page.locator("text=Submit").last().click();
    const blankapprovejudgementtoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankapprovejudgementtoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("6.4 Attorney Review & Approve Judgement Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Attorney Review & Approve Judgement (Success) toaster message missing!");
        console.log("6.4 Unable to Complete Attorney Review & Approve Judgement Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(5).click();
    await page.locator("text= Attorney Review & Approve Judgement ").waitFor();
    const ApproveJudgement1: any = await page.locator("p-chip div div").nth(9).textContent();
    expect.soft(ApproveJudgement1.includes("Approved")).toBeTruthy();
    const SubmitJudgement: any = await page.locator("p-chip div div").nth(10).textContent();
    expect.soft(SubmitJudgement.match("Yet to start")).toBeTruthy();
    await page.locator("text=  Submit Judgement To Court  ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Submitted']").click();
    await page.locator("text=Submit").last().click();
    const blanksubmitjudgementtoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blanksubmitjudgementtoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("6.5 Submit Judgement To Court Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Submit Judgement To Court (Success) toaster message missing!");
        console.log("6.5 Unable to Complete Submit Judgement To Court Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(5).click();
    await page.locator("text= Submit Judgement To Court ").waitFor();
    const SubmitJudgement1: any = await page.locator("p-chip div div").nth(10).textContent();
    expect.soft(SubmitJudgement1.includes("Submitted")).toBeTruthy();
    const JudgementEntered: any = await page.locator("p-chip div div").nth(11).textContent();
    expect.soft(JudgementEntered.match("Yet to start")).toBeTruthy();
    await page.locator("text= Judgement Entered ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Judgment entered']").click();
    await page.locator("text=Submit").last().click();
    const blankjudgementeneteredtoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankjudgementeneteredtoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("6.6 Judgement Entered Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Judgement Entered (Success) toaster message missing!");
        console.log("6.6 Unable to Complete Judgement Entered Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(5).click();
    console.log("\nStep 7: Sale");
    await page.locator("text= Judgement Entered ").waitFor();
    const JudgementEntered1: any = await page.locator("p-chip div div").nth(11).textContent();
    expect.soft(JudgementEntered1.includes("Judgment ent")).toBeTruthy();
    await page.locator("p-treetabletoggler").nth(5).click();
    const Judgement1: any = await page.locator("p-chip div div").nth(5).textContent();
    expect.soft(Judgement1.match("Completed")).toBeTruthy();
    const Sale: any = await page.locator("p-chip div div").nth(6).textContent();
    expect.soft(Sale.match("In-Progress")).toBeTruthy();
    await page.locator("p-treetabletoggler").nth(6).click();
    await page.locator("text=  Request Bidding Instruction  ").waitFor();
    const RequestBidding: any = await page.locator("p-chip div div").nth(7).textContent();
    expect.soft(RequestBidding.match("Yet to start")).toBeTruthy();
    await page.locator("text=  Request Bidding Instruction  ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Requested']").click();
    await page.locator("text=Submit").last().click();
    const blankrequestbiddingtoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankrequestbiddingtoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("7.1 Request Bidding Instruction Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Request Bidding Instruction (Success) toaster message missing!");
        console.log("7.1 Unable to Complete Request Bidding Instruction Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(6).click();
    await page.locator("text= Request Bidding Instruction ").waitFor();
    const RequestBidding1: any = await page.locator("p-chip div div").nth(7).textContent();
    expect.soft(RequestBidding1.includes("Requested")).toBeTruthy();
    const ReceiveBidding: any = await page.locator("p-chip div div").nth(8).textContent();
    expect.soft(ReceiveBidding.match("Yet to start")).toBeTruthy();
    await page.locator("text=  Receive Bidding Instruction  ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Received']").click();
    await page.locator("text=Submit").last().click();
    const blankreceivebiddingtoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankreceivebiddingtoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("7.2 Receive Bidding Instruction Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Receive Bidding Instruction (Success) toaster message missing!");
        console.log("7.2 Unable to Complete Receive Bidding Instruction Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(6).click();
    await page.locator("text= Receive Bidding Instruction ").waitFor();
    const ReceiveBidding1: any = await page.locator("p-chip div div").nth(8).textContent();
    expect.soft(ReceiveBidding1.includes("Received")).toBeTruthy();
    const SaleBid: any = await page.locator("p-chip div div").nth(9).textContent();
    expect.soft(SaleBid.match("Yet to start")).toBeTruthy();
    await page.locator("text= Sale Bid Confirmed ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Bid confirmed']").click();
    await page.locator("text=Submit").last().click();
    const blanksalebidtoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blanksalebidtoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("7.3 Sale Bid Confirmed Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Sale Bid Confirmed (Success) toaster message missing!");
        console.log("7.3 Unable to Complete Sale Bid Confirmed Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(6).click();
    await page.locator("text= Sale Bid Confirmed ").waitFor();
    const SaleBid1: any = await page.locator("p-chip div div").nth(9).textContent();
    expect.soft(SaleBid1.includes("Bid confirme")).toBeTruthy();
    const BankruptcySearch: any = await page.locator("p-chip div div").nth(10).textContent();
    expect.soft(BankruptcySearch.match("In-Progress")).toBeTruthy();
    await page.locator("p-treetabletoggler").nth(10).click();
    await page.locator("text= Request Bankruptcy Search ").waitFor();
    const ReqBankruptcySearch: any = await page.locator("p-chip div div").nth(11).textContent();
    expect.soft(ReqBankruptcySearch.match("Yet to start")).toBeTruthy();
    await page.locator("text= Request Bankruptcy Search ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Ordered']").click();
    await page.locator("text=Submit").last().click();
    const blankrequestbankruptcytoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankrequestbankruptcytoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("7.4 Request Bankruptcy Search Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Request Bankruptcy Search (Success) toaster message missing!");
        console.log("7.4 Unable to Complete Request Bankruptcy Search Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(6).click();
    await page.locator("text= Bankruptcy Search ").waitFor();
    await page.locator("p-treetabletoggler").nth(10).click();
    await page.locator("text= Request Bankruptcy Search ").waitFor();
    const ReqBankruptcySearch1: any = await page.locator("p-chip div div").nth(11).textContent();
    expect.soft(ReqBankruptcySearch1.match("Ordered")).toBeTruthy();
    const RecBankruptcySearch: any = await page.locator("p-chip div div").nth(12).textContent();
    expect.soft(RecBankruptcySearch.match("Yet to start")).toBeTruthy();
    await page.locator("text= Receive Bankruptcy Search ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Not Bankruptcy Found']").click();
    await page.locator("text=Submit").last().click();
    const blankreceivebankruptcytoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankreceivebankruptcytoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("7.5 Receive Bankruptcy Search Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Receive Bankruptcy Search (Success) toaster message missing!");
        console.log("7.5 Unable to Complete Receive Bankruptcy Search Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(6).click();
    await page.locator("text= Bankruptcy Search ").waitFor();
    const BankruptcySearch1: any = await page.locator("p-chip div div").nth(10).textContent();
    expect.soft(BankruptcySearch1.match("Completed")).toBeTruthy();
    await page.locator("p-treetabletoggler").nth(10).click();
    await page.locator("text= Receive Bankruptcy Search ").waitFor();
    const RecBankruptcySearch1: any = await page.locator("p-chip div div").nth(12).textContent();
    expect.soft(RecBankruptcySearch1.includes("Not Bankrupt")).toBeTruthy();
    await page.locator("p-treetabletoggler").nth(10).click();
    const MilitarySearch: any = await page.locator("p-chip div div").nth(13).textContent();
    expect.soft(MilitarySearch.match("In-Progress")).toBeTruthy();
    await page.locator("p-treetabletoggler").nth(13).click();
    await page.locator("text= Request Military Search ").waitFor();
    const ReqMilitarySearch: any = await page.locator("p-chip div div").nth(14).textContent();
    expect.soft(ReqMilitarySearch.match("Yet to start")).toBeTruthy();
    await page.locator("text= Request Military Search ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Ordered']").click();
    await page.locator("text=Submit").last().click();
    const blankrequestmilitarytoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankrequestmilitarytoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("7.6 Request Military Search Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Request Military Search (Success) toaster message missing!");
        console.log("7.6 Unable to Complete Request Military Search Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(6).click();
    await page.locator("text= Military Search ").waitFor();
    await page.locator("p-treetabletoggler").nth(13).click();
    await page.locator("text= Request Military Search ").waitFor();
    const ReqMilitarySearch1: any = await page.locator("p-chip div div").nth(14).textContent();
    expect.soft(ReqMilitarySearch1.match("Ordered")).toBeTruthy();
    const RecMilitarySearch: any = await page.locator("p-chip div div").nth(15).textContent();
    expect.soft(RecMilitarySearch.match("Yet to start")).toBeTruthy();
    await page.locator("text= Receive Military Search ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Not in Active Military Duty']").click();
    await page.locator("text=Submit").last().click();
    const blankreceivemilitarytoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blankreceivemilitarytoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("7.7 Receive Military Search Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Receive Military Search (Success) toaster message missing!");
        console.log("7.7 Unable to Complete Receive Military Search Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(6).click();
    await page.locator("text= Bankruptcy Search ").waitFor();
    const SaleHeld: any = await page.locator("p-chip div div").nth(13).textContent();
    expect.soft(SaleHeld.includes("Yet to start")).toBeTruthy();
    await page.locator("text= Military Search ").waitFor();
    const MilitarySearch1: any = await page.locator("p-chip div div").nth(11).textContent();
    expect.soft(MilitarySearch1.match("Completed")).toBeTruthy();
    await page.locator("p-treetabletoggler").nth(11).click();
    await page.locator("text= Receive Military Search ").waitFor();
    const RecMilitarySearch1: any = await page.locator("p-chip div div").nth(13).textContent();
    expect.soft(RecMilitarySearch1.includes("Not in Activ")).toBeTruthy();
    await page.locator("text= Sale Held ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Held']").click();
    await page.locator("text=Submit").last().click();
    const blanksaleheldtoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (blanksaleheldtoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("7.8 Sale Held Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Sale Held (Success) toaster message missing!");
        console.log("7.8 Unable to Complete Sale Held Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(6).click();
    console.log("\nStep7: FHA Letter");
    const Sale1: any = await page.locator("p-chip div div").nth(6).textContent();
    expect.soft(Sale1.match("Completed")).toBeTruthy();
    await page.locator("text= Bankruptcy Search ").waitFor();
    const SaleHeld1: any = await page.locator("p-chip div div").nth(13).textContent();
    expect.soft(SaleHeld1.includes("Held")).toBeTruthy();
    //await page.locator("p-treetabletoggler").nth(5).click();
    // await page.locator("text= FHA Letter ").waitFor();
    // const FHALetter: any = await page.locator("p-chip div div").nth(6).textContent();
    // expect.soft(FHALetter.includes("Yet to start")).toBeTruthy();
    // await page.locator("text= FHA Letter ").click();
    // await page.locator("p-dropdown[id='StepStatus']").click();
    // await page.locator("li[aria-label='Review completed']").click();
    // await page.locator("text=Submit").last().click();
    // const blankfhalettertoaster: boolean = await page.locator("p-toastitem").isVisible();
    // if (blankfhalettertoaster === true) 
    // {
    //     await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
    //     console.log("7.1 FHA Letter Step Completed");  
    //     await page.waitForTimeout(3000);
    // } 
    // else
    // {
    //     console.log("Error: FHA Letter (Success) toaster message missing!");
    //     console.log("7.1 Unable to Complete FHA Letter Step");  
    //     await page.waitForTimeout(3000);
    // }
    // await page.locator("text= FHA Letter ").waitFor();
    // const FHALetter1: any = await page.locator("p-chip div div").nth(6).textContent();
    // expect.soft(FHALetter1.includes("Review compl")).toBeTruthy();
    const Step_ReferralReceived = await page.locator("p-chip div div").nth(0).textContent();
    const Step_TitleSearch = await page.locator("p-chip div div").nth(1).textContent();
    const Step_FHALetter = await page.locator("p-chip div div").nth(2).textContent();
    const Step_Complaint = await page.locator("p-chip div div").nth(3).textContent();
    const Step_Service = await page.locator("p-chip div div").nth(4).textContent();
    const Step_Judgement = await page.locator("p-chip div div").nth(5).textContent();
    const Step_Sale = await page.locator("p-chip div div").nth(6).textContent();
    if (Step_ReferralReceived?.includes("Review rec") && Step_TitleSearch?.includes("Completed") &&
    Step_FHALetter?.includes("Review compl") && Step_Complaint?.includes("Completed") && 
    Step_Service?.includes("Completed") && Step_Judgement?.includes("Completed") && 
    Step_Sale?.includes("Completed"))
    {
        console.log("\nFinal Output:- Success, Case Steps Pass");    
    } 
    else 
    {
        console.log("\nFinal Output:- Error, Case Steps Failed");
    }
    //Referral rec...Review completed---Review completed
    //expect.soft(RRCaseNo).toContain(CaseNumberDetail).toBeTruthy();
    //const DefaultdateTime = "04/14/2023 03:20 PM";
    // var today = new Date();
    // var time = today.toLocaleTimeString();
    //var time = today.toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });
    //console.log("Current Time is : " + time);
    //var time = today.getHours() + ":" + today.getMinutes();
    //var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
    // console.log("Current Time is : " + time);
    // var date = today.getMonth()+1+'/'+today.getDate()+'/'+today.getFullYear();
    // var dateTime = date+' '+time;
    // console.log("Current Date and Time is : " + dateTime);
    //var time = today.getHours() + ":" + today.getMinutes();
    
    // caseValues.forEach(function (item, index) {
    //     console.log(item, index);
    // });
    // if(CaseNumber.includes(caseValues[j]))
    // {
    //     console.log("Pass");
    // }
    // else
    // {
    //     console.log("Fail");
    // }
    
    // console.log(caseValues);
    // for(let j=0; j < caseValues.length; j++)
    // {
    //     if(CaseNumber.includes(caseValues[j]))
    //     {
    //         console.log("Pass");
    //     }
    //     else
    //     {
    //         console.log("Fail");
    //     }
    // }
});
test('@ViaFlowTesting @CaseSearchs and Step Completion @Regression Via Flow Testing: Searching created case and filling the data required',async ({page})=>
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
    const CaseNumber = " 458243-4552 "; 
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
    console.log("\nStep 1: Referral Received");
    await page.locator("text= Referral Received ").click();
    const RRCaseNo: any = await page.locator("#p-panel-1-content > div > div > div:nth-child(2) > span:nth-child(2)").textContent();
    expect.soft(RRCaseNo.match(CaseNumberDetail)).toBeTruthy();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Referral received']").click();
    await page.locator("text=Submit").click();
    const referrelreceivedtoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (referrelreceivedtoaster === true) 
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
    if (referrelreceivedtoaster === true) 
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
    console.log("\nStep 2: Title Search");
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
    const titlerequestedtoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (titlerequestedtoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("2.1 Title Requested Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Title Requested (Success) toaster message missing!");
        console.log("2.1 Unable to Complete Title Requested Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(1).click();
    await page.locator("text= Title Requested ").waitFor();
    const TReqStatus1: any = await page.locator("p-chip div div").nth(2).textContent();
    expect.soft(TReqStatus1.includes("Title reques")).toBeTruthy();
    const TRecStatus: any = await page.locator("p-chip div div").nth(4).textContent();
    expect.soft(TRecStatus.includes("Yet to start")).toBeTruthy();
    await page.locator("text= Title Received ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Title received']").click();
    await page.locator("text=Submit").click();
    const titlereceivedtoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (titlereceivedtoaster === true) 
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
    console.log("\nStep 2.1: Fair Debt Letter");
    await page.locator("text= Title Requested ").waitFor();
    const TRecStatus1: any = await page.locator("p-chip div div").nth(4).textContent();
    expect.soft(TRecStatus1.includes("Title receiv")).toBeTruthy();
    const FairDebt: any = await page.locator("p-chip div div").nth(5).textContent();
    expect.soft(FairDebt.includes("In-Progress")).toBeTruthy();
    await page.locator("p-treetabletoggler").nth(4).click();
    await page.locator("text= Fair Debt Figures Requested ").waitFor();
    const FairDebtReq: any = await page.locator("p-chip div div").nth(6).textContent();
    expect.soft(FairDebtReq.includes("Yet to start")).toBeTruthy();
    await page.locator("text= Fair Debt Figures Requested ").click();
    await page.locator("p-dropdown[id='StepStatus']").click();
    await page.locator("li[aria-label='Requested']").click();
    await page.locator("text=Submit").click();
    const fairdebtreqtoaster: boolean = await page.locator("p-toastitem").isVisible();
    if (fairdebtreqtoaster === true) 
    {
        await expect(page.locator("p-toastitem")).toContainText("Successfully updated data!");
        console.log("2.1.1 Fair Debt Figures Requested Step Completed");  
        await page.waitForTimeout(3000);
    } 
    else
    {
        console.log("Error: Fair Debt Figures Requested (Success) toaster message missing!");
        console.log("2.1.1 Unable to Complete Fair Debt Figures Requested Step");  
        await page.waitForTimeout(3000);
    }
    await page.locator("p-treetabletoggler").nth(1).click();
    await page.locator("text= Fair Debt Letter ").waitFor();
    await page.locator("p-treetabletoggler").nth(4).click();
    await page.locator("text= Fair Debt Figures Requested ").waitFor();
    const FairDebtReq1: any = await page.locator("p-chip div div").nth(6).textContent();
    expect.soft(FairDebtReq1.includes("Requested")).toBeTruthy();
    const FairDebtRec: any = await page.locator("p-chip div div").nth(7).textContent();
    expect.soft(FairDebtRec.includes("Yet to start")).toBeTruthy();
});