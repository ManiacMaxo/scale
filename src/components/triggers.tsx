import Color from 'color'
import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import styled from 'styled-components'
import { numberToHex } from '../utils'
import Button from './button'

const Title = styled.div`
    font-size: 12px;
    font-weight: 700;
    line-height: 16px;
    margin-bottom: 16px;
    min-height: 32px;
`

const ButtonsRow = styled.div`
    display: flex;
    flex-wrap: wrap;

    & > * {
        margin-right: 4px;

        @media (max-width: 720px) {
            margin-top: 4px;
        }
    }
`

const getSvg = (
    darkColors: Array<string>,
    mainColor: string,
    lightColors: Array<string>
) => {
    const svgWidth = darkColors.length * 72 + 192 + lightColors.length * 72
    const darkRects = darkColors.map(
        (color, index) =>
            `<rect x="${72 * index}" width="72" height="72" fill="${color}"/>`
    )
    const mainRect = `<rect x="${
        darkColors.length * 72
    }" width="192" height="72" fill="${numberToHex(mainColor)}"/>`
    const lightRects = lightColors.map(
        (color, index) =>
            `<rect x="${
                72 * index + 192 + darkColors.length * 72
            }" width="72" height="72" fill="${color}"/>`
    )

    return `<svg width="${svgWidth}" height="72" viewBox="0 0 ${svgWidth} 72" fill="none" xmlns="http://www.w3.org/2000/svg">
    ${darkRects.join('')}
    ${mainRect}
    ${lightRects.join('')}
  </svg>`
}

const getColorsListText = (
    darkColors: Array<string>,
    mainColor: string,
    lightColors: Array<string>
) => {
    const darks = darkColors.map((color) => Color(color).hex()).join('\n')
    const lights = lightColors.map((color) => Color(color).hex()).join('\n')
    return `${darks}\n${numberToHex(mainColor)}\n${lights}`
}

const randomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min)
}

interface Props {
    mainColor: string
    darkColors: Array<string>
    lightColors: Array<string>

    setR: (val: number) => void
    setG: (val: number) => void
    setB: (val: number) => void

    setDarkColorsAmount: (val: number) => void
    setDarkestAmount: (val: number) => void
    setDarkColorsMixRotate: (val: number) => void
    setDarkSaturation: (val: number) => void

    setLightColorsAmount: (val: number) => void
    setLightestAmount: (val: number) => void
    setLightColorsMixRotate: (val: number) => void
    setLightSaturation: (val: number) => void

    rgbToMainColor: () => void
}

const Triggers: React.FC<Props> = ({
    darkColors,
    mainColor,
    lightColors,
    setR,
    setG,
    setB,
    setDarkColorsAmount,
    setDarkestAmount,
    setDarkColorsMixRotate,
    setLightColorsAmount,
    setLightestAmount,
    setLightColorsMixRotate,
    setLightSaturation,
    setDarkSaturation,
    rgbToMainColor,
}) => {
    const randomState = () => {
        setR(randomNumber(0, 255))
        setG(randomNumber(0, 255))
        setB(randomNumber(0, 255))

        setDarkColorsAmount(randomNumber(2, 8))
        setLightColorsAmount(randomNumber(2, 8))

        setDarkestAmount(randomNumber(40, 80))
        setLightestAmount(randomNumber(40, 80))

        setLightSaturation(randomNumber(0, 25))
        setDarkSaturation(randomNumber(0, 55))

        setDarkColorsMixRotate(randomNumber(0, 70))
        setLightColorsMixRotate(randomNumber(0, 70))
        rgbToMainColor()
    }

    const randomColor = () => {
        setR(randomNumber(0, 255))
        setG(randomNumber(0, 255))
        setB(randomNumber(0, 255))
        rgbToMainColor()
    }

    return (
        <React.Fragment>
            <Title>Triggers</Title>

            <ButtonsRow>
                <CopyToClipboard
                    text={getSvg(darkColors, mainColor, lightColors)}
                >
                    <Button>Copy SVG</Button>
                </CopyToClipboard>

                <CopyToClipboard
                    text={getColorsListText(darkColors, mainColor, lightColors)}
                >
                    <Button>Copy colors</Button>
                </CopyToClipboard>

                <Button onClick={() => randomState()}>Randomize all</Button>
                <Button onClick={() => randomColor()}>Randomize color</Button>
            </ButtonsRow>
        </React.Fragment>
    )
}

export default Triggers
