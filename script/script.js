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
    createFromAddToChangeButton();
    createAddLicenseButton();
    createGoBackToAddButton();
    createBackToSearchButton();
    createLicenseContainer();
    createFooter();
}

function addLicense(event) {
    event.preventDefault();
    let licenseName = document.getElementById("License_Name").value.trim().toLowerCase();
    let licenseOwner = document.getElementById("User").value.trim().toLowerCase();
    let licenseExpiryDate = document.getElementById("Expiry_Date").value.trim().toLowerCase();
    let licenseDongelId = document.getElementById("Dongel_ID").value.trim().toLowerCase();
    let licenseAffiliation = document.getElementById("Affiliation").value.trim().toLowerCase();
    let newLicense = {
        License_Name: licenseName,
        Expiry_Date: licenseExpiryDate,
        User: licenseOwner,
        Dongle_ID: licenseDongelId,
        Affiliation: licenseAffiliation
    }
    licenseList.push(newLicense);
    
    uploadToServer(newLicense);
    createInfoText();
}

function searchLicense(event) {
    event.preventDefault();
    document.getElementById("licenseSearchForm").classList.add("d-none");//verschwindet
    document.getElementById("goBackToAddButton").classList.add("d-none");//verschwindet
    document.getElementById("backToSearchButton").classList.remove("d-none");
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
        License_Name: document.getElementById("Search_License_Name").value.trim().toLowerCase(),
        Expiry_Date: document.getElementById("Search_Expiry_Date").value.trim().toLowerCase(),
        User: document.getElementById("Search_User").value.trim().toLowerCase(),
        Dongle_ID: document.getElementById("Search_Dongel_ID").value.trim().toLowerCase(),
        Affiliation: document.getElementById("Search_Affiliation").value.trim().toLowerCase()
    };
}

function filterLicenses({ License_Name, Expiry_Date, User, Dongle_ID, Affiliation }) {
    return licenseList.filter(license => {
        const nameMatch = License_Name === "" || license.License_Name.toLowerCase().includes(License_Name);
        const expiryMatch = Expiry_Date === "" || license.Expiry_Date.toLowerCase().includes(Expiry_Date);
        const ownerMatch = User === "" || license.User.toLowerCase().includes(User);
        const dongleIdMatch = Dongle_ID === "" || license.Dongle_ID.toLowerCase().includes(Dongle_ID);
        const affiliationMatch = Affiliation === "" || license.Affiliation.toLowerCase().includes(Affiliation);
        return nameMatch && expiryMatch && ownerMatch && dongleIdMatch && affiliationMatch;
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
    document.getElementById("licenseContainer").classList.remove("d-none");
    document.getElementById("licenseContainer").innerHTML = "";

    filteredLicenses.forEach(license => {
        document.getElementById("licenseContainer").innerHTML += licenseContainerTemplate(license);
    })

    console.table(filteredLicenses);
}

function fromAddToSearchForm() {
    document.getElementById("licenseForm").classList.add("d-none");//lässt verschwinden
    document.getElementById("licenseForm").reset();
    document.getElementById("searchLicenseButton").classList.add("d-none");//war von Anfang an sichtbar
    document.getElementById("goBackToAddButton").classList.remove("d-none");
    document.getElementById("licenseSearchForm").classList.remove("d-none");
    document.getElementById("licenseSearchForm").reset();
    document.getElementById("fromAddToChangeButton").classList.add("d-none");//war von Anfang an sichtbar
}

function fromSearchToAddForm(){
    document.getElementById("licenseSearchForm").classList.add("d-none");
    document.getElementById("licenseSearchForm").reset();
    document.getElementById("goBackToAddButton").classList.add("d-none");
    document.getElementById("searchLicenseButton").classList.remove("d-none");
    document.getElementById("fromAddToChangeButton").classList.remove("d-none");
    document.getElementById("licenseForm").classList.remove("d-none");
    document.getElementById("licenseForm").reset();
}

function fromAddToChange(){
    document.getElementById("licenseForm").classList.add("d-none");
    document.getElementById("licenseForm").reset();
    document.getElementById("fromAddToChangeButton").classList.add("d-none");
    document.getElementById("addLicenseButton").classList.add("d-none");
    document.getElementById("searchLicenseButton").classList.add("d-none");
    document.getElementById("licenseChangeForm").classList.add("d-none");
    document.getElementById("licenseChangeForm").reset();
    document.getElementById("licenseSearchForm").classList.add("d-none");
    document.getElementById("licenseSearchForm").reset();
}

function toggleFromChangeToAddSearch() {
    document.getElementById("licenseChangeForm").classList.toggle("d-none");
    document.getElementById("licenseChangeForm").reset();
    document.getElementById("fromAddToChangeButton").classList.toggle("d-none");
    document.getElementById("addLicenseButton").classList.toggle("d-none");
    document.getElementById("licenseForm").classList.toggle("d-none");
    document.getElementById("licenseForm").reset();
    document.getElementById("searchLicenseButton").classList.toggle("d-none");
    document.getElementById("backToSearchButton").classList.toggle("d-none");
    document.getElementById("limitedContainer").classList.add("flex-direction");
}

function toggleToAdd() {
    document.getElementById("licenseSearchForm").classList.add("d-none");
    document.getElementById("licenseChangeForm").classList.add("d-none");
    document.getElementById("licenseForm").classList.remove("d-none");
    document.getElementById("searchLicenseButton").classList.remove("d-none");
    document.getElementById("fromAddToChangeButton").classList.remove("d-none");
    document.getElementById("addLicenseButton").classList.add("d-none");
    document.getElementById("backToSearchButton").classList.add("d-none");
}

function removeLicenseContainer() {
    document.getElementById("licenseContainer").classList.add("d-done");
    document.getElementById("licenseContainer").innerHTML = "";
    document.getElementById("licenseSearchForm").classList.remove("d-none");
    document.getElementById("licenseSearchForm").reset();
    document.getElementById("goBackToAddButton").classList.remove("d-none");
    document.getElementById("backToSearchButton").classList.add("d-none");
}