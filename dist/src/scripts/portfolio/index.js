const desc = document.querySelector('#description-text');

let descItems = document.querySelectorAll('.experience-text p'); 
desc.innerHTML = 'Provided customers information regarding their mobile subscription plan'

descItems.forEach(function(item) {
    item.addEventListener("click", function() {
        let position = item.innerHTML;

        switch(position) {
            case 'Teleperformance Greece, Customer Care Agent (2020 - 2021)':
                desc.innerHTML = 'Provided customers information regarding their mobile subscription plan'
            break;
            case 'Praktiker Hellas, Nov 2022 - May 2023 IT Internship':
                desc.innerHTML = 'Learnt about many IT Concepts crucial in running a modern retail buisness including user management and ERP administration';
            break;
            case 'Praktiker Hellas, June 2023 - Present IT Support Agent':
                desc.innerHTML = 'Provided Technical support to colleagues regardin issues randing from PCs to Company Procedures. Also I contributed in internal projects'
            break;
        }
    })
});

function sendEmail() {
    let params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    }

    const serviceID = "service_tpyt7sb";
    const templateID = "template_yfyi9cr";
    
    emailjs.send(serviceID, templateID, params).
    then(
        (res) => {
            // document.getElementByID("name") = "";
            // document.getElementByID("email") = "";
            // document.getElementByID("message") = "";
            console.log(res);
            alert('Sent!!');
        }
    )
    .catch(
        (err) => {
            console.log(err);
        }
    );
}



document.getElementById("submit").addEventListener('click', function() {
    sendEmail();
});