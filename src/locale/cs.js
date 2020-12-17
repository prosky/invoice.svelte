export default {
    page: {
        home: {
            title: "Faktura",
            nav: "Faktura"
        },
        about: {
            title: "About",
            nav: "About"
        },
        contact: {
            title: "Contact",
            nav: "Contact Us"
        },
        settings: {
            title: "Settings",
            nav: "Settings"
        }
    },
    buttons: {
        download_pdf: "Stáhnout PDF",
        show_pdf: 'Zobrazit PDF',
        delete: 'Odstranit',
        add_product: 'Přidat produkt',
		close: 'Zavřít',
		update: 'Aktualizovat',
		reset: "Resetovat",
		new_file: "Nový soubor"
    },
    company: {
        name: 'Název',
        address: "Adresa",
        address2: "Ulice",
        country: "Země",
        cin: "IČ",
        tin: "DIČ"
    },
    invoice: {
        title: 'Název',
        products: {//Placeholders
            description: 'Popis',
            quantity: 'Množství',
            price: 'Cena',
            sum: 'Celkem',
			taxRate: "Daňová sazba",
        },
		client: 'Odběratel',
		company: 'Dodavalel',
        subTotal: "Základ",
        tax: "DPH",
        total: "Celkem k úhradě",
		date: "Datum",
		dueDate: "Datum splatnosti",
        withoutVAT: "Neplátce DPH",
        withVAT: "Plátce DPH",
		currencies: "Měna",
		locale: "Jazyk",
		dateFormat: "Formát data",
		terms: "Podmínky",
		//terms: "Podmínky",
		notes: "Poznámky",
		//terms: "Podmínky",
    },
	defaultValues:{
    	invoice:{
			labels:{
				title: 'Invoice#',
				client: 'Odběratel',
				company: 'Dodavalel',
				subTotal: "Základ",
				tax: "DPH",
				total: "Celkem k úhradě",
				date: "Datum",
				dueDate: "Datum splatnosti",
				terms: "Podmínky",
				notes: "Poznámky",
				products: {
					taxRate: "Daňová sazba",
					description: 'Popis',
					quantity: 'Množství',
					price: 'Cena',
					sum: 'Celkem',
				},
			}
		}
	},
    files: {
        name: "Název",
        modifiedTime: "Upraveno",

    },
	imagePicker:{
		select: 'Zvolte soubor',
		remove: 'Odstranit'
	},
    google: {
		title: "Google Drive",
		search: "Vyhledat",
        signIn: 'Sign in with Google',
        signOut: 'Odhlásit',
		update: "Uložit změny",
		upload: "Nahrát na server"
    },
    settings: {
        title: 'Nastavení',
		locale: "Jazyk",
		dateFormat: "Formát data",
    }

}
