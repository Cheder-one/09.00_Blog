import { Flex } from 'antd';

import { Routes } from './app/routes';
import { Header } from './app/components';

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
