document.addEventListener('DOMContentLoaded', function () {
    let subMenuBtn = document.querySelector('.sub_menu-btn'),
        subMenu = document.querySelector('.sub_menu');

    subMenuBtn.addEventListener('click', () => {
        subMenu.classList.toggle('_active');
    });

    window.addEventListener('click', (event) => {
        if (!event.target.matches('.sub_menu-btn') && !event.target.closest('.sub_menu')) {
            subMenu.classList.remove('_active');
        }
    });

    const detailsElements = document.querySelectorAll('.module_descr details');
    const imageElements = document.querySelectorAll('.module_img .module-image');
    const btnElement = document.querySelector('.module_section .btn');

    detailsElements.forEach((details, index) => {
        details.addEventListener('toggle', function () {
            const targetImage = imageElements[index];
            const isVisible = details.hasAttribute('open');

            if (isVisible) {
                fadeIn(targetImage);
                targetImage.classList.add('_active');
            } else {
                fadeOut(targetImage);
                targetImage.classList.remove('_active');
            }

            // Закрытие других details при открытии текущего
            detailsElements.forEach((otherDetails, otherIndex) => {
                if (otherIndex !== index && isVisible) {
                    otherDetails.removeAttribute('open');
                }
            });

            setDiscoverMoreLink();
        });
    });

    function setDiscoverMoreLink() {
        let discoverMoreLink = document.querySelector(".btn.module");
        detailsElements.forEach(function (details) {
            if (details.hasAttribute("open")) {
                var moduleId = details.id;
                switch (moduleId) {
                    case "module1":
                        discoverMoreLink.href = "core-module.html";
                        break;
                    case "module2":
                        discoverMoreLink.href = "payment-module.html";
                        break;
                    case "module3":
                        discoverMoreLink.href = "crypto-module.html";
                        break;
                    case "module4":
                        discoverMoreLink.href = "money-module.html";
                        break;
                    case "module5":
                        discoverMoreLink.href = "compliance-module.html";
                        break;
                }
            }
        });
    }

    function fadeIn(element) {
        let opacity = 0;
        element.style.opacity = opacity;
        element.style.display = 'block';

        function animate() {
            opacity += 0.05;
            element.style.opacity = opacity;

            if (opacity < 1) {
                requestAnimationFrame(animate);
            }
        }

        animate();
    }

    function fadeOut(element) {
        let opacity = 1;

        function animate() {
            opacity -= 0.5;
            element.style.opacity = opacity;

            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                element.style.display = 'none';
            }
        }

        animate();
    }
});
