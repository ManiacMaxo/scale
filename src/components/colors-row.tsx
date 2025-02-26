import React from 'react'
import styled from 'styled-components'
import ColorBlock from './color-block'
import { isValidHex, numberToHex, errorColor } from '../utils'

interface Props {
    mainColor: string
    disabled?: boolean
    darkColors: Array<string>
    lightColors: Array<string>
}

const ColorBlocksRow = styled.div<Pick<Props, 'disabled'>>`
    display: flex;
    width: 100%;
    ${(props) => props.disabled && `pointer-events: none`};
`

const ColorsRow: React.FC<Props> = ({
    mainColor,
    darkColors,
    lightColors,
    disabled,
}) => {
    return (
        <ColorBlocksRow style={{ marginBottom: 88 }} disabled={disabled}>
            {darkColors.map((color, index) => (
                <ColorBlock
                    style={{ background: color }}
                    hasValidColor={isValidHex(numberToHex(mainColor))}
                    color={color}
                    key={index}
                />
            ))}

            <ColorBlock
                wide
                style={{
                    background: isValidHex(numberToHex(mainColor))
                        ? numberToHex(mainColor)
                        : errorColor,
                }}
                hasValidColor={isValidHex(numberToHex(mainColor))}
                color={numberToHex(mainColor)}
            />

            {lightColors.map((color, index) => (
                <ColorBlock
                    style={{ background: color }}
                    hasValidColor={isValidHex(numberToHex(mainColor))}
                    color={color}
                    key={index}
                />
            ))}
        </ColorBlocksRow>
    )
}

export default ColorsRow
