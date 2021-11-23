import Person from "./Person.js";
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
			adresse = "https://represent.opennorth.ca /representatives/conseil-municipal-de-saint-jerome/";
		}
		if (window.location.search === "?3") {
			adresse = "https://represent.opennorth.ca/representatives/?last_name=Tremblay";
		}
		if (window.location.search === "?4") {
			adresse = "https://represent.opennorth.ca/representatives/conseil-municipal-de-montreal/?limit=1000";
		}
		this.chargerJson(adresse).then(donnees => {
			var persons = donnees.objects;
			persons.forEach((person, i) => {
				persons[i] = Person.fromJson(person);
			});
			this.app = document.getElementById("app");
			this.app.appendChild(this.html_list(persons));	
		});
	}
	/**
	 * Retourne le div.list qui affiche tous les représentants
	 * @param {array} persons Un tableau d'objets "person"
	 * @returns {HTMLElement} Le div.list
	 */	
	static html_list(persons) {
		var resultat = document.createElement("div");
		resultat.classList.add("list");
		for (let i = 0; i < persons.length; i += 1) {
			let person = persons[i];
			resultat.appendChild(person.dom_liste);
		}
		return resultat;
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
