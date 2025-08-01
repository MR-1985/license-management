let licenseList = [];

function createAllHtmlContainer() {
    createHeader();
    createLimitedContent();
    createForm();
    createSearchForm();
    createChangeForm();
    createSearchLicenseButton();
    createLicenseContainer();
    createFromSearchToAddButton();
    createBackToSearchButton();
    createFromAddToChangeButton();
    createFromChangeToAddButton();
    createFooter();
}

async function init() {
    try {
        let response = await fetch("https://license-api.o-komik.workers.dev/api/licenses");
        if (!response.ok) {
            throw new Error(`HTTP-Fehler: ${response.status} ${response.statusText}`);
        }
        let data = await response.json();
        licenseList = data;
        console.log("Lizenzdaten geladen:");
        console.table(licenseList);

    } catch (error) {
        console.error("Fehler beim Laden oder Verarbeiten der Lizenzdaten:", error.message);
    }
    createAllHtmlContainer();
}

function addLicense(event) {
    event.preventDefault();
    let licenseId = document.getElementById("ID").value.toString().trim().toLowerCase();
    let licenseName = document.getElementById("License_Name").value.trim().toLowerCase();
    let licenseOwner = document.getElementById("User").value.trim().toLowerCase();
    let licenseExpiryDate = document.getElementById("Expiry_Date").value.trim().toLowerCase();
    let licenseDongleId = document.getElementById("Dongle_ID").value.trim().toLowerCase();
    let licenseAffiliation = document.getElementById("Affiliation").value.trim().toLowerCase();
    let newLicense = {
        id: licenseId,
        license_name: licenseName,
        expiry_date: licenseExpiryDate,
        user: licenseOwner,
        dongle_id: licenseDongleId,
        affiliation: licenseAffiliation
    }
    licenseList.push(newLicense);

    uploadToServer(newLicense);
    createInfoText();
}

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
        } else if (response.ok) {
            console.log("Daten erfolgreich hochgeladen");
        }
    } catch (error) {
        console.error("Fehler beim Hochladen der Lizenzdaten:", error.message);
    }
}

function searchLicense(event) {
    event.preventDefault();
    document.getElementById("searchForm").classList.add("d-none");
    document.getElementById("fromSearchToAddButton").classList.add("d-none");
    document.getElementById("backToSearchButton").classList.remove("d-none");
    checkLisenceList();
    filterLicenseList();
    document.getElementById("searchForm").reset();
}

function checkLisenceList() {
    if (!licenseList || licenseList.length === 0) {
        alert("No license in the Database");
        document.getElementById("searchForm").reset();
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
        id: document.getElementById("ID").value.trim().toLowerCase(),
        license_name: document.getElementById("Search_License_Name").value.trim().toLowerCase(),
        expiry_date: document.getElementById("Search_Expiry_Date").value.trim().toLowerCase(),
        user: document.getElementById("Search_User").value.trim().toLowerCase(),
        dongle_id: document.getElementById("Search_Dongle_ID").value.trim().toLowerCase(),
        affiliation: document.getElementById("Search_Affiliation").value.trim().toLowerCase()
    };
}

function filterLicenses({ id, license_name, expiry_date, user, dongle_id, affiliation }) {
    return licenseList.filter(license => {
        const idMatch = id === "" || license.id.toString().toLowerCase().includes(id);
        const nameMatch = license_name === "" || license.license_name.toLowerCase().includes(license_name);
        const expiryMatch = expiry_date === "" || license.expiry_date.toLowerCase().includes(expiry_date);
        const ownerMatch = user === "" || license.user.toLowerCase().includes(user);
        const dongleIdMatch = dongle_id === "" || license.dongle_id.toLowerCase().includes(dongle_id);
        const affiliationMatch = affiliation === "" || license.affiliation.toLowerCase().includes(affiliation);
        return idMatch && nameMatch && expiryMatch && ownerMatch && dongleIdMatch && affiliationMatch;
    });
}

function showFilteredLicenses(filteredLicenses) {
    document.getElementById("licenseContainer").classList.remove("d-none");
    document.getElementById("licenseContainer").innerHTML = "";

    filteredLicenses.forEach(license => {
        document.getElementById("licenseContainer").innerHTML += licenseContainerTemplate(license);
    })

    console.table(filteredLicenses);
}

function fillTheChangeForm() {
    checkLisenceList();
    filtered = filterOldLicenseList();
    if (filtered) {
        fillFormWithFilteredLicenses(filtered)
    }
}

function filterOldLicenseList() {
    const searchedValues = getSearchedOldValues();
    try {
        const filtered = filterOldLicenses(searchedValues)
        console.log("Suchwerte:", searchedValues);
        console.log("Gefundene Lizenzen:", filtered);
        if (filtered.length === 0) {
            handleNoResults();
            return;
        }
        fillFormWithFilteredLicenses(filtered);
        return filtered;
    } catch (error) {
        handleError(error);
    }
}

function getSearchedOldValues() {
    return {
        id: document.getElementById("Change_ID").value.trim().toLowerCase(),
        license_name: document.getElementById("Change_License_Name").value.trim().toLowerCase(),
        expiry_date: document.getElementById("Change_Expiry_Date").value.trim().toLowerCase(),
        user: document.getElementById("Change_User").value.trim().toLowerCase(),
        dongle_id: document.getElementById("Change_Dongle_ID").value.trim().toLowerCase(),
        affiliation: document.getElementById("Change_Affiliation").value.trim().toLowerCase()
    };
}

function filterOldLicenses({ id, license_name, expiry_date, user, dongle_id, affiliation }) {
    return licenseList.filter(license => {
        const idMatch = id === "" || license.id.toString().toLowerCase().includes(id);
        const nameMatch = license_name === "" || license.license_name.toLowerCase().includes(license_name);
        const expiryMatch = expiry_date === "" || license.expiry_date.toLowerCase().includes(expiry_date);
        const ownerMatch = user === "" || license.user.toLowerCase().includes(user);
        const dongleIdMatch = dongle_id === "" || license.dongle_id.toLowerCase().includes(dongle_id);
        const affiliationMatch = affiliation === "" || license.affiliation.toLowerCase().includes(affiliation);
        return idMatch && nameMatch && expiryMatch && ownerMatch && dongleIdMatch && affiliationMatch;
    });
}

function fillFormWithFilteredLicenses(filteredLicenses) {
    if (filteredLicenses.length === 0) return;
    const license = filteredLicenses[0]; // nur der erste Treffer
    document.getElementById("Change_ID").value = license.id.toString().trim().toLowerCase();
    document.getElementById("Change_License_Name").value = license.license_name.trim().toLowerCase();
    document.getElementById("Change_Expiry_Date").value = license.expiry_date.trim().toLowerCase();
    document.getElementById("Change_User").value = license.user.trim().toLowerCase();
    document.getElementById("Change_Dongle_ID").value = license.dongle_id.trim().toLowerCase();
    document.getElementById("Change_Affiliation").value = license.affiliation.trim().toLowerCase();
    console.log("Formular mit vorhandenen Lizenzdaten ausgefüllt:", license);
}

async function uploadNewDataToDataBase() {
    console.log("uploadNewDataToDataBase wurde gestartet");
    const updatedData = getUpdatedLicenseDataFromForm();

    // if (!updatedData.filter.license_name || !updatedData.filter.dongle_id) {
    //     console.error("Lizenzname oder Dongle-ID fehlen – Patch abgebrochen.");
    //     return;
    // }
    //--------------to-add------------
    const id = document.getElementById("Change_ID")?.value;
    if (!id) {
        console.error("Keine ID gefunden – Patch abgebrochen.");
        return;
    }
    //----------------------------------
    await patchLicense(updatedData, id);
}

function getUpdatedLicenseDataFromForm() {
    return {
        filter: {
            id: document.getElementById("Change_ID").value.trim().toLowerCase(),
        },
        update: {
            license_name: document.getElementById("Change_License_Name").value.trim().toLowerCase(),
            dongle_id: document.getElementById("Change_Dongle_ID").value.trim().toLowerCase(),
            user: document.getElementById("Change_User").value.trim().toLowerCase(),
            expiry_date: document.getElementById("Change_Expiry_Date").value.trim(),
            affiliation: document.getElementById("Change_Affiliation").value.trim().toLowerCase()
        }
    };
}

async function patchLicense(updatedData, id) {
    console.log("Patch wird ausgeführt mit ID:", id, "und Daten:", updatedData.update);
    try {
        const response = await fetch(`https://license-api.o-komik.workers.dev/api/licenses/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedData.update)
        });

        const responseText = await response.text();
        console.log("Antwort vom Server:", response.status, responseText);

        if (response.status === 200) {
            alert("Lizenz erfolgreich aktualisiert.");
        } else if (response.status === 404) {
            alert("Lizenz nicht gefunden.");
        } else {
            alert("Ein Fehler ist aufgetreten.");
        }

        console.log(`Patch erfolgreich (${response.status}): ${responseText}`);
        document.getElementById("licenseChangeForm").reset();
    } catch (error) {
        console.error("Fehler beim PATCH:", error.message);
    }
}

function handleNoResults() {
    alert("No licenses found with the given criteria.");
    document.getElementById("searchForm").reset();
}

function handleError(error) {
    console.error("Fehler beim Filtern:", error);
    alert("Fehler bei der Lizenzsuche. Bitte versuchen Sie es erneut.");
    document.getElementById("searchForm").reset();
}

function fromAddToSearchForm() {
    document.getElementById("licenseForm").classList.add("d-none");
    document.getElementById("licenseForm").reset();
    document.getElementById("searchForm").classList.remove("d-none");
    document.getElementById("searchForm").reset();
    document.getElementById("searchLicenseButton").classList.add("d-none");
    document.getElementById("fromAddToChangeButton").classList.add("d-none");
    document.getElementById("fromSearchToAddButton").classList.remove("d-none");
}

function fromSearchToAddForm() {
    document.getElementById("searchForm").classList.add("d-none");
    document.getElementById("searchForm").reset();
    document.getElementById("fromSearchToAddButton").classList.add("d-none");
    document.getElementById("searchLicenseButton").classList.remove("d-none");
    document.getElementById("fromAddToChangeButton").classList.remove("d-none");
    document.getElementById("licenseForm").classList.remove("d-none");
    document.getElementById("licenseForm").reset();
}

function fromAddToChange() {
    document.getElementById("licenseForm").classList.add("d-none");
    document.getElementById("licenseForm").reset();
    // document.getElementById("searchLicenseButton").classList.add("d-none");
    document.getElementById("fromAddToChangeButton").classList.add("d-none");
    document.getElementById("fromChangeToAddButton").classList.remove("d-none");
    document.getElementById("licenseChangeForm").classList.remove("d-none");
    document.getElementById("licenseChangeForm").reset();
}

function fromChangeToAdd() {
    document.getElementById("licenseChangeForm").classList.add("d-none");
    document.getElementById("licenseChangeForm").reset();
    document.getElementById("fromAddToChangeButton").classList.remove("d-none");
    document.getElementById("searchLicenseButton").classList.remove("d-none");
    document.getElementById("fromChangeToAddButton").classList.add("d-none");
    document.getElementById("licenseForm").classList.remove("d-none");
    document.getElementById("licenseForm").reset();
}

function removeLicenseContainer() {
    document.getElementById("licenseContainer").classList.add("d-none");
    document.getElementById("licenseContainer").innerHTML = "";
    document.getElementById("searchForm").classList.remove("d-none");
    document.getElementById("searchForm").reset();
    document.getElementById("fromSearchToAddButton").classList.remove("d-none");
    document.getElementById("backToSearchButton").classList.add("d-none");
}