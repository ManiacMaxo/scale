import Color from 'color'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ColorBlock, ColorBlocksRow } from '../components'
import { errorColor, hashToObject, isValidHex, numberToHex } from '../utils'

export const galleryData = [
    {
        scaleValue: '#4/4/54/86/103/30/-44/14/EEA96E/238/169/110',
        authorName: 'Hayk',
        authorLink: 'https://hayk.design',
    },
    {
        scaleValue: '#8/0/0/0/-53/-193/0/-100/0098FF/0/152/255',
        authorName: 'Hayk',
        authorLink: 'https://hayk.design',
    },
    {
        scaleValue: '#4/6/62/91/0/17/-36/14/3E83FF/62/131/255',
        authorName: 'StrowBeary',
        authorLink: 'https://remicaillot.fr/',
    },
    {
        scaleValue: '#4/6/10/87/-103/146/39/-100/FFB177/255/177/119',
        authorName: 'Kyle Hall',
        authorLink: 'https://github.com/kyle-hall',
    },
    {
        scaleValue: '#4/4/70/89/0/0/0/4/0859fC/8/89/252',
        authorName: 'LizS',
    },
    {
        scaleValue: '#4/6/51/83/-8/-8/74/77/269AC9/38/154/201',
        authorName: 'Hum',
        authorLink: 'https://vk.com/hummanoid',
    },
    {
        scaleValue: '#2/6/25/80/8/-33/-7/47/F16334/241/99/52',
        authorName: 'David Kariuki',
        authorLink: 'https://www.behance.net/davellykariuki',
    },
    {
        scaleValue: '#4/6/65/80/82/11/41/-1/A39A6C/163/154/108',
        authorName: 'TheXCodeSeeker',
    },
    {
        scaleValue: '#4/6/50/80/-12/77/33/-10/23A9CF/35/169/207',
        authorName: 'Don',
        authorLink: 'http://thinkrepeat.com/',
    },
    {
        scaleValue: '#3/0/50/80/-51/67/20/14/C0DE58/192/222/88',
        authorName: 'Pinki',
        authorLink: 'https://dribbble.com/Pinki',
    },
    {
        scaleValue: '#2/2/50/25/-50/-150/25/-50/E05040/224/80/64',
        authorName: 'Dan Pontes',
        authorLink: 'https://danpontes.webflow.io',
    },
    {
        scaleValue: '#4/6/80/97/-51/-3/0/14/7d61dc/125/97/220',
        authorName: 'Accessible Visual',
        authorLink:
            'https://www.freshworks.com/agile-project-management-software/?source=fworks&medium=referral&campaign=fworks_product_nav',
    },
    {
        scaleValue: '#5/5/62/40/118/-172/-46/14/FFE64A/255/230/74',
        authorName: 'Crshlab',
        authorLink: 'http://crashlab.be',
    },
    {
        scaleValue: '#6/8/32/80/-31/67/5/100/1D9AFF/29/154/255',
        authorName: 'Michael Andreuzza ',
        authorLink: 'https://dribbble.com/MichaelAndreuzza',
    },
    {
        scaleValue: '#4/6/50/61/-51/17/63/14/1DBDC3/29/189/195',
        authorName: 'Ali Rahmani',
        authorLink: 'https://www.instagram.com/rahmaniali.ir/',
    },
    {
        scaleValue: '#2/4/50/80/-51/67/20/14/a5b0feff/165/176/254',
        authorName: 'Siar',
    },
    {
        scaleValue: '#2/4/31/82/-8/-48/34/31/6a67b1/106/103/177',
        authorName: 'Hayk',
        authorLink: 'https://hayk.design',
    },
    {
        scaleValue: '#0/9/0/95/0/0/0/0/444/68/68/68',
        authorName: 'Hayk',
        authorLink: 'https://hayk.design',
    },
    {
        scaleValue: '#0/9/42/83/72/-55/60/50/9E3E3C/158/62/60',
        authorName: 'Hayk',
        authorLink: 'https://hayk.design',
    },
    {
        scaleValue: '#3/6/42/83/72/-76/60/50/824479/130/68/121',
        authorName: 'Hayk',
        authorLink: 'https://hayk.design',
    },
    {
        scaleValue: '#0/5/44/70/-51/116/100/14/45397F/69/57/127',
        authorName: 'Hayk',
        authorLink: 'https://hayk.design',
    },
]

const GalleryWrapper = styled.div`
    padding: 80px;

    @media (max-width: 720px) {
        padding: 32px;
    }
`

interface GalleryItemProps {
    color?: string
}

const GalleryItem = styled.div<GalleryItemProps>`
    padding: 80px 0 40px 0;
    border-bottom: 1px solid
        ${(props) => Color(props.color).alpha(0.1).string()};
`

interface ItemAuthorProps {
    color: string
}

const ItemAuthor = styled.a<ItemAuthorProps>`
    margin-top: 24px;
    color: ${(props) => props.color};
    display: inline-block;
    text-decoration: none;
    font-size: 12px;
    line-height: 16px;
`

const GalleryHeader = styled.header`
    display: inline-block;
    text-decoration: none;
    font-size: 34px;
    line-height: 34px;
    border-bottom: 1px solid #ddd;
    width: 100%;
    padding: calc(50vh - 240px) 0 80px 0;
    color: #222;
    display: flex;

    a {
        color: #aaa;
        text-decoration: none;
    }

    @media (max-width: 720px) {
        font-size: 18px;
        line-height: 28px;
    }
`

const SubmitLink = styled.a`
    margin-left: auto;
`

const getColorsList = (
    colorsAmount: number,
    colorsShiftAmount: number,
    mixColor: string,
    rotate: number,
    saturation: number,
    colorsObject: Record<string, any>
) => {
    const colorsList = []

    const scaleValueObj = useMemo(
        () => hashToObject(colorsObject.scaleValue),
        [colorsObject.scaleValue]
    )

    const givenColor = isValidHex(numberToHex(scaleValueObj?.mainColor))
        ? numberToHex(scaleValueObj?.mainColor)
        : errorColor

    for (let step = 0; step < colorsAmount; step++) {
        if (isValidHex(numberToHex(scaleValueObj?.mainColor))) {
            colorsList.push(
                Color(givenColor)
                    .rotate(((step + 1) / colorsAmount) * -rotate)
                    .saturate(((step + 1) / colorsAmount) * (saturation / 100))
                    .mix(
                        Color(mixColor),
                        ((colorsShiftAmount / 100) * (step + 1)) / colorsAmount
                    )
                    .string()
            )
        } else {
            colorsList.push(errorColor)
        }
    }

    return colorsList
}

const Gallery: React.FC = () => (
    <GalleryWrapper>
        <GalleryHeader>
            <Link to="/">scale/</Link>gallery
            <SubmitLink
                href="https://hayk15.typeform.com/to/mVHrni"
                data-mode="drawer_right"
                data-hide-headers={true}
                data-hide-footer={true}
                data-submit-close-delay="5"
                className="typeform-share"
            >
                +submit
            </SubmitLink>
        </GalleryHeader>
        {Object.values(galleryData).map((value) => {
            const colorsObject = hashToObject(value.scaleValue)
            if (!colorsObject) return null

            return (
                <GalleryItem color={numberToHex(colorsObject.mainColor)}>
                    <Link
                        to={{
                            pathname: '/',
                            hash: value.scaleValue,
                        }}
                    >
                        <ColorBlocksRow disabled>
                            {getColorsList(
                                colorsObject.darkColorsAmount,
                                colorsObject.darkestAmount,
                                'black',
                                colorsObject.darkColorsMixRotate,
                                colorsObject.darkSaturation,
                                value
                            )
                                .reverse()
                                .map((color, index) => (
                                    <ColorBlock
                                        style={{ background: color }}
                                        hasValidColor={isValidHex(
                                            numberToHex(colorsObject.mainColor)
                                        )}
                                        color={color}
                                        key={index}
                                    />
                                ))}

                            <ColorBlock
                                wide
                                style={{
                                    background: isValidHex(
                                        numberToHex(colorsObject.mainColor)
                                    )
                                        ? numberToHex(colorsObject.mainColor)
                                        : errorColor,
                                }}
                                hasValidColor={isValidHex(
                                    numberToHex(colorsObject.mainColor)
                                )}
                                color={numberToHex(colorsObject.mainColor)}
                            />

                            {getColorsList(
                                colorsObject.lightColorsAmount,
                                colorsObject.lightestAmount,
                                'white',
                                colorsObject.lightColorsMixRotate,
                                colorsObject.lightSaturation,
                                value
                            ).map((color, index) => (
                                <ColorBlock
                                    style={{ background: color }}
                                    hasValidColor={isValidHex(
                                        numberToHex(colorsObject.mainColor)
                                    )}
                                    color={color}
                                    key={index}
                                />
                            ))}
                        </ColorBlocksRow>

                        <ItemAuthor
                            href={value.authorLink}
                            target="_blank"
                            color={numberToHex(colorsObject.mainColor)}
                        >
                            by {value.authorName}
                        </ItemAuthor>
                    </Link>
                </GalleryItem>
            )
        })}
    </GalleryWrapper>
)

export default Gallery
