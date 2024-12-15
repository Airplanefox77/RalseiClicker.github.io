document.addEventListener("DOMContentLoaded", function() {
    const clickableBox = document.querySelector(".clickable-box");
    const moneyCounter = document.querySelector(".money-counter");
    const actualMoneyCounter = document.getElementById("actual-money");
    const autoClickerButtons = [
        document.getElementById("auto-clicker-button"),
        document.getElementById("auto-clicker-button-2"),
        document.getElementById("auto-clicker-button-3"),
        document.getElementById("auto-clicker-button-4")
    ];
    const autoClickerNames = ["Auto Clicker", "Mercedes Lot", "Mercedes Parking Garage", "Luxury Garage"];
    const autoClickerCount = document.getElementById("auto-clicker-count");
    const autoClickerImage = document.getElementById("auto-clicker-image");

    let money = 0;
    let autoClickers = 0;
    let autoClickerCosts = {
        button1: 50,
        button2: 200,
        button3: 800,
        button4: 3200
    };

    loadGameState();

    // Update the UI with saved values
    moneyCounter.textContent = `Money: $${formatNumber(money)}`;
    actualMoneyCounter.textContent = `$${money.toLocaleString()}`;
    autoClickerImage.style.display = autoClickers > 0 ? 'block' : 'none';
    autoClickerCount.style.display = autoClickers > 0 ? 'inline' : 'none';
    updateButtonCosts();
    updateAutoclickerDisplay();

    clickableBox.addEventListener("click", function() {
        money += 1;
        updateMoneyDisplay();
        localStorage.setItem("money", money);
    });

    autoClickerButtons.forEach((button, index) => {
        button.addEventListener("click", function() {
            buyAutoClicker(`button${index + 1}`, button);
        });
    });

    function buyAutoClicker(button, buttonElement) {
        const cost = autoClickerCosts[button];
        if (money >= cost) {
            money -= cost;
            autoClickers += 1;
            autoClickerCosts[button] *= 2;
            updateMoneyDisplay();
            autoClickerCount.textContent = `x${autoClickers}`;
            autoClickerImage.style.display = 'block';
            autoClickerCount.style.display = 'inline';
            updateButtonCosts();
            localStorage.setItem("money", money);
            localStorage.setItem("autoClickers", autoClickers);
            localStorage.setItem("autoClickerCosts", JSON.stringify(autoClickerCosts));

            // Update the auto clicker interval to reflect the new auto clicker speed
            clearInterval(window.autoClickerIntervalId);
            autoClickerInterval = 500 / autoClickers;
            window.autoClickerIntervalId = setInterval(function() {
                money += autoClickers;
                updateMoneyDisplay();
                localStorage.setItem("money", money);
            }, autoClickerInterval);
        } else {
            alert(`Not enough money to buy this auto clicker! You need $${formatNumber(cost)}.`);
        }
    }

    function updateButtonCosts() {
        autoClickerButtons.forEach((button, index) => {
            button.textContent = `${autoClickerNames[index]} (-$${formatNumber(autoClickerCosts[`button${index + 1}`])})`;
        });
    }

    function updateMoneyDisplay() {
        const isMobile = window.innerWidth < 600;
        moneyCounter.textContent = `Money: $${formatNumber(money)}`;
        actualMoneyCounter.textContent = `$${money.toLocaleString()}`;
        const clickerName = localStorage.getItem("clickerName") || "Your Clicker";
        document.title = `$${formatNumber(money)} - ${clickerName}'s Ralsei Clicker`;

        // Check for achievements
        checkAchievements(money, autoClickers);
    }

    function formatNumber(num) {
        if (num >= 1e9) {
            return (num / 1e9).toFixed(1) + " Billion";
        }
        if (num >= 1e6) {
            return (num / 1e6).toFixed(1) + " Million";
        }
        if (num >= 1e3) {
            return (num / 1e3).toFixed(1) + " Thousand";
        }
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function loadGameState() {
        let savedMoney = localStorage.getItem("money");
        if (savedMoney !== null) {
            money = parseInt(savedMoney);
        }

        let savedAutoClickers = localStorage.getItem("autoClickers");
        if (savedAutoClickers !== null) {
            autoClickers = parseInt(savedAutoClickers);
        }

        let savedAutoClickerCosts = localStorage.getItem("autoClickerCosts");
        if (savedAutoClickerCosts !== null) {
            autoClickerCosts = JSON.parse(savedAutoClickerCosts);
        }

        // Update display
        moneyCounter.textContent = `Money: $${formatNumber(money)}`;
        actualMoneyCounter.textContent = `$${money.toLocaleString()}`;
        autoClickerImage.style.display = autoClickers > 0 ? 'block' : 'none';
        autoClickerCount.style.display = autoClickers > 0 ? 'inline' : 'none';
        autoClickerCount.textContent = `x${autoClickers}`;
        updateButtonCosts();
    }

    function updateAutoclickerDisplay() {
        autoClickerImage.style.display = autoClickers > 0 ? 'block' : 'none';
        autoClickerCount.style.display = autoClickers > 0 ? 'inline' : 'none';
        autoClickerCount.textContent = `x${autoClickers}`;
    }

    // Auto clickers interval setup for saved auto clickers
    if (autoClickers > 0) {
        autoClickerInterval = 500 / autoClickers;
        window.autoClickerIntervalId = setInterval(function() {
            money += autoClickers;
            updateMoneyDisplay();
            localStorage.setItem("money", money);
        }, autoClickerInterval);
    }

    // Call these functions after loading game state
    updateAutoclickerDisplay();
});
