import React from 'react'
import jsPDF from 'jspdf'
import testImage from '../static/images/test.png'
import { artwork, keysForGalleryFormat, getArtworksData } from '../constant/util'

export const GalleryReport = () => {
    const execute = () => {
        const artworks = []
        const images = [] 
		for (let i = 1; i <= 3; i++){
            artworks.push(artwork)
            images.push(testImage)
        }

        const exportGalleryFormatToPDF = (data, images) => {
            const filename = "obras_galeria.pdf"
            const format = "a4"
            const orientation = "portrait"
            const options = {
                orientation: orientation,
                unit: "px",
                format: format
            }
            const doc = new jsPDF(options)
            
            // First Page
            const width = doc.internal.pageSize.width
            const height = doc.internal.pageSize.height
            const x = width / 2, y = height / 2
            doc.setFont("helvetica", "bold")
            doc.setFontSize(24)
            doc.text("Obras de arte", x, y)
            doc.setFont("helvetica", "bolditalic")
            doc.text("Galeria", x, y + doc.getTextDimensions("A").h)
            
            // Artwork pages
            const font = "helvetica"
            const fontSize = 12
            doc.setFont(font, "normal")
            doc.setFontSize(fontSize)
            for(let i = 0; i < data.length; i++) {
                if(i === 1) console.log("avoid")
                doc.addPage(format, orientation)
                const posx = doc.internal.pageSize.width / 2
                const posy = doc.internal.pageSize.height / 2
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
        // doc.rect(x, y - dim.h + 1, dim.w + 1, dim.h)

        
    }

    return (
        <div>
            <button onClick={() => execute()}>Generar reporte galeria</button>
        </div>
    )
}
