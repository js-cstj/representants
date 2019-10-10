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
		this.chargerJson(adresse).then(data => {
			this.app = document.getElementById("app");
			this.app.appendChild(this.creerListe(data.objects));	
		});
	}
	static creerListe(personnes) {
		//	<div class="list">
		//		<div class="person">
		//			<a class="email" href="#mailto:ptrudeau@ville.dorval.qc.ca">
		//				<span class="last_name">Trudeau</span>
		//				<span class="first_name">Paul</span>
		//			</a>
		//			<span class="elected_office">Conseiller</span>
		//			<span class="representative_set_name">Conseil municipal de Dorval</span>
		//			<span class="img" style="background-image: url('https://www.ville.dorval.qc.ca/medias/images/fr/cite/Trudeau.jpg');" title="Paul Trudeau"></span>
		//		</div>
		//		<div class="person">
		//			<a class="email" href="#mailto:justin.trudeau@parl.gc.ca">
		//				<span class="last_name">Trudeau</span>
		//				<span class="first_name">Justin</span>
		//			</a>
		//			<span class="elected_office">MP</span>
		//			<span class="representative_set_name">House of Commons</span>
		//			<span class="img" style="background-image: url('http://www.ourcommons.ca/Parliamentarians/Images/OfficialMPPhotos/42/TrudeauJustin_LIB.jpg');" title="Justin Trudeau"></span>
		//		</div>
		//	</div> 
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
