import jsPDF from 'jspdf'

export const headers = ["ID", "Titulo", "Autor", "Año/Epoca", "Estado", "Categoria", "Tipo", "Tecnica",
    "Dimension", "Pais", "Ciudad", "Sublocacion", "Moneda", "Precio"]

export const keys = ["id", "name", "author.name", "year_period", "condition", "category.name",
    "artwork_type.name", "technique.name", "dimensions", "location_country",
    "location_city.name", "sublocation", "currency", "price"]

export const keysForGalleryFormat = ["author.name", "name", "technique.name", "dimensions"]

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

/*
    Add exception when doesn't exists some key
*/
export const getArtworksData = (_artworks, _keys, _separator = '.') => {
    return _artworks.map((_artwork) =>
        _keys.map((key) =>
            key.split(_separator).reduce((prev, current) =>
                prev === null ? null : prev[current]
                , _artwork)
        )
    )
}

export const exportTags = (data, images, configuration, filename = "etiquetas.pdf", callbackAtStart = null) => {
    if (typeof (configuration) !== 'object')
        throw new Error("invalid configuration parameter")
    /*
        Manejar excepciones
        - Asignar automaticamente el numero de filas y columnas a partir del ancho y alto
        - Asignar automaticamente el ancho y alto a partir del numero de filas y columnas
    */

    const { width: tagWidth, height: tagHeight, rows, columns } = configuration
    const drawImageRectangle = configuration.drawImageRectangle || Boolean(false)
    const drawTagRectangle = (configuration.drawTagRectangle === undefined) ? true : configuration.drawTagRectangle
    const align = configuration.align || "left"
    const font = configuration.font || "helvetica"
    const rowSpacing = configuration.rowSpacing || 0.5
    const columnSpacing = configuration.columnSpacing || 0.5
    const tagOrientation = configuration.tagOrientation || "horizontal"
    const imageFactor = configuration.imageFactor || 0.65
    const fontSizeMax = configuration.fontSizeMax || 100
    const fieldSpacingMax = configuration.fieldSpacingMax || 100
    
    if (!["center", "left", "right"].includes(align))
        throw new Error("invalid align configuration")

    const orientation = "portrait", format = "a4"
    const options = {
        orientation: orientation,
        unit: "mm",
        format: format,
        compress: true
    }
    const doc = new jsPDF(options)
    const pageWidth = doc.internal.pageSize.width
    const pageHeight = doc.internal.pageSize.height

    const fitsProperly = () => {
        return (pageWidth >= tagWidth * columns + columnSpacing * (columns - 1)) &&
            (pageHeight >= tagHeight * rows + rowSpacing * (rows - 1))
    }

    if (!fitsProperly())
        throw new Error("does not fit properly")

    if (callbackAtStart) {
        callbackAtStart(doc)
        doc.addPage(format, orientation)
    }
    
    const pageMarginX = (pageWidth - (tagWidth * columns + columnSpacing * (columns - 1))) / 2
    const pageMarginY = (pageHeight - (tagHeight * rows + rowSpacing * (rows - 1))) / 2

    let idx = 0
    const addTagsToPDF = () => {
        let exit = false
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                if (idx >= data.length) {
                    exit = true
                    break
                }
                doc.setFont(font, "bold")
                // Tag rectangle
                const x = pageMarginX + j * (tagWidth + columnSpacing)
                const y = pageMarginY + i * (tagHeight + rowSpacing)
                if (drawTagRectangle)
                    doc.rect(x, y, tagWidth, tagHeight, "S")

                // Artwork image
                const image = images[idx]
                const imageProperties = doc.getImageProperties(image)

                const widthRatio = tagWidth / imageProperties.width;
                const heightRatio = tagHeight / imageProperties.height;
                const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

                const imageWidth = imageProperties.width * ratio * imageFactor;
                const imageHeight = imageProperties.height * ratio * imageFactor;

                let tagMarginX, tagMarginY
                if (tagOrientation === "horizontal") {
                    tagMarginX = (tagWidth - imageWidth) * 0.25;
                    tagMarginY = (tagHeight - imageHeight) * 0.5;
                } else {
                    tagMarginX = (tagWidth - imageWidth) * 0.5;
                    tagMarginY = (tagHeight - imageHeight) * 0.25;
                }

                doc.addImage(image, imageProperties.fileType, x + tagMarginX, y + tagMarginY, imageWidth, imageHeight)
                if (drawImageRectangle)
                    doc.rect(x + tagMarginX, y + tagMarginY, imageWidth, imageHeight, "S")

                let textMarginX, textMarginY, factor
                
                if (align === "left") factor = 0.05
                else if (align === "center") factor = 0.5
                else if (align === "right") factor = 0.95

                if (tagOrientation === "horizontal") {
                    if(align === "right")
                        textMarginX = (tagWidth - (2 * tagMarginX + imageWidth)) * factor
                    else 
                        textMarginX = (tagWidth - (tagMarginX + imageWidth)) * factor
                    
                    textMarginY = (tagHeight - tagMarginY) * 0.05
                } else {
                    textMarginX = (tagWidth - 2 * tagMarginX) * factor
                    textMarginY = (tagHeight - (tagMarginY + imageHeight)) * 0.05
                }

                // Define fontSize
                const spaceRequired = (element, space) => {
                    if (space === "width") {
                        return element.reduce((prev, current) => {
                            let value = null
                            if (!current) value = 0
                            else if (typeof (current) === "string")
                                value = doc.getTextDimensions(current).w
                            else if (typeof (current) !== "string")
                                value = doc.getTextDimensions(current.toString()).w
                            return Math.max(prev, value)
                        }, 0)
                    }
                    return doc.getTextDimensions("A").h * element.length
                }

                const heightRequired = spaceRequired(data[idx], "height")
                let spaceWidth, spaceHeight
                if (tagOrientation === "horizontal") {
                    if (align === "left")
                        spaceWidth = tagWidth - (2 * tagMarginX + imageWidth + textMarginX)
                    else if (align === "center")
                        spaceWidth = tagWidth - (2 * tagMarginX + imageWidth)
                    else if (align === "right")
                        spaceWidth = tagWidth - (2 * tagMarginX + imageWidth + textMarginX * (1 / factor) * (1 - factor))

                    spaceHeight = tagHeight - (2 * (tagMarginY + textMarginY))
                } else {
                    if (align === "left")
                        spaceWidth = tagWidth - 2 * (tagMarginX + textMarginX)
                    else if (align === "center")
                        spaceWidth = tagWidth - 2 * (tagMarginX)
                    else if (align === "right")
                        spaceWidth = tagWidth - 2 * (tagMarginX + textMarginX * (1 / factor) * (1 - factor))

                    spaceHeight = tagHeight - (2 * (tagMarginY + textMarginY) + imageHeight)
                }

                const heightRequiredPerField = heightRequired / data[idx].length
                const heightPerField = spaceHeight / data[idx].length
                const fontHeightFactor = doc.getFontSize() / heightRequiredPerField
                let fontSize = heightPerField * fontHeightFactor
                doc.setFontSize(Math.min(fontSize, fontSizeMax))

                const widthRequired = spaceRequired(data[idx], "width")
                const fontWidthFactor = doc.getFontSize() / widthRequired
                if (widthRequired > spaceWidth) {
                    fontSize = spaceWidth * fontWidthFactor
                    doc.setFontSize(Math.min(fontSize, fontSizeMax))
                }

                // Artwork information
                let posx, posy
                if (tagOrientation === "horizontal") {
                    posx = x + tagMarginX + imageWidth + textMarginX
                    posy = y + tagMarginY + textMarginY * 0.5
                } else {
                    posx = x + tagMarginX + textMarginX
                    posy = y + tagMarginY + imageHeight + textMarginY
                }

                const characterHeight = doc.getTextDimensions("A").h
                const textHeight = characterHeight * data[idx].length
                let fieldSpacing
                if (tagOrientation == "horizontal")
                    fieldSpacing = (tagHeight - (2 * (tagMarginY + textMarginY) + textHeight)) / (data[idx].length - 1)
                else
                    fieldSpacing = (tagHeight - (2 * (tagMarginY + textMarginY) + imageHeight + textHeight)) / (data[idx].length - 1)
                
                fieldSpacing = Math.min(fieldSpacing, fieldSpacingMax)
                
                for (let info = 0; info < data[idx].length; info++) {
                    if (info === 0) doc.setFont(font, "bold")
                    else if (info === 1) doc.setFont(font, "italic")
                    else doc.setFont(font, "normal")
                    doc.text(data[idx][info], posx, posy + (info + 1) * (characterHeight) + info * fieldSpacing, { align: align })
                }

                idx++
            }
            if (exit) break
        }
    }

    const sheetsNumber = Math.ceil(data.length / (rows * columns))
    for (let sheets = 0; sheets < sheetsNumber; sheets++) {
        if (sheets > 0) doc.addPage(format, orientation)
        addTagsToPDF()
    }
    doc.save(filename)
}