/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
import ConnectWalletButton from '@/components/Button/ConnectWalletButton';
import { AppConfig } from '@/constants/AppConfig';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Index = () => {
  return (
    <Main
      meta={
        <Meta title={AppConfig.title} description={AppConfig.description} />
      }
    >
      <h1 className="mb-3 text-4xl font-bold text-black">Guestbook</h1>
      <div>You can tell me anything here!</div>
      <div className="m-auto">
        <ConnectWalletButton />
        <span className="ml-3">to continue leaving a message</span>
      </div>
      <div className="dropdown">
        <label tabIndex={0} className="btn m-1">
          Click
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow"
        >
          <li>
            <a href="123">Item 1</a>
          </li>
          <li>
            <a href="123">Item 2</a>
          </li>
        </ul>
      </div>
    </Main>
  );
};

export default Index;
