import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const Spinner = styled.div`
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    animation: spin 1s linear infinite;
    border-radius: 9999px;
    border-bottom-width: 4px;
    border-bottom-style: solid;
    border-color: var(--bodyColor);

    height: 64px;
    width: 64px;

    @media (prefers-reduced-motion: reduce) {
        display: none;
    }
`

const TextWrapper = styled.span`
    @media (prefers-reduced-motion: no-preference) {
        display: none;
    }
`

const Loader: React.FC = () => {
    return (
        <Wrapper>
            <Spinner />
            <TextWrapper>Loading...</TextWrapper>
        </Wrapper>
    )
}

export default Loader
