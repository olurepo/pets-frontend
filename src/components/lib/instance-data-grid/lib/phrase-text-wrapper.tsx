import React from 'react';
import styled from '@emotion/styled';

import { ERROR_100, NEUTRAL_600 } from '../../../../utils';

interface PhraseTextWrapperProps {
    isAdversarial: boolean
}

export const PhraseTextWrapper = styled.div<PhraseTextWrapperProps>`
    color: ${(props: any) => (props.isAdversarial ? ERROR_100 : NEUTRAL_600)}
`;

export default PhraseTextWrapper;
