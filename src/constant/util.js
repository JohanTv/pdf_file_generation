export const headers = ["ID", "Titulo", "Autor", "Año/Periodo", "Estado", "Categoria", "Tipo", "Tecnica",
    "Dimension", "Pais", "Ciudad", "Sublocacion", "Moneda", "Precio"]

export const keys = ["id", "name", "author.name", "year_period", "condition", "category.name",
    "artwork_type.name", "technique.name", "dimensions", "location_country",
    "location_city.name", "sublocation", "currency", "price"]

export const artwork = {
    "id": 1001,
    "name": "Mona Lisa",
    "description": "Obra de arte histórica",
    "main_image": {
        "id": 1,
        "file": "http://localhost:8000/media/public/Curva.png",
        "title": "Curva.png",
        "timestamp": "2022-11-17T08:19:57.442634Z"
    },
    "dimensions": "30cmx23cm",
    "year_period": "1503",
    "condition": "Bueno",
    "observations": "interesante",
    "id_collection": "2001",
    "id_asset": "",
    "id_national": "2002",
    "id_photograph": "2003",
    "author": {
        "id": 101,
        "name": "Leonardo Da Vinci",
        "country": "PE",
        "main_image": null,
        "is_active": true,
        "created_by": 1,
        "timestamp": "2022-11-17T08:12:55.642165Z"
    },
    "category": null,
    "artwork_type": {
        "id": 12,
        "name": "Tipo 100",
        "description": ""
    },
    "location_country": "PE",
    "location_city": {
        "id": 12,
        "name": "Lima",
        "description": null
    },
    "sublocation": "Jesus Maria",
    "technique": {
        "id": 12,
        "name": "Tecnica 100",
        "description": ""
    },
    "currency": null,
    "price": 1200,
    "created_by": {
        "id": 1,
        "email": "johan.tanta@utec.edu.pe",
        "first_name": "Johan",
        "last_name": "Tanta",
        "client_role": 1
    },
    "timestamp": "2022-11-17T08:15:15.744258Z"
}