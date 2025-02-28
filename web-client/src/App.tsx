import ConfigProvider from 'antd/es/config-provider';
import './App.css'
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './lib/state/store';
import EditorPage from './pages/editor';
import { theme } from 'antd';
import '@ant-design/v5-patch-for-react-19';

function App() {
    return <ConfigProvider theme={{
        algorithm: theme.darkAlgorithm,
        token: {
            colorPrimary: '#6200ff',
            
            // colorBgContainer: '#f6ffed',
            borderRadius: 10
        }
    }}>
        <ReduxProvider store={store}>
            <EditorPage/>
        </ReduxProvider>
    </ConfigProvider>;
}

export default App
