document.addEventListener("DOMContentLoaded", function() {
    const achievementsContainer = document.createElement('div');
    achievementsContainer.className = 'achievements-container';
    document.body.appendChild(achievementsContainer);

    const achievements = [
        {
            id: 'start',
            title: 'Everyone starts somewhere',
            description: 'Reach $1 for the first time.',
            achieved: false
        },
        {
            id: 'over9000',
            title: "It's over 9,000!",
            description: 'Reach $9,001.',
            achieved: false
        },
        {
            id: 'pingpong',
            title: 'pong',
            description: 'Set your clicker\'s name to "ping".',
            achieved: false
        },
        {
            id: 'millionaire',
            title: 'Millionaire',
            description: 'Reach $1,000,000.',
            achieved: false
        },
        {
            id: 'firstAutoClicker',
            title: 'Auto Enthusiast',
            description: 'Buy your first auto-clicker.',
            achieved: false
        },
        {
            id: 'hundredAutoClickers',
            title: 'Centurion Clicker',
            description: 'Buy 100 auto-clickers.',
            achieved: false
        },
        {
            id: 'debugMode',
            title: 'Debug Activated',
            description: 'Activated debug mode.',
            achieved: false
        }
        // Add more achievements here later
    ];

    function loadAchievements() {
        const savedAchievements = JSON.parse(localStorage.getItem('achievements'));
        if (savedAchievements) {
            for (let i = 0; i < achievements.length; i++) {
                const savedAchievement = savedAchievements.find(a => a.id === achievements[i].id);
                if (savedAchievement) {
                    achievements[i].achieved = savedAchievement.achieved;
                }
            }
        }
    }

    function saveAchievements() {
        localStorage.setItem('achievements', JSON.stringify(achievements));
    }

    function checkAchievements(money, autoClickers) {
        if (money >= 1 && !achievements.find(a => a.id === 'start').achieved) {
            unlockAchievement('start');
        }
        if (money >= 9001 && !achievements.find(a => a.id === 'over9000').achieved) {
            unlockAchievement('over9000');
        }
        if (money >= 1000000 && !achievements.find(a => a.id === 'millionaire').achieved) {
            unlockAchievement('millionaire');
        }
        if (autoClickers >= 1 && !achievements.find(a => a.id === 'firstAutoClicker').achieved) {
            unlockAchievement('firstAutoClicker');
        }
        if (autoClickers >= 100 && !achievements.find(a => a.id === 'hundredAutoClickers').achieved) {
            unlockAchievement('hundredAutoClickers');
        }
    }

    function checkNameAchievement(name) {
        if (name.toLowerCase() === 'ping' && !achievements.find(a => a.id === 'pingpong').achieved) {
            unlockAchievement('pingpong');
        }
        if (name.toLowerCase() === 'debugmode' && !achievements.find(a => a.id === 'debugMode').achieved) {
            unlockAchievement('debugMode');
        }
    }

    function unlockAchievement(id) {
        const achievement = achievements.find(a => a.id === id);
        if (achievement && !achievement.achieved) {
            achievement.achieved = true;
            showAchievementNotification(achievement);
            saveAchievements();
        }
    }

    function showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-image">
                <img src="https://th.bing.com/th/id/R.42b5e07842ba58868cd8086cd21ab211?rik=dqQVruoE4%2faQcg&pid=ImgRaw&r=0" alt="Achievement Image">
            </div>
            <div class="achievement-text">
                <strong>${achievement.title}</strong>
                <p>${achievement.description}</p>
            </div>
        `;
        achievementsContainer.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 4000); // Remove after 4 seconds
    }

    // Load achievements on page load
    loadAchievements();

    // Export the checkAchievements and checkNameAchievement functions to be used in main.js and settings.js
    window.checkAchievements = checkAchievements;
    window.checkNameAchievement = checkNameAchievement;
});
