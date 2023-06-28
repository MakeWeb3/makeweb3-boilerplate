import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ConnectWalletButton from './ConnectWalletButton';

describe('ConnectWalletButton', () => {
  test('click #connect-wallet button and show modal', async () => {
    render(<ConnectWalletButton />);
    const button = screen.getByTestId('connect-wallet');
    userEvent.click(button);
    // expect result
    expect(
      await screen.findByTestId('connect-wallet-modal')
    ).toBeInTheDocument();
  });
});
