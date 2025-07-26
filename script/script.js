let licenseList = [];

async function uploadToServer(newLicense) {
    try {
        let response = await fetch("https://license-api.o-komik.workers.dev/api/licenses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newLicense)
        });
        if (!response.ok) {
            throw new Error(`Upload fehlgeschlagen: ${response.status}`);
        }
        console.log("Daten erfolgreich hochgeladen");
    } catch (error) {
        console.error("Fehler beim Hochladen der Lizenzdaten:", error.message);
    }
}

async function init() {
    try {
        let response = await fetch("https://license-api.o-komik.workers.dev/api/licenses");
        if (!response.ok) {
            throw new Error(`HTTP-Fehler: ${response.status} ${response.statusText}`);
        }
        let data = await response.json();
        licenseList = data;
        console.log("Lizenzdaten geladen:", licenseList);
    } catch (error) {
        console.error("Fehler beim Laden oder Verarbeiten der Lizenzdaten:", error.message);
    }
    createAllHtmlContainer();
}

function createAllHtmlContainer() {
    createHeader();
    createLimitedContent();
    createForm();
    createSearchForm();
    createChangeForm();
    createSearchLicenseButton();
    createChangeLicenseButton();
    createAddLicenseButton();
    createGoBackButton();
    createAllAvailableLicensesContainer();
    createFooter();
}

function addLicense(event) {
    event.preventDefault();
    let licenseName = document.getElementById("name").value.trim().toLowerCase();
    let licenseExpiryDate = document.getElementById("date").value.trim().toLowerCase();
    let licenseOwner = document.getElementById("owner").value.trim().toLowerCase();
    let newLicense = {
        name: licenseName,
        expiryDate: licenseExpiryDate,
        owner: licenseOwner
    }
    licenseList.push(newLicense);
    console.log(licenseList)
    uploadToServer(newLicense);
    createInfoText();
}

function searchLicense(event) {
    event.preventDefault();
    checkLisenceList();
    filterLicenseList();
    document.getElementById("licenseSearchForm").reset();
}

function changeLicense(event) {
    event.preventDefault();
}

function checkLisenceList() {
    if (!licenseList || licenseList.length === 0) {
        alert("No license in the Database");
        document.getElementById("licenseSearchForm").reset();
        return;
    }
}

function filterLicenseList() {
    const searchedValues = getSearchedValues();
    try {
        const filtered = filterLicenses(searchedValues)
        if (filtered.length === 0) {
            handleNoResults();
            return;
        }
        showFilteredLicenses(filtered);
    } catch (error) {
        handleError(error);
    }
}

function getSearchedValues() {
    return {
        name: document.getElementById("searchLicense").value.trim().toLowerCase(),
        expiryDate: document.getElementById("searchDate").value.trim().toLowerCase(),
        owner: document.getElementById("searchOwner").value.trim().toLowerCase()
    };
}

function filterLicenses({ name, expiryDate, owner }) {
    return licenseList.filter(license => {
        const nameMatch = name === "" || license.name.toLowerCase().includes(name);
        const expiryMatch = expiryDate === "" || license.expiryDate.toLowerCase().includes(expiryDate);
        const ownerMatch = owner === "" || license.owner.toLowerCase().includes(owner);
        return nameMatch && expiryMatch && ownerMatch;
    });
}

function handleNoResults() {
    alert("No licenses found with the given criteria.");
    document.getElementById("licenseSearchForm").reset();
}

function handleError(error) {
    console.error("Fehler beim Filtern:", error);
    alert("Fehler bei der Lizenzsuche. Bitte versuchen Sie es erneut.");
    document.getElementById("licenseSearchForm").reset();
}

function showFilteredLicenses(filteredLicenses) {
    document.getElementById("allAvailableLicensesContainer").classList.remove("d-none");
    document.getElementById("allAvailableLicensesContainer").innerHTML = "";

    filteredLicenses.forEach(license => {
        document.getElementById("allAvailableLicensesContainer").innerHTML += allAvailableLicensesContainerTemplate(license);
    })

    console.table(filteredLicenses);
}

function toggleFromAddToSearchForm() {
    document.getElementById("licenseForm").classList.toggle("d-none");
    document.getElementById("licenseForm").reset();
    document.getElementById("searchLicenseButton").classList.toggle("d-none");
    document.getElementById("goBackButton").classList.toggle("d-none");
    document.getElementById("licenseSearchForm").classList.toggle("d-none");
    document.getElementById("licenseSearchForm").reset();
    document.getElementById("changeLicenseButton").classList.toggle("d-none");
}

function toggleFromAddToChangeForm(){
    document.getElementById("licenseForm").classList.toggle("d-none");
    document.getElementById("licenseForm").reset();
    document.getElementById("changeLicenseButton").classList.toggle("d-none");
    document.getElementById("addLicenseButton").classList.toggle("d-none");
    document.getElementById("searchLicenseButton").classList.toggle("d-none");
    document.getElementById("licenseChangeForm").classList.toggle("d-none");
    document.getElementById("licenseChangeForm").reset();
}

function toggleFromChangeToAddSearch() {
    document.getElementById("licenseChangeForm").classList.toggle("d-none");
    document.getElementById("licenseChangeForm").reset();
    document.getElementById("changeLicenseButton").classList.toggle("d-none");
    document.getElementById("addLicenseButton").classList.toggle("d-none");
    document.getElementById("licenseForm").classList.toggle("d-none");
    document.getElementById("licenseForm").reset();
    document.getElementById("searchLicenseButton").classList.toggle("d-none");
    document.getElementById("goBackButton").classList.toggle("d-none");
}

function removeDnone() {
    document.getElementById("allAvailableLicensesContainer").classList.add("d-done");
    document.getElementById("allAvailableLicensesContainer").innerHTML = "";
}