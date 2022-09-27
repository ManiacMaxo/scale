import React from 'react'
import styled from 'styled-components'
import Color from 'color'

const DotsWrapper = styled.div`
    height: 100%;
    display: flex;
`

const DotsColumn = styled.div`
    & + .DotsColumn {
        margin-left: 4px;
    }

    .Dot + .Dot {
        margin-top: 4px;
    }
`

const Dot = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 100%;
    background-color: ${(props) => props.color};
    box-shadow: inset 0 0 0.5px 1px var(--borderColor);
    cursor: pointer;
`

const Title = styled.div`
    font-size: 12px;
    font-weight: 700;
    line-height: 16px;
    margin-bottom: 16px;
    min-height: 32px;
`

const getBorderColor = (color: string) => {
    return Color(color).luminosity() < 0.5
        ? 'hsla(0,0%,100%,0.15)'
        : 'hsla(0,0%,0%,0.15)'
}

interface Props {
    setBgColor: (color: string) => void
    darkColors: Array<string>
    lightColors: Array<string>
    lightColorsAmount: number
}

const BackgroundSelector: React.FC<Props> = ({
    setBgColor,
    darkColors,
    lightColors,
    lightColorsAmount,
}) => {
    return (
        <React.Fragment>
            <Title>Background</Title>
            <DotsWrapper>
                <DotsColumn className="DotsColumn">
                    <Dot
                        className="Dot"
                        color="black"
                        onClick={() => setBgColor('black')}
                        style={
                            {
                                '--borderColor': getBorderColor('black'),
                            } as React.CSSProperties
                        }
                    />
                    <Dot
                        className="Dot"
                        color="white"
                        onClick={() => setBgColor('white')}
                        style={
                            {
                                '--borderColor': getBorderColor('white'),
                            } as React.CSSProperties
                        }
                    />
                </DotsColumn>
                <DotsColumn className="DotsColumn">
                    {darkColors.map((color, index) => {
                        if (index < 2) {
                            return (
                                <Dot
                                    className="Dot"
                                    key={index}
                                    color={color}
                                    onClick={() => setBgColor(`d-${index}`)}
                                    style={
                                        {
                                            '--borderColor':
                                                getBorderColor(color),
                                        } as React.CSSProperties
                                    }
                                />
                            )
                        }
                    })}
                </DotsColumn>
                <DotsColumn className="DotsColumn">
                    {lightColors.map((color, index) => {
                        if (index > lightColorsAmount - 3) {
                            return (
                                <Dot
                                    className="Dot"
                                    key={index}
                                    color={color}
                                    onClick={() =>
                                        setBgColor(
                                            `l-${lightColorsAmount - index}`
                                        )
                                    }
                                    style={
                                        {
                                            '--borderColor':
                                                getBorderColor(color),
                                        } as React.CSSProperties
                                    }
                                />
                            )
                        }
                    })}
                </DotsColumn>
            </DotsWrapper>
        </React.Fragment>
    )
}

export default BackgroundSelector
