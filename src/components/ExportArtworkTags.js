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

        const fitsProperly = (doc, tagWidth, tagHeight, rows, columns) => {
            const pageWidth = doc.internal.pageSize.width
            const pageHeight = doc.internal.pageSize.height

            return (pageWidth >= tagWidth * columns) && (pageHeight >= tagHeight * rows)
        }

        const exportTags = (data, images, configuration) => {
            if (typeof (configuration) !== 'object') 
                throw new Error("Parameter invalid")
            /*
                Manejar excepciones
                - Asignar automaticamente el numero de filas y columnas a partir del ancho y alto
                - Asignar automaticamente el ancho y alto a partir del numero de filas y columnas
            */

            const {width: tagWidth, height: tagHeight, rows, columns} = configuration
            const filename = "etiquetas.pdf"
            const orientation = "portrait", format = "a4"
            const options = {
                orientation: orientation,
                unit: "mm",
                format: format,
                compress: true
            }
            const doc = new jsPDF(options)

            if (!fitsProperly(doc, tagWidth, tagHeight, rows, columns)) 
                throw new Error("does not fit properly")

            // Draw rectangles
            const pageWidth = doc.internal.pageSize.width
            const pageHeight = doc.internal.pageSize.height
            const rowSpacing = 0.5, columnSpacing = 0.5
            const pageMarginX = (pageWidth - (tagWidth * columns + columnSpacing * (columns - 1))) / 2
            const pageMarginY = (pageHeight - (tagHeight * rows + rowSpacing * (rows - 1))) / 2
            
            let idx = 0
            const font = "helvetica"
            doc.setFont(font, "normal")
            const fontFactor = doc.getFontSize() / doc.getTextDimensions("A").h

            for(let i = 0; i < rows; i++) {
                for(let j = 0; j < columns; j++) {
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

                    const tagMarginX = (tagWidth - imageWidth) * 0.25;
                    const tagMarginY = (tagHeight - imageHeight) * 0.5;

                    doc.addImage(image, imageProperties.fileType, x + tagMarginX, y + tagMarginY, imageWidth, imageHeight)
                    doc.rect(x + tagMarginX, y + tagMarginY, imageWidth, imageHeight, "S")
                    const fontSize = (imageHeight * 0.9) / data[idx].length * fontFactor
                    doc.setFontSize(fontSize)

                    // Artwork information
                    // falta manejar el caso cuando el ancho del texto se sobresale
                    const posx = x + tagMarginX + imageWidth + (tagWidth - (tagMarginX + imageWidth)) * 0.125
                    const posy = y + tagMarginY
                    for(let info = 0; info < data[idx].length; info++){
                        if (info === 0) doc.setFont(font, "bold")
                        else if (info === 1) doc.setFont(font, "italic")
                        else doc.setFont(font, "normal")
                        doc.text(data[idx][info], posx, posy + (info + 1) * doc.getTextDimensions("A").h, { align: "left" })
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
                    height: 38.1
                },
                num_22: {
                    rows: 11,
                    columns: 2,
                    width: 99.0,
                    height: 25.4
                }
            }
        }

        const data = getArtworksData(artworks, keysForGalleryFormat)

        exportTags(data, images, formats.a4.num_14)
    }
    
    return (
        <div>
            <button onClick={ () => execute() }>Exportar Etiquetas</button>
        </div>
    )
}
