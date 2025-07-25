let licenseList = [];

async function uploadJson(newLicense) {
    try {
        let response = await fetch ("https://license-api.o-komik.workers.dev/api/licenses-for-licens-management", {
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
        let response = await fetch("https://license-api.o-komik.workers.dev/api/licenses-for-licens-management");
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
    createSearchLicenseButton();
    createGoBackButton();
    createFooter();
    createSafeToServerButton();
    createLoadFromServerButton();
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
    uploadJson(newLicense);
    createInfoText();
}

function searchLicense(event) {
    event.preventDefault();
    let searchName = document.getElementById("searchLicense").value.trim().toLowerCase();
    let searchExpiryDate = document.getElementById("searchDate").value.trim().toLowerCase();
    let searchOwner = document.getElementById("searchOwner").value.trim().toLowerCase();
    if (!licenseList || licenseList.length === 0) {
        alert("No license in the Database");
        document.getElementById("licenseSearchForm").reset();
        return;
    }
    try {
        let filteredLicenses = licenseList.filter(license => {
            let nameMatch = searchName === "" || license.name.toLowerCase().includes(searchName);
            let expiryDateMatch = searchExpiryDate === "" || license.expiryDate.toLowerCase().includes(searchExpiryDate);
            let ownerMatch = searchOwner === "" || license.owner.toLowerCase().includes(searchOwner);
            return nameMatch && expiryDateMatch && ownerMatch;
        });
        if (filteredLicenses.length === 0) {
            alert("No licenses found with the given criteria.");
            document.getElementById("licenseSearchForm").reset();
            return;
        }
        console.table(filteredLicenses);
    } catch (error) {
        alert("No license in the Database:", error);
        document.getElementById("licenseSearchForm").reset();
        return
    }
    document.getElementById("licenseSearchForm").reset();
}

function toggleSearchForm() {
    document.getElementById("licenseForm").classList.toggle("d-none");
    document.getElementById("searchLicenseButton").classList.toggle("d-none");
    document.getElementById("licenseForm").reset();
    document.getElementById("licenseSearchForm").classList.toggle("d-none");
    document.getElementById("goBackButton").classList.toggle("d-none");
    document.getElementById("licenseSearchForm").reset();
}

function saveToServer() {
    let dataStr = JSON.stringify(licenseList);
    let blob = new Blob([dataStr], { type: "application/json" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = "licenseData.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};

function importFromServer(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const data = JSON.parse(e.target.result);
            if (Array.isArray(data)) {
                localStorage.setItem("licenseList", JSON.stringify(data));
                licenseList = data;
                alert("Import erfolgreich. Lizenzen wurden geladen.");
            } else {
                alert("Ungültiges Datenformat.");
            }
        } catch (err) {
            alert("Fehler beim Lesen der Datei.");
            console.error(err);
        }
    };
    reader.readAsText(file);
}