document.addEventListener('DOMContentLoaded', function () {
    let subMenuBtn = document.querySelector('.sub_menu-btn'),
        subMenu = document.querySelector('.sub_menu');

    subMenuBtn.addEventListener('click', ()=>{
        subMenu.classList.toggle('_active');
    });

    window.addEventListener('click', (event) => {
        // Проверяем, что клик был не по кнопке и не внутри подменю
        if (!event.target.matches('.sub_menu-btn') && !event.target.closest('.sub_menu')) {
            subMenu.classList.remove('_active');
        }
    });
});
