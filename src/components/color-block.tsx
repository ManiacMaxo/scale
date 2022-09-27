import Color from 'color'
import React, { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import styled, { keyframes } from 'styled-components'

const ColorBlockWrapper = styled.div``

const ColorBlockCode = styled.div`
    position: absolute;
    top: 100%;
    padding-top: 8px;
    padding-bottom: 16px;
    transition: 0.2s;
`

const ColorBlockContainer = styled.div<Pick<Props, 'wide' | 'hasValidColor'>>`
    position: relative;
    height: 72px;
    max-width: ${(props) => (props.wide ? 192 : 72)}px;
    ${(props) => props.wide && 'min-width: 192px'};
    width: 100%;
    ${(props) => !props.hasValidColor && 'box-shadow: inset 0 0 0 2px #ddd'};
    flex-shrink: 1;
    cursor: pointer;

    &:not(:hover) .ColorBlockCode {
        opacity: 0;
        transition: 0.6s;
    }

    @media (max-width: 720px) {
        ${(props) => props.wide && 'min-width: 96px'};
    }
`

const copyAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  30% {
    opacity: 0.5;
  }
  70% {
    transform: translateY(0);
    opacity: 0.3;
  }
  100% {
    opacity: 0;
  }
`

const CopiedText = styled.div`
    animation: ${copyAnimation} 0.8s;
    opacity: 0;
`

interface Props extends Omit<React.ComponentProps<'div'>, 'ref'> {
    color: string
    wide?: boolean
    hasValidColor?: boolean
}

const ColorBlock: React.FC<Props> = (props) => {
    const { wide, hasValidColor, color, ...rest } = props
    const [copied, setCopied] = useState(false)

    const handleCopied = () => {
        setCopied(true)
        setTimeout(() => setCopied(false), 800)
    }

    const render = () => (
        <ColorBlockContainer
            wide={wide}
            hasValidColor={hasValidColor}
            {...rest}
            onClick={handleCopied}
        >
            <ColorBlockWrapper {...rest} />

            <ColorBlockCode className="ColorBlockCode">
                {hasValidColor ? Color(color).hex() : null}
                {copied && <CopiedText>{Color(color).hex()}</CopiedText>}
            </ColorBlockCode>
        </ColorBlockContainer>
    )

    return hasValidColor ? (
        <CopyToClipboard text={Color(color).hex()}>{render()}</CopyToClipboard>
    ) : (
        render()
    )
}

export default ColorBlock
