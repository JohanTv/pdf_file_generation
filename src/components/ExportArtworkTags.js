import React from 'react'
import jsPDF from 'jspdf'
import testImage2 from '../static/images/logo192.png'
import { artwork, keysForGalleryFormat, getArtworksData } from '../constant/util'

export const ExportArtworkTags = () => {
    const execute = () => {
        const artworks = []
        const images = []
        for (let i = 1; i <= 22; i++){
            artworks.push(artwork)
            images.push(testImage2)
        }

        const fitsProperly = (doc, tagWidth, tagHeight, rows, columns, rowSpacing, columnSpacing) => {
            const pageWidth = doc.internal.pageSize.width
            const pageHeight = doc.internal.pageSize.height

            return (pageWidth >= tagWidth * columns + columnSpacing * (columns - 1)) &&
                (pageHeight >= tagHeight * rows + rowSpacing * (rows - 1))
        }

        const exportTags = (data, images, configuration, filename = "etiquetas.pdf") => {
            if (typeof (configuration) !== 'object') 
                throw new Error("Parameter invalid")
            /*
                Manejar excepciones
                - Asignar automaticamente el numero de filas y columnas a partir del ancho y alto
                - Asignar automaticamente el ancho y alto a partir del numero de filas y columnas
            */

            const {width: tagWidth, height: tagHeight, rows, columns} = configuration
            const drawImageRectangle = configuration.drawImageRectangle || Boolean(false)
            const align = configuration.align || "left"
            const font = configuration.font || "helvetica"
            const rowSpacing = configuration.rowSpacing || 0.5
            const columnSpacing = configuration.columnSpacing || 0.5
            const tagOrientation = configuration.tagOrientation || "horizontal"

            if(!["center", "left", "right"].includes(align))
                throw new Error("align invalid")
            
            const orientation = "portrait", format = "a4"
            const options = {
                orientation: orientation,
                unit: "mm",
                format: format,
                compress: true
            }
            const doc = new jsPDF(options)

            if (!fitsProperly(doc, tagWidth, tagHeight, rows, columns, rowSpacing, columnSpacing)) 
                throw new Error("does not fit properly")

            const pageWidth = doc.internal.pageSize.width
            const pageHeight = doc.internal.pageSize.height
            
            const pageMarginX = (pageWidth - (tagWidth * columns + columnSpacing * (columns - 1))) / 2
            const pageMarginY = (pageHeight - (tagHeight * rows + rowSpacing * (rows - 1))) / 2

            let idx = 0
            for(let i = 0; i < rows; i++) {
                for(let j = 0; j < columns; j++) {
                    doc.setFont(font, "bold")
                    // Tag rectangle
                    const x = pageMarginX + j * (tagWidth + columnSpacing)
                    const y = pageMarginY + i * (tagHeight + rowSpacing)
                    doc.rect(x, y, tagWidth, tagHeight, "S")
                    
                    // Artwork image
                    const image = images[idx]
                    const imageProperties = doc.getImageProperties(image)

                    const widthRatio = tagWidth / imageProperties.width;
                    const heightRatio = tagHeight / imageProperties.height;
                    const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;
                    
                    const imageFactor = 0.65
                    const imageWidth = imageProperties.width * ratio * imageFactor;
                    const imageHeight = imageProperties.height * ratio * imageFactor;

                    let tagMarginX, tagMarginY
                    if (tagOrientation === "horizontal") {
                        tagMarginX = (tagWidth - imageWidth) * 0.25;
                        tagMarginY = (tagHeight - imageHeight) * 0.5;
                    } else {
                        tagMarginX = (tagWidth - imageWidth) * 0.5;
                        tagMarginY = (tagHeight - imageHeight) * 0.5;
                    }

                    doc.addImage(image, imageProperties.fileType, x + tagMarginX, y + tagMarginY, imageWidth, imageHeight)
                    if(drawImageRectangle)
                        doc.rect(x + tagMarginX, y + tagMarginY, imageWidth, imageHeight, "S")

                    let textMarginX, textMarginY
                    if (tagOrientation === "horizontal") {
                        let factor
                        if(align === "left") factor = 0.05
                        else if (align === "center") factor = 0.5
                        else if(align === "right") factor = 0.95
                        textMarginX = (tagWidth - (tagMarginX + imageWidth)) * factor
                        textMarginY = (tagHeight - tagMarginY) * 0.05
                    } else {
                        if(align === "left") textMarginX = (tagWidth - tagMarginX) * 0.05
                        else if (align === "center") textMarginX = tagWidth * 0.5
                        else if(align === "right") textMarginX = (tagWidth - tagMarginX) * 0.95
                        textMarginY = (tagHeight - (tagMarginY + imageHeight)) * 0.05
                    }

                    // Define fontSize - missing
                    const spaceRequired = (element, space) => {
                        if(space === "width")
                            return element.reduce((prev, current) => {
                                let value = null
                                if (!current) value = 0
                                else if (typeof (current) === "string")
                                    value = doc.getTextDimensions(current).w
                                else if (typeof (current) !== "string")
                                    value = doc.getTextDimensions(current.toString()).w
                                return Math.max(prev, value)
                            }, 0)
                        return doc.getTextDimensions("A").h * element.length
                    }
                    
                    const heightRequired = spaceRequired(data[idx], "height")
                    console.log("height chr = " + doc.getTextDimensions("A").h)
                    console.log("height required = " + heightRequired)
                    const fontHeightFactor = doc.getFontSize() / (heightRequired / data[idx].length)
                    let spaceWidth, spaceHeight
                    if (tagOrientation === "horizontal"){
                        spaceWidth = tagWidth - (tagMarginX + imageWidth + 2 * textMarginX)
                        spaceHeight = tagHeight - (tagMarginY + 2 * textMarginY)
                    } else {
                        spaceWidth = tagWidth - (tagMarginX + 2 * textMarginX)
                        spaceHeight = tagHeight - (tagMarginY + imageHeight + 2 * textMarginY)
                    }

                    let fontSize = (spaceHeight / data[idx].length) * fontHeightFactor
                    doc.setFontSize(fontSize)

                    const widthRequired = spaceRequired(data[idx], "width")
                    const fontWidthFactor = doc.getFontSize() / widthRequired
                    if(widthRequired > spaceWidth){
                        fontSize = spaceWidth * fontWidthFactor
                        doc.setFontSize(fontSize)
                    }
                    
                    // Artwork information
                    let posx, posy
                    if (tagOrientation === "horizontal") {
                        posx = x + tagMarginX + imageWidth + textMarginX
                        posy = y + tagMarginY + textMarginY
                    } else {
                        posx = x + tagMarginX + textMarginX
                        posy = y + tagMarginY + imageHeight + textMarginY
                    }
                    
                    for(let info = 0; info < data[idx].length; info++){
                        if (info === 0) doc.setFont(font, "bold")
                        else if (info === 1) doc.setFont(font, "italic")
                        else doc.setFont(font, "normal")
                        doc.text(data[idx][info], posx, posy + (info + 1) * doc.getTextDimensions("A").h, { align: align })
                    }

                    idx++
                }
            }

            doc.save(filename)
        }

        const formats = {
            a4: {
                num_14: {
                    rows: 7,
                    columns: 2,
                    width: 99.0,
                    height: 38.1,
                    drawImageRectangle: true
                },
                num_22: {
                    rows: 11,
                    columns: 2,
                    width: 99.0,
                    height: 25.4,
                    drawImageRectangle: true
                }
            }
        }

        const data = getArtworksData(artworks, keysForGalleryFormat)

        exportTags(data, images, formats.a4.num_14)
        exportTags(data, images, formats.a4.num_22)
    }
    
    return (
        <div>
            <button onClick={ () => execute() }>Exportar Etiquetas</button>
        </div>
    )
}
