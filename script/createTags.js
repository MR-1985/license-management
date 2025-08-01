function createHeader() {
    let header = document.createElement("header");
    header.className = "header";
    header.innerHTML = "<h1 class='header-title'>license manager</h1>";
    document.getElementById("body").appendChild(header);
}

function createLimitedContent() {
    let limitedContent = document.createElement("div");
    limitedContent.id = "limitedContent"
    limitedContent.className = "limited-content";
    document.getElementById("body").appendChild(limitedContent);
}

function createForm() {
    let form = document.createElement("form");
    form.id = "licenseForm";
    form.className = "license-form";
    form.innerHTML = formTemplate();
    form.onsubmit = addLicense;
    document.getElementById("limitedContent").appendChild(form);
}

function createSearchForm() {
    let searchForm = document.createElement("form");
    searchForm.id = "searchForm";
    searchForm.className = "license-form d-none";
    searchForm.innerHTML = searchFormTemplate();
    searchForm.onsubmit = searchLicense;
    document.getElementById("limitedContent").appendChild(searchForm);
}

function createChangeForm() {
    let changeForm = document.createElement("form");
    changeForm.id = "licenseChangeForm";
    changeForm.className = "license-form d-none";
    changeForm.innerHTML = changeFormTemplate();
    changeForm.onsubmit = async function (event) {
        event.preventDefault();
        await uploadNewDataToDataBase(event);
    }
    document.getElementById("limitedContent").appendChild(changeForm);
}

function createDeleteForm() {
    let deleteForm = document.createElement("form");
    deleteForm.id = "licenseDeleteForm";
    deleteForm.className = ("license-form d-none");
    deleteForm.innerHTML = deleteFormTemplate();
    deleteForm.onsubmit = async function (event) {
        event.preventDefault();
        const licenseId = document.getElementById("Delete_ID").value.trim();
        if (licenseId) {
            const confirmed = confirm(`Soll die Lizenz mit der ID ${licenseId} wirklich gelöscht werden?`)
            if (confirmed) {
                await deleteLicense(licenseId);
            } else {
                console.log("Löschvorgang abgebrochen.");
            }
        } else {
            alert("Bitte geben Sie eine gültige Lizenz-ID ein.");
        }
    }
    document.getElementById("limitedContent").appendChild(deleteForm);
}

function createSearchLicenseButton() {
    let searchLicenseButton = document.createElement("button");
    searchLicenseButton.id = "searchLicenseButton";
    searchLicenseButton.className = "btn";
    searchLicenseButton.innerHTML = "Search License";
    searchLicenseButton.onclick = fromAddToSearchForm;
    document.getElementById("limitedContent").appendChild(searchLicenseButton);
}

function createFromAddToChangeButton() {
    let fromAddToChangeButton = document.createElement("button");
    fromAddToChangeButton.id = "fromAddToChangeButton";
    fromAddToChangeButton.className = "fromAddToChangeButton btn";
    fromAddToChangeButton.innerHTML = "Change License";
    fromAddToChangeButton.onclick = fromAddToChange;
    document.getElementById("limitedContent").appendChild(fromAddToChangeButton);
}

// function createFromSearchToAddButton() {
//     let fromSearchToAddButton = document.createElement("button");
//     fromSearchToAddButton.id = "fromSearchToAddButton";
//     fromSearchToAddButton.className = "d-none btn";
//     fromSearchToAddButton.innerHTML = "Go back to add licenses";
//     fromSearchToAddButton.onclick = function () {
//         fromSearchToAdd();
//     };
//     document.getElementById("limitedContent").appendChild(fromSearchToAddButton);
// }

function createBackToSearchButton() {
    let backToSearchButton = document.createElement("button");
    backToSearchButton.id = "backToSearchButton";
    backToSearchButton.className = "d-none btn";
    backToSearchButton.innerHTML = "Go back to search licenses";
    backToSearchButton.onclick = function () {
        removeLicenseContainer();
    };
    document.getElementById("limitedContent").appendChild(backToSearchButton);
}

// function createFromChangeToAddButton() {
//     let fromChangeToAddButton = document.createElement("button");
//     fromChangeToAddButton.id = "fromChangeToAddButton";
//     fromChangeToAddButton.className = "d-none btn";
//     fromChangeToAddButton.innerHTML = "Go back to add licenses";
//     fromChangeToAddButton.onclick = fromChangeToAdd
//     document.getElementById("limitedContent").appendChild(fromChangeToAddButton);
// }

function createFromAddToDeleteButton() {
    let fromAddToDeleteButton = document.createElement("button");
    fromAddToDeleteButton.id = "fromAddToDeleteButton";
    fromAddToDeleteButton.className = "fromAddToDeleteButton btn";
    fromAddToDeleteButton.innerHTML = "Delete License";
    fromAddToDeleteButton.onclick = fromAddToDelete;
    document.getElementById("limitedContent").appendChild(fromAddToDeleteButton);
}

// function createFromDeleteToAddButton() {
//     let fromDeleteToAddButton = document.createElement("button");
//     fromDeleteToAddButton.id = "fromDeleteToAddButton";
//     fromDeleteToAddButton.className = "fromDeleteToAddButton btn d-none";
//     fromDeleteToAddButton.innerHTML = "Back to Add License";
//     fromDeleteToAddButton.onclick = fromDeleteToAdd;
//     document.getElementById("limitedContent").appendChild(fromDeleteToAddButton);
// }

function createHomeButton() {
    let homeButton = document.createElement("button");
    homeButton.id = "homeButton";
    homeButton.className = "homeButton btn d-none";
    homeButton.innerHTML = "Back to Home";
    homeButton.onclick = backToHome;
    document.getElementById("limitedContent").appendChild(homeButton);
}

function createLicenseContainer() {
    let licenseContainer = document.createElement("div");
    licenseContainer.id = "licenseContainer";
    licenseContainer.className = "licenseContainer d-none";
    licenseContainer.innerHTML = "";
    document.getElementById("limitedContent").appendChild(licenseContainer);
}

function createInfoText() {
    let infoText = document.createElement("p");
    infoText.className = "info-text";
    infoText.innerHTML = "Licence successfully added to server.";
    document.getElementById("limitedContent").appendChild(infoText);
    setTimeout(() => {
        infoText.remove();
        document.getElementById("licenseForm").reset();
    }, 2000);
}

function createDeleteInfoText() {
    let deleteInfoText = document.createElement("p");
    deleteInfoText.className = "info-text";
    deleteInfoText.innerHTML = "Licence successfully deleted from server.";
    document.getElementById("limitedContent").appendChild(deleteInfoText);
    setTimeout(() => {
        deleteInfoText.remove();
        document.getElementById("licenseForm").reset();
    }, 2000);
}

function createFooter() {
    let footer = document.createElement("footer");
    footer.className = "footer";
    footer.innerHTML = "<p class='footer-text'>© 2025 Customer Database</p><p class='footer-text'>created by Marco Rößler</p>";
    document.getElementById("body").appendChild(footer);
}