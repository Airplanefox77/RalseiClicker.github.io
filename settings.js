document.addEventListener("DOMContentLoaded", function() {
    const settingsButton = document.getElementById("settings-button");
    const settingsTab = document.getElementById("settings-tab");
    const resetButton = document.getElementById("reset-button");
    const hardModeButton = document.getElementById("hard-mode-button");
    const nameInput = document.getElementById("name-input");
    const nameButton = document.getElementById("name-button");
    const closeSettingsButton = document.getElementById("close-settings-button");
    const clickerNameDisplay = document.querySelector(".shop-name");

    let clickerName = localStorage.getItem("clickerName") || "Your Clicker";
    let hardMode = JSON.parse(localStorage.getItem("hardMode")) || false;
    const maxLength = 15; // Increased character limit to 15
    const debugPhrase = "debugmode"; // Phrase to activate debug mode

    // Initialize the UI with saved values
    clickerNameDisplay.textContent = `${clickerName}'s Ralsei Clicker`;
    updateHardModeDisplay();

    settingsButton.addEventListener("click", function() {
        settingsTab.style.display = 'block';
        settingsTab.classList.add("opening");
        settingsTab.classList.remove("closing");
    });

    closeSettingsButton.addEventListener("click", function() {
        settingsTab.classList.add("closing");
        settingsTab.classList.remove("opening");
        setTimeout(() => {
            settingsTab.style.display = 'none';
        }, 500); // Match the fade-out duration
    });

    resetButton.addEventListener("click", function() {
        if (confirm("Are you sure you want to reset your game?")) {
            // Clear the auto clicker interval
            clearInterval(window.autoClickerIntervalId);

            // Clear localStorage and reset game state
            localStorage.clear();
            money = 0;
            autoClickers = 0;
            autoClickerCosts = {
                button1: 50,
                button2: 200,
                button3: 800,
                button4: 3200
            };
            updateMoneyDisplay();
            location.reload();
        }
    });

    hardModeButton.addEventListener("click", function() {
        hardMode = !hardMode;
        localStorage.setItem("hardMode", JSON.stringify(hardMode));
        updateHardMode();
    });

    nameButton.addEventListener("click", function() {
        const newName = nameInput.value.trim();
        if (newName.length <= maxLength) {
            clickerName = newName;
            localStorage.setItem("clickerName", clickerName);
            clickerNameDisplay.textContent = `${clickerName}'s Ralsei Clicker`;
            updateMoneyDisplay();
            checkNameAchievement(newName); // Call this to check for the "ping" name
            if (newName.toLowerCase() === debugPhrase) {
                activateDebugMode();
            }
        } else {
            alert(`Name is too long! Please enter a name with a maximum of ${maxLength} characters.`);
        }
    });

    function activateDebugMode() {
        localStorage.setItem("money", 9000000000);
        localStorage.setItem("autoClickers", 500);
        localStorage.setItem("debugAchievement", "Debug Activated");
        location.reload();
    }

    function updateHardMode() {
        // Retrieve stored costs or reset to original
        let autoClickerCosts = JSON.parse(localStorage.getItem("autoClickerCosts")) || {
            button1: 50,
            button2: 200,
            button3: 800,
            button4: 3200
        };

        if (hardMode) {
            autoClickerCosts = {
                button1: autoClickerCosts.button1 * 4,
                button2: autoClickerCosts.button2 * 4,
                button3: autoClickerCosts.button3 * 4,
                button4: autoClickerCosts.button4 * 4
            };
            localStorage.setItem("hardModeCosts", JSON.stringify(autoClickerCosts));
        } else {
            autoClickerCosts = {
                button1: 50,
                button2: 200,
                button3: 800,
                button4: 3200
            };
        }

        updateButtonCosts(autoClickerCosts);
        localStorage.setItem("autoClickerCosts", JSON.stringify(autoClickerCosts));
        updateHardModeDisplay();
    }

    function updateHardModeDisplay() {
        hardModeButton.textContent = hardMode ? "Hard Mode (Enabled)" : "Hard Mode (Disabled)";
    }

    function updateMoneyDisplay() {
        const moneyCounter = document.querySelector(".money-counter");
        const actualMoneyCounter = document.getElementById("actual-money");
        const money = parseInt(localStorage.getItem("money")) || 0;
        moneyCounter.textContent = `Money: $${formatNumber(money)}`;
        actualMoneyCounter.textContent = `$${money.toLocaleString()}`;
        const clickerName = localStorage.getItem("clickerName") || "Your Clicker";
        document.title = `$${formatNumber(money)} - ${clickerName}'s Ralsei Clicker`;
    }

    function updateButtonCosts(autoClickerCosts) {
        const autoClickerButton = document.getElementById("auto-clicker-button");
        const autoClickerButton2 = document.getElementById("auto-clicker-button-2");
        const autoClickerButton3 = document.getElementById("auto-clicker-button-3");
        const autoClickerButton4 = document.getElementById("auto-clicker-button-4");

        autoClickerButton.textContent = `Auto Clicker (-$${formatNumber(autoClickerCosts.button1)})`;
        autoClickerButton2.textContent = `Mercedes Lot (-$${formatNumber(autoClickerCosts.button2)})`;
        autoClickerButton3.textContent = `Mercedes Parking Garage (-$${formatNumber(autoClickerCosts.button3)})`;
        autoClickerButton4.textContent = `Luxury Garage (-$${formatNumber(autoClickerCosts.button4)})`;
    }

    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
});


