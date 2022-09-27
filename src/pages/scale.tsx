import Color from 'color'
import React, { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import {
    BackgroundSelector,
    ColorsRow,
    DynamicInput,
    Footer,
    MainColorSelector,
    Triggers,
} from '../components'
import { useDebounce } from '../hooks'
import {
    defaultState,
    errorColor,
    getColorsList,
    hashToObject,
    hexToNumber,
    isValidHex,
    numberToHex,
} from '../utils'

const MainWrapper = styled.div`
    padding: 40px 80px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;

    @media (max-width: 720px) {
        padding: 32px;
        min-height: calc(100vh - 40px);
    }
`

const ColorsSection = styled.div`
    width: 100%;
`

const TopSection = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`

const GlobalConfigSection = styled.div`
    display: flex;
    margin-bottom: 64px;

    flex-wrap: wrap;
    @media (max-width: 1100px) {
    }
`

const InputsRow = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: var(--space-xl);

    @media (max-width: 720px) {
        flex-direction: column;
    }
`

interface InputsRowItemProps {
    wide?: boolean
}

export const InputsRowItem = styled.div<InputsRowItemProps>`
    margin-right: 40px;
    flex-shrink: 0;
    width: ${(props) => (props.wide ? 192 : 96)}px;
`

const InputsRowItemSeparataor = styled.div`
    margin-right: 48px;
    display: block;
    width: 1px;
    flex-shrink: 0;
    background-color: var(--border);
`

const BackgroundSelectorSection = styled.div`
    border-left: 1px solid var(--border);
    padding: 0 48px;
    height: 160px;

    @media (max-width: 720px) {
        padding: 16px 0;
        margin-top: 16px;
        border-left: 0;
        border-top: 1px solid var(--border);
    }
`

const TriggersSection = styled.div`
    border-left: 1px solid var(--border);
    padding: 0 48px;

    @media (max-width: 720px) {
        padding: 16px 0;
        margin-top: 16px;
        border-left: 0;
        border-top: 1px solid var(--border);
    }
`

const Scale: React.FC = () => {
    const location = useLocation()

    const hash = useMemo(() => {
        return hashToObject(decodeURI(location.hash))
    }, [location.hash])

    const initialState = hash || defaultState
    const [mainColor, setMainColor] = useState(initialState.mainColor)
    const [r, setR] = useState(initialState.r)
    const [g, setG] = useState(initialState.g)
    const [b, setB] = useState(initialState.b)

    const [darkColorsAmount, setDarkColorsAmount] = useState(
        initialState.darkColorsAmount
    )
    const [darkestAmount, setDarkestAmount] = useState(
        initialState.darkestAmount
    )
    const [darkColorsMixRotate, setDarkColorsMixRotate] = useState(
        initialState.darkColorsMixRotate
    )
    const [lightColorsAmount, setLightColorsAmount] = useState(
        initialState.lightColorsAmount
    )
    const [lightestAmount, setLightestAmount] = useState(
        initialState.lightestAmount
    )
    const [lightColorsMixRotate, setLightColorsMixRotate] = useState(
        initialState.lightColorsMixRotate
    )
    const [lightSaturation, setLightSaturation] = useState(
        initialState.lightSaturation
    )
    const [darkSaturation, setDarkSaturation] = useState(
        initialState.darkSaturation
    )

    const [bgColor, setBgColor] = useState<string>(initialState.bgColor)

    const currentState = {
        darkColorsAmount,
        lightColorsAmount,
        darkestAmount,
        lightestAmount,
        darkColorsMixRotate,
        lightColorsMixRotate,
        lightSaturation,
        darkSaturation,
        mainColor,
        r,
        g,
        b,
        bgColor,
    }

    const updateRgbWithMainColor = (color: string) => {
        if (isValidHex(numberToHex(color))) {
            setR(Color(numberToHex(color)).rgb().red())
            setG(Color(numberToHex(color)).rgb().green())
            setB(Color(numberToHex(color)).rgb().blue())
        }
    }

    const handleMainColorChange: React.ChangeEventHandler<HTMLInputElement> = (
        e
    ) => {
        const typedColor = e.target.value
        const typedColorFiltered =
            typedColor[0] === '#'
                ? typedColor.substring(1, typedColor.length)
                : typedColor

        setMainColor(typedColorFiltered)
        updateRgbWithMainColor(typedColorFiltered)
    }

    const rgbToMainColor = () => {
        setTimeout(() => {
            setMainColor(hexToNumber(Color(`rgb(${r}, ${g}, ${b})`).hex()))
        }, 0)
    }

    const handleRChange = (value: string) => {
        setR(value)
        rgbToMainColor()
    }
    const handleGChange = (value: string) => {
        setG(value)
        rgbToMainColor()
    }
    const handleBChange = (value: string) => {
        setB(value)
        rgbToMainColor()
    }

    const darkColors = useMemo(
        () =>
            getColorsList(
                darkColorsAmount,
                darkestAmount,
                'black',
                darkColorsMixRotate,
                darkSaturation,
                mainColor
            ).reverse(),
        [
            darkColorsAmount,
            darkestAmount,
            darkColorsMixRotate,
            darkSaturation,
            mainColor,
        ]
    )

    const lightColors = useMemo(
        () =>
            getColorsList(
                lightColorsAmount,
                lightestAmount,
                'white',
                lightColorsMixRotate,
                lightSaturation,
                mainColor
            ),
        [
            lightColorsAmount,
            lightestAmount,
            lightColorsMixRotate,
            lightSaturation,
            mainColor,
        ]
    )

    useEffect(() => {
        if (bgColor === undefined) {
            setBgColor(defaultState.bgColor)
            return
        }

        const colorNumber =
            bgColor.startsWith('l-') || bgColor.startsWith('d-')
                ? parseInt(bgColor.substring(2, bgColor.length))
                : undefined

        let color = ''
        if (bgColor === 'white' || bgColor === 'black') {
            color = bgColor
        } else if (bgColor.startsWith('l-') && colorNumber) {
            color = lightColors[lightColorsAmount - colorNumber]
        } else if (bgColor.startsWith('d-') && colorNumber) {
            color = darkColors[colorNumber]
        }

        document.documentElement.style.setProperty('--bodyBg', color)
    }, [bgColor])

    useDebounce(
        () => {
            window.location.hash = encodeURI(
                Object.values(currentState).join('/')
            )
            document
                .getElementById('themeMetaTag')
                ?.setAttribute('content', numberToHex(mainColor))
        },
        100,
        [currentState]
    )

    useEffect(() => {
        const givenColor = isValidHex(numberToHex(mainColor))
            ? numberToHex(mainColor)
            : errorColor

        const mixColor = bgColor
            ? bgColor.startsWith('l-') || bgColor.includes('white')
                ? 'black'
                : 'white'
            : 'white'

        const bodyColor = Color(givenColor).mix(Color(mixColor), 0.5).string()
        const bodyDimmed = Color(givenColor)
            .mix(Color(mixColor), 0.5)
            .fade(0.7)
            .string()
        const bodyXDimmed = Color(givenColor)
            .mix(Color(mixColor), 0.5)
            .fade(0.9)
            .string()

        document.documentElement.style.setProperty('--bodyColor', bodyColor)
        document.documentElement.style.setProperty('--bodyDimmed', bodyDimmed)
        document.documentElement.style.setProperty('--bodyXDimmed', bodyXDimmed)
        document.documentElement.style.setProperty(
            '--border',
            isValidHex(numberToHex(mainColor))
                ? Color(numberToHex(mainColor))
                      .mix(Color(mixColor), 0.3)
                      .fade(0.85)
                      .string()
                : '#ddd'
        )
    }, [mainColor, bgColor, errorColor])

    return (
        <MainWrapper>
            <TopSection>
                <ColorsSection>
                    <GlobalConfigSection>
                        <MainColorSelector
                            onInputChange={handleMainColorChange}
                            onInputBlur={(e) =>
                                !e.target.value && setMainColor(666)
                            }
                            onRChange={(e) => handleRChange(e.target.value)}
                            onGChange={(e) => handleGChange(e.target.value)}
                            onBChange={(e) => handleBChange(e.target.value)}
                            mainColor={mainColor}
                            r={r}
                            g={g}
                            b={b}
                        />
                        <BackgroundSelectorSection>
                            <BackgroundSelector
                                setBgColor={setBgColor}
                                darkColors={darkColors}
                                lightColors={lightColors}
                                lightColorsAmount={lightColorsAmount}
                            />
                        </BackgroundSelectorSection>
                        <TriggersSection>
                            <Triggers
                                mainColor={mainColor}
                                darkColors={darkColors}
                                lightColors={lightColors}
                                setR={setR}
                                setG={setG}
                                setB={setB}
                                setDarkColorsAmount={setDarkColorsAmount}
                                setDarkestAmount={setDarkestAmount}
                                setDarkColorsMixRotate={setDarkColorsMixRotate}
                                setLightColorsAmount={setLightColorsAmount}
                                setLightestAmount={setLightestAmount}
                                setLightColorsMixRotate={
                                    setLightColorsMixRotate
                                }
                                setLightSaturation={setLightSaturation}
                                setDarkSaturation={setDarkSaturation}
                                rgbToMainColor={rgbToMainColor}
                            />
                        </TriggersSection>
                    </GlobalConfigSection>

                    <ColorsRow
                        mainColor={mainColor}
                        darkColors={darkColors}
                        lightColors={lightColors}
                    />

                    <InputsRow>
                        <InputsRowItem>
                            <DynamicInput
                                color={numberToHex(mainColor)}
                                value={darkColorsAmount}
                                onChange={(e) =>
                                    setDarkColorsAmount(e.target.value)
                                }
                                onBlur={(e) =>
                                    !e.target.value && setDarkColorsAmount(0)
                                }
                                type="number"
                                min={0}
                                label="Dark colors amount"
                            />
                        </InputsRowItem>
                        <InputsRowItem>
                            <DynamicInput
                                color={numberToHex(mainColor)}
                                value={darkestAmount}
                                onChange={(e) =>
                                    setDarkestAmount(e.target.value)
                                }
                                onBlur={(e) =>
                                    !e.target.value && setDarkestAmount(0)
                                }
                                type="number"
                                suffix="%"
                                min={0}
                                max={99}
                                withSlider
                                label="Darkness"
                            />
                        </InputsRowItem>
                        <InputsRowItem>
                            <DynamicInput
                                color={numberToHex(mainColor)}
                                value={darkColorsMixRotate}
                                onChange={(e) =>
                                    setDarkColorsMixRotate(e.target.value)
                                }
                                onBlur={(e) =>
                                    !e.target.value && setDarkColorsMixRotate(0)
                                }
                                min={-360}
                                max={360}
                                type="number"
                                suffix="º"
                                withSlider
                                label="Dark colors hue angle"
                            />
                        </InputsRowItem>
                        <InputsRowItem>
                            <DynamicInput
                                color={numberToHex(mainColor)}
                                value={darkSaturation}
                                onChange={(e) =>
                                    setDarkSaturation(e.target.value)
                                }
                                onBlur={(e) =>
                                    !e.target.value && setDarkSaturation(0)
                                }
                                min={-100}
                                max={100}
                                type="number"
                                suffix="%"
                                withSlider
                                label="Dark colors saturation"
                            />
                        </InputsRowItem>

                        <InputsRowItemSeparataor />

                        <InputsRowItem>
                            <DynamicInput
                                color={numberToHex(mainColor)}
                                value={lightColorsAmount}
                                onChange={(e) =>
                                    setLightColorsAmount(e.target.value)
                                }
                                onBlur={(e) =>
                                    !e.target.value && setLightColorsAmount(0)
                                }
                                min={0}
                                type="number"
                                label="Light colors amount"
                            />
                        </InputsRowItem>
                        <InputsRowItem>
                            <DynamicInput
                                color={numberToHex(mainColor)}
                                value={lightestAmount}
                                onChange={(e) =>
                                    setLightestAmount(e.target.value)
                                }
                                onBlur={(e) =>
                                    !e.target.value && setLightestAmount(0)
                                }
                                min={0}
                                max={99}
                                type="number"
                                suffix="%"
                                withSlider
                                label="Lightness"
                            />
                        </InputsRowItem>
                        <InputsRowItem>
                            <DynamicInput
                                color={numberToHex(mainColor)}
                                value={lightColorsMixRotate}
                                onChange={(e) =>
                                    setLightColorsMixRotate(e.target.value)
                                }
                                onBlur={(e) =>
                                    !e.target.value &&
                                    setLightColorsMixRotate(0)
                                }
                                min={-360}
                                max={360}
                                type="number"
                                suffix="º"
                                withSlider
                                label="Light colors hue angle"
                            />
                        </InputsRowItem>
                        <InputsRowItem>
                            <DynamicInput
                                color={numberToHex(mainColor)}
                                value={lightSaturation}
                                onChange={(e) =>
                                    setLightSaturation(e.target.value)
                                }
                                onBlur={(e) =>
                                    !e.target.value && setLightSaturation(0)
                                }
                                min={-100}
                                max={100}
                                type="number"
                                suffix="%"
                                withSlider
                                label="Light colors saturation"
                            />
                        </InputsRowItem>
                    </InputsRow>
                </ColorsSection>
            </TopSection>
            <Footer />
        </MainWrapper>
    )
}

export default Scale
