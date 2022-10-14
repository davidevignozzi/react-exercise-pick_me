// Will manage flexbox

import {
  space,
  layout,
  border,
  flexbox,
  color,
  position,
  compose,
} from 'styled-system';
import styled from 'styled-components';
import { css } from 'styled-components';

const StackWrapper = styled('div')(
  ({
    childrendMarginTop,
    childrendMarginBottom,
    childrendMarginRight,
    childrendMarginLeft,
    align,
    justify,
    direction,
  }) =>
    css({
      display: 'flex',
      alignItems: align,
      justifyContent: justify,
      flexDirection: direction,

      // All children subsequent to all children
      '& > * + *': {
        marginTop: childrendMarginTop,
        marginBottom: childrendMarginBottom,
        marginRight: childrendMarginRight,
        marginLeft: childrendMarginLeft,
      },
    }),
  compose(flexbox, border, layout, color, space, position)
);

const Stack = ({
  align,
  justify,
  direction,
  spacing,
  children,
  ...rest
}) => {
  return (
    <StackWrapper
      {...rest}
      align={align}
      justify={justify}
      direction={direction}
      childrendMarginTop={direction === 'column' ? spacing : 0}
      childrendMarginBottom={
        direction === 'column-reverse' ? spacing : 0
      }
      childrendMarginLeft={direction === 'row' ? spacing : 0}
      childrendMarginRight={direction === 'row-reverse' ? spacing : 0}
    >
      {children}
    </StackWrapper>
  );
};

export default Stack;
