import React from 'react'
import jsPDF from 'jspdf'
import testImage2 from '../static/images/logo192.png'
import { artwork, keysForGalleryFormat, getArtworksData, exportTags } from '../constant/util'

export const ExportArtworkTags = () => {
    const execute = () => {
        const artworks = []
        const images = []
        for (let i = 1; i <= 25; i++) {
            artworks.push(artwork)
            images.push(testImage2)
        }

        const a4_14 = {
            rows: 7,
            columns: 2,
            width: 99.0,
            height: 38.1,
            drawImageRectangle: true,
            align: "left"
        }

        const a4_22 = {
            rows: 11,
            columns: 2,
            width: 99.0,
            height: 25.4,
            drawImageRectangle: true,
            align: "left"
        }

        const data = getArtworksData(artworks, keysForGalleryFormat)

        exportTags(data, images, a4_14)
        exportTags(data, images, a4_22)
    }

    return (
        <div>
            <button onClick={() => execute()}>Exportar Etiquetas</button>
        </div>
    )
}
