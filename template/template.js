function formTemplate() {
    return `
    <label for="name">License Name:</label>
    <input type="text" id="name" name="name" required placeholder="Enter new license">
    <label for="expiry date">Expiery date:</label>
    <input type="date" id="date" name="date" required placeholder="Enter expiery date">
    <label for="user">Owner:</label>
    <input type="text" id="owner" name="owner" required placeholder="Enter the owner">
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
    <button type="submit" id="search-button">Search license</button>
    `
}

function changeFormTemplate(){
    return `
    <label for="name">Change License Name:</label>
    <input type="text" id="changeName" name="changeName" required placeholder="Enter new license">
    <label for="expiry date">Change Expiery date:</label>
    <input type="date" id="changeDate" name="changeDate" required placeholder="Enter expiery date">
    <label for="user">Change Owner:</label>
    <input type="text" id="changeOwner" name="changeOwner" required placeholder="Enter the owner">
    <button type="submit" id="change-button">Change license</button>
    `
}

function allAvailableLicensesContainerTemplate(license) {
    return `
    <p><strong>Name:</strong> ${license.name}</p>
            <p><strong>Expiry Date:</strong> ${license.expiryDate}</p>
            <p><strong>Owner:</strong> ${license.owner}</p>
            <hr>
    `
}