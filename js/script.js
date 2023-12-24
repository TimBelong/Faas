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

    // core module page

    let itemTitles = document.querySelectorAll('.item_title');

    window.addEventListener('scroll', function () {
        itemTitles.forEach(function (itemTitle) {
            if (isElementInViewport(itemTitle) && !itemTitle.classList.contains('visible')) {
                itemTitle.classList.add('visible');
            }
        });
    });

    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    var moduleItems = document.querySelectorAll(".module_item");

    function isInViewport(element) {
        var rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function handleScroll() {
        moduleItems.forEach(function (item) {
            if (isInViewport(item)) {
                // Добавляем класс in-view
                item.classList.add("in-view");

                // Определяем, с какой стороны элемент виден и добавляем соответствующий класс
                var textElement = item.querySelector(".item_text");
                var imagesElement = item.querySelector(".item_images");

                if (textElement && isInViewport(textElement)) {
                    textElement.classList.add("left-animation");
                }

                if (imagesElement && isInViewport(imagesElement)) {
                    imagesElement.classList.add("right-animation");
                }
            }
        });
    }

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    var coplianceItem = document.querySelectorAll('.compliance_list .item_title');

    // Перебираем элементы и добавляем обработчик события для каждого
    coplianceItem.forEach(function (itemTitle) {
      itemTitle.addEventListener('click', function () {
        // Убираем класс _active у всех элементов с классом item_title
        coplianceItem.forEach(function (title) {
          title.classList.remove('_active');
        });

        // Добавляем класс _active только к нажатому элементу
        itemTitle.classList.add('_active');

        // Получаем индекс текущего элемента
        var index = Array.from(coplianceItem).indexOf(itemTitle);

        // Получаем все элементы с классом compliance_item
        var complianceItems = document.querySelectorAll('.compliance_item');

        // Убираем класс _active у всех элементов с классом compliance_item
        complianceItems.forEach(function (complianceItem) {
          complianceItem.classList.remove('_active');
        });

        // Добавляем класс _active только к соответствующему элементу с классом compliance_item
        complianceItems[index].classList.add('_active');
      });
    });
});
