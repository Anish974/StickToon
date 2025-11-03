const form = document.querySelector("form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const mess = document.getElementById("message");

function sendEmail() {
    const bodyMessage = `Full Name: ${fullName.value}<br>Email: ${email.value}<br>Phone Number: ${phone.value}<br>Message: ${mess.value}<br>`;

    emailjs.send({
        Host: "smtp.elasticemail.com", 
        Username: "sticktoon.xyz@gmail.com",
        Password: "Dhanwanti@12345",
        To: 'sticktoon.xyz@gmail.com',
        From: "sticktoon.xyz@gmail.com",
        Subject: "Subject Here",  // Replace with actual subject or an input field if needed
        Body: bodyMessage
    }).then(
        message => {
            if (message === "OK") {
                Swal.fire({
                    title: "Success",
                    text: "Message Sent Successfully!"
                });
            }
        },
        error => {
            Swal.fire({
                title: "Error",
                text: "Message Failed to Send."
            });
        }
    );
}

// Attach the sendEmail function to form submission
form.addEventListener('submit', function(event) {
    event.preventDefault();
    sendEmail();
});
