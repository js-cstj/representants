export default class Person {
    constructor() {
        this.email = null;
        this.last_name = null;
        this.gender = null;
        this.photo_url = null;
        this.source_url = null;
        this.extra = null;
        this.district_name = null;
        this.related = null;
        this.party_name = null;
        this.url = null;
        this.offices = null;
        this.first_name = null;
        this.elected_office = null;
        this.representative_set_name = null;
        this.name = null;
        this.personal_url = null;
        this.dom_liste = null;
    }
    fill(json) {
        for (let k in json) {
            if (this.hasOwnProperty(k)) {
                this[k] = json[k]
            }
        }
    }
	/**
	 * Retourne le div.person affichant un représentant
	 * @returns {HTMLElement} Un div.person
	 */
     get dom_liste() {
        if (this._dom_liste) {
            return this._dom_liste;
        }
        var dom = document.createElement("div");
        dom.classList.add("person");

        var email = dom.appendChild(document.createElement("a"));
        email.classList.add("email");
        email.setAttribute("href", "#mailto:"+this.email+"");
        
        var last_name = email.appendChild(document.createElement("span"));
        last_name.classList.add("last_name");
        last_name.innerHTML = this.last_name;
        
        var first_name = email.appendChild(document.createElement("span"));
        first_name.classList.add("first_name");
        first_name.innerHTML = this.first_name;
        
        var elected_office = dom.appendChild(document.createElement("span"));
        elected_office.classList.add("elected_office");
        elected_office.innerHTML = this.elected_office;

        var representative_set_name = dom.appendChild(document.createElement("span"));
        representative_set_name.classList.add("representative_set_name");
        representative_set_name.innerHTML = this.representative_set_name;

        dom.appendChild(this.html_image());
        dom.obj = this;
        this._dom_liste = dom;
        return dom;
    }
	/**
	 * Retourne la balise span contenant la photo du représentant
	 * Si le représentant n'a pas de photo, un utilise la photo "personne.svg"
	 * @returns {HTMLElement} Un span avec une image d'arrière-plan
	 */
      html_image() {
		var image = document.createElement("span");
		image.classList.add("img");
		if (this.photo_url) {
			image.style.backgroundImage = "url('"+this.photo_url+"')";
			image.setAttribute("title", this.name);
		} else {
			image.style.backgroundImage = "url(images/personne.svg)";
			image.setAttribute("title", "Sans photo");				
		}
		return image;
	}
    static fromJson(json) {
        var resultat = new this();
        resultat.fill(json);
        // {
        //     "email": "ptrudeau@ville.dorval.qc.ca",
        //     "last_name": "Trudeau",
        //     "gender": "",
        //     "photo_url": "https://www.ville.dorval.qc.ca/medias/images/fr/cite/Trudeau.jpg",
        //     "source_url": "http://www.ville.dorval.qc.ca/en/the-city/page/council-members",
        //     "extra": {},
        //     "district_name": "District 1",
        //     "related": {
        //         "representative_set_url": "/representative-sets/conseil-municipal-de-dorval/",
        //         "boundary_url": "/boundaries/dorval-districts/district-1/"
        //     },
        //     "party_name": "",
        //     "url": "",
        //     "offices": [],
        //     "first_name": "Paul",
        //     "elected_office": "Conseiller",
        //     "representative_set_name": "Conseil municipal de Dorval",
        //     "name": "Paul Trudeau",
        //     "personal_url": ""
        // }
        return resultat;
    }
}