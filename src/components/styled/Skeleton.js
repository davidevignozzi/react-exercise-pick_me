import React from 'react';
import Box from './Box';
import styled, { keyframes } from 'styled-components';
import { variant } from 'styled-system';

const waveKeyFrame = keyframes`
    0%{
        transform: translateX(-100%);
    }
    50%{
        transform: translateX(100%);        
    }
    100%{
        transform: translateX(100%);        
    }
`;

const WaveBox = styled(Box)`
  &::after {
    animation: ${waveKeyFrame} 1.6s linear 0.5s infinite;
  }
`;

const SkeletonBox = styled(WaveBox)(
  variant({
    variants: {
      circle: {
        borderRadius: '50%',
      },
      rect: {},
    },
  }),
  {
    position: 'relative',
    overflow: 'hidden',
    '::after': {
      background:
        'linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)',
      content: "''",
      position: 'absolute',
      transform: 'translateX(-100%)',
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
    },
  }
);

SkeletonBox.defaultProps = {
  backgroundColor: 'var(--grey-500)',
  //   backgroundColor: '#222',
};

const Skeleton = ({ variant = 'rect', ...rest }) => {
  return <SkeletonBox variant={variant} {...rest} />;
};

export default Skeleton;
