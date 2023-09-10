import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import Noticebar from './ui-component/notice_bar';
import { MessageProvider } from './ui-component/MessageContext';
// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <MessageProvider>
          {/* 在这里包裹MessageProvider */}
          {/* 添加 WebSocketManager 组件 */}
          <Noticebar />
          <NavigationScroll>
            <Routes />
          </NavigationScroll>
        </MessageProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
