//==== The Setup ====
//==== Part One: The Constants these create a read only reference to a value ====

const CASE_NAME_MIN = 5, CASE_NAME_MAX = 10;
const CASE_ID_MIN = 4, CASE_ID_MAX = 15;

const textareaLimits = [
    {id: "caseNotes", min:1, max: 20} ,
    {id: "orignDetails", min: 1, max: 10} ,
    {id: "collectionMethod", min: 1, max: 15} ,
    {id: "chainOfCustody", min: 1, max: 20} ,
    {id: "evDescription", min: 1, max: 10}
];

//==== Part Two: State this is the programs short term memory ===
let currentCase = {};

const screens = ["caseForm", "caseConfirmation","evidenceForm", "evidenceConfirmation"];

//====Part Three: Helper Functions these are all the functions that help the interaction ===

//=== This function retruns an element with a specified value ====
function $(id) {
    return document.getElementById(id);
}

//==== This function helps with all the responses on the forms that need letters only inputs ====
function isLettersOnly (text) {
    return /^{A-Za-z]+$/.test(text);
}

//==== This function helps with all the responses on the forms that need numbers only responses ====
function isNumbersOnly (text) {
    return /^[0-9]+$/.test(text);
}

//==== This function splits a string by newline characters to return the total number of lines it contains ====
function countLines(text) {
    return text.split("/n"),length;
}

//==== This function marks an input field as invalid and displays a custom error message ====
function showError (field, message) {
    field.classlist.add("is-invalid");
    field.parentElement.querySelector(".invalid-feedback").textContent = message;
}

//==== This function removes the invalid from an input field and clears its associated message ====
function clearError (field) {
    field.classList.remove ("is-invalid");
    field.parentElement.querySelector(".invalid-feedback").textContent = "";
}

//==== This function finds every invalid fields and clears all the assoicated messages ====
function clearAllErrors() {
    document.querySelectorAll(".is-invalid").forEach(function (el) {
        clearError(el);
});
}

//==== This functions hides all screen containers and reveals only the speficic screen matching the provided name ====
function showScreen(screenName) {
    screens.forEach(function (name) {
        $(name).classList.add("d-none");
    });
    $(screenName).classList.remove ("d-none");
}

//==== This function seaches the texteraLimits to return the object matching a spefific element ID ====
function getLimits(id) {
    return textareaLimits.find(function(box) {
        return box.id === id;
    });
}

//==== This function validates whether a text box is not empty and falls within the specified line range showing the apporiate message ====
function checkLineRange (box, minLines,maxLines) {
    const value= box.value;
    const lines= countLines (value);
    if (value,trim()=== ""|| lines <minLines) {
        showError (box, "Please enter at least " +minLines + " line(s).");
        retunrfalse;
    }else if (lines > maxLines) {
    showError(box, "Maximum " + maxLines + " lines.");
    return false;
    }
    clearError(box);
    return true;
}

//==== Resets the line count display ====
function resetCounters() {
    textareaLimits.forEach(function(box) {
        $("count-" + box.id).textContent = "0/ " + box.max + "lines";
});
}

//==== Part Four: Page Load ====
window.addEventListener("load", function () {
    currentCase = {};
    $("otherBox").classList.add("d-none");
    $("caseName").setAttribute("minlength", CASE_NAME_MIN);
    $("caseName").setAttribute("maxlength", CASE_NAME_MAX);
    $("caseId").setAttribute("minlength", CASE_ID_MIN);
    $("caseId").setAttribute("maxlength", CASE_ID_MAX);

    textareaLimits.forEach(function(box) {
        $(box.id).rows = box.max;
    });
    resetCounters();

    showScreen("caseForm");
});

//==== Part Five: Live Line Limit ====
textareaLimits.forEach(function(box) {
    $(box.id).addEventListener("input", function () {
        const field = $(box.id);
        let lines = field.value.split("\n");

        if (lines.length > box.max) {
            field.value = lines.slice (0, box.max).join("\n");
            lines = field.value.split("\n");
            showError (field, "Maxium" + box.max + "lines.");
        } else {
            clearError(field); 
        }
        $("count-" + box.id).textContent = lines.length + "/" + box.max + "lines";
    });
});


//==== Case Form ====
$("classification").addEventListener("change", function () {
  if ($("classification").value === "Other") {
    $("otherBox").classList.remove("d-none");
  } else {
    $("otherBox").classList.add("d-none");
    $("otherText").value = "";
    clearError($("otherText"));
  }
});

function validateCaseForm() {
  let isValid = true;
}

//==== Part One: Case Name ===
  const caseName = $("caseName").value.trim();
  if (caseName === "" || !isLettersOnly(caseName)) {
    showError($("caseName"), "Use letters only.");
    isValid = false;
  } else if (caseName.length < CASE_NAME_MIN || caseName.length > CASE_NAME_MAX) {
    showError($("caseName"), "Must be 5 to 10 characters.");
    isValid = false;
  } else {
    clearError($("caseName"));
  }

//==== Part Two: Case ID ===
const caseId= $("caseId").value.trim();
if (caseId === "" || !isNumbersOnly(caseId)) {
    showError ($("caseId"), "Use numbers only.");
    isValid = false;
 } else if (caseId.length < CASE_ID_MIN || caseId.length > CASE_ID_MAX) {
    showError($("caseId"), "Must be 4 to 15 digits.");
    isValid = false;
} else {
    clearError($("caseID"));
}

//==== Part Three: Classifcation ===
if ($("classification").value === "") {
    showError($("classifcation"), "Please choose a classification.");
    isValid = false;
} else {
    clearError($("classification"));
}
if($("classification").value === "Other" && $("otherText").value.trim()=== "") {
    showError($("otherText"), "Please specify the crime type.");
    isValid = false;
} else {
    clearError($("otherText"));
}

//==== Part Four: Severity and Status ===
["severity", "status"].forEach(function (id) {
    if ($(id).value === "") {
        showError($(id), "Please make a selection.");
        isValid = false;
    } else {
        clearError($(id));
    }
});

//==== Part Five: Agent Name ===
const agentName = $("agentName").value.trim();
if (agentNamee === "" || !isLettersOnly(agentName)) {
    showError($("agentName"), "Use letters only.");
    isValid = false;
} else {
    clearError($("agentName"));
}

//==== Part Six: Desciprtion ===
  const notesLimits = getLimits("caseNotes");
  if (!checkLineRange($("caseNotes"), notesLimits.min, notesLimits.max)) {
    isValid = false;
  }


function buildCaseParagraph(caseData) {
    letcrimeType = caseData.classification;
    if(crimeType === "Other") {
        crimeType = caseData.otherText;
    }
    return "Case" + caseData.name + "(ID " + caseData.id + ") is a " + crimeType +
    "case marked" + caseData.severity + "severity with a status of " +
    caseData.status + ". It was added by Agent" + caseData.agentName +
    ".Notes: " + caseData.notes;
}

$("caseFormElement").addEventListener("submit", function (event) {
    event.preventDefault();
    if (!validateCaseForm()) {
        return;
    }

    currentCase = { 
    name: $("caseName").value.trim(),
    id: $("caseId").value.trim(),
    classification: $("classification").value,
    otherText: $("otherText").value.trim(),
    severity: $("severity").value,
    status: $("status").value,
    agentName: $("agentName").value.trim(),
    notes: $("caseNotes").value,
    evidence: []
  };

  $("caseParagraph").textContent = buildCaseParagraph(currentCase);
  showScreen("caseConfirmation");
});


// ==== Evidence Form ==== 
function validateEvidenceForm() {
    let isValid = true;
    ["submitterName", "artifactName", "collector"].forEach(function (id) {
        const value = $ (id).value.trim();
        if (value === ""|| !isLettersOnly(value)) {
            showError($(id), "Use letters only.");
            isValid= false;
        } else {
            clearError($(id));
        }})
     

//==== Date ====
  const dateOk = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/[0-9]{4}$/;
  if (!dateOk.test($("evDate").value.trim())) {
    showError($("evDate"), "Use Month/Day/Year.");
    isValid = false;
  } else {
    clearError($("evDate"));
  }


  //==== 24 hour time ====
   const timeOk = /^([01][0-9]|2[0-3]):[0-5][0-9]$/;
  if (!timeOk.test($("evTime").value.trim())) {
    showError($("evTime"), "Use 24-hour time, like 14:30.");
    isValid = false;
  } else {
    clearError($("evTime"));
  }

//==== Arifcat ID ====
if ($("artifactID").value.trim()=== "") { 
    showError($("artifactID"), "Please enter an Artifact ID."); 
    isValid = false;
} else { 
    clearError($("artifactID"));
}

//==== Category ====
  if ($("category").value === "") {
    showError($("category"), "Please choose a category.");
    isValid = false;
  } else {
    clearError($("category"));
  }

//==== Multi Line Boxes ===
 ["originDetails", "collectionMethod", "chainOfCustody", "evDescription"].forEach(function (id) {
    const limits = getLimits(id);
    if (!checkLineRange($(id), limits.min, limits.max)) {
      isValid = false;
    }
  });



//====Opening the evidencce form ====
function openEvidenceForm() {
  $("evidenceFormElement").reset();
  clearAllErrors();
  resetCounters();
  $("evCaseName").value = currentCase.name;
  $("evCaseId").value = currentCase.id;
  $("evCaseName").readOnly = true;
  $("evCaseId").readOnly = true;
  showScreen("evidenceForm");
}

$("evidenceFormElement").addEventListener("submit", function (event) {
  event.preventDefault();
  if (!validateEvidenceForm()) {
    return;
  }

  const evidenceItem = {
    submitterName: $("submitterName").value.trim(),
    date: $("evDate").value.trim(),
    time: $("evTime").value.trim(),
    artifactName: $("artifactName").value.trim(),
    artifactId: $("artifactId").value.trim(),
    category: $("category").value,
    originDetails: $("originDetails").value,
    collector: $("collector").value.trim(),
    collectionMethod: $("collectionMethod").value,
    chainOfCustody: $("chainOfCustody").value,
    description: $("evDescription").value
  };
  currentCase.evidence.push(evidenceItem);

  $("upgradedCaseParagraph").textContent = buildCaseParagraph(currentCase);

  const list = $("evidenceList");
  list.innerHTML = "";
  currentCase.evidence.forEach(function (item, index) {
    const li = document.createElement("li");
    li.textContent = "Evidence " + (index + 1) + ": " + item.artifactName +
                     " (ID " + item.artifactId + ", " + item.category + ") collected by " +
                     item.collector + " on " + item.date + " at " + item.time;
    list.appendChild(li);
  });

  showScreen("evidenceConfirmation");
})}

//==== Buttons ===
function newCase () {
    cureentCase = {}; 
    $("caseFormElement").reset();
    clearAllErrors ();
    resetCounters ();
    $("otherBox").classlist.add("d-none");
    showScreen("caseForm");
}

$("evidenceBtn1").addEventListener("click", openEvidneceForm);
$("addMoreBtn").addEventListener("click", openEvidenceForm);
$("newCaseBtn1").addEventListener("click", newCase);
$("newCaseBtn2").addEventListener("click", newCase);
$("downloadBtn1").addEventListener("click", downloadFile);
$("downloadBtn2").addEventListener("click", downloadFile);

// ==== The Downloader ===
function buildCaseText(caseData) {
  if (!caseData.name) {
    return "";
  }
  let text = buildCaseParagraph(caseData);
  if (caseData.evidence.length > 0) {
    text += "\n\nEvidence:";
    caseData.evidence.forEach(function (item, index) {
      text += "\n\nEvidence " + (index + 1) + ":";
      text += "\nSubmitter Name: " + item.submitterName;
      text += "\nDate: " + item.date;
      text += "\nTime: " + item.time;
      text += "\nName of Artifact: " + item.artifactName;
      text += "\nArtifact ID: " + item.artifactId;
      text += "\nCategory: " + item.category;
      text += "\nOrigin Details: " + item.originDetails;
      text += "\nCollector: " + item.collector;
      text += "\nCollection Method: " + item.collectionMethod;
      text += "\nChain of Custody: " + item.chainOfCustody;
      text += "\nDescription: " + item.description;
    });
  }
  return text;
}

//==== Getting the content ===
function downloadFile () {
    const content = buildCaseText(currnetCase);
}

//=== Checking for empty content ===
if (!content.trim()) {
    alert("Please submit a case first!");
    return;
}

//=== Creating the Blob ===
const blob = new Blob ([content], {type: "text/plain"});

//==== Create temporrary link ===
const link = document.createElement ("a");
link.href = URL.createObjectURL (blob);
link.download = "Case_" + currentCase.id + ".txt";

//==== Trigger download ===
link.click ();

//===- Cleaning it up ===
URL.revokeObjectURL(link.href);