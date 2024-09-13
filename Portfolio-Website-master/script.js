$(document).ready(function()
{

  //sticky header
    $(window).scroll(function() {
      if ($(this).scrollTop() > 1) {
        $(".header-area").addClass("sticky");
      } else {
        $(".header-area").removeClass("sticky");
      }
  
      // Update the active section in the header
      updateActiveSection();
    });
  
    $(".header ul li a").click(function(e) {
      e.preventDefault(); 
  
      var target = $(this).attr("href");
  
      if ($(target).hasClass("active-section")) {
        return; 
      }
  
      if (target === "#home") {
        $("html, body").animate(
          {
            scrollTop: 0 
          },
          500
        );
      } else {
        var offset = $(target).offset().top - 40; 
  
        $("html, body").animate(
          {
            scrollTop: offset
          },
          500
        );
      }
  
      $(".header ul li a").removeClass("active");
      $(this).addClass("active");
    });
  

    //Initial content revealing js
    ScrollReveal({
      distance: "100px",
      duration: 2000,
      delay: 200
    });
  
    ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", {
      origin: "left"
    });
    ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", {
      origin: "right"
    });
    ScrollReveal().reveal(".project-title, .contact-title", {
      origin: "top"
    });
    ScrollReveal().reveal(".projects, .contact", {
      origin: "bottom"
    });

  //contact form to excel sheet
  // Ensure that these variables are correctly set
const scriptURL = 'https://your-google-apps-script-urlhttps://script.google.com/macros/s/AKfycbwuMKnX0TvJDhzhguKsPg49Q2p3APV0JjupHW68JzlJgP6qBVFnN7H-5c4i2fSuY9cM/exec';
const form = document.forms['submitToGoogleSheet']; // Make sure the form name is correct
const msg = document.getElementById('msg'); // Ensure there's an element with the ID 'msg'

form.addEventListener('submit', function(e) 
{
    e.preventDefault();
    
    fetch(scriptURL, {
        method: 'POST',
        body: new FormData(form),
    })
    .then(response => {
        msg.innerHTML = "Message sent successfully";
        setTimeout(() => {
            msg.innerHTML = "";
        }, 5000);
        form.reset();
    })
    .catch(error => console.error('Error!', error.message));
});

    

  
  function updateActiveSection() 
  {
    var scrollPosition = $(window).scrollTop();
  
    // Checking if scroll position is at the top of the page
    if (scrollPosition === 0) {
      $(".header ul li a").removeClass("active");
      $(".header ul li a[href='#home']").addClass("active");
      return;
    }
  
    // Iterate through each section and update the active class in the header
    $("section").each(function() {
      var target = $(this).attr("id");
      var offset = $(this).offset().top;
      var height = $(this).outerHeight();
  
      if (
        scrollPosition >= offset - 40 &&
        scrollPosition < offset + height - 40
      ) {
        $(".header ul li a").removeClass("active");
        $(".header ul li a[href='#" + target + "']").addClass("active");
      }
    });
  }
});