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

function createFromSearchToAddButton() {
    let fromSearchToAddButton = document.createElement("button");
    fromSearchToAddButton.id = "fromSearchToAddButton";
    fromSearchToAddButton.className = "d-none btn";
    fromSearchToAddButton.innerHTML = "Go back to add licenses";
    fromSearchToAddButton.onclick = function () {
        fromSearchToAddForm();
    };
    document.getElementById("limitedContent").appendChild(fromSearchToAddButton);
}

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

function createFromChangeToAddButton() {
    let fromChangeToAddButton = document.createElement("button");
    fromChangeToAddButton.id = "fromChangeToAddButton";
    fromChangeToAddButton.className = "d-none btn";
    fromChangeToAddButton.innerHTML = "Go back to add licenses";
    fromChangeToAddButton.onclick = fromChangeToAdd
    document.getElementById("limitedContent").appendChild(fromChangeToAddButton);
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

function createSearchForm() {
    let searchForm = document.createElement("form");
    searchForm.id = "searchForm";
    searchForm.className = "license-form d-none";
    searchForm.innerHTML = searchFormTemplate();
    searchForm.onsubmit = searchLicense;
    document.getElementById("limitedContent").appendChild(searchForm);
}

function createLicenseContainer() {
    let licenseContainer = document.createElement("div");
    licenseContainer.id = "licenseContainer";
    licenseContainer.className = "licenseContainer d-none";
    licenseContainer.innerHTML = "";
    document.getElementById("limitedContent").appendChild(licenseContainer);
}

function createChangeForm() {
    let changeForm = document.createElement("form");
    changeForm.id = "licenseChangeForm";
    changeForm.className = "license-form d-none";
    changeForm.innerHTML = changeFormTemplate();
    changeForm.onsubmit = function () {
        // event.preventDefault();
        uploadNewDataToDataBase();
    }
    document.getElementById("limitedContent").appendChild(changeForm);
}

function createFooter() {
    let footer = document.createElement("footer");
    footer.className = "footer";
    footer.innerHTML = "<p class='footer-text'>© 2025 Customer Database</p><p class='footer-text'>created by Marco Rößler</p>";
    document.getElementById("body").appendChild(footer);
}