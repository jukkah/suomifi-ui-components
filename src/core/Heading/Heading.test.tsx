import React from 'react';
import { render } from '@testing-library/react';
import { axeTest } from '../../utils/test/axe';

import { Heading, HeadingProps } from './Heading';

const TestHeadings = (
  <div data-testid="Heading">
    <Heading variant="h1hero">Test Heading</Heading>
    <Heading variant="h1">Test Heading</Heading>
    <Heading variant="h2">Test Heading</Heading>
    <Heading variant="h3" as="h2">
      h3 as h2 text
    </Heading>
    <Heading variant="h3">Test Heading</Heading>
    <Heading variant="h4">Test Heading</Heading>
    <Heading variant="h5">Test Heading</Heading>
  </div>
);

test('calling render with the same component on the same container does not remount', () => {
  const HeadingRendered = render(TestHeadings);
  const { container } = HeadingRendered;
  expect(container.firstChild).toMatchSnapshot();
});

describe('Heading with props', () => {
  const TestHeading = (props: Partial<HeadingProps>) => (
    <Heading variant="h1" {...props}>
      Test Heading
    </Heading>
  );

  it('should have given color', () => {
    const { getByText } = render(<TestHeading color="alertBase" />);
    expect(getByText('Test Heading')).toHaveStyle({
      color: 'rgb(50, 195, 195)',
    });
  });
});

test('should not have basic accessibility issues', axeTest(TestHeadings));
