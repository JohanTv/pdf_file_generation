import React from 'react'

import { artwork } from '../constant/artwork'

export const ExcelTable = () => {
	const execute = () => {
		
	}
	return (
        <div>
            <button onClick={e => { execute() }}>Descargar excel (xlsx) </button>
        </div>
    )
}