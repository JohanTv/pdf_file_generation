import React from 'react'
import jsPDF from 'jspdf'
import testImage from '../static/images/test.png'
import testImage2 from '../static/images/logo192.png'
import testImage3 from '../static/images/logo512.png'
import { artwork, keysForGalleryFormat, getArtworksData, exportTags } from '../constant/util'

const exportGalleryFormatToPDF = (data, images) => {
    const filename = "obras_galeria.pdf"
    const configuration = {
        rows: 1,
        columns: 1,
        width: 163.3,
        height: 138.9,
        drawImageRectangle: false,
        drawTagRectangle: false,
        align: "center",
        tagOrientation: "vertical",
        fontSizeMax: 14,
        fieldSpacingMax: 0.5
    }

    exportTags(data, images, configuration, filename)    
}


export const ExportGalleryReport = () => {
    const execute = () => {
        const artworks = []
        const images = [testImage, testImage2, testImage3, testImage3, testImage3] 
		for (let i = 1; i <= 5; i++){
            artworks.push(artwork)
            // images.push(testImage)
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
