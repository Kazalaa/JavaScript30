const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');
// console.log(checkboxes);
let lastChecked;

function handleCheck(e) {
  // console.log(e);
  // Check if user had the shift key down AND check that they are checking it
  let inBetween = false;
  if (e.shiftKey && this.checked) {
    checkboxes.forEach(checkbox => {
      // console.log(checkbox);
      if (checkbox === this || checkbox === lastChecked) {
        inBetween = !inBetween;
        // console.log(inBetween);
      }

      if (inBetween /* && checkbox.checked === false*/) {
        checkbox.checked = true;
        // } else{
        //   checkbox.checked = false;
        // }
      }
    });
  }
  // Check the position of the checkbox
  lastChecked = this;
}
checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck));
