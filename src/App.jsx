import { Flex } from 'antd';

import { Header } from './app/components';
import { Routes } from './app/routes';

function App() {
  return (
    <>
      <Header logoTitle="Realworld Blog" />
      <Flex justify="center">
        <Routes />
      </Flex>
    </>
  );
}

export default App;
