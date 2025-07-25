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
    searchLicenseButton.innerHTML = "Search License";
    searchLicenseButton.onclick = toggleSearchForm;
    document.getElementById("limitedContent").appendChild(searchLicenseButton);
}

function createGoBackButton() {
    let goBackButton = document.createElement("button");
    goBackButton.id = "goBackButton";
    goBackButton.className = "d-none";
    goBackButton.innerHTML = "Go Back";
    goBackButton.onclick = function () {
        toggleSearchForm();
        removeDnone();
    };
    document.getElementById("limitedContent").appendChild(goBackButton);
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
    searchForm.id = "licenseSearchForm";
    searchForm.className = "license-form d-none";
    searchForm.innerHTML = searchFormTemplate();
    searchForm.onsubmit = searchLicense;
    document.getElementById("limitedContent").appendChild(searchForm);
}

function createAllAvailableLicensesContainer() {
    let allAvailableLicensesContainer = document.createElement("div");
    allAvailableLicensesContainer.id = "allAvailableLicensesContainer";
    allAvailableLicensesContainer.className = "allAvailableLicensesContainer";
    allAvailableLicensesContainer.innerHTML = "";
    document.getElementById("limitedContent").appendChild(allAvailableLicensesContainer);
}

function createFooter() {
    let footer = document.createElement("footer");
    footer.className = "footer";
    footer.innerHTML = "<p class='footer-text'>© 2025 Customer Database</p><p class='footer-text'>created by Marco Rößler</p>";
    document.getElementById("body").appendChild(footer);
}