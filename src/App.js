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
		adresse = "exemple.json";
		if (window.location.search === "?1") {
			adresse = "https://represent.opennorth.ca/representatives/quebec-assemblee-nationale/?limit=1000";
		}
		if (window.location.search === "?2") {
			adresse = "https://represent.opennorth.ca/representatives/conseil-municipal-de-saint-jerome/";
		}
		if (window.location.search === "?3") {
			adresse = "https://represent.opennorth.ca/representatives/?last_name=Tremblay";
		}
		if (window.location.search === "?4") {
			adresse = "https://represent.opennorth.ca/representatives/conseil-municipal-de-montreal/?limit=1000";
		}
		this.chargerJson(adresse).then(data => {
			this.app = document.getElementById("app");
			this.app.appendChild(this.html_list(data.objects));	
		});
	}
	/**
	 * Retourne le div.list qui affiche tous les représentants
	 * @param {array} objets Un tableau d'objets "person"
	 * @returns {HTMLElement} Le div.list
	 */	
	static html_list(objets) {
		var resultat = document.createElement("div");
		resultat.classList.add("list");
		for (let i = 0; i < objets.length; i += 1) {
			let objet = objets[i];
			resultat.appendChild(this.html_person(objet));
		}
		console.log(objets);
		return resultat;
	}
	/**
	 * Retourne le div.person affichant un représentant
	 * @param {object} objet Un objet contenant les informations d'un représentant
	 * @returns {HTMLElement} Un div.person
	 */
	static html_person(objet) {
		var person = document.createElement("div");
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

		var img = person.appendChild(this.html_image(objet));
		return person;
	}
	/**
	 * Retourne la balise span contenant la photo du représentant
	 * Si le représentant n'a pas de photo, un utilise la photo "personne.svg"
	 * @param {object} objet Un objet contenant les informations d'un représentant
	 * @returns {HTMLElement} Un span avec une image d'arrière-plan
	 */
	static html_image(objet) {
		var img = document.createElement("span");
		img.classList.add("img");
		if (objet.photo_url) {
			img.style.backgroundImage = "url('"+objet.photo_url+"')";
			img.setAttribute("title", objet.name);
		} else {
			img.style.backgroundImage = "url(images/personne.svg)";
			img.setAttribute("title", "Sans photo");				
		}
		return img;
	}
	/**
	 * Retourne une promesse résolue après la récupération d'un document JSON
	 * @param {string} url L'adresse du document
	 * @returns {Promise}
	 */
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
	/**
	 * Retourne une promesse résolue après la récupération d'un document XML
	 * @param {string} url L'adresse du document
	 * @returns {Promise}
	 */
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
	/**
	 * Retourne une promesse résolue après la récupération d'un document texte
	 * @param {string} url L'adresse du document
	 * @returns {Promise}
	 */
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
