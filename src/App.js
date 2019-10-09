/*jslint esnext:true, browser:true*/
/**
 * @module App
 */
export default class App {
	/**
	 * Méthode principale. Sera typiquement appelée après le chargement de la page.
	 */
	static main() {
		this.chargerJson("https://represent.opennorth.ca/representatives/?last_name=Boudreau").then(data => {
			this.app = document.getElementById("app");
			this.app.appendChild(this.creerTableau(data.objects));	
		});
	}
	static creerTableau(objets) {
		var resultat = document.createElement("table");
		resultat.setAttribute("border", "1");
		objets.forEach(objet => {
			var tr = resultat.appendChild(document.createElement("tr"));
			td = tr.appendChild(document.createElement("td"));
			td.innerHTML = objet.last_name;
			td = tr.appendChild(document.createElement("td"));
			td.innerHTML = objet.first_name;
			td = tr.appendChild(document.createElement("td"));
			td.innerHTML = objet.elected_office;
			td = tr.appendChild(document.createElement("td"));
			if (objet.photo_url) {

			} else {
				
			}
			td.innerHTML = objet.elected_office;
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
