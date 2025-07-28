function formTemplate() {
    return `
    <label for="name">License Name:</label>
    <input type="text" id="name" name="name" required placeholder="Enter new license">
    <label for="expiry date">Expiery date:</label>
    <input type="date" id="date" name="date" required placeholder="Enter expiery date">
    <label for="user">Owner:</label>
    <input type="text" id="owner" name="owner" required placeholder="Enter the owner">
    <label for="dongleId">Dongel ID:</label>
    <input type="text" id="dongelId" name="dongelId" required placeholder="Enter the dongel ID">
    <label for="office">affiliation:</label>
    <input type="text" id="affiliation" name="affiliation" required placeholder="Enter the affiliation">
    <button type="submit" id="submit-button">Add license</button>
    `
}

function searchFormTemplate() {
    return `
    <label for="name">Search license:</label>
    <input type="text" id="searchLicense" name="searchlicense" placeholder="Enter license name">
    <label for="expery date">Search Expiery date:</label>
    <input type="date" id="searchDate" name="date" placeholder="Enter expiery date">
    <label for="owner">Search Owner:</label>
    <input type="text" id="searchOwner" name="owner" placeholder="Enter the owner">
    <label for="dongleId">Search Dongel ID:</label>
    <input type="text" id="searchDongelId" name="dongelId" placeholder="Enter the dongel ID">
    <label for="affiliation">Search affiliation:</label>
    <input type="text" id="searchAffiliation" name="affiliation" placeholder="Enter the affiliation">
    <button type="submit" id="search-button">Search license</button>
    `
}

function changeFormTemplate(){
    return `
    <label for="name">License Name:</label>
    <input type="text" id="name" name="name" placeholder="Enter license name">
    <label for="expiry date">Expiery date:</label>
    <input type="date" id="date" name="date" placeholder="Enter expiery date">
    <label for="owner">Owner:</label>
    <input type="text" id="owner" name="owner" placeholder="Enter the owner">
    <label for="dongleId">Dongel ID:</label>
    <input type="text" id="dongelId" name="dongelId" placeholder="Enter the dongel ID">
    <label for="affiliation">affiliation:</label>
    <input type="text" id="affiliation" name="affiliation" placeholder="Enter the affiliation">
    <button type="submit" id="change-button">Change license</button>
    `
}

function allAvailableLicensesContainerTemplate(license) {
    return `
    <hr>
    <p><strong>Name:</strong> ${license?.name ? license.name.toUpperCase() : ''}</p>
    <p><strong>Expiry Date:</strong> ${license?.expiryDate || ''}</p>
    <p><strong>Owner:</strong> ${license?.owner ? license.owner.charAt(0).toUpperCase() + license.owner.slice(1) : ''}</p>
    <p><strong>Dongel ID:</strong> ${license?.dongelId || ''}</p>
    <p><strong>Affiliation:</strong> ${
        license?.affiliation
            ? (/[a-zA-Z]/.test(license.affiliation) 
                ? license.affiliation.toUpperCase() 
                : license.affiliation)
            : ''
    }</p>
    <hr>
    `
}