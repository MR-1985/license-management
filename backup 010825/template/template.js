function formTemplate() {
    return `
    <label for="License_Name">License Name:</label>
    <input type="text" id="License_Name" name="name" required placeholder="Enter new license">
    <label for="Expiry_Date">Expiery date:</label>
    <input type="date" id="Expiry_Date" name="date" required placeholder="Enter expiery date">
    <label for="User">Owner:</label>
    <input type="text" id="User" name="owner" required placeholder="Enter the owner">
    <label for="Dongel_ID">Dongel ID:</label>
    <input type="text" id="Dongel_ID" name="dongelId" required placeholder="Enter the dongel ID">
    <label for="Affiliation">affiliation:</label>
    <input type="text" id="Affiliation" name="affiliation" required placeholder="Enter the affiliation">
    <button type="submit" id="submit-button">Add license</button>
    `
}

function searchFormTemplate() {
    return `
    <label for="Search_License_Name">Search license:</label>
    <input type="text" id="Search_License_Name" name="searchlicense" placeholder="Enter license name">
    <label for="Search_Expiry_Date">Search Expiery date:</label>
    <input type="date" id="Search_Expiry_Date" name="date" placeholder="Enter expiery date">
    <label for="Search_User">Search Owner:</label>
    <input type="text" id="Search_User" name="owner" placeholder="Enter the owner">
    <label for="Search_Dongel_ID">Search Dongel ID:</label>
    <input type="text" id="Search_Dongel_ID" name="dongelId" placeholder="Enter the dongel ID">
    <label for="Search_Affiliation">Search affiliation:</label>
    <input type="text" id="Search_Affiliation" name="affiliation" placeholder="Enter the affiliation">
    <button type="submit" id="search-button">Search license</button>
    `
}

function changeFormTemplate(){
    return `
    <label for="Change_License_Name">Change License Name (Required Fild):</label>
    <input style="border-color:red;" type="text" id="Change_License_Name" name="name" required placeholder="Which license do you want to change?">
    <label for="Change_Expiry_Date">Change Expiery date:</label>
    <input type="date" id="Change_Expiry_Date" name="date" placeholder="Enter new expiery date" title="Enter new expiery date">
    <label for="Change_User">Owner:</label>
    <input type="text" id="Change_User" name="owner" placeholder="Enter new user">
    <label for="Change_Dongle_ID">Change Dongel ID (Required Fild):</label>
    <input style="border-color:red;" type="text" id="Change_Dongle_ID" name="dongelId" required placeholder="Which dongel ID do you want to change?">
    <label for="Change_Affiliation">Change affiliation:</label>
    <input type="text" id="Change_Affiliation" name="affiliation" placeholder="Enter new affiliation">
    <button type="button" id="fill-form-button" onclick="fillTheChangeForm()">Fill the form</button>
    <button type="submit" id="change-button">Change license</button>
    `
}

function licenseContainerTemplate(license) {
    return `
    <hr>
    <p><strong>License_Name:</strong> ${license?.License_Name ? license.License_Name.toUpperCase() : ''}</p>
    <p><strong>Expiry_Date:</strong> ${license?.Expiry_Date || ''}</p>
    <p><strong>User:</strong> ${license?.User ? license.User.charAt(0).toUpperCase() + license.User.slice(1) : ''}</p>
    <p><strong>Dongel_ID:</strong> ${license?.Dongle_ID || ''}</p>
    <p><strong>Affiliation:</strong> ${
        license?.Affiliation
            ? (/[a-zA-Z]/.test(license.Affiliation) 
                ? license.Affiliation.toUpperCase() 
                : license.Affiliation)
            : ''
    }</p>
    <hr>
    `
}