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
		// adresse = "https://represent.opennorth.ca/representatives/quebec-assemblee-nationale/?limit=124";
		// adresse = "https://represent.opennorth.ca/representatives/conseil-municipal-de-saint-jerome/";
		// adresse = "https://represent.opennorth.ca/representatives/?last_name=Tremblay";
		// adresse = "https://represent.opennorth.ca/representatives/conseil-municipal-de-montreal/?limit=1000";
		adresse = "exemple.json";
		
		
	}
	/**
	 * Retourne le div.list qui affiche tous les représentants
	 * @param {array} objets Un tableau d'objets "person"
	 * @returns {HTMLElement} Le div.list
	 */	
	static html_list(objets) {
		var list = document.createElement("div");
		return list;
	}
	/**
	 * Retourne le div.person affichant un représentant
	 * @param {object} objet Un objet contenant les informations d'un représentant
	 * @returns {HTMLElement} Un div.person
	 */
	static html_person(objet) {
		var person = document.createElement("div");
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
		return img;
	}
	/**
	 * Retourne une promesse résolue après la récupération d'un document JSON
	 * @param {string} url L'adresse du document
	 * @returns {Promise}
	 */
	
	
	
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
