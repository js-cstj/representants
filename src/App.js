/*jslint esnext:true, browser:true*/
/**
 * @module App
 */
export default class App {
	/**
	 * Méthode principale. Sera typiquement appelée après le chargement de la page.
	 */
	static main() {
		var adresse;
		adresse = "https://represent.opennorth.ca/representatives/quebec-assemblee-nationale/?limit=124";
		adresse = "https://represent.opennorth.ca/representatives/conseil-municipal-de-saint-jerome/";
		adresse = "https://represent.opennorth.ca/representatives/?last_name=Tremblay";
		adresse = "https://represent.opennorth.ca/representatives/conseil-municipal-de-montreal/?limit=1000";
		adresse = "exemple.json";
		this.chargerJson(adresse).then(data => {
			this.app = document.getElementById("app");
			this.app.appendChild(this.creerListe(data.objects));	
		});
	}
	static creerListe(objets) {
		var resultat = document.createElement("div");
		resultat.classList.add("list");
		objets.forEach(objet => {
			var person = resultat.appendChild(document.createElement("div"));
			person.classList.add("person");

			var email = person.appendChild(document.createElement("a"));
			email.classList.add("email");
			email.setAttribute("href", "#mailto:"+objet.email+"");
			
			var last_name = email.appendChild(document.createElement("span"));
			last_name.classList.add("last_name");
			last_name.innerHTML = objet.last_name;
			
			var first_name = email.appendChild(document.createElement("span"));
			first_name.classList.add("first_name");
			first_name.innerHTML = objet.first_name;
			
			var elected_office = person.appendChild(document.createElement("span"));
			elected_office.classList.add("elected_office");
			elected_office.innerHTML = objet.elected_office;

			var representative_set_name = person.appendChild(document.createElement("span"));
			representative_set_name.classList.add("representative_set_name");
			representative_set_name.innerHTML = objet.representative_set_name;

			var img = person.appendChild(document.createElement("span"));
			img.classList.add("img");
			if (objet.photo_url) {
				img.style.backgroundImage = "url('"+objet.photo_url+"')";
				img.setAttribute("title", objet.name);
			} else {
				img.style.backgroundImage = "url(images/personne.svg)";
				img.setAttribute("title", "Sans photo");				
			}
		});
		console.log(objets);
		return resultat;
	}
	static chargerJson(url) {
		return new Promise(resolve => {
			var xhr = new XMLHttpRequest();
			xhr.open("get", url);
			xhr.responseType = "json";
			xhr.addEventListener("load", e => {
				resolve(xhr.response, xhr);
			});
			xhr.send();
		});
	}
	static chargerXml(url) {
		return new Promise(resolve => {
			var xhr = new XMLHttpRequest();
			xhr.open("get", url);
			xhr.responseType = "document";
			xhr.addEventListener("load", e => {
				resolve(xhr.response, xhr);
			});
			xhr.send();
		});
	}
	static chargerTxt(url) {
		return new Promise(resolve => {
			var xhr = new XMLHttpRequest();
			xhr.open("get", url);
			xhr.responseType = "text";
			xhr.addEventListener("load", e => {
				resolve(xhr.responseText, xhr);
			});
			xhr.send();
		});
	}	
	/**
	 * Méthode qui permet d'attendre le chargement de la page avant d'éxécuter le script principal
	 * @returns {Promise} La promesse qui sera résolue après chargement
	 */
	static load() {
		return new Promise(resolve => {
			window.addEventListener("load", () => {
				resolve();
			});
		});
	}
}
