var dropdown_content = document.getElementsByClassName('dropdown-content');

function displayMenu(clickedIndex) {

    console.log(clickedIndex);
    dropdown_content[Number(clickedIndex)].classList.toggle('show');
    // menu.classList.toggle('show');
}