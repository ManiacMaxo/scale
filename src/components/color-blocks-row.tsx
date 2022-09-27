import styled from 'styled-components'

export type ColorBlocksRowProps = {
    disabled?: boolean
}

const ColorBlocksRow = styled.div<ColorBlocksRowProps>`
    display: flex;
    width: 100%;
    ${(props) => props.disabled && `pointer-events: none`};
`

export default ColorBlocksRow
