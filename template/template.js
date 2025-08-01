function formTemplate() {
    return `
    <label for="ID">ID:</label>
    <input type="text" id="ID" name="ID" placeholder="Enter new license">
    <label for="License_Name">License Name:</label>
    <input type="text" id="License_Name" name="name" required placeholder="Enter new license">
    <label for="Expiry_Date">Expiery date:</label>
    <input type="date" id="Expiry_Date" name="date" required placeholder="Enter expiery date">
    <label for="User">Owner:</label>
    <input type="text" id="User" name="owner" required placeholder="Enter the owner">
    <label for="Dongle_ID">Dongle ID:</label>
    <input type="text" id="Dongle_ID" name="dongleId" required placeholder="Enter the dongle ID">
    <label for="Affiliation">affiliation:</label>
    <input type="text" id="Affiliation" name="affiliation" required placeholder="Enter the affiliation">
    <button type="submit" id="submit-button">Add license</button>
    `
}

function searchFormTemplate() {
    return `
    <label for="Search_ID">Search ID:</label>
    <input type="text" id="Search_ID" name="Search_ID" placeholder="Enter new license">
    <label for="Search_License_Name">Search license:</label>
    <input type="text" id="Search_License_Name" name="searchlicense" placeholder="Enter license name">
    <label for="Search_Expiry_Date">Search Expiery date:</label>
    <input type="date" id="Search_Expiry_Date" name="date" placeholder="Enter expiery date">
    <label for="Search_User">Search Owner:</label>
    <input type="text" id="Search_User" name="owner" placeholder="Enter the owner">
    <label for="Search_Dongle_ID">Search Dongle ID:</label>
    <input type="text" id="Search_Dongle_ID" name="dongleId" placeholder="Enter the dongle ID">
    <label for="Search_Affiliation">Search affiliation:</label>
    <input type="text" id="Search_Affiliation" name="affiliation" placeholder="Enter the affiliation">
    <button type="submit" id="search-button">Search license</button>
    `
}

function changeFormTemplate(){
    return `
    <label for="Change_ID">Change ID:</label>
    <input type="text" id="Change_ID" name="Change_ID" required placeholder="Enter new license">
    <label for="Change_License_Name">Change License Name (Required Fild):</label>
    <input style="border-color:red;" type="text" id="Change_License_Name" name="name" required placeholder="Which license do you want to change?">
    <label for="Change_Expiry_Date">Change Expiery date:</label>
    <input type="date" id="Change_Expiry_Date" name="date" placeholder="Enter new expiery date" title="Enter new expiery date">
    <label for="Change_User">Owner:</label>
    <input type="text" id="Change_User" name="owner" placeholder="Enter new user">
    <label for="Change_Dongle_ID">Change Dongle ID (Required Fild):</label>
    <input style="border-color:red;" type="text" id="Change_Dongle_ID" name="dongleId" required placeholder="Which dongle ID do you want to change?">
    <label for="Change_Affiliation">Change affiliation:</label>
    <input type="text" id="Change_Affiliation" name="affiliation" placeholder="Enter new affiliation">
    <button type="button" id="fill-form-button" onclick="fillTheChangeForm()">Fill the form</button>
    <button type="submit" id="change-button">Change license</button>
    `
}

function licenseContainerTemplate(license) {
    return `
    <hr>
    <p><strong>License_Name:</strong> ${license?.license_name ? license.license_name.toUpperCase() : ''}</p>
    <p><strong>Expiry_Date:</strong> ${license?.expiry_date || ''}</p>
    <p><strong>User:</strong> ${license?.user ? license.user.charAt(0).toUpperCase() + license.user.slice(1) : ''}</p>
    <p><strong>Dongle_ID:</strong> ${license?.dongle_id || ''}</p>
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