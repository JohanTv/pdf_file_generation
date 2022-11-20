import React from 'react'
import jsPDF from 'jspdf'
import testImage from '../static/images/test.png'
import testImage2 from '../static/images/logo192.png'
import testImage3 from '../static/images/logo512.png'
import { artwork, keysForGalleryFormat, getArtworksData } from '../constant/util'

export const ExportGalleryReport = () => {
    const execute = () => {
        const artworks = []
        const images = [testImage, testImage2, testImage3, testImage3, testImage3] 
		for (let i = 1; i <= 5; i++){
            artworks.push(artwork)
            // images.push(testImage)
        }

        const exportGalleryFormatToPDF = (data, images) => {
            const filename = "obras_galeria.pdf"
            const format = "a4"
            const orientation = "portrait"
            const options = {
                orientation: orientation,
                unit: "px",
                format: format,
                compress: true
            }
            const doc = new jsPDF(options)
            
            // First Page
            const pageWidth = doc.internal.pageSize.width
            const pageHeight = doc.internal.pageSize.height
            const x = pageWidth / 2, y = pageHeight / 2
            doc.setFont("helvetica", "bold")
            doc.setFontSize(24)
            doc.text("Obras de arte", x, y)
            doc.setFont("helvetica", "bolditalic")
            doc.text("Galeria", x, y + doc.getTextDimensions("A").h)

            // Artwork pages
            const font = "helvetica"
            const fontSize = 12
            doc.setFontSize(fontSize)
            for(let i = 0; i < data.length; i++) {
                doc.addPage(format, orientation)

                // Artwork image
                const image = images[i]
                const imageProperties = doc.getImageProperties(image)

                const widthRatio = pageWidth / imageProperties.width;
                const heightRatio = pageHeight / imageProperties.height;
                const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

                const imageFactor = 0.65
                const imageWidth = imageProperties.width * ratio * imageFactor;
                const imageHeight = imageProperties.height * ratio * imageFactor;

                const marginX = (pageWidth - imageWidth) * 0.5;
                const marginY = (pageHeight - imageHeight) * 0.5;
                
                doc.addImage(image, imageProperties.fileType, marginX, marginY, imageWidth, imageHeight)

                // Artwork information
                const posx = doc.internal.pageSize.width * 0.5
                const posy = marginY + imageHeight + 10
                for(let j = 0; j < data[i].length; j++){
                    if(j === 0) doc.setFont(font, "bold")
                    else if(j === 1) doc.setFont(font, "italic")
                    else doc.setFont(font, "normal")
                    doc.text(data[i][j], posx, posy + j * doc.getTextDimensions("A").h, { align: "center" })
                }
            }

            doc.save(filename)
        }

        const data = getArtworksData(artworks, keysForGalleryFormat)
        exportGalleryFormatToPDF(data, images)
    }

    return (
        <div>
            <button onClick={() => execute()}>Generar reporte galeria</button>
        </div>
    )
}
