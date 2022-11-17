import testImage from '../static/images/test.png';
import { useState, useEffect, useRef } from 'react'
import * as Excel from "exceljs"
import {saveAs} from "file-saver";


const header = ["id", "name", "username", "email"]

export const SimpleTable = () => {
    const [usuarios, setUsuarios] = useState([])
    const myTable = useRef(null)

    useEffect(() => {
        function getData() {
            fetch("https://jsonplaceholder.typicode.com/users")
                .then((response) => response.json())
                .then((data) => setUsuarios(data.map((user) => {
                    let result = {}
                    header.forEach((column) => {result[column] = user[column]})
                    return result
                })));
        }
        getData();
    }, [])

    const convertImageToArrayBuffer = async (src) => {
        const response = await fetch(src);
        return await (response.arrayBuffer());
    }

    // const convertImageToBlob = async (src) => {
    //     const buffer = await convertImageToArrayBuffer(src);
    //     return new Blob([buffer], { type: 'image/png' });
    // }

    // const getBase64FromImage = async (src) => {
    //     const file = await convertImageToBlob(src);
    //     return await new Promise((resolve) => {
    //         const reader = new FileReader();
    //         reader.onload = (e) => {
    //             resolve(e.target.result);
    //         };
    //         reader.readAsDataURL(file);
    //     });    
    // }

    const exportTableToXlsx = () => {
        const workbook = new Excel.Workbook()
        const worksheet = workbook.addWorksheet('Obras')
        
        const headers = header.map((column) => ({
            key : column, 
            header : column, 
            width : usuarios.reduce((prev, current) => {
                return Math.max(prev, column === "id" ? current[column].toString().length : current[column].length)
            }, column === "id" ? 3 : 0)
        }))

        worksheet.columns = headers
        worksheet.addRows(usuarios)

        for(let i = 1; i <= usuarios.length + 1; i++){
            let row = worksheet.getRow(i)
            for(let j = 1; j <= header.length; j++){
                row.getCell(j).alignment = { vertical: 'middle', horizontal: 'center' };
                row.getCell(j).border = {
                    top: {style:'thin'},
                    left: {style:'thin'},
                    bottom: {style:'thin'},
                    right: {style:'thin'}
                  };
            }
            if(i !== 1) row.height = 100
        }

        const images = usuarios.map(() => testImage)

        for(let i = 0; i < images.length; i++) {
            const buffer = convertImageToArrayBuffer(images[i])
            const imageId = workbook.addImage({
                buffer: buffer,
                extension: 'png',
            });
    
            worksheet.addImage(imageId, {
                tl: { col: header.length, row: i+1 },
                ext: { width: 100, height: 100 }
            });
        }
        
        workbook.xlsx.writeBuffer()
            .then((buffer) => {
                const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                const fileExtension = '.xlsx';
                const blob = new Blob([buffer], { type: fileType });
                saveAs(blob, 'Report' + fileExtension);
            })     
    }

    return (
        <div>
            {usuarios && (
                <table className="table" id="TablaPrincipal" ref={myTable}>
                <thead>
                    <tr>
                        {
                            header.map((column, indice) => (<th key={indice}>{column}</th>))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        usuarios.map((usuario, indice) =>
                        (<tr key={indice}>
                            <td>{usuario.id}</td>
                            <td>{usuario.name}</td>
                            <td>{usuario.username}</td>
                            <td>{usuario.email}</td>
                            <td><img src={testImage} alt="xd" height={100} width={100}/></td>
                        </tr>))
                    }
                </tbody>
                </table>
            )}
            <button onClick={() => exportTableToXlsx()}>Descargar</button>
        </div>
    )
}
