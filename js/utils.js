



window.onload = () => {

    const tableProjects = document.getElementById("tableProjects")

    const getProjects = async () => {

        const response = await fetch('https://api.github.com/users/sergiomiguel7/repos', {
            headers: {
                Accept: 'application/vnd.github.inertia-preview+json'
            },
            method: 'GET'
        });

        const projects = await response.json();


        //sort by updated date
        projects.sort((d1, d2) => {
            if(d1.updated_at > d2.updated_at)
                return -1;
            else if(d1.updated_at < d2.updated_at)
                return 1;
            else 
                return 0;    
        });

        //console.log("sorted",projects);

        let strHtml = `
            <thead>
                <tr>
                    <th class='w-5'>Título</th>
                    <th class='w-55'>Descrição</th>
                    <th class='w-42'>Linguagem</th>                         
                </tr> 
            </thead><tbody>`;

        for (const project of projects) {
            strHtml += `
                <tr>
                    <td><a href="${project.html_url}" target="_blank" style="color: #000">${project.name}</a></td>
                    <td>${project.description}</td>
                    <td>${project.language}</td>
                </tr>
            `
        }

        tableProjects.innerHTML = strHtml

    }

    getProjects();

}


/*
  Post user messages to the server
*/
const contactForm = document.getElementById("contactForm")
contactForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const number = document.getElementById("phone").value
    const message = document.getElementById("message").value

    var templateParams = {
        'from_name': name,
        'sender': email,
        'message': message,
        'sender_phone': number
    }

    emailjs.send('service_1eywg7p', 'template_oyby1kt', templateParams)
        .then(function (response) {
            if (response.status == 200) {
                swal("Envio de mensagem", "A tua mensagem foi enviada, em breve entrarei em contacto :)", 'success');
            }
            else {
                swal("Envio de mensagem", "Se o erro persistir envia email diretamente para sergiompc12@gmail.com 😀", 'error');
            }
            $('#contactForm').get(0).reset();
        }, function (error) {
            swal("Envio de mensagem", "Se o erro persistir envia email diretamente para sergiompc12@gmail.com 😀", 'error');
        });


});
