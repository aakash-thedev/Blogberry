// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
  document.getElementsByClassName('profile-cover')[0].classList.add('blur');
  document.getElementsByClassName('util-content')[0].classList.add('blur');
  document.getElementsByClassName('user-posts')[0].classList.add('blur');
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  document.getElementsByClassName('profile-cover')[0].classList.remove('blur');
  document.getElementsByClassName('util-content')[0].classList.remove('blur');
  document.getElementsByClassName('user-posts')[0].classList.remove('blur');
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    document.getElementsByClassName('profile-cover')[0].classList.remove('blur');
    document.getElementsByClassName('util-content')[0].classList.remove('blur');
    document.getElementsByClassName('user-posts')[0].classList.remove('blur');
  }
}

// ---------------------- profile pic selector image preview ------------------------- //
function displayPreview(input) {

  // input type files have .files function which is selected by users and have all the information in it
  if (input.files && input.files[0]) {

    // reader object reads the input type = files
    var reader = new FileReader();

    reader.readAsDataURL(input.files[0]);

    reader.onload = function (e) {

        $('#profile-img-tag').attr('src', e.target.result);
    }
  }
}

$("#file-input").change(function(){

  displayPreview(this);

});