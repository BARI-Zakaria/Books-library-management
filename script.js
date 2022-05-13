//recuperer les donnes du formulaire
let title= document.getElementById("title");
let author= document.getElementById("author");
let price= document.getElementById("price");
let date= document.getElementById("date");
let lang= document.getElementById("lang");
let email= document.getElementById("email");
let books = [];
var table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
//la declaration de la class
class Ouvrage{
     constructor(title, author, price, date, lang, email, type) {
         this.title = title;
         this.author = author;
         this.price = price + ' MAD';
         this.date = date;
         this.lang = lang;
         this.email = email;
         this.type = type;
        }
    
        openingDetail(){
          return `${this.title} is a ${this.type} in the ${this.lang} language, written by ${this.author} and published on the ${this.date}. The price of ${this.title} is ${this.price}MAD.`
    }
}

books = JSON.parse(localStorage.getItem("list"));

function Valider() {

    //Declaration de var
    var formlabels = document.getElementsByTagName('p');
    let titre = document.getElementById('titre');
    let auteur = document.getElementById('auteur');
    let date = document.getElementById('date');
    let langue = document.getElementById('langues');
    let type = document.getElementById('types');
    let prix = document.getElementById('prix');
    let radio = document.getElementsByClassName('radio');
    let email = document.getElementById('email');
    // Ajout des conditions

                        // CONDITIONS DE TITRE
    if (titre.value == "") {
        formlabels[0].innerHTML = "Obliger de définir le titre de l'ouvrage!";
        formlabels[0].style.color = "red";
    }

    else if (titre.value.length > 30) {
       formlabels[0].innerHTML = "Il faut pas dépasser 30 caratéres dans le titre !";
       formlabels[0].style.color = "red";
   }
    else if (!isNaN(titre.value)) {
       formlabels[0].innerHTML = "Intérdit d'utiliser les chiffres dans ce champ !";
       formlabels[0].style.color = "red"; 
   }





                        // CONDITIONS D'AUTEUR
    if (auteur.value == "") {
        formlabels[1].innerHTML = "Obliger de définir l'auteur de l'ouvrage !";
        formlabels[1].style.color = "red";
    }
    else if (auteur.value.length > 30) {
        formlabels[1].innerHTML = "Il faut pas dépasser 30 caratéres dans ce champs !";
        formlabels[1].style.color = "red";
    }
    else if (!isNaN(auteur.value)) {
        formlabels[1].innerHTML = "Intérdit d'utiliser les chiffres dans ce champ !";
        formlabels[1].style.color = "red"; 
    }



                        // CONDITIONS D'EMAIL

    var emailRegex = new RegExp(/^[a-z\d.]+@[a-z\d]+.([a-z]{2,8})(.[a-z]{2,8})?$/);
    let checkEmail = email.value;
    var valid = emailRegex.test(checkEmail);
    if (checkEmail == "") {
        formlabels[2].innerHTML = "Il faut définir l'email d'auteur ! ";
        formlabels[2].style.color = "red";
    }
    else if(valid == true) {
          console.log("Ce champs est validé ✔");
          formlabels[2].innerHTML = "";
    } 
    else {
        formlabels[2].innerHTML = "Ce champ n'est pas validé !";
        formlabels[2].style.color = "red";
    }



                        // CONDITIONS D'la DATE
    if (date.value == "") {
    formlabels[3].innerHTML = "La date de publication est nécessaire !";
    formlabels[3].style.color = "red";
    }


    

                        // CONDITIONS D'la LANGUE
    if (langues.value == "") {
        formlabels[4].innerHTML = "Il faut choisir la langue de l'ouvrage !";
        formlabels[4].style.color = "red";
    }
    



                        // CONDITIONS Du TYPE
    if (!(radio[1].checked || radio[2].checked || radio[3].checked)) {
        formlabels[5].innerHTML = "Il faut choisir le type de l'ouvrage !";
        formlabels[5].style.color = "red";
    }





                        // CONDITIONS Du PRIX   
    var price_check2 = /^[0-9]{3}.[0-9]{2}$/;
    if (prix.value == "") {
        formlabels[6].innerHTML = "Il faut définir le prix de l'ouvrage !";
        formlabels[6].style.color = "red";
    }
    else if (isNaN(prix.value)){
        formlabels[6].innerHTML = "Le prix doit être réel !";
        formlabels[6].style.color = "red";
    }
    else  if (!price_check2.test(prix.value)) {
        formlabels[6].innerHTML = "Ce champ n'est pas validé"
        formlabels[6].style.color = "red";
    }
    
    else {
        console.log("Ce champs est validé ✔");
        formlabels[6].style.color = "green";
    }
    
}

var selectedRow = null;
function onFormSubmit(e){
    event.preventDefault();
    var formData = readFormData();
    if(selectedRow === null){
        insertNewRecord(formData);
    }
    else{
        updateRecord(formData);
    }
    resetForm();
}
//RECUPERATIONS DES DONNEES
function readFormData(){
    var formData = {};
    formData["title"] = document.getElementById("titre").value;
    formData["author"] = document.getElementById("auteur").value;
    formData["email"] = document.getElementById("email").value;
    formData["date"] = document.getElementById("date").value;
    formData["langues"] = document.getElementById("langues").value;
    // formData["typee"] = document.getElementById("").value;
    // formData["typee"] = document.querySelector("type=radio[name=typee]").value;
    formData["typee"] = document.querySelector("input[name='typee']:checked").value;
    formData["prix"] = document.getElementById("prix").value;
    return formData;
}

//INSERTION DES DONNEES
function insertNewRecord(data){
    var ouVrage = new Ouvrage (data.title, data.author, data.prix, data.date, data.langues, data.email, data.typee);
    books.push(ouVrage);
    sorteDuTableau();
    localStorage.setItem("list", JSON.stringify(books));
    table.innerHTML = ""
    for (let i = 0; i < books.length; i++) {
        
    var newRow = table.insertRow(table.length);
    var cell1 = newRow.insertCell(0);
        cell1.innerHTML = books[i].title
    var cell2 = newRow.insertCell(1);
        cell2.innerHTML = books[i].author
    var cell3 = newRow.insertCell(2);
        cell3.innerHTML =books[i].email
    var cell4 = newRow.insertCell(3);
        cell4.innerHTML = books[i].date
    var cell5 = newRow.insertCell(4);
        cell5.innerHTML = books[i].lang
    var cell6 = newRow.insertCell(5);
        cell6.innerHTML = books[i].type
    var cell7 = newRow.insertCell(6);
        cell7.innerHTML = books[i].price
    var cell8 = newRow.insertCell(7);
        cell8.innerHTML = `<button onClick='onEdit(this)' id="modif">Edit</button> <button onClick='onDelete(this)' id="supp">Delete</button>`
    }

    // 0000000000 TRI 000000000000
function sorteDuTableau(){
    books.sort(function(a,b){
        if(a.title < b.title){
        return -1;
        }
    })
} 
}

//MODIFICATIONS DES DONNEES
function onEdit(td){
    selectedRow = td.parentElement.parentElement;
    document.getElementById('titre').value = selectedRow.cells[0].innerHTML;
    document.getElementById('auteur').value = selectedRow.cells[1].innerHTML;
    document.getElementById('email').value = selectedRow.cells[2].innerHTML;
    document.getElementById('date').value = selectedRow.cells[3].innerHTML;
    document.getElementById('langues').value = selectedRow.cells[4].innerHTML;
    document.getElementById('types').value = selectedRow.cells[5].innerHTML;
    document.getElementById('prix').value = selectedRow.cells[6].innerHTML;
}

function updateRecord(formData){
    selectedRow.cells[0].innerHTML = formData.title;
    selectedRow.cells[1].innerHTML = formData.author;
    selectedRow.cells[2].innerHTML = formData.email;
    selectedRow.cells[3].innerHTML = formData.date;
    selectedRow.cells[4].innerHTML = formData.langues;
    selectedRow.cells[5].innerHTML = formData.typee;
    selectedRow.cells[6].innerHTML = formData.prix;
}

//SUPPRESSION DES DONNEES
function onDelete(td){
    if(confirm('Voulez-vous supprimer cet ouvrage ?')){
        row = td.parentElement.parentElement;
        document.getElementById('storeList').deleteRow(row.rowIndex);
    }
    resetForm();
}

//REINISIALISATION DES DONNEES
function resetForm(){
    document.getElementById('titre').value = '';
    document.getElementById('auteur').value = '';
    document.getElementById('email').value = '';
    document.getElementById('date').value = '';
    var x=document.getElementById('langues');
    x.selectedIndex=0; 
    // document.getElementById('types').checked = false;
    document.querySelector('input[value=Roman]').checked = false;
    document.querySelector('input[value=Essai]').checked = false;
    document.querySelector('input[value=Bande-Dessinée]').checked = false;
    document.getElementById('prix').value = '';
}


        // 00000000000000000000 PRINT 00000000000000
function imprimmer(){
    var divEl = document.getElementById("section2");
    var bodyEl = document.body.innerHTML;
    document.body.innerHTML = divEl.innerHTML;
    window.print();
    document.body.innerHTML = bodyEl;
    location.reload();
}


//Validation d'la date : \d{4}+\/\[1-12]{2}\/[1-31]{2}

//Validation du prix : \[0-9]{1-4},[0-9]{1-3}|[0-9]

//Validation d'email : let regEx = new RegExp  