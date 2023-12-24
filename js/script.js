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

    // Функция проверки видимости элемента во viewport
    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Обработчик события скроллинга
    function handleScroll() {
        // Первая часть кода
        var itemTitles = document.querySelectorAll('.item_title');

        itemTitles.forEach(function (itemTitle) {
            if (isElementInViewport(itemTitle) && !itemTitle.classList.contains('visible')) {
                itemTitle.classList.add('visible');
            }
        });

        // Вторая часть кода
        var moduleItems = document.querySelectorAll(".module_item");

        moduleItems.forEach(function (item) {
            if (isElementInViewport(item)) {
                item.classList.add("in-view");

                var textElement = item.querySelector(".item_text");
                var imagesElement = item.querySelector(".item_images");

                if (textElement && isElementInViewport(textElement)) {
                    textElement.classList.add("left-animation");
                }

                if (imagesElement && isElementInViewport(imagesElement)) {
                    imagesElement.classList.add("right-animation");
                }
            }
        });

        // Третья часть кода
        var items = document.querySelectorAll('.list_item');

        items.forEach(function (item, index) {
            if (isElementInViewport(item)) {
                item.style.opacity = 1;
                item.style.transitionDelay = index * 0.2 + 's';
            }
        });
    }

    // Добавляем обработчик события скроллинга
    window.addEventListener("scroll", handleScroll);

    // Вызываем handleScroll() при загрузке страницы
    window.addEventListener("load", handleScroll);


    // compliance module

    var coplianceItem = document.querySelectorAll('.compliance_list .item_title');

    coplianceItem.forEach(function (itemTitle) {
        itemTitle.addEventListener('click', function () {
            coplianceItem.forEach(function (title) {
                title.classList.remove('_active');
            });

            itemTitle.classList.add('_active');

            var index = Array.from(coplianceItem).indexOf(itemTitle);

            var complianceItems = document.querySelectorAll('.compliance_item');

            complianceItems.forEach(function (complianceItem) {
                complianceItem.classList.remove('_active');
            });

            complianceItems[index].classList.add('_active');
        });
    });


    //contact form
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', formSend);

    function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);
        let formData = new FormData(form);

        if (error === 0) {
            form.classList.add('_sending');

            fetch(form.getAttribute('action'), {
                    method: 'POST',
                    body: formData
                })
                .then(response => {
                    if (response.ok) {
                        form.reset();
                        form.classList.remove('_sending');
                    } else {
                        alert('Error submitting the form');
                        form.classList.remove('_sending');
                    }
                })
                .catch(error => {
                    console.error('Error during form submission:', error);
                    alert('Error submitting the form');
                    form.classList.remove('_sending');
                });
        } else {
            alert('Fill in all required fields');
        }
    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');
        let atLeastOneCheckboxChecked = false;

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];

            if (input.type === 'checkbox') {
                if (input.checked) {
                    atLeastOneCheckboxChecked = true;
                }
            } else {
                if (input.classList.contains('_email')) {
                    if (emailTest(input)) {
                        formAddError(input);
                        error++;
                    }
                } else {
                    if (input.value === '') {
                        formAddError(input);
                        error++;
                    }
                }
            }
        }

        if (!atLeastOneCheckboxChecked) {
            error++;
        }

        return error;
    }

    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }

    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

    //partners 

});