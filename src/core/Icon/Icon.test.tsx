import React from 'react';
import { render } from 'react-testing-library';

import { Icon } from './Icon';

test('calling render with the same component on the same container does not remount', () => {
  const svgRenderer = render(<Icon data-testid="icon" />);
  const { getByTestId, container, rerender } = svgRenderer;
  expect(container.firstChild).toMatchSnapshot();
  expect(getByTestId('icon')).toBeDefined();

  // re-render the same component with different props
  rerender(<Icon data-testid="noci" />);
  expect(getByTestId('noci')).toBeDefined();
});